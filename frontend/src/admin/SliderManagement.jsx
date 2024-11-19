// // frontend/components/SliderManagement.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SliderManagement = () => {
//   const [sliders, setSliders] = useState([]);
//   const [formData, setFormData] = useState({ caption: '', link: '', imageUrl: '' });

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/slider')
//       .then((res) => setSliders(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleAddSlider = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/slider', formData)
//       .then(() => {
//         setSliders([...sliders, formData]);
//         setFormData({ caption: '', link: '', imageUrl: '' });
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleDeleteSlider = (index) => {
//     axios.delete(`http://localhost:5000/api/slider/${index}`)
//       .then(() => {
//         const updatedSliders = sliders.filter((_, i) => i !== index);
//         setSliders(updatedSliders);
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-bold mb-4">Manage Sliders</h3>
//       <form onSubmit={handleAddSlider} className="space-y-4 mb-6">
//         <input
//           type="text"
//           placeholder="Caption"
//           value={formData.caption}
//           onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
//           required
//           className="w-full border-gray-300 rounded-md shadow-sm"
//         />
//         <input
//           type="text"
//           placeholder="Link"
//           value={formData.link}
//           onChange={(e) => setFormData({ ...formData, link: e.target.value })}
//           required
//           className="w-full border-gray-300 rounded-md shadow-sm"
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={formData.imageUrl}
//           onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
//           required
//           className="w-full border-gray-300 rounded-md shadow-sm"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
//           Add Slider
//         </button>
//       </form>

//       <ul className="space-y-4">
//         {sliders.map((slider, index) => (
//           <li key={index} className="flex justify-between items-center bg-gray-200 p-4 rounded-md">
//             <div>
//               <p className="font-semibold">{slider.caption}</p>
//               <a href={slider.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
//                 {slider.link}
//               </a>
//             </div>
//             <button
//               onClick={() => handleDeleteSlider(index)}
//               className="bg-red-600 text-white px-2 py-1 rounded-md"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SliderManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SliderManagement = () => {
  const [sliders, setSliders] = useState([]);
  const [formData, setFormData] = useState({ caption: '', link: '', imageUrl: '' });

  // Fetch sliders from the API
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/slider');
        setSliders(res.data);
      } catch (err) {
        console.error('Error fetching sliders:', err);
      }
    };
    fetchSliders();
  }, []);

  // Add a new slider
  const handleAddSlider = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/slider', formData);
      setSliders((prevSliders) => [...prevSliders, res.data]); // Use the returned slider from the backend
      setFormData({ caption: '', link: '', imageUrl: '' }); // Reset the form
    } catch (err) {
      console.error('Error adding slider:', err);
    }
  };

  // Delete a slider
  const handleDeleteSlider = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/slider/${id}`);
      setSliders((prevSliders) => prevSliders.filter((slider) => slider.id !== id)); // Filter out deleted slider
    } catch (err) {
      console.error('Error deleting slider:', err);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Sliders</h3>
      <form onSubmit={handleAddSlider} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Caption"
          value={formData.caption}
          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          required
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Slider
        </button>
      </form>

      <ul className="space-y-4">
        {sliders.map((slider) => (
          <li key={slider.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-md">
            <div>
              <p className="font-semibold">{slider.caption}</p>
              <a href={slider.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {slider.link}
              </a>
            </div>
            <button
              onClick={() => handleDeleteSlider(slider.id)}
              className="bg-red-600 text-white px-2 py-1 rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderManagement;
