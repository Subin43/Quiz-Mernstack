import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditQuiz() {
  const [sNo, setSNo] = useState(1);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [answer, setAnswer] = useState("");

  const { id } = useParams();
  console.log("ID:", id);

  const [loading, setLoading] = useState(false);
  const [quizEdited, setQuizEdited] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/quiz/${id}`);
        const { sNo, question, answer, option } = response.data;
        setSNo(sNo);
        setQuestion(question);
        setAnswer(answer);
        setOption(option.join(", "));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        enqueueSnackbar("Error fetching quiz", { variant: 'error' });
        console.log("error:", error.message);
      }
    };

    fetchQuiz();
  }, [id, enqueueSnackbar]);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      const updatedOption = option.split(',').map(opt => opt.trim());
      await axios.put(`http://localhost:5000/quiz/edit/${id}`, { sNo, question, answer, option: updatedOption });
      setLoading(false);
      setQuizEdited(true);
      enqueueSnackbar("Quiz edited successfully", { variant: 'success' });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error editing quiz", { variant: 'error' });
      console.log("error:", error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto m-10">
      <h2 className="text-2xl font-bold mb-4">Edit Quiz</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="s_No" className="block mb-1">
            S. No:
          </label>
          <input
            type="number"
            id="s_No"
            value={sNo}
            onChange={(e) => setSNo(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="option" className="block mb-1">
            Option:
          </label>
          <input
            type="text"
            id="option"
            value={option}
            onChange={handleOptionChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="answer" className="block mb-1">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleEdit}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Editing..." : "Edit Quiz"}
        </button>
      </form>
      {quizEdited && (
        <div className="mt-4 fadeIn">Quiz successfully edited!</div>
      )}
    </div>
  );
}
