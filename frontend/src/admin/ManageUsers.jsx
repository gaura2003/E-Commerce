// import React, { useEffect, useState } from 'react';
// import { fetchUsers, deleteUser } from '../Services/adminService';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers().then(setUsers);
//   }, []);

//   const handleDelete = (userId) => {
//     deleteUser(userId).then(() => {
//       setUsers(users.filter((user) => user._id !== userId));
//     });
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleDelete(user._id)}
//                   className="text-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../Services/adminService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((err) => {
        setError('Error deleting user');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
