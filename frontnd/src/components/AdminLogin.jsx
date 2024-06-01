// AdminLogin.jsx
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AdminLogin = () => {
  const [userId, setUserId] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleVerify = () => {
    const adminId = [503, 506, 513];
    if (!adminId.includes(parseInt(userId))) {
      enqueueSnackbar("Invalid admin user_Id", { variant: "error" });
      return;
    }
    enqueueSnackbar("Admin id detected", { variant: "success" });
    localStorage.setItem("isAdmin",true); // store admin status in the local storage
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <div className=" p-6 m-6">
        <div className="flex items-center justify-center">
        <label className="font-bold mb-2">Admin Id : </label>
        <input
          type="text"
          placeholder="Enter your Id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="px-6 py-2 mb-4 mx-6 rounded border border-gray-300 bg-gray-200"
        />
        </div>
        <div className="flex justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={handleVerify}
        >
          Verify
        </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
