import React, { useEffect, useState } from 'react';
import { fetchCategories, deleteCategory } from '../Services/adminService';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId).then(() => {
      setCategories(categories.filter((category) => category._id !== categoryId));
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(category._id)}
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

export default ManageCategories;
