/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import amenities from "@/utils/amenities";
import api from "@/utils/axiosInstace";
import {
  accomodations,
  propertyType,
  isAvaliableFor,
  indipendent,
  furnished,
} from "@/utils/dataSets";
import { MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RoomData {
  name: string;
  accommodationType: string;
  primeLocation: string;
  googleMapsLocation: string;
  independent: string;
  type: string;
  rent: string;
  facilities: string[];
  owner: string;
  images: string[];
  description: string;
  availability: boolean;
  numberOfRooms: number | null;
  isAvaliableFor: string;
  isNegotiable: boolean;
  furnished: string;
  displayName: string;
}

const UpdateProperty: React.FC<{ params: Promise<{ id: string }> }> = ({
  params,
}) => {
  const { id } = use(params);
  const [roomData, setRoomData] = useState<RoomData>({
    name: "",
    accommodationType: "",
    primeLocation: "",
    googleMapsLocation: "",
    displayName: "",
    independent: "NON_INDEPENDENT",
    furnished: "UNFURNISHED",
    type: "1R",
    rent: "",
    facilities: [],
    owner: "",
    images: [],
    description: "",
    availability: true,
    numberOfRooms: null,
    isAvaliableFor: "UNISEX",
    isNegotiable: false,
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageLimit, setImageLimit] = useState<number>(2);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // const checked = (e.target as HTMLInputElement).checked;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const alreadyUploadedCount = roomData.images.filter(
      (img: any) => typeof img === "string"
    ).length;

    const remainingSlots = imageLimit - alreadyUploadedCount;

    if (remainingSlots <= 0) {
      toast.error(`You can only upload a total of ${imageLimit} images`);
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      toast.info(`Only ${remainingSlots} more image(s) can be added`);
    }

    const updatedFiles = [...selectedFiles, ...filesToAdd];
    const updatedImageURLs = [
      ...selectedImages,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ];

    setSelectedFiles(updatedFiles);
    setSelectedImages(updatedImageURLs);
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    const uploadedImageURLs: string[] = [];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    for (const image of selectedFiles) {
      try {
        const compressedImage = await imageCompression(image, options);

        const formData = new FormData();
        formData.append("file", compressedImage);
        formData.append("upload_preset", "ml_default");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: null,
            },
          }
        );

        if (!response.data.secure_url) throw new Error("Upload failed");
        uploadedImageURLs.push(response.data.secure_url);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Image upload failed. Please try again.");
        return [];
      }
    }

    return uploadedImageURLs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.info("Uploading images...");

    // Upload only the new image files
    const uploadedImageURLs = await uploadImages();

    // Merge old + newly uploaded images (old ones are URLs)
    const allImages = [
      ...roomData.images.filter((img: any) => typeof img === "string"),
      ...uploadedImageURLs,
    ];

    // Block submission if total images = 0
    if (allImages.length === 0) {
      toast.error("No images uploaded.");
      return;
    }

    const updatedRoomData = { ...roomData, images: allImages };

    try {
      const response = await api.put(
        `/room/update-room/${id}`,
        updatedRoomData
      );

      if (response.status === 200) {
        toast.success("Property updated successfully!");
        router.push("/admin-dashboard/properties");
      }
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 403) {
        return toast.error(error?.response.data.message);
      }
      toast.error("Property submission failed.");
    }
  };

  const removeDiacritics = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const getMyroomData = async () => {
    try {
      const data = await api.get(`/room/my-room-data/${id}`);
      console.log(data);
      setRoomData(data.data);
      const property = propertyType.find(
        (type) => type.value === data.data.type
      );
      if (property) {
        setImageLimit(property.numberOfPhotos);
      } else {
        console.log("Property not found, using default limit");
        setImageLimit(5);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Generate Google Maps Location Link
          const googleMapsLocation = `https://www.google.com/maps?q=${latitude},${longitude}`;

          try {
            // Fetch area name using OpenStreetMap Reverse Geocoding API with Axios
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse`,
              {
                params: {
                  lat: latitude,
                  lon: longitude,
                  format: "json",
                },
              }
            );

            const data = response.data;
            console.log(data?.address?.display_name);
            const areaName = removeDiacritics(
              data?.address?.hamlet || data?.address?.city || "Can't Fetch Area"
            );

            const displayName = removeDiacritics(
              data?.display_name || "Can't Fetch Area"
            );

            // Update state with both Google Maps Link and Area Name
            setRoomData((prevData) => ({
              ...prevData,
              googleMapsLocation,
              primeLocation: areaName, // Storing the fetched area name
              displayName: displayName,
            }));

            console.log("Your Area:", areaName);
          } catch (error) {
            console.error("Error fetching area name:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const [user, setUser] = useState<null | Owner>(null);
  const getOwner = async () => {
    try {
      const res = await api.get("/admin/admin-details");
      console.log(res);
      if (res.status === 200) {
        if (!res?.data?.subscriptionTaken)
          return router.push("/admin-dashboard");
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwner();
    getMyroomData();
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationAccess, setLocationAccess] = useState(false);

  useEffect(() => {
    if (user) {
      if (!!user?.locations && user.planType === "PRO") {
        setLocationAccess(true);
        setRoomData((prevData) => ({
          ...prevData,
          primeLocation: user?.locations[0]?.primeLocation,
          googleMapsLocation: user?.locations[0]?.googleMapsLocation,
          displayName: user?.locations[0]?.displayName,
        }));
      } else {
        getCurrentLocation();
      }
    }
  }, [user]);
  const handleRemoveImage = (
    index: number,
    source: "selected" | "roomData"
  ) => {
    if (source === "selected") {
      // Remove image from the selectedImages state
      const updatedImages = selectedImages.filter((_, idx) => idx !== index);
      setSelectedImages(updatedImages);
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((_, idx) => idx !== index)
      ); // Remove the file as well
    } else if (source === "roomData") {
      // Remove image from roomData.images state
      const updatedImages = roomData.images.filter((_, idx) => idx !== index);
      setRoomData((prevData) => ({ ...prevData, images: updatedImages }));
    }
  };

  const trimImagesToLimit = (
    roomImages: string[],
    selectedFiles: File[],
    selectedImages: string[],
    limit: number
  ): {
    trimmedRoomImages: string[];
    trimmedSelectedFiles: File[];
    trimmedSelectedImages: string[];
  } => {
    const totalImageCount = roomImages.length + selectedFiles.length;

    if (totalImageCount <= limit) {
      return {
        trimmedRoomImages: roomImages,
        trimmedSelectedFiles: selectedFiles,
        trimmedSelectedImages: selectedImages,
      };
    }

    const roomImagesToKeep = Math.min(roomImages.length, limit);
    const selectedFilesToKeep = Math.max(0, limit - roomImagesToKeep);

    return {
      trimmedRoomImages: roomImages.slice(0, roomImagesToKeep),
      trimmedSelectedFiles: selectedFiles.slice(0, selectedFilesToKeep),
      trimmedSelectedImages: selectedImages.slice(0, selectedFilesToKeep),
    };
  };
  useEffect(() => {
    const { trimmedRoomImages, trimmedSelectedFiles, trimmedSelectedImages } =
      trimImagesToLimit(
        roomData.images,
        selectedFiles,
        selectedImages,
        imageLimit
      );

    if (
      trimmedRoomImages.length !== roomData.images.length ||
      trimmedSelectedFiles.length !== selectedFiles.length
    ) {
      setRoomData((prev) => ({ ...prev, images: trimmedRoomImages }));
      setSelectedFiles(trimmedSelectedFiles);
      setSelectedImages(trimmedSelectedImages);
      toast.info(
        `Image limit is ${imageLimit}. Extra images have been removed automatically.`
      );
    }
  }, [imageLimit]);

  if (!user) {
    return (
      <div className="w-full p-2 lg:p-6 bg-white rounded-2xl shadow-lg border border-gray-200 pt-16 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded mb-6" />

        {/* Image Upload Skeleton */}
        <div className="border border-gray-300 rounded-xl p-6 text-center bg-gray-50 mb-6">
          <div className="bg-gray-300 h-12 w-40 mx-auto rounded mb-2" />
          <p className="text-sm text-gray-400 mt-2">or drop images here</p>
          <div className="flex flex-wrap mt-4 gap-2 justify-center">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 bg-gray-300 rounded-lg shadow-md"
                />
              ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">You can upload X images</p>
        </div>

        {/* Form Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-screen">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-4 w-40 bg-gray-300 rounded" />
              <div className="h-12 w-full bg-gray-300 rounded" />
            </div>
          ))}

          {/* Rent & Negotiable checkbox skeleton */}
          <div className="flex space-x-2 w-full col-span-2 lg:col-span-1">
            <div className="space-y-2 w-2/3">
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-12 bg-gray-300 rounded" />
            </div>
            <div className="space-y-2 flex items-center">
              <div className="w-5 h-5 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
          </div>

          {/* Submit button skeleton */}
          <div className="col-span-2 mt-6">
            <div className="h-12 w-40 bg-gray-300 rounded mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 lg:p-6 bg-white rounded-2xl shadow-lg border border-gray-200 pt-16">
      <h1 className="text-2xl font-semibold mb-4">Add New Properties</h1>

      <div className="border border-gray-300 rounded-xl p-6 text-center bg-gray-50 mb-6">
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <label htmlFor="imageUpload" className="cursor-pointer">
          <div className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-buttons/80 transition">
            Choose Images
          </div>
        </label>
        <p className="text-sm text-gray-500 mt-2">or drop images here</p>
        <div className="flex flex-wrap mt-4 gap-2">
          {/* Preview images (from selectedImages) */}
          {selectedImages.map((src, idx) => (
            <div key={idx} className="relative w-20 h-20">
              <Image
                width={50}
                height={50}
                src={src}
                alt="Uploaded"
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              {/* Cross button to remove the image */}
              <button
                onClick={() => handleRemoveImage(idx, "selected")}
                className="absolute top-0 right-0 bg-white p-1 rounded-full text-red-500 hover:bg-red-100"
              >
                &times;
              </button>
            </div>
          ))}

          {/* Uploaded images (from roomData.images) */}
          {roomData.images.map((src, idx) => (
            <div key={idx} className="relative w-20 h-20">
              <Image
                width={100}
                height={100}
                src={src}
                alt="Uploaded"
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              {/* Cross button to remove the image */}
              <button
                onClick={() => handleRemoveImage(idx, "roomData")}
                className="absolute top-0 right-0 bg-white p-1 rounded-full text-red-500 hover:bg-red-100"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          You can upload {imageLimit} images
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-screen"
      >
        <div className="space-y-2 w-full col-span-2 lg:col-span-1">
          <label className="block font-semibold text-gray-700">Title*</label>
          <input
            type="text"
            name="name"
            value={roomData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter title"
          />
        </div>

        <div className="flex items-center space-x-2 w-full col-span-2 lg:col-span-1">
          <div className="space-y-2 w-4/5 lg:w-2/3">
            <label className="block font-semibold text-gray-700">
              Accommodation Type*
            </label>
            <select
              name="accommodationType"
              value={roomData.accommodationType}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Type</option>
              {accomodations.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {(roomData.accommodationType === "PG" ||
            roomData.accommodationType === "HOSTEL") && (
            <div className="space-y-2 pt-8 ">
              <input
                type="number"
                name="numberOfRooms"
                value={roomData.numberOfRooms || 0}
                onChange={handleChange}
                required
                className={
                  "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                }
                placeholder="Number of Rooms"
              />
            </div>
          )}
        </div>

        <div className="space-y-2 col-span-2 lg:col-span-1">
          <label className="block font-semibold text-gray-700">
            Property Type*
          </label>
          <select
            name="type"
            value={roomData.type}
            onChange={(e) => {
              handleChange(e);
              const selectedType = propertyType.find(
                (type) => type.value === e.target.value
              );
              setImageLimit(selectedType?.numberOfPhotos || 5);
            }}
            required
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {propertyType.map((type) => (
              <option title={type.label} key={type.label} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2 col-span-2 lg:col-span-1">
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">
              Prime Location*
            </label>
            <input
              // disabled={locationAccess}
              type="text"
              name="primeLocation"
              value={roomData.primeLocation}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
              placeholder="Enter prime location"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">
              Accurate Location*
            </label>
            <div className="flex items-center space-x-2">
              <input
                // disabled={locationAccess}
                type="text"
                name="googleMapsLocation"
                value={roomData.googleMapsLocation}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none `}
                placeholder="Enter prime location"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className={` p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none `}
              >
                <MapPinIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 col-span-2 lg:col-span-1">
          <div className="space-y-2 w-2/3  ">
            <div className="flex space-x-2">
              <label className="block font-semibold text-gray-700">
                Rent (₹)*
              </label>
              <div className="space-y-2  flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isNegotiable"
                    checked={roomData.isNegotiable}
                    onChange={handleChange}
                    className="rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="text-gray-700">Is Negotiable</span>
                </label>
              </div>
            </div>
            <input
              type="number"
              name="rent"
              value={roomData.rent}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter rent amount"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 overflow-ellipsis whitespace-nowrap">
              Avaliable For*
            </label>
            <select
              name="isAvaliableFor"
              value={roomData.isAvaliableFor}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {isAvaliableFor.map((type) => (
                <option title={type.label} key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 w-full col-span-2 lg:col-span-1">
          <label className="block font-semibold text-gray-700">
            Location On Display*
          </label>
          <input
            // disabled={locationAccess}
            type="text"
            name="displayName"
            value={roomData.displayName}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="E.g. 123, XYZ Street, ABC Nagar, Delhi - 110012"
          />
        </div>
        <div className="space-y-2 col-span-2  ">
          <label className="block font-semibold text-gray-700">
            Facilities
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {amenities.map(({ id, name, icon }) => (
              <label
                key={id}
                className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  name="facilities"
                  value={id}
                  checked={roomData.facilities.includes(id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setRoomData((prevData) => ({
                      ...prevData,
                      facilities: checked
                        ? [...prevData.facilities, id]
                        : prevData.facilities.filter((f) => f !== id),
                    }));
                  }}
                />
                <Image
                  className="w-5 h-5 "
                  alt={name}
                  src={icon}
                  width={50}
                  height={50}
                />
                <span className="text-gray-700 text-ellipsis line-clamp-1">
                  {name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 col-span-2 ">
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={roomData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter room description"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 ">
          <label className="block font-semibold text-gray-700">
            Independent
          </label>

          {indipendent.map((item) => {
            return (
              <div key={item.label} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="independent"
                  value={item.value}
                  checked={roomData.independent === item.value}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-gray-700">{item.label}</label>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="block font-semibold text-gray-700">Furnished</label>
          {furnished.map((item) => {
            return (
              <div key={item.label} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="furnished"
                  value={item.value}
                  checked={roomData.furnished === item.value}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-gray-700">{item.label}</label>
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="availability"
            checked={roomData.availability}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-gray-700">Available for Rent</label>
        </div>

        <button
          type="submit"
          className="w-full bg-buttons text-white px-6 py-3 rounded-lg shadow-lg hover:bg-buttons/80 transition col-span-2 "
        >
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
