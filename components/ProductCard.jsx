'use client'
import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, router } = useAppContext();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product._id);
  };

  const handleProductClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        {product.offerPrice < product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-orange-600">
              ${product.offerPrice}
            </span>
            {product.offerPrice < product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
