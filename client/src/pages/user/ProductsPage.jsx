import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getallProduct`);
        setProducts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-gray-50 p-4">
      {products.map((card) => (
        <div 
          key={card._id} 
          className="card bg-base-100 w-80 shadow-xl cursor-pointer" 
          onClick={() => handleProductClick(card._id)}
        >
          <figure>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${card.images[0].replace('\\', '/')}`}
              alt={card.name}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body bg-gray-50 text-black">
            <h2 className="card-title">
              {card.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{card.description}</p>
            <p className="text-lg font-semibold">₹{card.price}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{card.category}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;