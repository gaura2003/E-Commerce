// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For redirecting

// const Login = () => {
//   const [formData, setFormData] = useState({
//     emailOrPhone: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', formData);

//       alert('Login successful');
//       // Save the token in local storage
//       localStorage.setItem('token', response.data.token);

//       // Check if the user is admin and redirect accordingly
//       if (response.data.user.role === 'admin') {
//         navigate('/admin-dashboard'); // Redirect to admin dashboard
//       } else {
//         navigate('/'); // Redirect to user home page
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error logging in');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5">
//       <input
//         type="text"
//         name="emailOrPhone"
//         placeholder="Email or Phone"
//         onChange={handleChange}
//         required
//         className="p-2 border rounded"
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={handleChange}
//         required
//         className="p-2 border rounded"
//       />
//       <button type="submit" className="p-2 bg-blue-600 text-white rounded">Login</button>
//     </form>
//   );
// };

// export default Login;

// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData );
      const { token, user } = response.data;

      // Save token in localStorage
      localStorage.setItem('token', token);

        localStorage.setItem('token', response.data.token); // Store the token after login
      

      // Set user data (username and role)
      login(user);

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5">
      <input
        type="text"
        name="emailOrPhone"
        placeholder="Email or Phone"
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  );
};

export default Login;
