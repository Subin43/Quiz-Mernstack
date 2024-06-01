import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { RiAdminFill } from "react-icons/ri";
import Footer from './Footer';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false); // Use 'loggedIn' for clarity
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state ? location.state.username : '';

  const handleLogin = () => {
    // Simulate successful login (replace with actual authentication logic)
    setLoggedIn(true);
    navigate("/login"); // This could be removed if login page is not needed
  };

  return (
    <div>
      <Header />
      <div className="relative">
        <button
          className="absolute top-0 right-20 mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => navigate("/admin")} // Navigate to login page
        >
          Admin <RiAdminFill className="ml-1" />
        </button>
        <div className="text-center">
          <h3 className="p-4 text-3xl font-bold ">Please Login Below {username}</h3>
          {
            !loggedIn ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin}
              >
                Log On
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/quizes")} // Navigate to quizzes page
              >
                Get Started
              </button>
            )
          }
          <Footer />
        </div>
      </div>
    </div>
  );
}
