const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The title is required.']
  },
  description: {
    type: String,
    required: [true, 'The description is required.']
  },
  image: {
    type: String,
    required: [true, 'The image is required.']
  },
  address: {
    type: String,
    required: [true, 'The address is required.']
  },
  location: {
    lat: { type: Number, required: [true, 'The latitude is required.'] },
    lng: { type: Number, required: [true, 'The longitude is required.'] }
  },
  creator: {
    type: String,
    required: [true, 'The creator is required.']
  }
})

const Place = mongoose.model('placeSchema', placeSchema)

module.exports = Place
