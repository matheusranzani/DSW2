const mongoose = require('mongoose');

const catImageSchema = new mongoose.Schema({
  generationDate: {
    type: String,
    default: (Date.now).toString()
  },
  imageUrl: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  catImages: [catImageSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
