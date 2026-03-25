// Ergebnis-Texte exakt aus der PDF übernommen

export const resultLevels = [
  {
    id: 1,
    range: "0 – 49 Punkte",
    title: "Entwarnung! Kein Hinweis auf Mobbing.",
    color: "#e91e8b",
    description: `Auch wenn ein bestimmter Verdacht oder eine Befürchtung Sie veranlasst haben, diesen Test zu machen: Wir können Entwarnung geben! So gut wie nichts deutet darauf hin, dass Ihr Kind gemobbt wird.

Selbstverständlich gibt es in der Schule oder unter Freunden und Freundinnen von Zeit zu Zeit Streit, und man wird auch einmal nicht zu einer Party oder einem anderen Event eingeladen. Auch gibt es unter Gleichaltrigen immer wieder Beleidigungen, auch mal ein Pausenhof-Gerangel, und es gibt Phasen, wo sich Mädels und Jungs gegenüber anderen richtig mies benehmen. All das ist sicher nicht schön und kann frustrierend und demütigend sein, ist aber insgesamt kindlicher und jugendlicher Alltag und gehört zu einer gesunden Entwicklung dazu, die auch den Umgang mit Niederlagen, Konflikten und Rückschlägen beinhaltet (Resilienz, Ambiguitätstoleranz). All das ist aber noch kein Mobbing per definitionem. Mobbing ist eine ganz andere, viel heftigere Kategorie. Wenn Sie sich informieren möchten, haben wir auf Seite 11 empfehlenswerte Links zusammengestellt.

Danke für Ihre Teilnahme am Test. Wir wünschen Ihrem Kind, dass es weiterhin von Mobbing verschont bleibt und sich gesund entwickeln kann. Da wir unsere Angebote stets weiterentwickeln, sind Ihre Fragen und Kritik jederzeit willkommen.`,
    parentAdvice: null,
    childAdvice: null,
    dontDo: null,
    min: 0,
    max: 49,
  },
  {
    id: 2,
    range: "50 – 99 Punkte",
    title: "Leichtes Mobbing-Potenzial vorhanden",
    color: "#e91e8b",
    description: `Die Situation ist nicht dramatisch, aber Sie sollten die Entwicklung beobachten und mit Ihrem Kind sprechen. Potenzial heißt in diesem Fall, dass Ihr Kind noch nicht gemobbt wird im engeren Sinne. Aber es passieren Dinge, die mit Mobbing in Verbindung stehen, vor allem dann, wenn sie gleichzeitig und immer wieder und regelmäßig vorkommen, wie zum Beispiel Gemeinheiten, Sticheleien, Beleidigungen, Ausschluss aus Gruppen, "Alle oder Viele gegen Eine oder Einen", Sachbeschädigungen (Kleidung, Schulmaterial), stressbedingte körperliche Symptome bei Ihrem Kind, böse Gerüchte, kompromittierende Fotos auf Social Media usw.. Das scheint bei Ihrem Kind bereits jetzt schon immer wieder vorzukommen, noch unregelmäßig und nicht häufig, aber wahrnehmbar.

Besonders wichtig ist jetzt: Ruhig bleiben und auf keinen Fall zusätzlichen Stress erzeugen!

Mobbing lässt sich am besten durch frühes Eingreifen bzw. Reagieren stoppen. Sprechen Sie mit Ihrem Kind über die Dinge, die es erlebt und als besonders belastend empfindet, nehmen Sie es ernst, bleiben Sie selbst ruhig dabei, geben Sie Rückendeckung und gute Tipps.

Hier ein paar Vorschläge, wenn der Verdacht besteht, es könnte sich eine Mobbing-Situation entwickeln.`,
    parentAdvice: null,
    childAdvice: [
      "Mobbing-verdächtige Ereignisse dokumentieren und so früh wie möglich gegensteuern.",
      "sich nicht selbst die Schuld geben, denn es ist nicht Schuld an der Situation.",
      "sich Verbündete und Unterstützer*innen suchen (auch wenn ihr oder ihm eher nach Rückzug zumute ist).",
      "sich nicht schämen,  das kann nämlich jedem und jeder passieren.",
      "andere mit einbeziehen, um die Möglichkeit zu erhöhen, dass sich Widerstand gegen die Mobbingversuche bildet.",
      "ein Mobbing-Tagebuch führen, um später bei eventuellen Beratungs-Gesprächen vorbereitet zu sein.",
      "einen Plan entwickeln, was zu tun ist, wenn sich die Situation verschlechtert.",
      "im Internet und auf Social Media vorsichtig sein mit der Weitergabe von persönlichen Daten wie Name, Adresse, Bildern und Filmen. Sie sind das Material für Cyber-Mobbing. Empfehlenswerte Links haben wir unten für Sie zusammengestellt.",
    ],
    closingText: `Danke für Ihre Teilnahme am Test. Wir wünschen Ihrem Kind, dass es ihm oder ihr gelingt, die negativen Erlebnisse zu reduzieren und echtes Mobbing von vornherein abzuwehren. Da wir unsere Angebote stets weiterentwickeln, sind Ihre Fragen und Kritik jederzeit willkommen.`,
    dontDo: null,
    min: 50,
    max: 99,
  },
  {
    id: 3,
    range: "100 – 149 Punkte",
    title: "Eindeutige Zeichen von Mobbing erkennbar",
    color: "#e91e8b",
    description: `Ihr Kind ist starken Mobbing-Versuchen ausgesetzt und spürt bereits die negativen Auswirkungen. Als Eltern müssen Sie jetzt einen nicht ganz einfachen Mittelweg finden zwischen "Ruhe bewahren" und "Situation ernst nehmen".`,
    parentAdvice: [
      "Hören Sie genau hin, wenn Ihr Kind nicht in die Schule gehen will, weil es zum Beispiel Magenschmerzen hat oder in der Nacht Alpträume hatte. Achten Sie darauf, ob sich die Krankheitstage Ihres Kindes auf untypische Art häufen.",
      "Wenden Sie sich zusammen mit Ihrem Kind an weitere vertrauenswürdige, erwachsene Personen, die helfen könnten: z.B. Lehrerin, Schulpsychologe, Beratungsstellen (Kontakte und Links siehe Seite 11).",
      "Bestärken Sie Ihr Kind darin, Kontakt mit Betroffenen im Internet aufzunehmen. Es kann helfen, Selbstbewusstsein wieder zu gewinnen und Wege aus der Opferspirale zu finden.",
      "Statt mit dem Täter oder der Täterin oder deren Eltern Kontakt aufzunehmen (das führt in der Regel zu nichts), die Schule informieren und fordern, dass gehandelt wird. Notfalls immer wieder vorstellig werden.",
      "Wenn Ihr Kind Opfer von Cyber-Mobbing ist, können Sie prüfen lassen, ob Inhalte gelöscht werden müssen. Da Cyber-Mobbing strafbar ist, kommt auch eine Anzeige in Frage.",
      "Ermutigen Sie Ihr Kind, sich sportlich zu betätigen und sich körperlich zu stärken. Besonders geeignet ist ein Selbstverteidigungskurs, denn er kann helfen, sich ganz praktisch und unmittelbar zur Wehr zu setzen, aber auch Selbstvertrauen aufzubauen.",
    ],
    childAdvice: [
      "alle Mobbing-Ereignisse dokumentieren und so gut wie möglich gegensteuern.",
      "sich nicht selbst die Schuld an der Situation geben.",
      "sich Verbündete und Unterstützer*innen suchen (auch wenn ihr oder ihm eher nach Rückzug zumute ist).",
      "sich nicht schämen, das kann nämlich jedem und jeder passieren.",
      "mit Gleichaltrigen in ähnlichen Situationen Kontakt aufnehmen.",
      "mit der/dem Schulpsychologin/Schulpsychologen sprechen.",
      "andere mit einbeziehen, um die Möglichkeit zu erhöhen, dass sich Widerstand gegen die Mobber*innen bildet.",
      "ein Mobbing-Tagebuch führen, um für Beratungs-Gespräche vorbereitet zu sein.",
      "einen Plan entwickeln, was zu tun ist, wenn sich die Situation weiter verschlechtert.",
      "im Internet und auf Social Media keine persönlichen Daten wie Name, Adresse, Bilder und Filme mehr posten. Sie sind das Material für Cyber-Mobbing.",
    ],
    closingText: `Empfehlenswerte Links haben wir unten für Sie zusammengestellt.

Danke für Ihre Teilnahme am Test. Wir wünschen Ihrem Kind, dass es den Turnaround heraus aus der Mobbing-Dynamik schafft und sich persönlich und sozial gesund entwickeln kann. Da wir unsere Angebote stets weiterentwickeln, sind Ihre Fragen und Kritik jederzeit willkommen.`,
    dontDo: null,
    min: 100,
    max: 149,
  },
  {
    id: 4,
    range: "Ab 150 Punkte",
    title: "Mobbing-Alarm!",
    color: "#e91e8b",
    description: `Ihr Kind befindet sich mitten in einer Mobbing-Spirale und steckt in Schwierigkeiten. Viele typische Anzeichen und negative Auswirkungen zeigen sich schon und beeinflussen immer mehr die Schulleistungen und eine gesunde Entwicklung Ihres Kindes. Es braucht jetzt Unterstützung von außen, denn die Erfahrung zeigt, dass es alleine nicht mehr aus der Situation herauskommt, und dass sich eine Lösung auch nicht von alleine ergibt. Machen Sie Ihrem Kind Mut, nehmen Sie es ernst und handeln Sie! Bleiben Sie dabei aber selbst ruhig, besonnen und souverän. Das ist sicher nicht immer einfach, aber gerade jetzt besonders wichtig. Viele Kinder schämen sich, ziehen sich zurück und sind eigentlich nicht bereit, mit anderen über ihre Probleme zu reden. Zugang bekommen Sie am ehesten, wenn Sie ruhig bleiben, Ihr Kind ernst nehmen, selbst souverän wirken und den Eindruck erwecken, dass Sie Ihrem Kind wirklich helfen können.`,
    parentAdvice: [
      "Hören Sie genau hin, wenn Ihr Kind nicht in die Schule gehen will, weil es zum Beispiel Magenschmerzen hat oder in der Nacht Alpträume hatte. Sprechen Sie mit Ihrer Tochter oder Ihrem Sohn darüber.",
      "Wenden Sie sich zusammen mit Ihrem Kind an weitere vertrauenswürdige, erwachsene Personen, die helfen könnten: z.B. Lehrer*in, Schulpsychologin, Beratungsstellen (Links siehe unten).",
      "Bestärken Sie Ihr Kind darin, Kontakt mit Betroffenen im Internet aufzunehmen. Es kann helfen, Selbstbewusstsein wieder zu gewinnen und Wege aus der Opferspirale zu finden.",
      "Statt mit dem Täter oder der Täterin oder deren Eltern Kontakt aufzunehmen (das führt in der Regel zu nichts), die Schule informieren und fordern, dass gehandelt wird. Notfalls immer wieder vorstellig werden.",
      "Protokollieren Sie jeden Übergriff und jedes Mobbing-Ereignis (Mobbing-Tagebuch) zusammen mit Ihrem Kind.",
      "Fordern Sie mobbende Mitschüler*innen oder auch Lehrer*innen schriftlich auf, das unerwünschte Verhalten zu unterlassen.",
      "An Vertrauenslehrer*in oder die Schulleitung wenden. Hat auch das keinen Zweck, die Schulaufsichtsbehörde einschalten.",
      "Suchen Sie sich selbst professionelle Hilfe bei Beratungsstellen.",
      "Wenn Ihr Kind Opfer von Cyber-Mobbing ist, können Sie prüfen lassen, ob Inhalte gelöscht werden müssen. Da Cyber-Mobbing strafbar ist, kommt auch eine Anzeige in Frage.",
      "Ermutigen Sie Ihr Kind, sich sportlich zu betätigen und sich körperlich zu stärken. Besonders geeignet ist ein Selbstverteidigungskurs, denn er kann helfen, sich ganz praktisch und unmittelbar zur Wehr zu setzen, aber auch Selbstvertrauen aufzubauen.",
    ],
    childAdvice: [
      "alle Mobbing-Ereignisse dokumentieren und so gut wie möglich gegensteuern.",
      "sich nicht selbst die Schuld an der Situation geben.",
      "sich Verbündete und Unterstützer*innen suchen (auch wenn ihr oder ihm eher nach Rückzug zumute ist).",
      "sich nicht schämen, das kann nämlich jedem und jeder passieren.",
      "mit Gleichaltrigen in ähnlichen Situationen Kontakt aufnehmen.",
      "mit der/dem Schulpsychologin/Schulpsychologen sprechen.",
      "andere mit einbeziehen, um die Möglichkeit zu erhöhen, dass sich Widerstand gegen die Mobber*innen bildet.",
      "ein Mobbing-Tagebuch führen, um für Beratungs-Gespräche vorbereitet zu sein.",
      "einen Plan entwickeln, was zu tun ist, wenn sich die Situation weiter verschlechtert.",
      "im Internet und auf Social Media keine persönlichen Daten wie Name, Adresse, Bilder und Filme mehr posten. Sie sind das Material für Cyber-Mobbing.",
    ],
    closingText: `Empfehlenswerte Links haben wir auf Seite 11 für Sie zusammengestellt.

Danke für Ihre Teilnahme am Test. Wir wünschen Ihrem Kind, dass es den Turnaround heraus aus der Mobbing-Falle schafft und sich dann persönlich und sozial gesund entwickeln kann. Da wir unsere Angebote stets weiterentwickeln, sind Ihre Fragen und Kritik jederzeit willkommen.`,
    dontDo: [
      "Sich an den oder die Mobber*in und/oder seine/ihre Eltern zu wenden, bringt in der Regel nichts, denn Eltern neigen dazu, sich in jedem Fall auf die Seite der eigenen Kinder zu stellen.",
      "Ein Schulwechsel ist keine Lösung, denn faktisch wird Ihr Kind negativ sanktioniert, während der Mobber oder die Mobberin indirekt belohnt wird. Ziel muss sein, dass die Schule alles tut, um Mobbing nicht zuzulassen.",
      "Moralischen und menschlichen Rückhalt bei Verbündeten in der Klasse oder in anderen Klassen suchen. Das ist riskant und kann nach hinten losgehen.",
    ],
    min: 150,
    max: Infinity,
  },
];

