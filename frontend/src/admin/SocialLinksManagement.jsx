// frontend/components/SocialLinksManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialLinksManagement = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });

  useEffect(() => {
    // Fetch existing social links from the backend
    axios.get('http://localhost:5000/api/social-links')
      .then((res) => setSocialLinks(res.data))
      .catch((err) => console.error('Error fetching social links:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/social-links', socialLinks)
      .then((res) => alert(res.data.message))
      .catch((err) => console.error('Error updating social links:', err));
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Social Links</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(socialLinks).map((platform) => (
          <div key={platform} className="flex items-center space-x-4">
            <label htmlFor={platform} className="w-24 capitalize">{platform}:</label>
            <input
              id={platform}
              type="text"
              name={platform}
              value={socialLinks[platform]}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
              placeholder={`Enter ${platform} URL`}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SocialLinksManagement;
