import { NextResponse } from "next/server"
import connectDB from "@/config/db"
import Product from "@/models/Product"

export async function GET(request) {
    try {

        await connectDB()

        const products = await Product.find({})
        return NextResponse.json({ products, success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}