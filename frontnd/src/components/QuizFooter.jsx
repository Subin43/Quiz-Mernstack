import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function QuizFooter() {
    const navigate = useNavigate();
  return (
    <div className="bg-black text-white w-full py-4 flex justify-around fixed bottom-0">
      <p className='cursor-pointer hover:text-gray-400'><span onClick={()=>navigate("/addquiz")}>Add quiz</span></p>
      <p className='cursor-pointer hover:text-gray-400'><span onClick={()=>navigate("/quiz/edit/:id")}>Edit quiz</span></p>
      <p className='cursor-pointer hover:text-gray-400'><span onClick={()=>navigate("/delete/:id")}>Delete quiz</span></p> 
    </div>
  )
}
