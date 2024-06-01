import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  const handleClick = () => {
    setIsHovered(false);
    enqueueSnackbar("Notification Send to the Email", { varient: "Success" });
  };
  return (
    <div className="bg-black text-white w-full py-4 flex justify-around fixed bottom-0">
      <button
        className="cursor-pointer hover:text-blue-300 m-2"
        onClick={() => setIsHovered(true)}
      >
        Get In Touch
      </button>
      {isHovered && (
        <div>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 bg-gray-200"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => handleClick()}
          >
            Send
          </button>
        </div>
      )}{" "}
      <Link to="https://www.linkedin.com/feed/">
        <FaLinkedin className="text-3xl m-2" />
      </Link>
      <Link to="https://github.com/">
        <FaGithub className="text-3xl m-2" />
      </Link>
      {/* <p className='cursor-pointer hover:text-gray-400'><span onClick={()=>navigate("/addquiz")}>Add quiz</span></p>
      <p className='cursor-pointer hover:text-gray-400'><span onClick={()=>navigate("/editquiz")}>Edit quiz</span></p>
      <p className='cursor-pointer hover:text-gray-400'><span onClick={()=>navigate("/addquiz")}>Delete quiz</span></p> */}
    </div>
  );
}
