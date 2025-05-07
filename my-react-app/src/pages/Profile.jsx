import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Navbar from '../components/NavBar';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({});
  const [newInterest, setNewInterest] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?._id) {
      fetch(`http://localhost:5000/api/user/${storedUser._id}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setTempUser(data);
        })
        .catch(err => console.error('Failed to fetch user', err));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempUser({ ...tempUser, profilePic: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !tempUser.interests?.includes(newInterest.trim())) {
      setTempUser({
        ...tempUser,
        interests: [...(tempUser.interests || []), newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setTempUser({
      ...tempUser,
      interests: tempUser.interests?.filter(item => item !== interest)
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempUser)
      });

      const updated = await res.json();
      setUser(updated);
      setTempUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    }
  };

  const handleCancel = () => {
    setTempUser(user);
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return <div className="profile-loading">Loading profile...</div>;

  return (
    <>
      <Navbar/>
      <div className="profile-container">
      <div className="profile-card">
        {/* Left Column */}
        <div className="profile-left">
          <div className="profile-pic-container">
            <img
              src={editMode ? tempUser.profilePic || '/default-profile.png' : user.profilePic || '/default-profile.png'}
              alt="Profile"
              className="profile-pic"
              onClick={() => editMode && fileInputRef.current.click()}
            />
            {editMode && (
              <div
                className="profile-pic-edit"
                onClick={() => fileInputRef.current.click()}
              >
                Edit
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div className="profile-interests">
            <h3>Interests</h3>
            <div className="interests-list">
              {(editMode ? tempUser.interests || [] : user.interests || []).map((interest, index) => (
                <div key={index} className="interest-tag">
                  {interest}
                  {editMode && (
                    <button
                      onClick={() => removeInterest(interest)}
                      className="remove-interest"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {editMode && (
              <div className="add-interest">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add interest"
                />
                <button onClick={addInterest}>+</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right">
          <div className="profile-header">
            <h2>{user.name}</h2>
            {!editMode ? (
              <div className="profile-actions">
                <button className="edit-btn" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="profile-edit-actions">
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button className="save-btn" onClick={handleSave}>Save Changes</button>
              </div>
            )}
          </div>

          <div className="profile-details">
            {editMode ? (
              <form className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={tempUser.name || ''}
                    onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={tempUser.email || ''}
                    onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={tempUser.location || ''}
                    onChange={(e) => setTempUser({ ...tempUser, location: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={tempUser.bio || ''}
                    onChange={(e) => setTempUser({ ...tempUser, bio: e.target.value })}
                    rows="4"
                  />
                </div>
              </form>
            ) : (
              <>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{user.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bio:</span>
                  <p className="detail-value">{user.bio}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;     