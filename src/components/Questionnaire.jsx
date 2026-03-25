import { useState, useRef, useEffect, useCallback } from 'react';
import { questions, answerLabels } from '../data/questions';

const QUESTIONS_PER_PAGE = 18; // Seite 1: 1-18, Seite 2: 19-35

export default function Questionnaire({ onFinish, savedAnswers, onProgressChange }) {
  const [answers, setAnswers] = useState(savedAnswers || {});
  const [currentPage, setCurrentPage] = useState(0);
  const [legendOpen, setLegendOpen] = useState(false);
  const [shakeUnanswered, setShakeUnanswered] = useState(false);
  const legendRef = useRef(null);
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

  // Close legend when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (legendRef.current && !legendRef.current.contains(e.target)) {
        setLegendOpen(false);
      }
    };
    if (legendOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [legendOpen]);

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
      // Shake animation
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
      // Go to page with unanswered questions
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
      {/* Progress */}
      <div className="progress-section">
        <div className="progress-info">
          <span>Fragebogen Seite {currentPage + 1} von {totalPages}</span>
          <span>{answeredCount} von {questions.length} beantwortet</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-page-header">
        Bitte alle Aussagen bewerten
      </div>

      {/* Floating Legend Help Button */}
      <div className="floating-legend" ref={legendRef}>
        <button
          className={`legend-toggle-btn ${legendOpen ? 'open' : ''}`}
          onClick={() => setLegendOpen(!legendOpen)}
          title="Antwort-Legende anzeigen"
          aria-label="Antwort-Legende öffnen"
          aria-expanded={legendOpen}
        >
          {legendOpen ? '✕' : '?'}
        </button>
        {legendOpen && (
          <div className="legend-panel" role="tooltip" aria-label="Antwort-Legende">
            <h4>Antwort-Legende</h4>
            <div className="legend-panel-items">
              {answerLabels.map(item => (
                <div key={item.value} className="legend-panel-item">
                  <span className="legend-circle" aria-hidden="true">{item.value}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="legend-panel-footer">
              <span className="legend-scale-left">0 = nie / trifft gar nicht zu</span>
              <span className="legend-scale-right">4 = fast täglich / trifft vollkommen zu</span>
            </div>
          </div>
        )}
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
              className={`question-card ${isAnswered ? 'answered' : ''} ${specialClass} ${isUnanswered ? 'shake' : ''}`}
              role="group"
              aria-label={`Frage ${question.id}`}
            >
              <div className="question-text">
                <span className="question-number">{question.id}.</span>
                <span id={`question-label-${question.id}`}>{question.text}</span>
              </div>
              <div className="slider-container">
                <div className="slider-labels" aria-hidden="true">
                  {answerLabels.map(option => (
                    <span
                      key={option.value}
                      className={`slider-label ${answers[question.id] === option.value ? 'active' : ''}`}
                      onClick={() => handleAnswer(question.id, option.value)}
                    >
                      {option.value}
                    </span>
                  ))}
                </div>
                <div className="slider-track-wrapper">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={answers[question.id] ?? -1}
                    className={`slider-input ${answers[question.id] !== undefined ? 'has-value' : ''}`}
                    onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                    aria-labelledby={`question-label-${question.id}`}
                    aria-valuemin="0"
                    aria-valuemax="4"
                    aria-valuenow={answers[question.id] ?? undefined}
                    aria-valuetext={answers[question.id] !== undefined ? answerLabels[answers[question.id]]?.label : 'Nicht beantwortet'}
                    style={{
                      '--slider-percent': answers[question.id] !== undefined
                        ? `${(answers[question.id] / 4) * 100}%`
                        : '0%'
                    }}
                  />
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
