import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        setWishlist(response.data.destinations || []);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (user) fetchWishlist();
  }, [user]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item._id !== id));
  };

  return (
    <div>
      <h2>Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((destination) => (
          <div key={destination.id} className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <h3>{destination.name}</h3>
            <p>{destination.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;