import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { RiAdminFill } from "react-icons/ri";
import Footer from "./Footer";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state ? location.state.username : "";

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/login"); 
  };

  return (
    <div>
      <Header />
      <div className="relative flex flex-col justify-between min-h-screen">
        <img
          className="w-full h-full object-cover absolute top-0 left-0 z-10"
          src="https://www.shutterstock.com/image-photo/abstract-connected-dots-on-dark-600nw-633007355.jpg"
          alt="background"
        />
        <button
          className="absolute top-0 right-20 mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center z-10"
          onClick={() => navigate("/admin")}
        >
          Admin <RiAdminFill className="ml-1" />
        </button>
        <div className="text-center relative z-10">
          <h3 className="p-4 text-3xl font-bold text-white ">
            Please Login Below {username}
          </h3>
          {!loggedIn ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Log On
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/quizes")}
            >
              Get Started
            </button>
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}
