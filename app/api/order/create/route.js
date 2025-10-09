import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/config/db"
import Product from "@/models/Product"
import { inngest } from "@/config/inngest"
import User from "@/models/User"

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        await connectDB()

        const { address, items } = await request.json()

        if (!address || !items || items.length === 0) {
            return NextResponse.json({ error: "Invalid order data", success: false }, { status: 400 })
        }

        // calculate amount using items
        let amount = 0
        for (const item of items) {
            const product = await Product.findById(item.product)
            if (product) {
                amount += product.offerPrice * item.quantity
            }
        }

        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                items,
                address,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()
            }
        })

        // clear user's cart
        const user = await User.findByIdAndUpdate(userId, { cartItems: {} })
        if (!user) {
            return NextResponse.json({ error: 'User not found', success: false }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: "Order placed successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}