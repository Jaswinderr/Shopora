import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/config/db"
import Order from "@/models/Order"
import Product from "@/models/Product"
import Address from "@/models/Address"

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", success: false }, { status: 401 })
        }
        
        await connectDB()

        const orders = await Order.find({ userId }).populate("address").populate({
            path: "items.product",
            model: "Product"
        })
        return NextResponse.json({ success: true, orders })
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}