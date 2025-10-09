// Assets and dummy data for the application

// Dummy product data
export const productsDummyData = [
  {
    _id: "1",
    name: "Apple AirPods Pro",
    description: "Active noise cancellation for immersive sound",
    price: 249.99,
    offerPrice: 199.99,
    image: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500"
    ],
    category: "Electronics",
    stock: 50
  },
  {
    _id: "2", 
    name: "Samsung Galaxy Watch",
    description: "Smart watch with health monitoring",
    price: 299.99,
    offerPrice: 249.99,
    image: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    category: "Electronics",
    stock: 30
  },
  {
    _id: "3",
    name: "Nike Air Max",
    description: "Comfortable running shoes",
    price: 129.99,
    offerPrice: 99.99,
    image: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    category: "Fashion",
    stock: 25
  }
];

// Dummy user data
export const userDummyData = {
  _id: "user1",
  name: "John Doe",
  email: "john@example.com",
  role: "customer",
  cartItems: {}
};

// Asset icons (using placeholder URLs - you can replace with actual icons)
export const assets = {
  increase_arrow: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png",
  decrease_arrow: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png", 
  arrow_right_icon_colored: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png",
  redirect_icon: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png",
  box_icon: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png",
  logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
  search_icon: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png",
  user_icon: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
};

// Icon components for Clerk UserButton
export const HomeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
  </svg>
);

export const BoxIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
  </svg>
);

export const CartIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
  </svg>
);

export const BagIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
  </svg>
);

// Dummy order data
export const orderDummyData = [
  {
    _id: "order1",
    items: [
      {
        product: {
          name: "Apple AirPods Pro"
        },
        quantity: 2
      }
    ],
    address: {
      fullName: "John Doe",
      area: "123 Main St",
      city: "New York",
      state: "NY",
      phoneNumber: "+1234567890"
    },
    amount: 399.98,
    date: new Date().toISOString()
  }
];
