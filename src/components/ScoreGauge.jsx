import { useEffect, useState } from 'react';

const ZONES = [
  { label: '0–49', color: '#4caf50', max: 49 },
  { label: '50–99', color: '#ff9800', max: 99 },
  { label: '100–149', color: '#f44336', max: 149 },
  { label: '150+', color: '#9c27b0', max: 200 },
];

const MAX_SCORE = 200;
const START_ANGLE = -210;
const END_ANGLE = 30;
const ARC_RANGE = END_ANGLE - START_ANGLE; // 240 degrees

export default function ScoreGauge({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const target = Math.min(score, MAX_SCORE);
    const duration = 1200;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [score]);

  const cx = 140, cy = 140, r = 110;
  const strokeWidth = 20;

  const polarToCartesian = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (startAngle, endAngle) => {
    const start = polarToCartesian(endAngle);
    const end = polarToCartesian(startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  };

  // Draw zone arcs
  const zoneArcs = [];
  let prevMax = 0;
  ZONES.forEach((zone, i) => {
    const startFrac = prevMax / MAX_SCORE;
    const endFrac = zone.max / MAX_SCORE;
    const startA = START_ANGLE + startFrac * ARC_RANGE;
    const endA = START_ANGLE + endFrac * ARC_RANGE;
    zoneArcs.push(
      <path
        key={i}
        d={describeArc(startA, endA)}
        fill="none"
        stroke={zone.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.25}
      />
    );
    prevMax = zone.max;
  });

  // Needle angle
  const needleFrac = Math.min(animatedScore / MAX_SCORE, 1);
  const needleAngle = START_ANGLE + needleFrac * ARC_RANGE;
  const needleEnd = polarToCartesian(needleAngle);
  // Shorter needle origin (from center toward edge)
  const needleLen = r - 20;
  const needleRad = (needleAngle * Math.PI) / 180;
  const nx = cx + needleLen * Math.cos(needleRad);
  const ny = cy + needleLen * Math.sin(needleRad);

  // Active zone highlight
  const activeZoneIdx = ZONES.findIndex(z => animatedScore <= z.max);
  const activeArcs = [];
  let pMax = 0;
  ZONES.forEach((zone, i) => {
    if (i <= activeZoneIdx) {
      const startFrac2 = pMax / MAX_SCORE;
      const scoreFrac = i < activeZoneIdx ? zone.max / MAX_SCORE : Math.min(animatedScore / MAX_SCORE, zone.max / MAX_SCORE);
      const startA2 = START_ANGLE + startFrac2 * ARC_RANGE;
      const endA2 = START_ANGLE + scoreFrac * ARC_RANGE;
      if (endA2 > startA2) {
        activeArcs.push(
          <path
            key={`active-${i}`}
            d={describeArc(startA2, endA2)}
            fill="none"
            stroke={zone.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={0.85}
          />
        );
      }
    }
    pMax = zone.max;
  });

  return (
    <div className="score-gauge" role="img" aria-label={`Punktzahl: ${score} von ${MAX_SCORE}`}>
      <svg viewBox="0 0 280 200" width="280" height="200">
        {/* Background arcs */}
        {zoneArcs}
        {/* Active filled arcs */}
        {activeArcs}
        {/* Needle */}
        <line
          x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="#333"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="8" fill="#333" />
        <circle cx={cx} cy={cy} r="4" fill="white" />
        {/* Score text */}
        <text x={cx} y={cy + 40} textAnchor="middle" fontSize="36" fontWeight="700" fill="#d63384">
          {animatedScore}
        </text>
        <text x={cx} y={cy + 55} textAnchor="middle" fontSize="11" fill="#888">
          Punkte
        </text>
      </svg>
      {/* Zone labels below */}
      <div className="gauge-zones">
        {ZONES.map((zone, i) => (
          <span
            key={i}
            className={`gauge-zone-label ${animatedScore <= zone.max && (i === 0 || animatedScore > ZONES[i - 1].max) ? 'active' : ''}`}
            style={{ color: zone.color }}
          >
            {zone.label}
          </span>
        ))}
      </div>
    </div>
  );
}
