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
import React, { useEffect, useState } from "react";
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
  images: File[];
  description: string;
  availability: boolean;
  numberOfRooms: number | null;
  isAvaliableFor: string;
  isNegotiable: boolean;
  furnished: string;
  displayName: string;
}

const AddProperty: React.FC = () => {
  const [roomData, setRoomData] = useState<RoomData>({
    name: "",
    accommodationType: "",
    primeLocation: "",
    googleMapsLocation: "",
    displayName: "",
    independent: "STANDALONE",
    furnished: "UNFURNISHED",
    type: "Office Space",
    rent: "",
    facilities: [],
    owner: "",
    images: [],
    description: "",
    availability: true,
    numberOfRooms: 1,
    isAvaliableFor: "LEASE",
    isNegotiable: false,
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageLimit, setImageLimit] = useState<number>(5);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // const checked = (e.target as HTMLInputElement).checked;
    if (name === "accommodationType" && value !== "Office Space" && value !== "Retail Space") {
      setRoomData((prevData) => ({
        ...prevData,
        [name]: value,
        numberOfRooms: 1,
      }));
    } else {
      setRoomData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    const filteredImages = files.slice(0, imageLimit);
    setSelectedImages(imageURLs.slice(0, imageLimit));
    setRoomData((prevData) => ({ ...prevData, images: filteredImages }));
    if (files.length > imageLimit) {
      toast.error(`You can only upload ${imageLimit} images`);
      toast.info(`Removing Extra Images`);
    }
  };

  const uploadImages = async (): Promise<string[]> => {
    if (roomData.images.length === 0) return [];

    const uploadedImageURLs: string[] = [];

    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 800, // Max width or height
      useWebWorker: true, // Use web workers for faster compression
    };

    for (const image of roomData.images) {
      console.log(
        `Image size before compression: ${image.size / (1024 * 1024)} MB`
      );
      const compressedImage = await imageCompression(image, options);
      console.log(
        `Image size after compression: ${
          compressedImage.size / (1024 * 1024)
        } MB`
      );

      const formData = new FormData();
      formData.append("file", compressedImage);
      formData.append("upload_preset", "ml_default"); // If using Cloudinary

      try {
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

        if (!response.data.secure_url) throw new Error("Image upload failed");

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

    const imageURLs = await uploadImages();
    if (imageURLs.length === 0) {
      toast.error("No images uploaded.");
      return;
    }

    const updatedRoomData = { ...roomData, images: imageURLs };

    try {
      const response = await api.post("/room/add-room", updatedRoomData);
      if (response.status === 201) {
        toast.success("Property submitted successfully!");
        router.push("/owner-dashboard/properties");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error?.response.status === 403) {
        return toast.error(error?.response.data.message);
      }
      toast.error("Property submission failed.");
    }
  };

  const removeDiacritics = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
      const res = await api.get("/user/owner-details");
      console.log(res);
      if (res.status === 200) {
        if (!res?.data?.subscriptionTaken) {
          toast.info("Please subscribe to a plan to add properties", {
            autoClose: 2000,
          });
          return router.push("/owner-dashboard");
        }
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwner();
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
          {selectedImages.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-lg shadow-md"
            />
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
          {(roomData.accommodationType === "Office Space" ||
            roomData.accommodationType === "Retail Space") && (
            <div className="space-y-2 pt-8 ">
              <input
                min={1}
                type="number"
                name="numberOfRooms"
                value={roomData.numberOfRooms || 1}
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
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none 
        
              `}
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
                className={` p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none 
           
                `}
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
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none `}
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

export default AddProperty;
