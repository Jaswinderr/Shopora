import connectDB from "@/config/db"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        
        if (!userId) {
            return NextResponse.json({ error: "User not authenticated", success: false }, { status: 401 })
        }

        await connectDB()
        const user = await User.findById(userId)
        
        if (!user) {
            return NextResponse.json({ error: "User not found", success: false }, { status: 404 })
        }

        const { cartItems } = user

        return NextResponse.json({ success: true, cartItems })

    } catch (error) {
        console.error("Cart get error:", error)
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}