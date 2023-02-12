const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      validate: [
        (username) => username.length >= 4,
        'Username must have at least 4 characters'
      ]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/,
        'Please enter a valid email address'
      ]
    },
    address: {
      street: {
        type: String,
        required: true
      },
      suite: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true,
        match: [
          /^[a-zA-Z\s]+$/,
          'Please enter a valid city name with only alphabets and spaces'
        ]
      },
      zipcode: {
        type: String,
        required: true,
        match: [
          /^\d{5}-\d{4}$/,
          'Zip code must be in the format of 12345-1234 (DDDDD-DDDD, D = digit)'
        ]
      },
      geo: {
        lat: {
          type: String,
          required: true
        },
        lng: {
          type: String,
          required: true
        }
      }
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^1-\d{3}-\d{3}-\d{4}$/,
        'Phone must be in the format of 1-123-123-1234 (D-DDD-DDD-DDD, D = digit)'
      ]
    },
    website: {
      type: String,
      required: true,
      match: [
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        'Please enter a valid web URL address (http or https is valid)'
      ]
    },
    company: {
      name: {
        type: String,
        required: true
      },
      catchPhrase: {
        type: String,
        required: true
      },
      bs: {
        type: String,
        required: true
      }
    }
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;