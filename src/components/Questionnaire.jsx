import { useState } from 'react';
import { questions, answerLabels } from '../data/questions';

const QUESTIONS_PER_PAGE = 18; // Seite 1: 1-18, Seite 2: 19-35

export default function Questionnaire({ onFinish }) {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

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

      {/* Legend */}
      <div className="legend-box">
        <h4>Antwort-Legende</h4>
        <div className="legend-items">
          {answerLabels.map(item => (
            <div key={item.value} className="legend-item">
              <span className="legend-circle">{item.value}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
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
              <div className="answer-options">
                {answerLabels.map(option => (
                  <button
                    key={option.value}
                    className={`answer-btn ${answers[question.id] === option.value ? 'selected' : ''}`}
                    onClick={() => handleAnswer(question.id, option.value)}
                  >
                    <span className="answer-circle">{option.value}</span>
                    <span className="answer-label">{option.label}</span>
                  </button>
                ))}
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