// Seite 11 – Linke Spalte: Allgemeine Infos zum Thema Mobbing
export const mobbingInfoText = {
  title: "Mobbing",
  paragraphs: [
    `Mobbing ist ein ernstes Thema, das Kinder und Jugendliche tiefgreifend betrifft. Es ist wichtig, zu wissen, dass Sie und die Kinder nicht allein sind. Schätzungen zufolge erlebt etwa jedes sechste Kind Mobbing in der Schule. Die Folgen können langfristig sein, sowohl für die Betroffenen als auch für die Mobber.`,
    `Worauf kommt es also an? Drei Stichwörter werden hier genannt: Erkennung, Prävention und Intervention. Es ist entscheidend, Anzeichen von Mobbing frühzeitig zu erkennen: soziale Rückzugstendenzen, unerklärliche körperliche Beschwerden oder eine plötzliche Veränderung im Verhalten können Warnsignale sein. Der MOBBIT hilft Ihnen hier weiter, zu strukturieren und einen Überblick zu gewinnen.`,
    `Prävention beginnt mit einem sicheren und bestärkenden Umfeld, sowohl zu Hause als auch in Bildungseinrichtungen. Kinder sollten lernen, Unterschiede zu respektieren und Empathie zu entwickeln. Konstruktive Kommunikation und soziale Kompetenzen sind Schlüsselkomponenten, die gefördert werden sollten.`,
    `Wenn Mobbing auftritt, ist schnelles Handeln gefragt. Dies bedeutet, die Vorfälle ernst zu nehmen, mit den Kindern ins Gespräch zu kommen und ihnen zu zeigen, dass sie Unterstützung haben. Schulen sollten klare Richtlinien haben, wie mit Mobbing umzugehen ist, und auch außerschulische Unterstützung kann hilfreich sein.`,
    `Zeigen Sie Ihren Kindern, dass ihre Stimme zählt. Ermutigen Sie sie, über ihre Erfahrungen zu sprechen und Hilfe zu suchen, wenn nötig. Gemeinsam können wir eine Gemeinschaft schaffen, die Mobbing entgegenwirkt und allen Kindern und Jugendlichen ermöglicht, sich sicher und akzeptiert zu fühlen.`,
  ],
  closing: `Alles Gute\nIhr IKOBE-Team`,
};

