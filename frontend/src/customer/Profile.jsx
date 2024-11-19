// import React, { useContext, useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext'; // Use the `useAuth` hook for consistency
// import { getUserProfile } from '../Services/userService'; // Import the API function

// const Profile = () => {
//   const { user } = useAuth(); // Get the authenticated user from context
//   const [profile, setProfile] = useState(null); // State to store profile data
//   const [loading, setLoading] = useState(true); // State for loading status

//   useEffect(() => {
//     // Ensure the user exists and has a token before fetching the profile
//     if (user && user.token) {
//       getUserProfile(user.token)
//         .then((profileData) => {
//           setProfile(profileData); // Update profile state
//           setLoading(false); // Update loading state
//         })
//         .catch((error) => {
//           console.error('Error fetching profile:', error);
//           setLoading(false); // Handle error case
//         });
//     } else {
//       setLoading(false); // Stop loading if no user
//     }
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state
//   }

//   if (!profile) {
//     return <div>Profile not found.</div>; // Handle missing profile
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <div>
//         <p>
//           <strong>Name:</strong> {profile.name}
//         </p>
//         <p>
//           <strong>Email:</strong> {profile.email}
//         </p>
//         {/* Add other profile details if needed */}
//       </div>
//     </div>
//   );
// };

// export default Profile;


// import React, { useContext, useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext'; // Use the `useAuth` hook for consistency
// import { getUserProfile } from '../Services/userService'; // Import the API function

// const Profile = () => {
//   const { user } = useAuth(); // Get the authenticated user from context
//   const [profile, setProfile] = useState(null); // State to store profile data
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(null); // State to store error message

//   useEffect(() => {
//     // Ensure the user exists and has a token before fetching the profile
//     if (user && user.token) {
//       setLoading(true); // Start loading when the API request begins
//       setError(null); // Clear any previous errors

//       getUserProfile(user.token)
//         .then((profileData) => {
//           setProfile(profileData); // Update profile state
//           setLoading(false); // Update loading state
//         })
//         .catch((err) => {
//           setLoading(false); // Stop loading when there's an error
//           setError('Error fetching profile. Please try again later.'); // Handle error case
//           console.error('Error fetching profile:', err);
//         });
//     } else {
//       setLoading(false); // Stop loading if no user or token is found
//       setError('User is not authenticated.'); // Display error if user is not logged in
//     }
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state
//   }

//   if (error) {
//     return <div className="text-red-600">{error}</div>; // Display error message
//   }

//   if (!profile) {
//     return <div>Profile not found.</div>; // Handle missing profile
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <div>
//         <p>
//           <strong>Name:</strong> {profile.name}
//         </p>
//         <p>
//           <strong>Email:</strong> {profile.email}
//         </p>
//         {/* Add other profile details if needed */}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../Services/userService';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.token) {
      console.log('Token:', user.token); // Debugging: Check if the token is correct

      setLoading(true);
      setError(null);

      getUserProfile(user.token)
        .then((profileData) => {
          console.log('Profile Data:', profileData); // Debugging: Check API response
          setProfile(profileData);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
          setLoading(false);
          setError('Error fetching profile. Please try again later.');
        });
    } else {
      setLoading(false);
      setError('User is not authenticated.');
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div>
        <p>
          <strong>Name:</strong> {profile.fullname}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
