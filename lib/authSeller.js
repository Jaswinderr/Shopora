import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function authSeller() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    // Get user data to check if they are a seller
    const user = await fetch(`${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`
      }
    });

    if (!user.ok) {
      return NextResponse.json(
        { success: false, message: 'Failed to verify user' },
        { status: 401 }
      );
    }

    const userData = await user.json();
    
    // Check if user has seller role
    if (userData.publicMetadata?.role !== 'seller') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Seller role required.' },
        { status: 403 }
      );
    }

    return {
      success: true,
      userId,
      userData
    };
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function getSellerId() {
  const authResult = await authSeller();
  if (!authResult.success) {
    return null;
  }
  return authResult.userId;
}

// Default export for backward compatibility
export default authSeller;
