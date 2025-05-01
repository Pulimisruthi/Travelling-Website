// LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Normalize email on the client side as well
        body: JSON.stringify({ email: formData.email.toLowerCase(), password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login successful');
        navigate('/profile');
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Server error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-background">
        <div className="bg-image bg-1"></div>
        <div className="bg-image bg-2"></div>
        <div className="bg-image bg-3"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Discover incredible India with your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
            <span className="input-border"></span>
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <span className="input-border"></span>
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Login'}
          </button>

          <div className="divider"><span>or continue with</span></div>

          <div className="social-login">
            <button type="button" className="social-btn google">
              <FaGoogle className="social-icon" /> Google
            </button>
            <button type="button" className="social-btn facebook">
              <FaFacebook className="social-icon" /> Facebook
            </button>
          </div>

          <div className="signup-link">
            Don't have an account? <Link to="/Signin">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
