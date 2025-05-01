import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Destinations from './pages/Destinations';
import Weather from './pages/Weather';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import './App.css';
import Forgot from './pages/Forgot';
import Signin from './pages/Signin';
import Layout from './Layout';
import Scrolltotop from './Scrolltotop';
import Navbar from './components/NavBar';
import Mapview from './pages/Mapview';
import Calculator from './pages/Calculator';
import Suggestions_destinations from './pages/Suggestions_destinations';
import Suggestions_companion from './pages/Suggestions_companion';



function App() {
  return (
    <Router>
      <Scrolltotop />
      <div className="app">
        <Navbar />
        <Layout>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/Forgot" element={<Forgot/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Mapview" element={<Mapview/>}/> 
          <Route path="/Calculator" element={<Calculator/>}/>
          <Route path="/Suggestions_destinations" element={<Suggestions_destinations/>}/>
          <Route path="/Suggestions_companion" element={<Suggestions_companion/>}/>
         </Routes>
        </Layout>
      </div>
    </Router>
  );
}
export default App;

