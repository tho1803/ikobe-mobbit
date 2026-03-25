import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './components/WelcomePage';
import Questionnaire from './components/Questionnaire';
import ResultPage from './components/ResultPage';
import './App.css';

const STORAGE_KEY = 'mobbit-progress';

function App() {
  const [page, setPage] = useState('welcome');
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [animClass, setAnimClass] = useState('page-enter');

  // Restore saved progress on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.answers && Object.keys(data.answers).length > 0) {
          setAnswers(data.answers);
          setPage(data.page || 'questionnaire');
        }
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  // Warn before leaving during questionnaire
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (page === 'questionnaire' && Object.keys(answers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [page, answers]);

  const navigateTo = (targetPage, newAnswers) => {
    setAnimating(true);
    setAnimClass('page-exit');

    setTimeout(() => {
      if (newAnswers !== undefined) setAnswers(newAnswers);
      setPage(targetPage);
      setAnimClass('page-enter');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setAnimating(false);
      }, 300);
    }, 200);
  };

  const handleStart = () => {
    navigateTo('questionnaire');
  };

  const handleFinish = (finalAnswers) => {
    // Clear saved progress
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) { /* */ }
    navigateTo('result', finalAnswers);
  };

  const handleRestart = () => {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) { /* */ }
    navigateTo('welcome', {});
  };

  // Save progress callback for questionnaire
  const handleProgressChange = (currentAnswers, currentQPage) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers: currentAnswers,
        page: 'questionnaire',
        questionPage: currentQPage,
      }));
    } catch (e) { /* */ }
  };

  return (
    <div className="app">
      <Header />
      <main className={`page-wrapper ${animClass}`}>
        {page === 'welcome' && <WelcomePage onStart={handleStart} />}
        {page === 'questionnaire' && (
          <Questionnaire
            onFinish={handleFinish}
            savedAnswers={answers}
            onProgressChange={handleProgressChange}
          />
        )}
        {page === 'result' && <ResultPage answers={answers} onRestart={handleRestart} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
