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
      await axios.put(`https://wind-turbine-app-backend.onrender.com/users/update/${userId}`, { [field]: value });
      fetchUsers(); // Refresh the user list after the update
    } catch (error) {
      console.error(`Failed to update user ${field}`, error);
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
                <input
                  type="text"
                  value={user.isAdmin}
                  onChange={(e) => handleFieldChange(user._id, 'admin', e.target.value)}
                />
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
