const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    pages: {
      type: Number,
      required: true,
      default: 0
    },
    entryText: {
      type: String,
      default: ''
    },
    rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    }
  },
  { versionKey: false }
)

const Entry = mongoose.model('Entry', EntrySchema, 'journalEntries')

module.exports = Entry
