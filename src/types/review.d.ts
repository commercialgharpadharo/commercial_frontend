
export interface Review {
    _id: string;
    review: string;
    reviewer: {
        _id: string;
        name: string;
        email: string;
        userType: "owner" | "seeker";
    };
    rating: number;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export { };

