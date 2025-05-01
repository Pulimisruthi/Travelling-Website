import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

//import MapView from './../pages/Mapview';
import './Destinations.css';

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const searchQuery = searchParams.get('search') || '';
        const response = await fetch('/api/destinations?search=${searchQuery}');
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [searchParams]);

  return (
    <div className="destinations-page">
      <h1>Explore Indian Destinations</h1>
      <div className="destinations-container">
        <div className="destinations-list">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            destinations.map(destination => (
              <DestinationCard key={destination._id} destination={destination} />
            ))
          )}
        </div>
        <div className="map-container">
          <MapView destinations={destinations} />
        </div>
      </div>
    </div>
  );
};

export default Destinations;