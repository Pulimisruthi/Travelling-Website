import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import Navbar from '../components/NavBar';

const stateExperts = {
  'Kerala': {
    name: 'Kerala Guide',
    avatar: '🌴',
    specialty: 'Backwaters & Nature',
    places: {
      'Alleppey': 'Houseboat stays, Kumarakom Bird Sanctuary',
      'Munnar': 'Tea Gardens, Eravikulam National Park',
      'Kochi': 'Fort Kochi, Chinese fishing nets',
      'Wayanad': 'Edakkal Caves, Banasura Sagar Dam'
    },
    responses: {
      'hello': 'Namaskaram! How can I help you explore Kerala?',
      'hi': 'Vanakkam! What would you like to know about Kerala?',
      'best time': 'Best seasons:\n• September-March (pleasant)\n• June-August (monsoon for Ayurveda)',
      'hotels': 'Recommended stays:\n• Alleppey: Punnamada Resort\n• Munnar: Tea Valley\n• Kochi: Brunton Boatyard',
      'food': 'Must-try:\n• Sadhya (banana leaf meal)\n• Karimeen curry\n• Appam with stew',
      'default': 'More tips:\n• Pack light cotton clothes\n• Book houseboats early\n• Try Ayurvedic massage'
    }
  },
  'Tamil Nadu': {
    name: 'Tamil Guide',
    avatar: '🛕',
    specialty: 'Temples & Heritage',
    places: {
      'Chennai': 'Kapaleeshwarar Temple, Marina Beach',
      'Madurai': 'Meenakshi Temple, Thirumalai Nayak Palace',
      'Ooty': 'Botanical Gardens, Nilgiri Mountain Railway',
      'Mahabalipuram': 'Shore Temple, Five Rathas'
    },
    responses: {
      'hello': 'Vanakkam! How can I assist with your Tamil Nadu trip?',
      'hi': 'Welcome! What would you like to know about Tamil Nadu?',
      'best time': 'Best seasons:\n• October-March (pleasant)\n• Avoid April-June (hot & humid)',
      'hotels': 'Recommended stays:\n• Chennai: Taj Coromandel\n• Madurai: Heritage Madurai\n• Ooty: Savoy Hotel',
      'food': 'Must-try:\n• Dosa\n• Chettinad cuisine\n• Filter coffee',
      'default': 'More tips:\n• Dress modestly for temples\n• Bargain in silk shops\n• Try classical dance shows'
    }
  },
  'Karnataka': {
    name: 'Kannada Guide',
    avatar: '🏞️',
    specialty: 'Heritage & Nature',
    places: {
      'Bangalore': 'Lalbagh Garden, Vidhana Soudha',
      'Mysore': 'Mysore Palace, Chamundi Hills',
      'Hampi': 'Virupaksha Temple, Stone Chariot',
      'Coorg': 'Coffee Plantations, Abbey Falls'
    },
    responses: {
      'hello': 'Namaskara! How can I help with your Karnataka trip?',
      'hi': 'Welcome! What would you like to know about Karnataka?',
      'best time': 'Best seasons:\n• October-February (pleasant)\n• Avoid March-May (hot)',
      'hotels': 'Recommended stays:\n• Bangalore: Taj West End\n• Mysore: Grand Mercure\n• Coorg: Tamara',
      'food': 'Must-try:\n• Bisi Bele Bath\n• Mysore Masala Dosa\n• Coorg Pandi Curry',
      'default': 'More tips:\n• Carry water during temple visits\n• Book jungle lodges early\n• Try local coffee'
    }
  },
  'Andhra Pradesh': {
    name: 'Telugu Guide',
    avatar: '🌶️',
    specialty: 'Spicy Cuisine & Temples',
    places: {
      'Visakhapatnam': 'RK Beach, Araku Valley',
      'Tirupati': 'Venkateswara Temple, Silathoranam',
      'Amaravati': 'Buddhist sites, Undavalli Caves',
      'Lepakshi': 'Veerabhadra Temple, Hanging Pillar'
    },
    responses: {
      'hello': 'Namaskaram! How can I help with your Andhra trip?',
      'hi': 'Welcome! What would you like to know about Andhra Pradesh?',
      'best time': 'Best seasons:\n• November-February (pleasant)\n• Avoid April-June (hot)',
      'hotels': 'Recommended stays:\n• Vizag: Taj Gateway\n• Tirupati: Fortune Select\n• Amaravati: Haritha Resort',
      'food': 'Must-try:\n• Andhra Thali\n• Gongura Pickle\n• Pesarattu',
      'default': 'More tips:\n• Carry cotton clothes\n• Book temple darshan online\n• Try spicy pickles'
    }
  },
  'Telangana': {
    name: 'Hyderabadi Guide',
    avatar: '👑',
    specialty: 'Nizami Culture',
    places: {
      'Hyderabad': 'Charminar, Golconda Fort',
      'Warangal': 'Thousand Pillar Temple, Warangal Fort',
      'Nagarkurnool': 'Mallela Theertham, Srisailam',
      'Adilabad': 'Kuntala Waterfalls, Kawal Wildlife Sanctuary'
    },
    responses: {
      'hello': 'Adaab! How can I help with your Telangana trip?',
      'hi': 'Welcome! What would you like to know about Telangana?',
      'best time': 'Best seasons:\n• October-February (pleasant)\n• Avoid March-June (hot)',
      'hotels': 'Recommended stays:\n• Hyderabad: Taj Falaknuma\n• Warangal: Haritha Kakatiya\n• Nagarkurnool: Jungle resorts',
      'food': 'Must-try:\n• Hyderabadi Biryani\n• Haleem\n• Irani Chai',
      'default': 'More tips:\n• Visit early to avoid crowds\n• Try pearl shopping\n• Carry water in summer'
    }
  }
};

