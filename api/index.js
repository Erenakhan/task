const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user.js');

const port = 5000;
const app = express();
const corsOptions = {
  origin: ['http://127.0.0.1:5173','https://task-neon-two.vercel.app/'],
  credentials: true,
};

app.use(express.json())
app.use(cors(corsOptions));

const mongoUrl = 'mongodb+srv://erenakhan535:9oRAC497OhRGuAZo@cluster0.zoacsty.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUrl);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.post('/api/register', async (req, res) => {
  const { name, selectedOption, isChecked,userName } = req.body;
  try {
    const newUser = new User({
      name,
      userName,
      selectedOption,
      isChecked,
    });
    const userDoc = await newUser.save();
    res.status(201).json(userDoc);
  } catch (err) {
    res.status(500).json({ error: 'Error during registration' });
  }
});

app.put('/api/register', async (req, res) => {
  try { 
    const {selectedOption,userName } = req.body;
    const userDoc = await User.findOne({ userName: userName });
    // Check if the user document is found
    if (!userDoc) {
      return res.status(404).json({ error: 'User not found' });
    }
    userDoc.selectedOption = selectedOption;
    await userDoc.save();
    res.json({ message: 'User updated successfully', userDoc });
    res.status(200)
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Error during update' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
