// src/types/property.d.ts
export { };

declare global {
    interface Owner {
        name: string;
        email: string;
        photo: string;
        phoneNumber: string;
        isProfileComplete: boolean;
        userType: string;
        __v: { $numberInt: number };
        locations: {
            primeLocation: string;
            googleMapsLocation: string;
            displayName: string;
        }[];
        planExpiry?: Date | string;
        planType: string;
        roomsPosted: number;
        isVerified: boolean;
        totalBookingsCount: number
        pendingPropertiesCount: number
        _id: string
    }

    interface Property {
        _id: string;
        name: string;
        accommodationType: string;
        primeLocation: string;
        googleMapsLocation: string;
        independent: string;
        furnished: string;
        type: string;
        rent: number;
        facilities: string[];
        owner?: Owner;
        images: string[];
        description: string;
        availability: boolean;
        admin_permission: boolean;
        featured: boolean;
        createdAt: string;
        updatedAt: string;
        slug: string
        favourite: boolean
        displayName: string
        nearbyPlaces: string
        numberOfRooms: number
        payment: string
    }

    interface user {
        name: string;
        email: string;
        phone: string;
        userType: string;
        photo: string;
        unlockedRooms: string[],
        isProfileComplete: boolean
        phoneNumber: string
        subscriptionTaken: boolean
        planType: string
        totalBookingsCount: number
        totalRefundCount: number
        totalRefundPending: number
        _id: string
        roomsPosted: number
    }

    interface Filters {
        search: string;
        accommodationType: string;
        primeLocation: string;
        independent: string;
        type: string;
        rent: { min: number; max: number };
        facilities: string[];
        isAvaliableFor: string;
        furnished: string;
    };


    interface admin {
        name: string;
        email: string;
        userType: string;
        permissions: string[];
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        _id: string;
        phoneNumber: string;
        subscriptionTaken: boolean;
        planType: string;
        totalBookingsCount: number;
        roomsPosted: number;
        photo: string;
        totalRefundCount: number;
        totalRefundPending: number;
        pendingRefunds: number;
        totalProperties: number;
        totalUsers: number;
    }

}
