import { useMemo } from 'react';
import { calculateScore, getResultLevel } from '../utils/scoring';
import { resultLevels, contactsInfo, mobbingInfoText, weitereAngebote, authorLetter } from '../data/results';
import { answerLabels } from '../data/questions';
import { generatePDF } from '../utils/pdfExport';

const stufeColors = ['#4caf50', '#ff9800', '#f44336', '#9c27b0'];

export default function ResultPage({ answers, onRestart }) {
  const { totalScore, details } = useMemo(() => calculateScore(answers), [answers]);
  const level = useMemo(() => getResultLevel(totalScore), [totalScore]);

  const handlePDF = () => {
    generatePDF(totalScore, level, details);
  };

  return (
    <div className="result-page">
      {/* Header mit Score */}
      <div className="result-header">
        <h1>Auswertung</h1>
        <p style={{ color: '#888', marginBottom: '8px' }}>
          Zählen Sie jetzt alle Punkte zusammen. Bei 35 Fragen und der Legende von 0 bis 4
          ergibt sich eine Spanne von 0 (35 x 0) bis 140 (35 x 4).
        </p>
        <div className="result-score">
          <span className="score-number">{totalScore}</span>
          <span className="score-label">
            Gesamt-<br />punktzahl
          </span>
        </div>
        <br />
        <div className="result-level-badge" style={{ background: stufeColors[level.id - 1] }}>
          {level.range}: {level.title}
        </div>
      </div>

      {/* 4 Stufen Übersicht */}
      <div className="result-stufen">
        {resultLevels.map((l, i) => (
          <div
            key={l.id}
            className={`stufe-block ${l.id === level.id ? 'active' : ''}`}
            style={{ background: stufeColors[i] }}
          >
            <div className="stufe-range">{l.range}</div>
            <div className="stufe-title">{l.title}</div>
          </div>
        ))}
      </div>

      {/* Ergebnis-Text */}
      <div className="result-content">
        <h2>{level.range}: {level.title}</h2>
        {level.description.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        {/* Was Sie tun können und sollten (Eltern-Tipps) */}
        {level.parentAdvice && (
          <>
            <h3>Was Sie tun können und sollten:</h3>
            <ul>
              {level.parentAdvice.map((item, i) => (
                <li key={i} style={{ paddingLeft: '24px' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#d63384', fontWeight: 700 }}>
                    {i + 1}.
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Ihr Kind sollte ... */}
        {level.childAdvice && (
          <>
            <h3>Ihr Kind sollte ...</h3>
            <ul>
              {level.childAdvice.map((item, i) => (
                <li key={i}>... {item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Was nicht weiterhilft */}
        {level.dontDo && (
          <>
            <h3>Was nicht weiterhilft:</h3>
            <ul className="dont-do-list">
              {level.dontDo.map((item, i) => (
                <li key={i}>{i + 1}. {item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Closing Text */}
        {level.closingText && (
          <>
            {level.closingText.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </>
        )}
      </div>

      {/* Antworten-Übersicht */}
      <div className="result-content">
        <h2>Ihre Antworten im Detail</h2>
        <p>
          <strong>Achtung!</strong> Wir haben einige Sonderfragen eingebaut, die höher bewertet
          werden, weil sie besonders gravierend sind:
        </p>
        <p>
          Wenn Sie bei den <strong>Fragen 3, 9, 14, 19 und 31</strong> eine 3 oder eine 4
          ausgewählt haben, dann geben Sie der jeweiligen Frage bitte <strong>10 Punkte</strong>.
        </p>
        <p>
          Wenn Sie bei den <strong>Fragen 16 und 32</strong> eine 3 oder 4 ausgewählt haben,
          geben Sie bitte je <strong>5 Punkte</strong>.
        </p>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '16px',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Nr.</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Aussage</th>
              <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Antwort</th>
              <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Punkte</th>
            </tr>
          </thead>
          <tbody>
            {details.map(d => (
              <tr key={d.id} style={{
                background: d.bonus ? (d.bonusType === 'high' ? '#fff0f0' : '#fff8e1') : 'white'
              }}>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid #eee', fontWeight: 700, color: '#d63384' }}>
                  {d.id}.
                </td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid #eee', color: '#555' }}>
                  {d.text}
                </td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                  {d.answer} – {answerLabels[d.answer]?.label}
                </td>
                <td style={{
                  padding: '8px 10px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center',
                  fontWeight: d.bonus ? 700 : 400,
                  color: d.bonus ? '#e74c3c' : '#555'
                }}>
                  {d.points}{d.bonus ? ' ★' : ''}
                </td>
              </tr>
            ))}
            <tr style={{ background: '#f5f5f5', fontWeight: 700 }}>
              <td colSpan="3" style={{ padding: '12px 10px', textAlign: 'right', fontSize: '16px' }}>
                Gesamtpunktzahl:
              </td>
              <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '20px', color: '#d63384' }}>
                {totalScore}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Kontakte */}
      <div className="contacts-section">
        <h2>Kontakte, Information</h2>
        <p>{contactsInfo.intro}</p>

        <h3>Hilfe + Beratung:</h3>
        {contactsInfo.helpLinks.map((link, i) => (
          <div key={i}>
            {link.url ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
            ) : (
              <p>{link.label}: {link.phone}</p>
            )}
          </div>
        ))}

        <h3>Wissen + Info:</h3>
        {contactsInfo.infoLinks.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobbing Info (Seite 11 links) */}
      <div className="mobbing-info-section">
        <h2>{mobbingInfoText.title}</h2>
        {mobbingInfoText.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p className="mobbing-info-closing">
          {mobbingInfoText.closing.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
      </div>

      {/* Weitere Angebote (Seite 12) */}
      <div className="weitere-angebote-section">
        <h2>{weitereAngebote.title1}</h2>

        <h3>{weitereAngebote.buecher.title}</h3>
        <ul className="angebote-list">
          {weitereAngebote.buecher.items.map((b, i) => (
            <li key={i}>{b.name}, {b.verlag}</li>
          ))}
        </ul>
        <p>{weitereAngebote.buecher.description}</p>

        <h3>{weitereAngebote.tests1.title}</h3>
        {weitereAngebote.tests1.items.map((t, i) => (
          <div key={i} className="angebote-test-item">
            <strong>{t.name}</strong>
            {t.description && <span> – {t.description}</span>}
          </div>
        ))}

        <h2 style={{ marginTop: '32px' }}>{weitereAngebote.title2}</h2>
        <h3>{weitereAngebote.tests2.title}</h3>
        {weitereAngebote.tests2.items.map((t, i) => (
          <div key={i} className="angebote-test-item">
            <strong>{t.name}</strong>
            {t.description && <span> – {t.description}</span>}
          </div>
        ))}

        <div className="angebote-contact">
          <p>{weitereAngebote.contact.websiteIntro} <a href={`https://${weitereAngebote.contact.website}`} target="_blank" rel="noopener noreferrer">{weitereAngebote.contact.website}</a></p>
          <p>{weitereAngebote.contact.messageIntro}</p>
          <p>Mobil/WhatsApp/SMS: {weitereAngebote.contact.phone}</p>
          <p>E-Mail: <a href={`mailto:${weitereAngebote.contact.email}`}>{weitereAngebote.contact.email}</a></p>
        </div>
      </div>

      {/* Autorenbrief (Seite 13) */}
      <div className="author-letter-section">
        <div className="author-greeting">
          {authorLetter.greeting.split('\n').map((line, i) => (
            <h2 key={i}>{line}</h2>
          ))}
        </div>
        {authorLetter.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p className="author-signature">
          {authorLetter.signature.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <div className="author-contact">
          <p>{authorLetter.contact.intro}</p>
          <p>Festnetz: {authorLetter.contact.festnetz}</p>
          <p>Mobil/WhatsApp/SMS: {authorLetter.contact.mobil}</p>
          <p>E-Mail: <a href={`mailto:${authorLetter.contact.email}`}>{authorLetter.contact.email}</a></p>
          <p>Webseite: <a href={`https://${authorLetter.contact.website}`} target="_blank" rel="noopener noreferrer">{authorLetter.contact.website}</a></p>
        </div>
      </div>

      {/* Aktions-Buttons */}
      <div className="result-actions">
        <button className="btn-pdf" onClick={handlePDF}>
          Als PDF herunterladen
        </button>
        <button className="btn-restart" onClick={onRestart}>
          Test wiederholen
        </button>
      </div>
    </div>
  );
}