const ChatSpace = () => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize first state
  useEffect(() => {
    if (Object.keys(stateExperts).length > 0 && !activeState) {
      const firstState = Object.keys(stateExperts)[0];
      handleStateSelect(firstState);
    }
  }, []);

  const handleStateSelect = (state) => {
    if (!messages[state]) {
      const expert = stateExperts[state];
      setMessages(prev => ({
        ...prev,
        [state]: [
          {
            id: 1,
            sender: expert.name,
            text: `Famous places in ${state}:\n${Object.entries(expert.places).map(([place, desc]) => `• ${place}: ${desc}`).join('\n')}`,
            time: getTime()
          }
        ]
      }));
    }
    setActiveState(state);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeState) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'You',
      text: inputMessage,
      time: getTime()
    };
    setMessages(prev => ({
      ...prev,
      [activeState]: [...prev[activeState], userMsg]
    }));
    setInputMessage('');

    // Bot response
    setTimeout(() => {
      const expert = stateExperts[activeState];
      const botResponse = generateResponse(activeState, inputMessage);
      setMessages(prev => ({
        ...prev,
        [activeState]: [...prev[activeState], {
          id: Date.now() + 1,
          sender: expert.name,
          text: botResponse,
          time: getTime()
        }]
      }));
    }, 800);
  };

  const generateResponse = (state, message) => {
    const expert = stateExperts[state];
    const lowerMsg = message.toLowerCase();

    // Check greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return expert.responses['hello'];
    }

    // Check for place queries
    for (const place of Object.keys(expert.places)) {
      if (lowerMsg.includes(place.toLowerCase())) {
        return `About ${place}:\n${expert.places[place]}\n\n${expert.responses.default}`;
      }
    }

    // Check common questions
    const commonQuestions = {
      'best time': expert.responses['best time'],
      'hotel': expert.responses['hotels'],
      'stay': expert.responses['hotels'],
      'food': expert.responses['food'],
      'default': expert.responses['default']
    };

    for (const [keyword, response] of Object.entries(commonQuestions)) {
      if (lowerMsg.includes(keyword)) {
        return response;
      }
    }

    return expert.responses['default'];
  };

  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">
      {/* States Sidebar */}
      <div className="states-sidebar">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h3>South India Travel Experts</h3>
        {Object.keys(stateExperts).map(state => (
          <div 
            key={state}
            className={`state-card ${activeState === state ? 'active' : ''}`}
            onClick={() => handleStateSelect(state)}
          >
            <div className="state-avatar">{stateExperts[state].avatar}</div>
            <div className="state-info">
              <h4>{state}</h4>
              <p>{stateExperts[state].specialty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {/* State Header */}
        {activeState && (
          <div className="state-header">
            <h2>{activeState}</h2>
            <p>{stateExperts[activeState].specialty}</p>
          </div>
        )}

        {/* Messages */}
        {activeState && messages[activeState] && (
          <div className="messages-container">
            {messages[activeState].map(msg => (
              <div 
                key={msg.id} 
                className={`message ${msg.sender === 'You' ? 'user' : 'guide'}`}
              >
                <div className="message-content">
                  {msg.sender !== 'You' && (
                    <div className="guide-header">
                      <span className="avatar">{stateExperts[activeState].avatar}</span>
                      <span className="name">{msg.sender}</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  <span className="time">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        {activeState && (
          <form className="input-area" onSubmit={handleSend}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask about ${activeState}...`}
            />
            <button type="submit">
              <svg viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default ChatSpace;