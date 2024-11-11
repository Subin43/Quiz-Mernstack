import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/pages/Login';
import Quizes from './components/pages/Quizes';
import AddQuiz from './components/AddQuiz';
import QuizDivision from './divisions/Technology';
import FinalPage from './divisions/FinalPage';
import EditQuiz from './components/EditQuiz';
import AdminLogin from './components/AdminLogin';
import DeleteQuiz from './components/DeleteQuiz';
import Signup from './components/pages/Signup';

function App() {
  return (
    <Routes>
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path="/" element={<Home />} />
      <Route path="/quizes" element={<Quizes />} />
      <Route path="/technology" element={<QuizDivision division="Technology" />} />
      <Route path="/science" element={<QuizDivision division="Science" />} />
      <Route path="/sports" element={<QuizDivision division="Sports" />} />
      <Route path="/finish" element={<FinalPage />} />
      <Route path="/addquiz" element={<AddQuiz />} />
      <Route path='/quiz/edit/:id' element={<EditQuiz />} />
      <Route path='/delete/:id' element={<DeleteQuiz />} />
    </Routes>
  );
}

export default App;
