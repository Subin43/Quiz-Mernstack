import React from "react";
import { FaHome } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="relative bg-black p-6 flex items-center justify-between">
      <div className="flex items-center">
        <FaHome className="text-white text-3xl ml-4" />
      </div>
      <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">QUIZ APP</h2>
      <Link to="/">
        <MdLogin className="text-white text-3xl mr-4" />
      </Link>
    </div>
  );
}
