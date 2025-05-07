// Home.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShare, FaSearch } from 'react-icons/fa';
import './Home.css';
import Navbar from '../components/NavBar';
// Import local images
import tajMahalImage from '../assets/Tajmahal.jpg';
import jaipurImage from '../assets/Jaipur.jpg';
import keralaImage from '../assets/Keralabackwaters.jpg';
import goaImage from '../assets/Goa.jpg';
import hampiImage from '../assets/hampi.jpg';
import beach from '../assets/beach.jpeg';
import desert from '../assets/desert.jpeg';
import heritage from '../assets/heritage.jpeg';
import ladak from '../assets/ladak.jpeg';
import munnar_waterfall from '../assets/waterfall.jpeg';
import mysore from '../assets/mysore.jpeg';
import ooty from '../assets/ooty.jpeg';
import varanasi from '../assets/varanasi.jpeg';
import valley from '../assets/valley.jpeg'; 
import axios from 'axios';


function Home() {
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.location.href = `https://search.brave.com/search?q=${encodeURIComponent(searchQuery)}&source=desktop`;
    }
  };

  const carouselItems = [
    {
      id: 1,
      title: "Taj Mahal, Agra",
      description: "The iconic white marble mausoleum",
      image: tajMahalImage
    },
    {
      id: 2,
      title: "Pink City, Jaipur",
      description: "City of royal palaces and vibrant culture",
      image: jaipurImage
    },
    {
      id: 3,
      title: "Backwaters, Kerala",
      description: "Serene network of lagoons",
      image: keralaImage
    },
    {
      id: 4,
      title: "Beaches, Goa",
      description: "Paradise of beaches, parties and Portuguese charm",
      image: goaImage
    },
    {
      id: 5,
      title: "Hampi, Karnataka",
      description: "Ancient ruins and captivating temples",
      image: hampiImage
    }
  ];

  const popularDestinations = [
    {
      id: 1,
      name: "Baga Beach",
      location: "Bardez, North Goa",
      image: beach
    },
    {
      id: 2,
      name: "Thar desert",
      location: "Jaisalmer, Rajasthan",
      image: desert
    },
    {
      id: 3,
      name: "Varanasi",
      location: "Varanasi, Uttarpradesh",
      image: varanasi
    },
    {
      id: 4,
      name: "Ziro valley",
      location: "Subansiri , Arunachal Pradesh",
      image: valley
    },
    {
      id: 5,
      name: "Ooty",
      location: "Ooty ,Tamilnadu",
      image: ooty
    },
    {
      id: 6,
      name: "Meenakshi Temple",
      location: "Madhurai ,Tamilnadu",
      image: heritage
    },
    {
      id: 7,
      name: "Leh-Ladak",
      location: "Ladak, Jammu & Kashmir",
      image: ladak
    },
    {
      id: 8,
      name: "Munnar_waterfall",
      location: "Munnar, Kerala",
      image: munnar_waterfall
    },
    {
      id: 9,
      name: "Mysore Palace",
      location: "Mysore, Karnataka",
      image: mysore
    }
  ];

  const HeroCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    };

    const prevSlide = () => {
      setActiveIndex((prevIndex) =>
        (prevIndex - 1 + carouselItems.length) % carouselItems.length
      );
    };

    useEffect(() => {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, []);

    const handleExploreNow = (title) => {
      if (title.trim()) {
        window.location.href = `https://search.brave.com/search?q=${encodeURIComponent(title)}&source=desktop`;
      }
    };

    return (
      <section className="hero-carousel">
        <div
          className="carousel-wrapper"
          style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="carousel-item">
              <img src={item.image} alt={item.title} />
              <div className="carousel-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button
                  onClick={() => handleExploreNow(item.title)}
                  className="carousel-content-btn"
                >
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
        <button className="carousel-btn next" onClick={nextSlide}>›</button>
      </section>
    );
  };

 const DestinationCard = ({ destination, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Check if this destination is already in user's wishlist when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/wishlist/check?destinationId=${destination.id}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
          console.error('Error checking wishlist status:', error);
        }
      }
    };
    
    checkFavoriteStatus();
  }, [user, destination.id]);

  const toggleFavorite = async () => {
    if (!user) {
      alert('Please log in to add to your wishlist');
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`/api/wishlist/remove/${destination.id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
      } else {
        await axios.post('/api/wishlist/add', { destination }, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Visit ${destination.name}`,
          text: `Check out ${destination.name} in ${destination.location}`,
          url: window.location.href,
        });
      } else {
        setShowShareOptions(!showShareOptions);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShowShareOptions(false);
  };

  return (
    <div className="destination-card">
      <img src={destination.image} alt={destination.name} className="destination-image" />
      <div className="card-actions">
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
        </button>
        <div className="share-container">
          <button
            className="share-btn"
            onClick={handleShare}
            aria-label="Share this destination"
          >
            <FaShare />
          </button>
          {showShareOptions && (
            <div className="share-options">
              <button onClick={copyToClipboard}>Copy Link</button>
              <a
                href={`mailto:?subject=Check out ${destination.name}&body=Visit ${destination.name} in ${destination.location}: ${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            </div>
          )}
        </div>
      </div>
      <h3>{destination.name}</h3>
      <p>{destination.location}</p>
    </div>
  );
};

const PopularDestinations = ({ user }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleDestinations = showAll
    ? popularDestinations
    : popularDestinations.slice(0, 3);

  return (
    <section className="popular-section">
      <h2>Popular Destinations</h2>
      <div className="destination-grid">
        {visibleDestinations.map((destination) => (
          <DestinationCard 
            key={destination.id} 
            destination={destination} 
            user={user} 
          />
        ))}
      </div>
      {popularDestinations.length > 3 && (
        <button
          className="show-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'} ›
        </button>
      )}
    </section>
  );
};

  const TravelSuggestions = () => {
    return (
      <section className="suggestions-section" ref={suggestionsRef}>
        <div className="suggestions-card">
          <h2>Need Travel Suggestions?</h2>
          <p>Discover perfect destinations based on your preferences</p>
          <div className="suggestion-buttons">
            <button
              className="suggestion-btn destination-btn"
              onClick={() => navigate('/Suggestions_destinations')}
            >
              By Destination Type
            </button>
            <button
              className="suggestion-btn companion-btn"
              onClick={() => navigate('/Suggestions_companion')}
            >
              By Travel Companion
            </button>
          </div>
        </div>
      </section>
    );
  };

  const scrollToSuggestions = () => {
    suggestionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
       <Navbar/>
      <div className="home-page">
      <HeroCarousel />

      <section className="info-bar">
        <div className="info-card">
          <div className="search-section">
            <div className="heading">
            <h3>Plan Your Journey Across India</h3>
            <p className="subtitle">
              Search for your next destination and explore local weather and maps!
            </p>
            </div>
            <div className="search-group">
              <input
                type="text"
                placeholder="Search destinations..."
                className="search-input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button
                className="search-btn"
                onClick={() => {
                  if (searchQuery.trim()) {
                    window.location.href = `https://search.brave.com/search?q=${encodeURIComponent(searchQuery)}&source=desktop`;
                  }
                }}
              >
                <FaSearch />
              </button>
            </div>
            <div className="widget-buttons">
              
              <button className="widget-btn" onClick={() => navigate('/weather')}>
                <span className="widget-icon">☁️</span> Weather Forecast
              </button>
            </div>
          </div>
          <div className="extra-widgets">
            <div className="extra-widget">
              <div className="widget-icon">🧮</div>
              <div>
                <h4>Travel Cost Calculator</h4>
                <p>Estimate your travel expenses instantly</p>
              </div>
              <button className="action-button" onClick={() => navigate('/Calculator')}>
                Calculator
              </button>
            </div>
            <div className="extra-widget">
              <div className="widget-icon">🤖</div>
              <div>
                <h4>AI Destination Suggestion</h4>
                <p>Let AI pick your next adventure!</p>
              </div>
              <button className="action-button" onClick={scrollToSuggestions}>
                Suggestions
              </button>
            </div>
          </div>
        </div>
      </section>

      <PopularDestinations />

      <TravelSuggestions />
    </div>
    </>
    
  );
}

export default Home;
