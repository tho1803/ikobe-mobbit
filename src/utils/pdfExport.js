import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);
import { answerLabels } from '../data/questions';
import { contactsInfo, mobbingInfoText, weitereAngebote, authorLetter } from '../data/results';

const PINK = [214, 51, 132];
const GRAY = [85, 85, 85];
const BLACK = [51, 51, 51];
const LIGHT_PINK = [253, 242, 247];

// Sanitize text for jsPDF (helvetica doesn't support many Unicode chars)
function s(text) {
  if (!text) return '';
  return String(text)
    .replace(/\u2713/g, 'v')       // ✓ -> v
    .replace(/\u2605/g, '*')       // ★ -> *
    .replace(/\u2192/g, '->')      // → -> ->
    .replace(/\u2190/g, '<-')      // ← -> <-
    .replace(/\u2013/g, '-')       // – (en dash) -> -
    .replace(/\u2014/g, '--')      // — (em dash) -> --
    .replace(/\u201E/g, '"')       // „ -> "
    .replace(/\u201C/g, '"')       // " -> "
    .replace(/\u201D/g, '"')       // " -> "
    .replace(/\u00D7/g, 'x')      // × -> x
    .replace(/\u2026/g, '...')     // … -> ...
    .replace(/\u2019/g, "'")       // ' -> '
    .replace(/\u2018/g, "'");      // ' -> '
}

function addHeader(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Logo bars
  const barColors = [
    [139, 195, 74],
    [255, 152, 0],
    [233, 30, 99],
    [33, 150, 243],
    [156, 39, 176],
  ];
  const barHeights = [10, 16, 7, 20, 13];
  let x = 14;
  barColors.forEach((color, i) => {
    doc.setFillColor(...color);
    doc.roundedRect(x, 12 + (20 - barHeights[i]), 3.5, barHeights[i], 1, 1, 'F');
    x += 5;
  });

  // IKOBE text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...BLACK);
  doc.text('IKOBE', x + 2, 26);

  // URL
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('www.ikobe.de', pageWidth - 14, 26, { align: 'right' });

  // Line
  doc.setDrawColor(230, 230, 230);
  doc.line(14, 35, pageWidth - 14, 35);

  return 40;
}

function addFooter(doc, pageNum) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(230, 230, 230);
  doc.line(14, pageHeight - 18, pageWidth - 14, pageHeight - 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Der MOBBIT - Mobbing fruehzeitig erkennen', 14, pageHeight - 12);
  doc.text('(c) Copyright - Alle Rechte bei IKOBE', pageWidth / 2, pageHeight - 12, { align: 'center' });
  doc.text(`Seite ${pageNum}`, pageWidth - 14, pageHeight - 12, { align: 'right' });
}

function checkPageBreak(doc, y, needed = 30) {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + needed > pageHeight - 25) {
    addFooter(doc, doc.internal.getNumberOfPages());
    doc.addPage();
    return addHeader(doc);
  }
  return y;
}

function addSectionTitle(doc, title, y, contentWidth) {
  y = checkPageBreak(doc, y, 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...PINK);
  doc.text(s(title), 14, y);
  return y + 8;
}

function addSubTitle(doc, title, y) {
  y = checkPageBreak(doc, y, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BLACK);
  doc.text(s(title), 14, y);
  return y + 7;
}

