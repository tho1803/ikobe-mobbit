import { useState, useRef, useEffect, useCallback } from 'react';
import { questions, answerLabels } from '../data/questions';

const QUESTIONS_PER_PAGE = 18; // Seite 1: 1-18, Seite 2: 19-35

export default function Questionnaire({ onFinish, savedAnswers, onProgressChange }) {
  const [answers, setAnswers] = useState(savedAnswers || {});
  const [currentPage, setCurrentPage] = useState(0);
  const [shakeUnanswered, setShakeUnanswered] = useState(false);
  const questionRefs = useRef({});

  // Restore saved page from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('mobbit-progress');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.questionPage !== undefined) {
          setCurrentPage(data.questionPage);
        }
      }
    } catch (e) { /* */ }
  }, []);

  const totalPages = 2;
  const startIdx = currentPage === 0 ? 0 : 18;
  const endIdx = currentPage === 0 ? 18 : 35;
  const pageQuestions = questions.slice(startIdx, endIdx);

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const pageAnswered = pageQuestions.every(q => answers[q.id] !== undefined);
  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers(prev => {
      const updated = { ...prev, [questionId]: value };
      if (onProgressChange) onProgressChange(updated, currentPage);
      return updated;
    });
  }, [currentPage, onProgressChange]);

  const scrollToFirstUnanswered = () => {
    const firstUnanswered = pageQuestions.find(q => answers[q.id] === undefined);
    if (firstUnanswered && questionRefs.current[firstUnanswered.id]) {
      questionRefs.current[firstUnanswered.id].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setShakeUnanswered(true);
      setTimeout(() => setShakeUnanswered(false), 800);
    }
  };

  const handleNext = () => {
    if (!pageAnswered) {
      scrollToFirstUnanswered();
      return;
    }
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (onProgressChange) onProgressChange(answers, currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (onProgressChange) onProgressChange(answers, currentPage - 1);
    }
  };

  const handleSubmit = () => {
    if (!allAnswered) {
      const firstUnansweredQ = questions.find(q => answers[q.id] === undefined);
      if (firstUnansweredQ) {
        const targetPage = firstUnansweredQ.id <= 18 ? 0 : 1;
        if (targetPage !== currentPage) {
          setCurrentPage(targetPage);
          setTimeout(() => scrollToFirstUnanswered(), 300);
        } else {
          scrollToFirstUnanswered();
        }
      }
      return;
    }
    onFinish(answers);
  };

  return (
    <div className="questionnaire">
      {/* Sticky top bar: Progress + Legend */}
      <div className="sticky-top-bar">
        {/* Progress */}
        <div className="progress-section">
          <div className="progress-info">
            <span>Seite {currentPage + 1} / {totalPages}</span>
            <span>{answeredCount} von {questions.length} beantwortet</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Compact Legend Strip */}
        <div className="legend-strip" role="group" aria-label="Antwort-Legende">
          {answerLabels.map(item => (
            <div key={item.value} className="legend-strip-item">
              <span className="legend-strip-circle">{item.value}</span>
              <span className="legend-strip-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="question-page-header">
        Bitte alle Aussagen bewerten
      </div>

      {/* Questions */}
      <div className="question-container">
        {pageQuestions.map(question => {
          const isAnswered = answers[question.id] !== undefined;
          const isUnanswered = !isAnswered && shakeUnanswered;
          const specialClass = question.special === 'high'
            ? 'special-high'
            : question.special === 'medium'
              ? 'special-medium'
              : '';

          return (
            <div
              key={question.id}
              ref={el => questionRefs.current[question.id] = el}
              className={`question-card ${isAnswered ? 'answered' : ''} ${isUnanswered ? 'shake' : ''}`}
              role="group"
              aria-label={`Frage ${question.id}`}
            >
              <div className="question-text">
                <span className="question-number">
                  {question.id}.
                  {question.special && (
                    <span className={`special-dot ${question.special === 'high' ? 'dot-high' : 'dot-medium'}`} title="Sonderfrage (höhere Bewertung)">!</span>
                  )}
                </span>
                <span id={`question-label-${question.id}`}>{question.text}</span>
              </div>
              <div className="slider-container">
                <div className="slider-labels">
                  {answerLabels.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className={`slider-label ${answers[question.id] === option.value ? 'active' : ''}`}
                      onClick={() => handleAnswer(question.id, option.value)}
                      aria-label={`${option.value}: ${option.label}`}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
                <div
                  className="slider-track-wrapper"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    handleAnswer(question.id, Math.round(percent * 4));
                  }}
                >
                  <div
                    className={`slider-track ${answers[question.id] !== undefined ? 'has-value' : ''}`}
                    style={{
                      '--slider-percent': answers[question.id] !== undefined
                        ? `${(answers[question.id] / 4) * 100}%`
                        : '0%'
                    }}
                  >
                    {answers[question.id] !== undefined && (
                      <div
                        className="slider-thumb"
                        style={{ left: `${(answers[question.id] / 4) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
                <div className="slider-descriptions" aria-hidden="true">
                  <span className="slider-desc-left">nie / trifft gar nicht zu</span>
                  <span className="slider-desc-right">fast täglich / trifft vollkommen zu</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="nav-buttons">
        {currentPage > 0 ? (
          <button className="btn-nav secondary" onClick={handlePrev} aria-label="Zurück zur vorherigen Seite">
            ← Zurück
          </button>
        ) : (
          <div />
        )}

        {currentPage < totalPages - 1 ? (
          <button
            className="btn-nav primary"
            onClick={handleNext}
            aria-label="Weiter zur nächsten Seite"
          >
            Weiter →
          </button>
        ) : (
          <button
            className="btn-nav primary"
            onClick={handleSubmit}
            disabled={false}
            aria-label={allAnswered ? 'Auswertung anzeigen' : 'Noch offene Fragen beantworten'}
          >
            {allAnswered ? 'Auswertung anzeigen' : `Noch ${questions.length - answeredCount} Fragen offen`}
          </button>
        )}
      </div>
    </div>
  );
}
