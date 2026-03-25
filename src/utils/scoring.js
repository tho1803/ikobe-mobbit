import { questions, specialQuestionsHigh, specialQuestionsMedium } from '../data/questions';
import { resultLevels } from '../data/results';

/**
 * Berechnet die Gesamtpunktzahl inkl. Sonderfragen-Bonus
 *
 * Auswertung (aus der PDF, Seite 5):
 * - Basis: 35 Fragen × 0-4 Punkte = 0-140 Punkte
 * - Sonderfragen 3, 9, 14, 19, 31: bei Wert 3 oder 4 → 10 Punkte statt des normalen Werts
 * - Sonderfragen 16, 32: bei Wert 3 oder 4 → 5 Punkte statt des normalen Werts
 */
export function calculateScore(answers) {
  let totalScore = 0;
  let details = [];

  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer === undefined) return;

    let points = answer;
    let bonus = false;
    let bonusType = null;

    // Sonderfragen: hohe Bewertung (Fragen 3, 9, 14, 19, 31)
    if (specialQuestionsHigh.includes(question.id) && (answer === 3 || answer === 4)) {
      points = 10;
      bonus = true;
      bonusType = 'high';
    }

    // Sonderfragen: mittlere Bewertung (Fragen 16, 32)
    if (specialQuestionsMedium.includes(question.id) && (answer === 3 || answer === 4)) {
      points = 5;
      bonus = true;
      bonusType = 'medium';
    }

    totalScore += points;
    details.push({
      id: question.id,
      text: question.text,
      answer,
      points,
      bonus,
      bonusType,
    });
  });

  return { totalScore, details };
}

/**
 * Bestimmt die Ergebnis-Stufe anhand der Punktzahl
 */
export function getResultLevel(score) {
  for (const level of resultLevels) {
    if (score >= level.min && score <= level.max) {
      return level;
    }
  }
  return resultLevels[resultLevels.length - 1]; // Fallback: höchste Stufe
}
