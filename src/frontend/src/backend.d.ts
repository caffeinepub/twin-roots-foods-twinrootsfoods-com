import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ExportInquiry {
    estimatedQuantity: string;
    contactPerson: string;
    submittedAt: Time;
    email: string;
    message: string;
    companyName: string;
    phone: string;
    destinationCountry: string;
    productsOfInterest: Array<string>;
    inquiryId: bigint;
}
export type Time = bigint;
export interface Order {
    customerName: string;
    status: OrderStatus;
    createdAt: Time;
    orderId: bigint;
    shippingAddress: string;
    items: Array<OrderItem>;
    totalPrice: bigint;
    contactDetails: string;
}
export interface Product {
    processPicture?: string;
    name: string;
    description: string;
    available: boolean;
    category: string;
    price?: bigint;
}
export interface OrderItem {
    name: string;
    productId: bigint;
    quantity: bigint;
    unitPrice?: bigint;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    processed = "processed"
}
export interface backendInterface {
    createInitialCatalog(): Promise<void>;
    getAllExportInquiries(): Promise<Array<ExportInquiry>>;
    getAllOrders(): Promise<Array<Order>>;
    getAvailableProducts(): Promise<Array<Product>>;
    getExportInquiryById(inquiryId: bigint): Promise<ExportInquiry>;
    getOrderById(orderId: bigint): Promise<Order>;
    getProductCategories(): Promise<Array<string>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    placeOrder(customerName: string, contactDetails: string, shippingAddress: string, items: Array<OrderItem>): Promise<bigint>;
    submitExportInquiry(companyName: string, contactPerson: string, email: string, phone: string, destinationCountry: string, productsOfInterest: Array<string>, estimatedQuantity: string, message: string): Promise<bigint>;
}
