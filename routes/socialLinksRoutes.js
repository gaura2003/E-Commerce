// routes/socialLinksRoutes.js
import express from 'express';
const router = express.Router();

let socialLinks = {
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
};

// Get social links
router.get('/', (req, res) => res.json(socialLinks));

// Update social links
router.post('/', (req, res) => {
  socialLinks = { ...socialLinks, ...req.body };
  res.json({ message: 'Social links updated successfully!' });
});

export default router;
