import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { RiAdminFill } from "react-icons/ri";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state ? location.state.username : "";

  const handleLogin = () => {
    navigate("/login"); 
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg text-center relative">
          <button
            className="absolute top-9 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => navigate("/admin")}
          >
            Admin <RiAdminFill className="ml-1" />
          </button>
          <h3 className="text-3xl font-bold text-gray-700 mb-6">
            Please Login Below {username}
          </h3>
          <div className="flex flex-col space-y-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
              onClick={handleLogin}
            >
              Log On
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
