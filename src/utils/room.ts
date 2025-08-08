import axios from "axios";
import api from "./axiosInstace";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getFeaturedRooms = async (type: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/room/featured-rooms/${type}`);
    if (response.status === 200) return response.data
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};




export const getRoomDetails = async ({ uuid }: { uuid: string }) => {
  try {
    const response = await api.get(`/room/room-details/${uuid}`, {
      withCredentials: true,
    });
    if (response.status === 200) return response.data.room
  } catch (error) {
    console.log(error)
  }
}
export const getFavRooms = async () => {
  try {
    const response = await api.get(`/room/favourite-rooms`, {
      withCredentials: true,
    });
    if (response.status === 200) return response.data
  } catch (error) {
    console.log(error)
  }
}



export const propertyTypes = [
  "Apartment",
  "House",
  "Villa",
  "Duplex",
  "Studio",
  "Office Space",
]


