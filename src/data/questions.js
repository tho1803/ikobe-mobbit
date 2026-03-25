// Alle 35 Fragen des MOBBIT-Fragebogens - exakt aus der PDF übernommen
export const questions = [
  { id: 1, text: "Ihr Kind wirkt ängstlich." },
  { id: 2, text: "Ihr Kind wirkt niedergeschlagen." },
  { id: 3, text: "Ihr Kind kommt aus der Schule mit Schrammen und Verletzungen.", special: "high" },
  { id: 4, text: "Ihr Kind ist leicht reizbar." },
  { id: 5, text: "Die schulischen Leistungen Ihres Kindes lassen nach." },
  { id: 6, text: "Sie haben den Eindruck, Ihr Kind befindet sich in einer Opferrolle." },
  { id: 7, text: "Ihr Kind will nicht in die Schule/zum Verein gehen." },
  { id: 8, text: "Ihr Kind möchte in die Schule gebracht und wieder abgeholt werden." },
  { id: 9, text: "Ihr Kind empört sich über Gemeinheiten seiner Mitschülerinnen und Mitschüler.", special: "high" },
  { id: 10, text: "Ihr Kind vermeidet außerschulische Kontakte." },
  { id: 11, text: "Ihr Kind wird bei Einladungen übergangen." },
  { id: 12, text: "Ihr Kind gibt auf Ihre Fragen ausweichende Antworten." },
  { id: 13, text: "Ihr Kind braucht neue Schulsachen und erklärt z.B., sie verloren zu haben." },
  { id: 14, text: "Ihr Kind kommt mit beschädigten Schulsachen nach Hause.", special: "high" },
  { id: 15, text: "Ihr Kind kommt mit seinem Taschengeld nicht aus." },
  { id: 16, text: "Sie finden Kleidung Ihres Kindes versteckt, beschädigt oder beschmutzt.", special: "medium" },
  { id: 17, text: "Ihr Kind weint, kann oder will den Grund dafür nicht genau benennen." },
  { id: 18, text: "Ihr Kind klagt morgens über Bauchschmerzen." },
  { id: 19, text: "Ihr Kind äußert Suizidgedanken.", special: "high" },
  { id: 20, text: "Ihr Kind kann sich schlecht konzentrieren." },
  { id: 21, text: "Ihr Kind leidet unter Alpträumen." },
  { id: 22, text: "Ihr Kind ist mit seinem Aussehen und/oder Kleidung unzufrieden." },
  { id: 23, text: "Ihr Kind benutzt Wörter und Redewendungen mit sexistischem, rassistischem oder diskriminierendem Charakter." },
  { id: 24, text: "Ihr Kind verschweigt Vorkommnisse in der Schule oder Freizeit, von denen Sie anderweitig erfahren." },
  { id: 25, text: "Sie haben den Eindruck, Ihr Kind hat keine Freunde." },
  { id: 26, text: "Ihr Kind klagt über Schlafprobleme." },
  { id: 27, text: "Ihr Kind hat keinen Appetit." },
  { id: 28, text: "Ihr Kind ist antriebslos." },
  { id: 29, text: "Ihr Kind verbringt freie Zeit überwiegend allein und zurückgezogen." },
  { id: 30, text: "Ihr Kind wirkt eingeschüchtert." },
  { id: 31, text: "Ihr Kind beklagt sich über Gemeinheiten eines Lehrers/einer Lehrerin.", special: "high" },
  { id: 32, text: "Sie bemerken, dass Kleidungsstücke Ihres Kindes fehlen.", special: "medium" },
  { id: 33, text: "Ihr Kind will seinen Geburtstag nicht feiern." },
  { id: 34, text: "Ihr Kind will an Wander- und Projekttagen nicht teilnehmen." },
  { id: 35, text: "Sie erfahren von Falschaussagen über Ihr Kind." },
];

// Antwort-Legende
export const answerLabels = [
  { value: 0, label: "nie / trifft gar nicht zu" },
  { value: 1, label: "selten / trifft kaum zu" },
  { value: 2, label: "manchmal / trifft teilweise zu" },
  { value: 3, label: "oft / trifft weitgehend zu" },
  { value: 4, label: "fast täglich / trifft vollkommen zu" },
];

// Sonderfragen: Fragen 3, 9, 14, 19, 31 → bei Wert 3 oder 4 → 10 Punkte
// Sonderfragen: Fragen 16, 32 → bei Wert 3 oder 4 → 5 Punkte
export const specialQuestionsHigh = [3, 9, 14, 19, 31]; // 10 Punkte bei 3 oder 4
export const specialQuestionsMedium = [16, 32]; // 5 Punkte bei 3 oder 4
