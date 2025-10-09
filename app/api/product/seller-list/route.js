import authSeller from "@/lib/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/config/db"
import Product from "@/models/Product"

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)
        if (!isSeller) {
            return NextResponse.json({ error: "You are not authorized to access this resource", success: false }, { status: 401 })
        }
        await connectDB()
        const products = await Product.find({})
        return NextResponse.json({ products, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}