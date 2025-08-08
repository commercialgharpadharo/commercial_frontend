'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { redirect } from "next/navigation";

import api from "./axiosInstace";



// 👇 Utility to handle auth redirect
const handleAuthRedirect = (error: any) => {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
        // redirect("/login");
    }
    console.error("API error:", error);
};



export const getUser = async () => {
    try {
        const { data } = await api.get("/user/get-user-info");
        return data;
    } catch (error: any) {
        handleAuthRedirect(error);
        return null;
    }
};

export const getOwner = async () => {
    try {
        const { data } = await api.get("/user/owner-details");
        return data;
    } catch (error: any) {
        handleAuthRedirect(error);
        return null;
    }
};

export const getSeeker = async () => {
    try {
        const { data } = await api.get("/user/seeker-details");
        return data;
    } catch (error: any) {
        handleAuthRedirect(error);
        return null;
    }
};

export const getAdmin = async () => {
    try {
        const { data } = await api.get("/admin/admin-details");
        return data;
    } catch (error: any) {
        handleAuthRedirect(error);
        return null;
    }
};

export const getUserById = async ({ id }: { id: string }) => {
    try {
        const { data } = await api.get(`/admin/get-user/${id}`);
        return data;
    } catch (error: any) {
        handleAuthRedirect(error);
        return null;
    }
};

export const getActiveRefunds = async () => {
    try {
        const { data } = await api.get(`/admin/get-active-refunds`);
        return data;
    } catch (error: any) {
        handleAuthRedirect(error);
        return null;
    }
};
export const raiseRefund = async ({ uuid }: { uuid: string }) => {
    try {
        const { data } = await api.get(`/user/raise-refund/${uuid}`);
        return data;
    } catch (error: any) {
        handleAuthRedirect(error);
        return null;
    }
};

