// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import Slider from '../models/Slider.js';

// const router = express.Router();

// // Set up multer for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = './uploads/slider/';
//     // Ensure the folder exists
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));  // Naming uploaded files
//   },
// });

// const upload = multer({ storage: storage });

// // Route to get all slides
// router.get('/', async (req, res) => {
//   try {
//     const slides = await Slider.find();
//     if (!slides) {
//       return res.status(404).json({ message: 'No slides found' });
//     }
//     res.json(slides);
//   } catch (error) {
//     console.error('Error fetching slider data:', error);
//     res.status(500).send('Server Error');
//   }
// });

// // Route for admin to add a new slide
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const { caption, link } = req.body;

//     // Check if image is provided
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image is required' });
//     }

//     const imageUrl = `/uploads/slider/${req.file.filename}`;

//     const newSlide = new Slider({
//       imageUrl,
//       caption,
//       link,
//     });

//     await newSlide.save();
//     res.status(201).send('Slide added successfully');
//   } catch (error) {
//     console.error('Error adding slide:', error);
//     res.status(500).send('Server Error');
//   }
// });

// // Route to delete a slide
// router.delete('/:id', async (req, res) => {
//   try {
//     const slide = await Slider.findByIdAndDelete(req.params.id);
//     if (!slide) {
//       return res.status(404).json({ message: 'Slide not found' });
//     }
//     res.status(200).send('Slide deleted');
//   } catch (error) {
//     console.error('Error deleting slide:', error);
//     res.status(500).send('Server Error');
//   }
// });

// export default router;

import express from 'express';
import multer from 'multer';
import Slider from '../models/Slider.js'; // Adjust the import if necessary

const router = express.Router();

// Set up multer for handling image uploads (if needed)
const upload = multer({ dest: 'uploads/' });

// POST route to add a new slider
router.post('/slider', upload.single('imageUrl'), async (req, res) => {
  const { caption, link } = req.body;
  const imageUrl = req.file ? req.file.path : req.body.imageUrl;

  if (!caption || !link || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newSlider = new Slider({ caption, link, imageUrl });
    await newSlider.save();
    res.status(201).json(newSlider);
  } catch (err) {
    res.status(500).json({ message: 'Error saving slider', error: err.message });
  }
});

// DELETE route to remove a slider
router.delete('/slider/:id', async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Slider deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting slider', error: err.message });
  }
});

export default router;
