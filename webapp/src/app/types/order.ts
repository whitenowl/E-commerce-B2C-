import { CartItem } from "./cartitem"

export interface Order{
    _id?:string,
    items:CartItem[],
    paymentType:string,
    address:any,
    date: Date,
    status?:string
}