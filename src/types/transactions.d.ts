

export { };
export interface Transaction {
    _id: string;
    seeker: {
        name: string;
        phoneNumber: string;
        _id: string;
    };
    owner: {
        name: string;
        _id: string;
    };
    room: string;
    amount: number;
    status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "REFUND_RAISED";
    transactionId: string;
    createdAt: string;
}
