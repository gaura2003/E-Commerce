import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../Services/adminService';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order.orderId}</td>
              <td className="border p-2">{order.customer}</td>
              <td className="border p-2">${order.total}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
