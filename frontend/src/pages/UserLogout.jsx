import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('token'); // Clear token
          navigate('/login'); // Redirect to login
        }
      } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
      }
    };

    logoutUser();
  }, [navigate]); // Ensures `logoutUser()` runs only once on mount

  return <div>Logging out...</div>; // Show message while logging out
};

export default UserLogout;






// import React,{useEffect} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// const UserLogout = () => {
//   const token=localStorage.getItem('token')
//   const navigate=useNavigate()
//   axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
//     headers:{
//         Authorization:`Bearer ${token}`
//     }
//   }).then((response)=>{
//     if(response.status===200){
//         localStorage.removeItem('token')
//         navigate('/login')

//     }
// })
//     return (
//     <div>
      
//     </div>
//   )
// }

// export default UserLogout
