import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#',  // Optional, can be used to make the slide clickable
  },
}, { timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;
