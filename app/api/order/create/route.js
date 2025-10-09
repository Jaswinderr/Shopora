import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/config/db"
import Order from "@/models/Order"
import Product from "@/models/Product"
import { inngest } from "@/config/inngest"

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const { address, items } = await request.json()

        if (!address || !items.length === 0) {
            return NextResponse.json({ error: "Invalid order data", success: false }, { status: 400 })
        }

        // calculate amount using items
        const amount = items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            return acc + product.offerPrice * item.quantity
        }, 0)

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
        const user = await User.findByIdAndUpdate(userId)
        user.cartItems = {}
        await user.save()

        return NextResponse.json({ success: true, message: "Order placed successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}