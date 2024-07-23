const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/lists');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://karan:Jarvis6@http-dog-app.hiz19ig.mongodb.net/?retryWrites=true&w=majority&appName=http-dog-appg', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', authRoutes);
app.use('/api/lists', listRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
