import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Suggestions_destinations.css';

// Import images (replace with your actual images)
import mountainImage from '../assets/mountains.jpeg';
import desertImage from '../assets/desert.jpeg';
import beachImage from '../assets/beach.jpeg';
import heritageImage from '../assets/heritage.jpeg';
import wildlifeImage from '../assets/wildlife.jpeg';
import backwaterImage from '../assets/backwater.jpeg';
import Navbar from '../components/NavBar';

const Suggestions = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Mountain Trekking",
      description: "Explore breathtaking Himalayan trails and scenic mountain routes",
      image: mountainImage,
      destinations: ["Himalayas", "Western Ghats", "Nilgiri Hills", "Ladakh"]
    },
    {
      id: 2,
      name: "Desert Adventures",
      description: "Experience the golden sands and camel safaris",
      image: desertImage,
      destinations: ["Thar Desert", "Rann of Kutch", "Ladakh Desert"]
    },
    {
      id: 3,
      name: "Beach Getaways",
      description: "Relax on pristine sandy shores and tropical beaches",
      image: beachImage,
      destinations: ["Goa", "Andaman", "Kerala", "Puri"]
    },
    {
      id: 4,
      name: "Heritage Sites",
      description: "Discover ancient monuments and historical wonders",
      image: heritageImage,
      destinations: ["Taj Mahal", "Hampi", "Khajuraho", "Ajanta Ellora"]
    },
    {
      id: 5,
      name: "Wildlife Safaris",
      description: "Encounter exotic wildlife in natural habitats",
      image: wildlifeImage,
      destinations: ["Ranthambore", "Jim Corbett", "Kaziranga", "Bandhavgarh"]
    },
    {
      id: 6,
      name: "Backwater Retreats",
      description: "Cruise through serene lagoons and palm-fringed canals",
      image: backwaterImage,
      destinations: ["Alleppey", "Kumarakom", "Ashtamudi"]
    }
  ];

  return (
    <>
      <Navbar/>
      <div className="destination-suggestions-page">
      <header className="suggestions-header">
        <h1>Destination Suggestions</h1>
        <p>Find your perfect trip based on destination types</p>
      </header>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <div 
            key={category.id} 
            className="category-card"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${category.image})`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="category-content">
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <div className="destinations-list">
                {category.destinations.map((dest, i) => (
                  <span key={i} className="destination-tag">{dest}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="back-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Suggestions
        </button>
      </div>
    </div>
    </>
  );
};

export default Suggestions;