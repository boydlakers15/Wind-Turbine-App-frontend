import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUpPage.css';
import videoBg from '../assets/rain.mp4';
import axios from 'axios';

const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); // State for storing the uploaded profile image file

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('upload_preset', 'v2ng3uyg'); // Cloudinary upload preset
      formData.append('file', profileImage); // Append the profile image file to the form data

      // Make a request to upload the profile image to Cloudinary
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/windturbineprofile/image/upload',
        formData
      );

      // Get the URL of the uploaded image from the response
      const profileImageUrl = uploadResponse.data.secure_url;

      // Make a request to sign up the user with the form data
      const signupResponse = await axios.post(
        'https://wind-turbine-app-backend.onrender.com/users/signup',
        {
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          profileImage: profileImageUrl // Pass the profile image URL in the request
        }
      );

      console.log('User signed up:', signupResponse.data);
      // Reset the form fields
      setUserName('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setProfileImage(null);
      // Redirect to the wind turbines page or perform any other desired action
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div className="signup-page">
      <video className="signup-video" src={videoBg} autoPlay loop muted />
      <div className="signup-container text-overlay">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Rest of the form */}
          <div className="form-group">
            <label htmlFor="profileImage" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              id="profileImage"
              className="form-input"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
