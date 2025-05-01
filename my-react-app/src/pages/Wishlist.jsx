import React, { useState, useEffect } from 'react';

import './Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading wishlist data
    const fetchWishlist = async () => {
      try {
        // In a real app, you would fetch from your API
        const mockWishlist = [
          {
            _id: '1',
            name: 'Taj Mahal',
            location: { city: 'Agra', state: 'Uttar Pradesh' },
            images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523'],
            rating: 4.8
          },
          {
            _id: '2',
            name: 'Goa Beaches',
            location: { city: 'Goa', state: 'Goa' },
            images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'],
            rating: 4.5
          }
        ];
        setWishlist(mockWishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item._id !== id));
  };

  return (
    <div className="wishlist-page">
      <h1>Your Travel Wishlist</h1>
      {loading ? (
        <div className="loading">Loading your wishlist...</div>
      ) : wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <button className="explore-btn">Explore Destinations</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(destination => (
            <div key={destination._id} className="wishlist-item">
              <DestinationCard destination={destination} />
              <button
                onClick={() => removeFromWishlist(destination._id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;