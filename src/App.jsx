import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './components/WelcomePage';
import Questionnaire from './components/Questionnaire';
import ResultPage from './components/ResultPage';
import './App.css';

function App() {
  const [page, setPage] = useState('welcome');
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setPage('questionnaire');
    window.scrollTo(0, 0);
  };

  const handleFinish = (finalAnswers) => {
    setAnswers(finalAnswers);
    setPage('result');
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setAnswers({});
    setPage('welcome');
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <Header />
      {page === 'welcome' && <WelcomePage onStart={handleStart} />}
      {page === 'questionnaire' && <Questionnaire onFinish={handleFinish} />}
      {page === 'result' && <ResultPage answers={answers} onRestart={handleRestart} />}
      <Footer />
    </div>
  );
}

export default App;
