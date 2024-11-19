// frontend/components/SiteSettings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SiteManagementPanel from './SiteManagementPanel';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    layout: 'grid',
    language: 'English',
    animations: true,
  });

  const [message, setMessage] = useState('');

  // Fetch current settings from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/settings')
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching settings:', error);
      });
  }, []);

  // Update settings locally and on the backend
  const updateSetting = (key, value) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);

    axios.post('http://localhost:5000/api/settings', updatedSettings)
      .then(() => {
        setMessage('Settings updated successfully!');
      })
      .catch((error) => {
        setMessage('Error updating settings.');
        console.error('Error:', error);
      });
  };

  return (
    <>
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Site Settings</h2>

      {/* Theme Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Theme</label>
        <select
          value={settings.theme}
          onChange={(e) => updateSetting('theme', e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>

      {/* Font Size Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Font Size</label>
        <select
          value={settings.fontSize}
          onChange={(e) => updateSetting('fontSize', e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Layout Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Layout</label>
        <select
          value={settings.layout}
          onChange={(e) => updateSetting('layout', e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>

      {/* Language Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Language</label>
        <select
          value={settings.language}
          onChange={(e) => updateSetting('language', e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      {/* Animations Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Enable Animations</label>
        <input
          type="checkbox"
          checked={settings.animations}
          onChange={(e) => updateSetting('animations', e.target.checked)}
          className="mt-2"
        />
      </div>

      {/* Update Message */}
      {message && <p className="text-sm text-green-600">{message}</p>}
    </div>
    <SiteManagementPanel/>
    </>
  );
};

export default SiteSettings;
