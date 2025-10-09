import connectDB from "@/config/db"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        
        if (!userId) {
            return NextResponse.json({ error: "User not authenticated", success: false }, { status: 401 })
        }
        
        await connectDB()
        const { cartData } = await request.json()
        
        if (!cartData) {
            return NextResponse.json({ error: "Cart data is required", success: false }, { status: 400 })
        }
        
        const user = await User.findById(userId)
        
        if (!user) {
            return NextResponse.json({ error: "User not found", success: false }, { status: 404 })
        }

        user.cartItems = cartData
        await user.save()
        
        return NextResponse.json({ success: true, cartItems: user.cartItems })
    } catch (error) {
        console.error("Cart update error:", error)
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}