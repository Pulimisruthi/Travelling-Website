const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tourismAppDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ Connection error:', err));

// Define a sample schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Insert a test user (this creates the DB and collection if they don't exist)
User.create({ name: 'John Doe', email: 'john@example.com' })
  .then(() => console.log('User inserted'))
  .catch(err => console.error(err));
