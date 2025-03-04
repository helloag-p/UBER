import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('token'); // Clear token
          navigate('/captainlogin'); // Redirect to login
        }
      } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
      }
    };

    logoutCaptain();
  }, [navigate]); // Ensures `logoutUser()` runs only once on mount

  return <div>Logging out...</div>; // Show message while logging out
};

export default CaptainLogout;