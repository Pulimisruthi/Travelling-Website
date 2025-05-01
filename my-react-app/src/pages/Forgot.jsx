import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import './Forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-background">
        {/* Same background animation as login */}
        <div className="bg-image bg-1"></div>
        <div className="bg-image bg-2"></div>
        <div className="bg-image bg-3"></div>
      </div>
      
      <div className="forgot-card">
        <Link to="/login" className="back-button">
          <FaArrowLeft /> Back to Login
        </Link>

        <div className="forgot-header">
          <h1>Reset Password</h1>
          <p>
            {isSubmitted 
              ? "We've sent a reset link to your email" 
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
              />
              <span className="input-border"></span>
            </div>

            <button 
              type="submit" 
              className="reset-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>Check your inbox for instructions to reset your password</p>
            <p className="resend-text">
              Didn't receive email? <button className="resend-link">Resend</button>
            </p>
          </div>
        )}

        <div className="support-text">
          Need help? <Link to="/contact">Contact support</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;