// Seite 12 – Weitere Angebote
export const weitereAngebote = {
  title1: "Pädagogik-Power: Kinder unterstützen bei der Talentsuche, bei Schul- und anderen wichtigen Lebensfragen",
  buecher: {
    title: "Bücher:",
    items: [
      { name: `„Talente entdecken und fördern"`, verlag: "G&U-Verlag" },
      { name: `„Der große Begabungstest"`, verlag: "Moses-Verlag" },
      { name: `„Förder-Guide Talente"`, verlag: "IKOBE Institut" },
    ],
    description: "In unseren Büchern finden Sie viele interessante und hilfreiche Infos zum Thema Talente. In jedem Buch haben wir einen Test integriert, mit dem Sie selbst testen und herausfinden können, wo bei Ihrem Kind Talente schlummern.",
  },
  tests1: {
    title: "Tests:",
    items: [
      { name: "Talentometer", description: "Ein Fragebogen-Check für Eltern und Kinder. Systematisch begeben Sie sich hier auf eine Entdeckungsreise zu den Talenten Ihres Kindes." },
      { name: "BegabungsCheck", description: "Wenn Sie es ganz genau wissen möchten. Mit dem Tages-Assessment BegabungsCheck erhalten Sie einen professionellen, unabhängigen und ganzheitlichen Blick auf das komplette Begabungspotenzial Ihres Kindes." },
      { name: "Der MOBBIT", description: "Wird mein Kind gemobbt? Ein Mobbingtest zur Früherkennung." },
      { name: "T.I.M.O.S.", description: "Der Test zur Erkennung von Internet-, Medien- und Online-Sucht" },
    ],
  },
  title2: "Beratungs-Power: So helfen Sie Jugendlichen, den passenden Traumberuf zu finden",
  tests2: {
    title: "Tests:",
    items: [
      { name: "BerufsCheck", description: null },
      { name: "KompetenzCheck", description: "Zwei Tests zur Berufs- und Studienorientierung, bewährt, professionell, aussagekräftig. Zehntausende von Schülerinnen und Schülern haben bereits von den Empfehlungen profitiert. Schulen, IHK und Stiftungen setzen die Tools erfolgreich ein, um jungen Menschen Perspektiven aufzuzeigen." },
      { name: "CHOOSY", description: "Der Ausbildungs-Weg-Check" },
    ],
  },
  contact: {
    website: "www.ikobe.de",
    websiteIntro: "Das und noch einiges mehr finden Sie auf unserer Internetseite",
    messageIntro: "Wir freuen uns aber auch auf Ihre Nachricht:",
    phone: "0049-173 / 35 90 314",
    email: "tvk@ikobe.de",
  },
};

