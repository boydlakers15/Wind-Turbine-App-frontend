import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://wind-turbine-app-backend.onrender.com/users/all', 
      { withCredentials: true });

      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleFieldChange = async (userId, field, value) => {
    try {
      console.log(`Updating user ${userId} field ${field} to ${value}`);
      const response = await axios.put(`https://wind-turbine-app-backend.onrender.com/users/update/${userId}`, {
        [field]: value
      });
      console.log(`Updated user ${userId}:`, response.data);
      fetchUsers(); // Refresh the user list after the update
    } catch (error) {
      console.error(`Failed to update user ${field}`, error);
    }
  };
  
  const toggleAdminStatus = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the value
      console.log(`Toggling admin status for user ${userId}. New status: ${newStatus}`);
      const response = await axios.put(`https://wind-turbine-app-backend.onrender.com/users/all/update/${userId}`, {
        isAdmin: newStatus
      });
      console.log(`Updated user ${userId}:`, response.data);
      fetchUsers(); // Refresh the user list after the update
    } catch (error) {
      console.error('Failed to update user admin status', error);
    }
  };
  
  
  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
              <button onClick={() => toggleAdminStatus(user._id, user.isAdmin)}>
                {user.isAdmin ? 'Make User' : 'Make Admin'}
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add other admin panel functionality here */}
    </div>
  );
  
};

export default AdminPanel;
