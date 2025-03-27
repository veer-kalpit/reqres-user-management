"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [sortOption, setSortOption] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users. Try again!");
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOption === "firstNameAsc")
      return a.first_name.localeCompare(b.first_name);
    if (sortOption === "firstNameDesc")
      return b.first_name.localeCompare(a.first_name);
    if (sortOption === "lastNameAsc")
      return a.last_name.localeCompare(b.last_name);
    if (sortOption === "lastNameDesc")
      return b.last_name.localeCompare(a.last_name);
    return 0; 
  });

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser}`, editForm);
      setUsers(
        users.map((user) =>
          user.id === editingUser ? { ...user, ...editForm } : user
        )
      );
      alert("User updated successfully!");
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Try again!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">User List</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex justify-end">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white px-4 py-2 border rounded shadow"
        >
          <option value="">Sort By</option>
          <option value="firstNameAsc">First Name (A-Z)</option>
          <option value="firstNameDesc">First Name (Z-A)</option>
          <option value="lastNameAsc">Last Name (A-Z)</option>
          <option value="lastNameDesc">Last Name (Z-A)</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 shadow-lg rounded-lg text-center"
            >
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-24 h-24 mx-auto rounded-full mb-3"
              />
              <h3 className="text-xl font-medium">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-yellow-400 px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              name="first_name"
              value={editForm.first_name}
              onChange={handleEditChange}
              placeholder="First Name"
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="last_name"
              value={editForm.last_name}
              onChange={handleEditChange}
              placeholder="Last Name"
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              placeholder="Email"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