// Seite 13 – Brief von Thomas von Krafft
export const authorLetter = {
  greeting: "Liebe Eltern,\nLiebe Erzieherinnen und Erzieher,\nLiebe Lehrerinnen und Lehrer,",
  paragraphs: [
    `als Diplom-Sozialpädagoge habe ich mit Hochtalentierten gearbeitet, genauso wie mit Menschen mit Einschränkungen und Behinderungen, im Förderunterricht, in der Musik, im Sport und anderen Bereichen. Gleich nach dem Studium durfte ich einige Jahre bei einem großen Bildungsträger Berufsbildung, Ausbildungsvermittlung und Integration organisieren und durchführen für Jugendliche aus unterschiedlichsten Ländern und Kulturkreisen, in der Großstadt wie auf dem Land. Bis heute bin ich Chorleiter und nehme als aktiver Sänger an verschiedensten Kulturprojekten teil. Vielseitigkeit ist bei meiner Tätigkeit wichtig. So kann ich wirklich „mitreden" und habe mein Wissen nicht nur aus Büchern, Wikipedia und „Prof. KI".`,
    `Seit ich 1998 das youngworld-Institut gegründet habe, aus dem dann 2009 das IKOBE Institut für Kompetenz und Begabung hervorgegangen ist, entwickle ich zusammen mit ausgewiesenen Experten und Expertinnen Testverfahren zur Talentdiagnostik, Studiereignung, Berufs- und Studienorientierung, habe Hunderte Kinder und Jugendliche getestet, beraten und Gutachten erstellt, konnte verschiedenste Seminarkonzepte und Coaching-Methoden kennenlernen und teilweise auch selbst mitentwickeln. Weil ich weiß, wie wichtig das fürs ganze Leben ist!`,
    `Diese geballte Erfahrung gebe ich an alle weiter, die selbst Kinder haben, mit Kindern oder Jugendlichen ehrenamtlich oder professionell arbeiten. Ihre wertvolle „Mission" verdient es, angemessen unterstützt zu werden, durch Werkzeuge, die Ihre Arbeit noch effizienter, hochwertiger und nachhaltiger machen, egal, ob sie Talente bei Kindern entdecken, pädagogisch beraten und tätig sind oder Jugendliche bei der Berufs- und Studienorientierung begleiten.`,
    `Für Ihren professionellen Einsatz: Meine Motivation und mein Ziel ist es, Ihnen mit meinen Testverfahren und auch der Online-Plattform CHECKIDY ein perfektes System an die Hand zu geben, mit dem Sie alles haben, was Sie für Ihre Arbeit brauchen, und sich dadurch voll auf Ihre Aufgaben konzentrieren können.`,
  ],
  signature: "Ihr Thomas von Krafft\nmit IKOBE-Team",
  contact: {
    intro: "Mit unseren Tools und mit der CHECKIDY-Plattform zu arbeiten, ist einfacher und kostengünstiger, als Sie vielleicht denken. Rufen Sie bitte einfach an oder schreiben Sie mir:",
    festnetz: "0049-8333 / 93 58 11",
    mobil: "0049-173 / 35 90 314",
    email: "tvk@ikobe.de",
    website: "www.ikobe.de",
  },
};

