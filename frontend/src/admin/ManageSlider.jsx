import React, { useState } from 'react';
import axios from 'axios';

const AdminSlider = () => {
  const [caption, setCaption] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
    formData.append('link', link);

    try {
      await axios.post('/api/slider', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Slide added successfully');
    } catch (error) {
      console.error('Error uploading slide', error);
      alert('Error uploading slide');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Add New Slide</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="p-2 w-full border rounded"
            placeholder="Enter slide caption"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Link (optional)</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="p-2 w-full border rounded"
            placeholder="Enter link"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 w-full border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Add Slide
        </button>
      </form>
    </div>
  );
};

export default AdminSlider;
