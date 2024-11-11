import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import validator from "validator";

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!userData.username || !userData.password || !userData.email) {
      enqueueSnackbar("Username, email, and password are required.", {
        variant: "error",
      });
      return;
    }

    // Email validation
    if (!validator.isEmail(userData.email)) {
      enqueueSnackbar("Invalid email format", { variant: "error" });
      return;
    }

    try {
      // Check if the email exists in the database
      const emailData = await axios.post("http://localhost:5000/login/email", {
        email: userData.email,
        password: userData.password,
      });
      const user = emailData.data.user;
      if (!user) {
        enqueueSnackbar("User not found with this email", { variant: "error" });
        return;
      }

      // Validate username and password
      if (!validator.isAlphanumeric(userData.username)) {
        enqueueSnackbar("Username must contain only alphanumeric characters!", {
          variant: "error",
        });
        return;
      }

      if (userData.username.length < 4 || userData.username.length > 14) {
        enqueueSnackbar("Invalid username length", { variant: "error" });
        return;
      }

      if (!validator.isStrongPassword(userData.password)) {
        enqueueSnackbar(
          "Password must be stronger (include uppercase, lowercase, number, and symbol)",
          { variant: "error" }
        );
        return;
      }

      // Match the username and password
      console.log(user.username);
      const isUserNameMatched = user.username === userData.username;

      if (isUserNameMatched) {
        //  setFetchedData(user);  // Store fetched user data
        //  navigate("/quizes", { state: { fetchedData: user } });  // Pass user data to next page
        navigate("/quizes", { state: { username: user.username } }); // Pass user data to next page
      } else {
        enqueueSnackbar("Username or password does not match", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log("error:", error.message);
      enqueueSnackbar("An error occurred. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={userData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              New User?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}
