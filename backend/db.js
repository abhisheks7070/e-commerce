const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sabhishek7070:Ttorres9@cluster0.3githov.mongodb.net/Myshopee');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const User = mongoose.model('User', userSchema);

module.exports = {User}