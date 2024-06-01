import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function AddQuiz() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    s_No: 1,
    question: "",
    option: "",
    answer: ""
  });
  const { enqueueSnackbar } = useSnackbar();
  const [quizAdded, setQuizAdded] = useState(false);
 // const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (e) => {
    setFormData({ ...formData, option: e.target.value });
  };

  const handleAdd = () => {
    setLoading(true);

    const updatedFormData = {
      ...formData,
      option: formData.option.split(',').map(opt => opt.trim()) // Convert string to array before sending
    };

    axios.post('http://localhost:5000/quiz/new', updatedFormData)
      .then((res) => {
        // const createdData = res.data;
        // setData(createdData);
       // localStorage.setItem('createdQuizId', createdData.id); // Store unique ID
        setLoading(false);
        setQuizAdded(true);
        enqueueSnackbar("Quiz created successfully!", { variant: 'success' });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error creating quiz", { variant: 'error' });
        console.log("error:", error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto m-10 p-5">
      <h2 className="text-2xl font-bold mb-4">Add New Quiz</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="s_No" className="block mb-1">S. No:</label>
          <input
            type="number"
            id="s_No"
            name="s_No"
            value={formData.s_No}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="option" className="block mb-1">Option:</label>
          <input
            type="text"
            id="option"
            name="option"
            value={formData.option}
            onChange={handleOptionChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="answer" className="block mb-1">Answer:</label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button 
          type="button" 
          onClick={handleAdd} 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Adding..." : "Add Quiz"}
        </button>
      </form>
      {quizAdded && (
        <div className="mt-4 fadeIn">Quiz successfully added!</div>
      )}
    </div>
  );
}
