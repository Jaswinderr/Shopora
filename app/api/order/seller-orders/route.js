import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/config/db"
import Order from "@/models/Order"
import Product from "@/models/Product"
import Address from "@/models/Address"
import authSeller from "@/lib/authSeller"   

export async function GET(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ error: "You are not authorized to access this resource", success: false }, { status: 401 })
        }

        await connectDB()

        Address.length

        const orders = await Order.find({}).populate("address items.product")
        return NextResponse.json({ success: true, orders })

    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}