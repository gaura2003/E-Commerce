// routes/siteContentRoutes.js
import express from 'express';
const router = express.Router();

let siteContent = {
  privacyPolicy: '',
  aboutUs: '',
};

// Get site content
router.get('/', (req, res) => res.json(siteContent));

// Update privacy policy
router.post('/privacy-policy', (req, res) => {
  siteContent.privacyPolicy = req.body.privacyPolicy;
  res.json({ message: 'Privacy Policy updated successfully!' });
});

// Update About Us
router.post('/about-us', (req, res) => {
  siteContent.aboutUs = req.body.aboutUs;
  res.json({ message: 'About Us updated successfully!' });
});

export default router;