export const contactsInfo = {
  title: "Kontakte, Information",
  intro: "Ob es Handlungsbedarf gibt oder nicht, wenn Sie sich weiter informieren wollen, haben wir hier einige Links zusammengestellt.\n\nDie Quellen haben wir geprüft und für gut befunden.",
  helpLinks: [
    { label: "Nummer gegen Kummer", url: "https://www.nummergegenkummer.de", phone: null },
    { label: "Kinder + Jugendliche", url: null, phone: "116 111" },
    { label: "Eltern", url: null, phone: "0800 / 111 0550" },
    { label: "jugend.bke-beratung.de", url: "https://jugend.bke-beratung.de" },
    { label: "www.bke-beratung.de", url: "https://www.bke-beratung.de/" },
    { label: "www.juuuport.de/hilfe/beratung", url: "https://www.juuuport.de/hilfe/beratung" },
  ],
  infoLinks: [
    { label: "Mobbing → Wikipedia", url: "https://de.wikipedia.org/wiki/Mobbing" },
    { label: "Resilienz → Wikipedia", url: "https://de.wikipedia.org/wiki/Resilienz" },
    { label: "Ambiguitätstoleranz → Wikipedia", url: "https://de.wikipedia.org/wiki/Ambiguit%C3%A4tstoleranz" },
    { label: "Sofatutor: Mobbing – Was Eltern tun können", url: "https://magazin.sofatutor.com/eltern/mobbing-was-eltern-tun-koennen/" },
    { label: "wienxtra: Jugendinfo Mobbing", url: "https://www.wienxtra.at/jugendinfo/mobbing/" },
  ],
};
