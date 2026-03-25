export default function WelcomePage({ onStart }) {
  return (
    <div className="welcome-page">
      <div className="welcome-hero">
        <p className="tagline"><strong>Pädagogik-Power</strong></p>
        <p className="tagline">für Eltern von schulpflichtigen Kindern</p>
        <p className="tagline">für Lehrkräfte und pädagogisches Personal</p>
        <h1>DER MOBBIT</h1>
        <p className="subtitle">Mobbing frühzeitig erkennen</p>
        <p style={{ fontSize: '17px', color: '#555', marginTop: '16px' }}>
          Strukturierter Fragebogen-Test zum Thema<br />
          „Wird mein Kind gemobbt?"
        </p>
      </div>

      <div className="welcome-content">
        <div>
          <h2>Mobbing – was ist das?</h2>
          <p>
            Mobbing ist eine ernste Sache und für die Betroffenen oft bedrohlich,
            einschüchternd, frustrierend und Energie entziehend. Es kann Freundschaften
            gefährden, Entwicklung bremsen und Noten verschlechtern. Je früher Mobbing
            erkannt wird, desto besser lässt es sich verhindern. Rechtzeitig Bescheid
            zu wissen ist hier entscheidend.
          </p>

          <h3>Das bekommen Sie</h3>
          <p>
            Sie möchten wissen, ob Ihr Kind gemobbt wird? Wenn Sie den Test vollständig
            und ehrlich bearbeiten, erhalten Sie ein aussagekräftiges Feedback zu Ihren
            Beobachtungen und eventuellen Befürchtungen.
          </p>

          <h3>Auswertung</h3>
          <p>
            Sie können die Punktzahl einfach selbst ermitteln. Was dabei zu beachten
            ist, lesen Sie auf Seite 5.
          </p>

          <h3>Ergebnisse</h3>
          <p>
            Wir haben vier Stufen der Mobbing-Situation definiert. Anhand der Punktzahl
            können Sie sofort sehen, wo Ihr Kind im Moment steht und was Sie jetzt tun
            können.
          </p>
        </div>

        <div>
          <h2>Wichtig für die Bearbeitung</h2>
          <ul>
            <li>
              nehmen Sie sich ca. 10 Min. Zeit an einem ungestörten, ruhigen Ort
            </li>
            <li>
              Seien Sie sich und Ihrem Kind gegenüber ehrlich, um ein möglichst
              objektives Bild zu bekommen. Sie können den Fragebogen auch gemeinsam
              bearbeiten.
            </li>
          </ul>

          <h2 style={{ marginTop: '30px' }}>Inhalt</h2>
          <div className="welcome-toc">
            <table>
              <tbody>
                <tr><td>Fragebogen-Test</td><td>35 Fragen</td></tr>
                <tr><td>Auswertung</td><td>Automatisch</td></tr>
                <tr><td>Ergebnis, Interpretation, Hinweise</td><td>4 Stufen</td></tr>
                <tr><td>Kontakte und Links</td><td>Hilfsangebote</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="start-section">
          <button className="btn-start" onClick={onStart}>
            Fragebogen starten
          </button>
        </div>
      </div>
    </div>
  );
}
