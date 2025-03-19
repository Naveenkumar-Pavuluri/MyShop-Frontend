import { Cart } from "./cart"

export interface Order {
    _id?:String,
    items: Cart[],
    paymentType: String,
    address: any,
    date: Date,
    totalAmount: number,
    status?: String
}