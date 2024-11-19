// routes/settingsRoutes.js
import express from 'express';
const router = express.Router();

// Mock database for storing settings
let userSettings = {
  theme: 'light',
  fontSize: 'medium',
  layout: 'grid',
  language: 'English',
  animations: true,
};

// Get user settings
router.get('/', (req, res) => {
  res.json(userSettings);
});

// Update user settings
router.post('/', (req, res) => {
  const settings = req.body;
  userSettings = { ...userSettings, ...settings }; // Update settings
  res.status(200).json(userSettings);
});

export default router;
