import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import connectDB from "@/config/db";

// config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)
        if (!isSeller) {
            return NextResponse.json({ message: "You are not authorized to add a product", success: false }, { status: 401 })
        }

        const formData = await request.formData()
        const name = formData.get("name")
        const description = formData.get("description")
        const price = formData.get("price")
        const offerPrice = formData.get("offerPrice")
        const category = formData.get("category")
        const files = formData.getAll("images")

        if (!files || !files.length === 0) {
            return NextResponse.json({ message: "No files uploaded", success: false }, { status: 400 })
        }

        const result = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "auto" },
                        (error, result) => {
                            if (error) reject(error)
                            resolve(result)
                        }
                    )
                    stream.end(buffer)
                })
            }))

        const image = result.map(result => result.secure_url)
        await connectDB()
        const newProduct = await Product.create({
            userId,
            name,
            description,
            price: Number(price),
            offerPrice: Number(offerPrice),
            category,
            image,
            date: Date.now()
        })

        return NextResponse.json({ message: "Product added successfully", success: true, newProduct }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}   