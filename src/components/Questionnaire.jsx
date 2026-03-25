import { useState, useRef, useEffect } from 'react';
import { questions, answerLabels } from '../data/questions';

const QUESTIONS_PER_PAGE = 18; // Seite 1: 1-18, Seite 2: 19-35

export default function Questionnaire({ onFinish }) {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [legendOpen, setLegendOpen] = useState(false);
  const legendRef = useRef(null);

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

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    if (allAnswered) {
      onFinish(answers);
    }
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
        >
          {legendOpen ? '✕' : '?'}
        </button>
        {legendOpen && (
          <div className="legend-panel">
            <h4>Antwort-Legende</h4>
            <div className="legend-panel-items">
              {answerLabels.map(item => (
                <div key={item.value} className="legend-panel-item">
                  <span className="legend-circle">{item.value}</span>
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
          const specialClass = question.special === 'high'
            ? 'special-high'
            : question.special === 'medium'
              ? 'special-medium'
              : '';

          return (
            <div
              key={question.id}
              className={`question-card ${isAnswered ? 'answered' : ''} ${specialClass}`}
            >
              <div className="question-text">
                <span className="question-number">{question.id}.</span>
                <span>{question.text}</span>
              </div>
              <div className="slider-container">
                <div className="slider-labels">
                  {answerLabels.map(option => (
                    <span
                      key={option.value}
                      className={`slider-label ${answers[question.id] === option.value ? 'active' : ''}`}
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
                    style={{
                      '--slider-percent': answers[question.id] !== undefined
                        ? `${(answers[question.id] / 4) * 100}%`
                        : '0%'
                    }}
                  />
                </div>
                <div className="slider-descriptions">
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
          <button className="btn-nav secondary" onClick={handlePrev}>
            ← Zurück
          </button>
        ) : (
          <div />
        )}

        {currentPage < totalPages - 1 ? (
          <button
            className="btn-nav primary"
            onClick={handleNext}
          >
            Weiter →
          </button>
        ) : (
          <button
            className="btn-nav primary"
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            {allAnswered ? 'Auswertung anzeigen' : `Noch ${questions.length - answeredCount} Fragen offen`}
          </button>
        )}
      </div>
    </div>
  );
}
