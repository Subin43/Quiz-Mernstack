import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header';
import QuizFooter from '../components/QuizFooter';
import Footer from '../components/Footer';


const QuizProgress = ({ totalQuizzes, completedQuizzes, score }) => {
  return (
    <div className="flex justify-end mt-4">
      <div className="text-sm text-gray-600">
        Completed: {completedQuizzes}/{totalQuizzes} | Score: {score}
      </div>
    </div>
  );
};

const QuizDivision = ({ division }) => {
  const [loading, setLoading] = useState(false);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [disabledOptions, setDisabledOptions] = useState({});
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [score, setScore] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/quiz')
      .then((response) => {
        const allQuizzes = response.data.allQuiz;
        const divisionQuizzes = allQuizzes.filter(quiz => quiz.division.toLowerCase() === division.toLowerCase());
        setFilteredQuizzes(divisionQuizzes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error fetching quizzes", { variant: 'error' });
        console.log("error:", error.message);
      });
  }, [enqueueSnackbar, division]);

  // get the user is admin or not
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  console.log(isAdmin);

  const handleOptionChange = (quizId, option) => {
    if (!disabledOptions[quizId]) {
      setSelectedOptions(prevState => ({
        ...prevState,
        [quizId]: option
      }));
      setDisabledOptions(prevState => ({
        ...prevState,
        [quizId]: true
      }));
    }
  };

  const isCorrectOption = (quiz, option) => {
    return quiz.answer === option;
  };

  const handleNextClick = () => {
    handleQuizCompletion();
    if (currentQuizIndex < filteredQuizzes.length - 1) {
      setCurrentQuizIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleQuizCompletion = () => {
    const currentQuiz = filteredQuizzes[currentQuizIndex];
    if (selectedOptions[currentQuiz._id] === currentQuiz.answer) {
      setScore(prevScore => prevScore + 1);
    }
    setCompletedQuizzes(prevCount => prevCount + 1);

    // Check if all quizzes are completed
    if (completedQuizzes + 1 === filteredQuizzes.length) {
      navigate('/finish', { state: { score: score + (selectedOptions[currentQuiz._id] === currentQuiz.answer ? 1 : 0) } });
    }
  };

  const currentQuiz = filteredQuizzes[currentQuizIndex];

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className='flex flex-col items-start p-6 m-10'>
            <h3 className='text-2xl mb-6 font-bold'>{`${division} Quizzes`}</h3>
            {currentQuiz && (
              <div>
                <div className="flex items-center mb-2">
                  <span className="font-bold mr-2">{currentQuiz.s_No}.</span>
                  <span className='font-bold mr-2'>{currentQuiz.question}</span>
                </div>
                <ul>
                  {currentQuiz.option.map((option, index) => (
                    <li key={index} className="mb-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedOptions[currentQuiz._id] === option}
                          onChange={() => handleOptionChange(currentQuiz._id, option)}
                          disabled={disabledOptions[currentQuiz._id]}
                        />
                        <span className={`${
                          selectedOptions[currentQuiz._id] === option
                            ? isCorrectOption(currentQuiz, option)
                              ? 'text-green-500'
                              : 'text-red-500'
                            : ''
                        }`}>{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {completedQuizzes < 9 ? (
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNextClick}
              >
                Next
              </button>
            ) : (
              <button
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleQuizCompletion}
              >
                Submit
              </button>
            )}
            <QuizProgress totalQuizzes={filteredQuizzes.length} completedQuizzes={completedQuizzes} score={score} />
          </div>
        )}
        <div>
          {
            isAdmin ? <QuizFooter /> : <Footer />
          }
        </div>
      </div>
    </div>
  );
};

export default QuizDivision;
