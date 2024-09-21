import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://wander-hub-webback.vercel.app/api/users/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserDetails(response.data);
          setProfileImage(response.data.profileImage); // Set the profile image from the database
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchUserDetails();
  }, []);
  
  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-content">
        <div className="profile-image">
          {profileImage && <img src={profileImage} alt="Profile" />}
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
