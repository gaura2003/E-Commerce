// // src/components/Orders.jsx
// import React, { useContext, useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { fetchOrders } from '../Services/orderService'; // Ensure this path is correct

// const Orders = () => {
//   const { user } = useContext(useAuth);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (user) {
//       fetchOrders(user._id).then(setOrders);  // Correctly calling fetchOrders
//     }
//   }, [user]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Order History</h1>
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr>
//             <th className="border p-2">Order ID</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Total</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td className="border p-2">{order.orderId}</td>
//               <td className="border p-2">{order.status}</td>
//               <td className="border p-2">${order.total}</td>
//               <td className="border p-2">
//                 <button className="text-blue-600">View</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchOrders } from '../Services/orderService';

const Orders = () => {
  const { user } = useAuth(); // Call useAuth directly
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders(user._id).then(setOrders);
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order.orderId}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">${order.total}</td>
              <td className="border p-2">
                <button className="text-blue-600">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