function addParagraph(doc, text, y, contentWidth) {
  y = checkPageBreak(doc, y, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  const lines = doc.splitTextToSize(s(text), contentWidth);
  doc.text(lines, 14, y);
  return y + lines.length * 4 + 4;
}

export function generatePDF(totalScore, level, details) {
  try {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 28;
  let pageNum = 1;

  // === PAGE 1: Deckblatt ===
  let y = addHeader(doc);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  doc.text(s('Pädagogik-Power'), pageWidth / 2, y + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(s('für Eltern von schulpflichtigen Kindern'), pageWidth / 2, y + 12, { align: 'center' });
  doc.text(s('für Lehrkräfte und pädagogisches Personal'), pageWidth / 2, y + 18, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('DER MOBBIT', pageWidth / 2, y + 38, { align: 'center' });

  doc.setTextColor(...PINK);
  doc.setFontSize(16);
  doc.text(s('Mobbing frühzeitig erkennen'), pageWidth / 2, y + 50, { align: 'center' });

  doc.setTextColor(...GRAY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Auswertungsbericht', pageWidth / 2, y + 65, { align: 'center' });

  // Score box
  const boxY = y + 80;
  doc.setFillColor(...LIGHT_PINK);
  doc.roundedRect(pageWidth / 2 - 40, boxY, 80, 35, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(...PINK);
  doc.text(String(totalScore), pageWidth / 2, boxY + 20, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text('Gesamtpunktzahl', pageWidth / 2, boxY + 30, { align: 'center' });

  // Level
  const stufeColors = [[76, 175, 80], [255, 152, 0], [244, 67, 54], [156, 39, 176]];
  const levelColor = stufeColors[level.id - 1];
  doc.setFillColor(...levelColor);
  doc.roundedRect(14, boxY + 45, contentWidth, 14, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(s(`${level.range}: ${level.title}`), pageWidth / 2, boxY + 54, { align: 'center' });

  // Date
  const todayStr = new Date().toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(`Erstellt am: ${todayStr}`, pageWidth / 2, boxY + 70, { align: 'center' });

  addFooter(doc, pageNum);

  // === PAGE 2: Antworten-Tabelle ===
  doc.addPage();
  pageNum++;
  y = addHeader(doc);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...PINK);
  doc.text('Ihre Antworten im Detail', 14, y + 5);
  y += 12;

  // Sonderfragen-Hinweis
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  const hinweis = 'Achtung! Sonderfragen 3, 9, 14, 19, 31: bei Antwort 3/4 -> 10 Punkte. Fragen 16, 32: bei Antwort 3/4 -> 5 Punkte.';
  doc.text(s(hinweis), 14, y);
  y += 6;

  const tableData = details.map(d => [
    String(d.id),
    s(d.text),
    s(`${d.answer} - ${answerLabels[d.answer]?.label || ''}`),
    `${d.points}${d.bonus ? ' *' : ''}`,
  ]);

  tableData.push(['', '', 'Gesamtpunktzahl:', String(totalScore)]);

  doc.autoTable({
    startY: y,
    head: [['Nr.', 'Aussage', 'Antwort', 'Pkt.']],
    body: tableData,
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
      textColor: GRAY,
      lineColor: [230, 230, 230],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: PINK,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center', fontStyle: 'bold', textColor: PINK },
      1: { cellWidth: 95 },
      2: { cellWidth: 45, halign: 'center' },
      3: { cellWidth: 15, halign: 'center' },
    },
    didParseCell: function(data) {
      if (data.section === 'body' && data.row.index < details.length) {
        const detail = details[data.row.index];
        if (detail && detail.bonus) {
          data.cell.styles.fillColor = detail.bonusType === 'high' ? [255, 240, 240] : [255, 248, 225];
        }
      }
      if (data.section === 'body' && data.row.index === details.length) {
        data.cell.styles.fillColor = [245, 245, 245];
        data.cell.styles.fontStyle = 'bold';
        if (data.column.index === 3) {
          data.cell.styles.textColor = PINK;
          data.cell.styles.fontSize = 10;
        }
      }
    },
    margin: { left: 14, right: 14 },
  });

  addFooter(doc, pageNum);

  // === PAGE 3+: Ergebnis-Interpretation ===
  doc.addPage();
  pageNum++;
  y = addHeader(doc);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...PINK);
  doc.text(s(`${level.range}:`), 14, y + 5);
  y += 12;
  doc.setFontSize(14);
  doc.text(s(level.title), 14, y);
  y += 12;

  // Description
  const descParagraphs = level.description.split('\n\n');
  for (const para of descParagraphs) {
    y = addParagraph(doc, para, y, contentWidth);
  }

  // Parent advice
  if (level.parentAdvice) {
    y = addSubTitle(doc, 'Was Sie tun können und sollten:', y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    level.parentAdvice.forEach((item, i) => {
      y = checkPageBreak(doc, y, 15);
      const lines = doc.splitTextToSize(s(`${i + 1}. ${item}`), contentWidth - 5);
      doc.text(lines, 16, y);
      y += lines.length * 4 + 3;
    });
  }

  // Child advice
  if (level.childAdvice) {
    y = addSubTitle(doc, 'Ihr Kind sollte ...', y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    level.childAdvice.forEach((item) => {
      y = checkPageBreak(doc, y, 12);
      const lines = doc.splitTextToSize(s(`... ${item}`), contentWidth - 5);
      doc.text(lines, 16, y);
      y += lines.length * 4 + 2;
    });
  }

  // Don't do
  if (level.dontDo) {
    y = addSubTitle(doc, 'Was nicht weiterhilft:', y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    level.dontDo.forEach((item, i) => {
      y = checkPageBreak(doc, y, 12);
      const lines = doc.splitTextToSize(s(`${i + 1}. ${item}`), contentWidth - 5);
      doc.text(lines, 16, y);
      y += lines.length * 4 + 3;
    });
  }

  // Closing text
  if (level.closingText) {
    y += 4;
    const closingParagraphs = level.closingText.split('\n\n');
    for (const para of closingParagraphs) {
      y = addParagraph(doc, para, y, contentWidth);
    }
  }

  // === Contacts Section ===
  y = checkPageBreak(doc, y, 60);
  y += 6;
  y = addSectionTitle(doc, 'Kontakte, Information', y, contentWidth);

  const introLines = doc.splitTextToSize(s(contactsInfo.intro), contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(introLines, 14, y);
  y += introLines.length * 4 + 6;

  y = addSubTitle(doc, 'Hilfe + Beratung:', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  contactsInfo.helpLinks.forEach(link => {
    y = checkPageBreak(doc, y, 8);
    if (link.url) {
      doc.setTextColor(...PINK);
      doc.textWithLink(s(link.label), 14, y, { url: link.url });
    } else {
      doc.setTextColor(...GRAY);
      doc.text(s(`${link.label}: ${link.phone}`), 14, y);
    }
    y += 5;
  });

  y += 4;
  y = addSubTitle(doc, 'Wissen + Info:', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  contactsInfo.infoLinks.forEach(link => {
    y = checkPageBreak(doc, y, 8);
    doc.setTextColor(...PINK);
    doc.textWithLink(s(link.label), 14, y, { url: link.url });
    y += 5;
  });

  // === Mobbing Info (Seite 11) ===
  doc.addPage();
  y = addHeader(doc);
  y = addSectionTitle(doc, mobbingInfoText.title, y, contentWidth);

  for (const para of mobbingInfoText.paragraphs) {
    y = addParagraph(doc, para, y, contentWidth);
  }

  y = checkPageBreak(doc, y, 12);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...BLACK);
  const closingLines = mobbingInfoText.closing.split('\n');
  closingLines.forEach(line => {
    doc.text(s(line), 14, y);
    y += 5;
  });

  // === Weitere Angebote (Seite 12) ===
  y += 8;
  y = checkPageBreak(doc, y, 40);
  y = addSectionTitle(doc, weitereAngebote.title1, y, contentWidth);

  y = addSubTitle(doc, weitereAngebote.buecher.title, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  weitereAngebote.buecher.items.forEach(b => {
    y = checkPageBreak(doc, y, 8);
    doc.text(s(`v  ${b.name}, ${b.verlag}`), 16, y);
    y += 5;
  });
  y += 2;
  y = addParagraph(doc, weitereAngebote.buecher.description, y, contentWidth);

  y = addSubTitle(doc, weitereAngebote.tests1.title, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  weitereAngebote.tests1.items.forEach(t => {
    y = checkPageBreak(doc, y, 12);
    const text = t.description ? `v  ${t.name} - ${t.description}` : `v  ${t.name}`;
    const lines = doc.splitTextToSize(s(text), contentWidth - 5);
    doc.text(lines, 16, y);
    y += lines.length * 4 + 2;
  });

  y += 6;
  y = checkPageBreak(doc, y, 30);
  y = addSectionTitle(doc, weitereAngebote.title2, y, contentWidth);
  y = addSubTitle(doc, weitereAngebote.tests2.title, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  weitereAngebote.tests2.items.forEach(t => {
    y = checkPageBreak(doc, y, 12);
    const text = t.description ? `v  ${t.name} - ${t.description}` : `v  ${t.name}`;
    const lines = doc.splitTextToSize(s(text), contentWidth - 5);
    doc.text(lines, 16, y);
    y += lines.length * 4 + 2;
  });

  y += 6;
  y = checkPageBreak(doc, y, 20);
  doc.setDrawColor(230, 230, 230);
  doc.line(14, y, pageWidth - 14, y);
  y += 6;
  y = addParagraph(doc, `${weitereAngebote.contact.websiteIntro} ${weitereAngebote.contact.website}`, y, contentWidth);
  y = addParagraph(doc, weitereAngebote.contact.messageIntro, y, contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(s(`Mobil/WhatsApp/SMS: ${weitereAngebote.contact.phone}`), 14, y);
  y += 5;
  doc.text(s(`E-Mail: ${weitereAngebote.contact.email}`), 14, y);
  y += 8;

  // === Autorenbrief (Seite 13) ===
  doc.addPage();
  y = addHeader(doc);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...PINK);
  const greetingLines = authorLetter.greeting.split('\n');
  greetingLines.forEach(line => {
    doc.text(s(line), 14, y);
    y += 7;
  });
  y += 4;

  for (const para of authorLetter.paragraphs) {
    y = addParagraph(doc, para, y, contentWidth);
  }

  y += 4;
  y = checkPageBreak(doc, y, 20);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  const sigLines = authorLetter.signature.split('\n');
  sigLines.forEach(line => {
    doc.text(s(line), 14, y);
    y += 6;
  });

  y += 8;
  y = checkPageBreak(doc, y, 30);
  y = addParagraph(doc, authorLetter.contact.intro, y, contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(s(`Festnetz: ${authorLetter.contact.festnetz}`), 14, y); y += 5;
  doc.text(s(`Mobil/WhatsApp/SMS: ${authorLetter.contact.mobil}`), 14, y); y += 5;
  doc.text(s(`E-Mail: ${authorLetter.contact.email}`), 14, y); y += 5;
  doc.text(s(`Webseite: ${authorLetter.contact.website}`), 14, y); y += 5;

  // Add footer to all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i);
  }

  // Save
  doc.save(`MOBBIT_Auswertung_${today()}.pdf`);
  } catch (error) {
    console.error('PDF-Generierung fehlgeschlagen:', error);
    alert(`PDF konnte nicht erstellt werden: ${error.message}`);
  }
}

function today() {
  return new Date().toISOString().slice(0, 10);
}
