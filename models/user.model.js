const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    nick: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      reqired: true,
      trim: true
    }
  },
  { versionKey: false }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
