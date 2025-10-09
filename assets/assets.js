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
  arrow_right_icon_colored: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
};
