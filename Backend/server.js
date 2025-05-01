// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Use a fallback secret if process.env.JWT_SECRET is undefined
const JWT_SECRET = process.env.JWT_SECRET || "myFallbackSecretKey";

console.log("JWT_SECRET is set to:", JWT_SECRET); // Debug: Check that the secret is loaded

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/userProfiles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middlewares
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json());

// Define the user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: String,
  location: String,
  interests: [String],
  profilePic: String
});

const User = mongoose.model('User', userSchema);

// Signup Route – saving email in lowercase
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    const existing = await User.findOne({ email: lowerEmail });
    if (existing) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email: lowerEmail, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

// Login Route – now with extra debug logging
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();

  console.log("Login attempt for:", lowerEmail); // Debug log

  try {
    const user = await User.findOne({ email: lowerEmail });
    if (!user) {
      console.log("User not found for email:", lowerEmail);
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials for:", lowerEmail);
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log("Token generated for user:", user._id);
    res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

// Update Profile Route
app.put('/api/profile/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get User by ID Route
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
