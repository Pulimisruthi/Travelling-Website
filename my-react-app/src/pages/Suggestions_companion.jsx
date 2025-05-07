import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Suggestions_companion.css';

// Import images (replace with your actual images)
import friendsImage from '../assets/friends-travel.jpg';
import familyImage from '../assets/family-travel.jpg';
import soloImage from '../assets/solo-travel.jpg';
import coupleImage from '../assets/couple-travel.jpeg';
import groupImage from '../assets/group-travel.jpeg';
import businessImage from '../assets/business-travel.jpg'; 
import Navbar from '../components/NavBar';

const CompanionSuggestions = () => {
  const navigate = useNavigate();

  const companionTypes = [
    {
      id: 1,
      name: "With Friends",
      description: "Fun-filled adventures perfect for friend groups",
      image: friendsImage,
      destinations: ["Goa", "Rishikesh", "Manali", "Andaman"],
      activities: ["Party", "Adventure Sports", "Road Trips", "Camping"]
    },
    {
      id: 2,
      name: "With Family",
      description: "Comfortable and family-friendly destinations",
      image: familyImage,
      destinations: ["Munnar", "Ooty", "Jaipur", "Shimla"],
      activities: ["Theme Parks", "Mild Trekking", "Cultural Sites", "Beaches"]
    },
    {
      id: 3,
      name: "Solo Travel",
      description: "Safe and rewarding destinations for solo explorers",
      image: soloImage,
      destinations: ["Rishikesh", "Varanasi", "Pondicherry", "McLeod Ganj"],
      activities: ["Yoga Retreats", "Meditation", "Backpacking", "Local Experiences"]
    },
    {
      id: 4,
      name: "Romantic Getaways",
      description: "Perfect destinations for couples",
      image: coupleImage,
      destinations: ["Udaipur", "Alleppey", "Andaman", "Coorg"],
      activities: ["Candlelight Dinners", "Spa Retreats", "Private Beaches", "Boat Rides"]
    },
    {
      id: 5,
      name: "Group Tours",
      description: "Great for large groups and organized tours",
      image: groupImage,
      destinations: ["Rajasthan", "Kerala", "Himachal", "North East"],
      activities: ["Cultural Tours", "Photography", "Festivals", "Local Cuisine"]
    },
    {
      id: 6,
      name: "Business Travel",
      description: "Efficient destinations for work trips",
      image: businessImage,
      destinations: ["Bangalore", "Hyderabad", "Mumbai", "Delhi"],
      activities: ["Conferences", "Networking", "Co-working Spaces", "Quick Sightseeing"]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="companion-suggestions-page">
      <header className="suggestions-header">
        <h1>Travel Companion Suggestions</h1>
        <p>Find destinations perfect for your travel companions</p>
      </header>

      <div className="companion-grid">
        {companionTypes.map((companion, index) => (
          <div 
            key={companion.id} 
            className="companion-card"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${companion.image})`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="companion-content">
              <div className="companion-badge">
                <span>{companion.name}</span>
              </div>
              <p className="companion-description">{companion.description}</p>
              
              <div className="details-container">
                <div className="details-section">
                  <h4>Top Destinations</h4>
                  <ul>
                    {companion.destinations.map((dest, i) => (
                      <li key={i}>{dest}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="details-section">
                  <h4>Popular Activities</h4>
                  <ul>
                    {companion.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
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

export default CompanionSuggestions;