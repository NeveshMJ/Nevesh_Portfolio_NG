import { useId } from 'react'
import { asset } from '../../utils/assets'
import './ProjectCover.css'

/* Original artwork for each project, drawn in a 400×400 box with the subject kept in the centre
   so it survives both the landscape (16:9) and portrait (2:3) crops. Each piece follows the same
   recipe: one glowing focal object, framing brackets, and a single slow animation. */

const polar = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}
const arc = (cx, cy, r, a0, a1) => {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`
}

function Backdrop({ id, c1, c2, grid = false }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-g1`} cx="25%" cy="20%" r="75%"><stop offset="0" stopColor={c1} stopOpacity=".42" /><stop offset="1" stopColor={c1} stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-g2`} cx="85%" cy="90%" r="70%"><stop offset="0" stopColor={c2} stopOpacity=".38" /><stop offset="1" stopColor={c2} stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%"><stop offset="0" stopColor={c1} stopOpacity=".35" /><stop offset="1" stopColor={c1} stopOpacity="0" /></radialGradient>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#fff" strokeOpacity=".06" /></pattern>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="400" height="400" fill="#0a0a10" />
      <rect width="400" height="400" fill={`url(#${id}-g1)`} />
      <rect width="400" height="400" fill={`url(#${id}-g2)`} />
      {grid && <rect width="400" height="400" fill={`url(#${id}-grid)`} />}
    </>
  )
}

const Stage = ({ children }) => <g transform="translate(200 170) scale(.8) translate(-200 -200)">{children}</g>
const mono = { fontFamily: 'var(--font-mono)', letterSpacing: '.12em' }

/** Corner brackets framing the focal object — the Age Lens signature. */
const Brackets = ({ x0 = 104, y0 = 90, x1 = 296, y1 = 310, len = 22 }) =>
  [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]].map(([x, y, sx, sy], i) => (
    <path key={i} d={`M${x} ${y + len * sy}V${y}H${x + len * sx}`} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
  ))

/** Expanding ring that pulses out from a point. */
const Pulse = ({ cx, cy, r0 = 40, r1 = 110, color, dur = 3, delay = 0 }) => (
  <circle cx={cx} cy={cy} r={r0} fill="none" stroke={color} strokeWidth="1.5">
    <animate attributeName="r" values={`${r0};${r1}`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
    <animate attributeName="stroke-opacity" values=".7;0" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
  </circle>
)

function SelfHeal({ id, c1, c2 }) {
  /* glossy 3D shield; a heartbeat line inside resolves into a check — "the system heals itself" */
  const shield = 'M200 96l78 28v58c0 56-34 92-78 112-44-20-78-56-78-112v-58z'
  const sparks = [[118, 0], [282, 0.8], [140, 1.6], [262, 2.4], [200, 3.2]]
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <defs>
        <linearGradient id={`${id}-sh`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5ff0b0" /><stop offset=".55" stopColor={c1} /><stop offset="1" stopColor="#0b4a37" /></linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b4a37" /><stop offset="1" stopColor="#04241b" /></linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <Stage>
      <circle cx="200" cy="200" r="160" fill={`url(#${id}-halo)`} />
      {/* rotating segmented rings */}
      <circle cx="200" cy="200" r="138" fill="none" stroke={c1} strokeOpacity=".55" strokeWidth="3" strokeDasharray="60 18 8 18" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="18s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="122" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" strokeDasharray="2 8">
        <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="26s" repeatCount="indefinite" />
      </circle>
      {/* floor shadow + extruded side + face + gloss */}
      <ellipse cx="200" cy="322" rx="70" ry="10" fill="#000" opacity=".55" />
      <path d={shield} transform="translate(8 10)" fill={`url(#${id}-side)`} />
      <path d={shield} fill={`url(#${id}-sh)`} filter={`url(#${id}-glow)`} />
      <path d="M200 108l66 24v42c-40 14-92 14-132 0v-42z" fill={`url(#${id}-gloss)`} />
      <path d={shield} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
      {/* heartbeat → check */}
      <path d="M140 204h24l10-22 14 44 12-30h8l14 16 38-42" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="260" strokeDashoffset="260" filter={`url(#${id}-glow)`}>
        <animate attributeName="stroke-dashoffset" values="260;0;0;260" keyTimes="0;.35;.85;1" dur="4s" repeatCount="indefinite" />
      </path>
      {/* healing sparks rising */}
      {sparks.map(([x, d]) => (
        <g key={x} opacity="0">
          <path d={`M${x} 300v14M${x - 7} 307h14`} stroke={c1} strokeWidth="3.5" strokeLinecap="round" />
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -190" dur="4s" begin={`${d}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" begin={`${d}s`} repeatCount="indefinite" />
        </g>
      ))}
      <text className="art-label" x="200" y="356" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>DETECT · DECIDE · HEAL</text>
    </Stage></>
  )
}

function Lens({ id, c1, c2 }) {
  const pts = [[168, 178], [232, 178], [200, 208], [172, 240], [228, 240], [200, 262], [150, 160], [250, 160], [200, 130]]
  const lines = [[0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [0, 6], [1, 7], [6, 8], [7, 8], [0, 8], [1, 8], [3, 4]]
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <Stage>
      <ellipse cx="200" cy="200" rx="74" ry="98" fill="#fff" fillOpacity=".03" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      {lines.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={c1} strokeOpacity=".7" strokeWidth="1.2" />
      ))}
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.6" fill="#fff" />)}
      <Brackets />
      <rect x="104" y="196" width="192" height="3" fill={c2} opacity=".9"><animate attributeName="y" values="96;300;96" dur="4.5s" repeatCount="indefinite" /></rect>
      {/* two heads: classification histogram + regression marker */}
      <g transform="translate(14 150)" opacity=".9">
        {[10, 18, 34, 56, 78, 60, 36, 20, 12, 8].map((h, i) => <rect key={i} x={i * 7} y={86 - h} width="5" height={h} rx="1.5" fill={c1} fillOpacity={0.35 + h / 140} />)}
        <text className="art-label" x="0" y="102" fontSize="8" fill="#fff" fillOpacity=".6" style={mono}>CLASSIFY</text>
      </g>
      <g transform="translate(316 150)" opacity=".9">
        <line x1="0" y1="50" x2="70" y2="50" stroke="#fff" strokeOpacity=".3" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={i * 11.6} y1="44" x2={i * 11.6} y2="56" stroke="#fff" strokeOpacity=".4" />)}
        <circle cx="38" cy="50" r="6" fill={c2} />
        <text className="art-label" x="0" y="102" fontSize="8" fill="#fff" fillOpacity=".6" style={mono}>REGRESS</text>
      </g>
      <text className="art-label" x="200" y="338" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>AGE · ENSEMBLE OF 3</text>
    </Stage></>
  )
}

/* isometric projection helpers for the 3D city */
const iso = (x, y, z = 0, cx = 200, cy = 196) => [cx + (x - y) * 0.866, cy + (x + y) * 0.5 - z]
const pts = (...p) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
function IsoBox({ x, y, w, d, h, top, left, right }) {
  return (
    <g>
      <polygon points={pts(iso(x, y + d), iso(x + w, y + d), iso(x + w, y + d, h), iso(x, y + d, h))} fill={left} />
      <polygon points={pts(iso(x + w, y), iso(x + w, y + d), iso(x + w, y + d, h), iso(x + w, y, h))} fill={right} />
      <polygon points={pts(iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d, h), iso(x, y + d, h))} fill={top} />
      {/* lit windows */}
      {h > 30 && Array.from({ length: Math.floor(h / 16) }, (_, i) => {
        const [wx, wy] = iso(x + w * 0.5, y + d, 10 + i * 16)
        return <rect key={i} x={wx - 9} y={wy - 3} width="6" height="4" fill="#ffe7a8" opacity={i % 2 ? 0.35 : 0.8} />
      })}
    </g>
  )
}

function Civic({ id, c1, c2 }) {
  /* blocks sorted back-to-front so nearer buildings overlap farther ones */
  const blocks = [
    [8, 8, 26, 26, 54], [44, 6, 22, 22, 34], [100, 8, 26, 26, 70], [130, 14, 20, 20, 40],
    [8, 100, 24, 24, 44], [6, 132, 22, 22, 28], [104, 100, 22, 22, 50], [132, 132, 22, 22, 62], [100, 134, 22, 22, 30],
  ].sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
  const [pinX, pinY] = iso(80, 80)
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <defs>
        <linearGradient id={`${id}-pin`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff5a64" /><stop offset=".6" stopColor="#e50914" /><stop offset="1" stopColor="#831010" /></linearGradient>
      </defs>
      <Stage>
      <circle cx="200" cy="200" r="160" fill={`url(#${id}-halo)`} />
      {/* ground slab */}
      <polygon points={pts(iso(0, 160), iso(160, 160), iso(160, 160, -10), iso(0, 160, -10))} fill="#1b1b26" />
      <polygon points={pts(iso(160, 0), iso(160, 160), iso(160, 160, -10), iso(160, 0, -10))} fill="#14141d" />
      <polygon points={pts(iso(0, 0), iso(160, 0), iso(160, 160), iso(0, 160))} fill="#22222f" stroke="#fff" strokeOpacity=".08" />
      {/* glowing roads */}
      <polygon points={pts(iso(70, 0), iso(90, 0), iso(90, 160), iso(70, 160))} fill={c1} fillOpacity=".22" />
      <polygon points={pts(iso(0, 70), iso(160, 70), iso(160, 90), iso(0, 90))} fill={c1} fillOpacity=".22" />
      <line x1={iso(80, 0)[0]} y1={iso(80, 0)[1]} x2={iso(80, 160)[0]} y2={iso(80, 160)[1]} stroke={c1} strokeWidth="1.5" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" values="0;-24" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1={iso(0, 80)[0]} y1={iso(0, 80)[1]} x2={iso(160, 80)[0]} y2={iso(160, 80)[1]} stroke={c1} strokeWidth="1.5" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" values="0;24" dur="1s" repeatCount="indefinite" />
      </line>
      {blocks.map(([x, y, w, d, h], i) => (
        <IsoBox key={i} x={x} y={y} w={w} d={d} h={h} top="#3a3a4d" left="#262634" right="#1c1c28" />
      ))}
      {/* ripple where the issue was reported */}
      <ellipse cx={pinX} cy={pinY} rx="14" ry="7" fill="none" stroke={c2} strokeWidth="2">
        <animate attributeName="rx" values="10;46" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="ry" values="5;23" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="1;0" dur="2.4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx={pinX} cy={pinY} rx="12" ry="5" fill="#000" opacity=".6" />
      {/* glossy hovering pin */}
      <g filter={`url(#${id}-glow)`}>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="3s" repeatCount="indefinite" />
        <path d={`M${pinX} ${pinY - 14}c0 0-38-38-38-64a38 38 0 0176 0c0 26-38 64-38 64z`} fill={`url(#${id}-pin)`} />
        <circle cx={pinX} cy={pinY - 80} r="17" fill="#0a0a10" />
        <path d={`M${pinX - 10} ${pinY - 74}l7-8 5 5 4-3 6 6z`} fill={c1} />
        <circle cx={pinX + 5} cy={pinY - 86} r="3" fill={c1} />
        <path d={`M${pinX - 26} ${pinY - 92}a30 30 0 0118-16`} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text className="art-label" x="200" y="352" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>REPORT → ROUTE → RESOLVE</text>
    </Stage></>
  )
}

function Review({ id, c1, c2 }) {
  const code = [
    [0, 46, '#8f6bff'], [12, 70, '#5b86ff'], [24, 38, '#3ecf8e'], [24, 58, '#f5b13d'],
    [12, 30, '#5b86ff'], [0, 12, '#8f6bff'], [0, 52, '#5b86ff'], [12, 64, '#3ecf8e'],
  ]
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <defs>
        <linearGradient id={`${id}-win`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f1f2c" /><stop offset="1" stopColor="#12121a" /></linearGradient>
      </defs>
      <Stage>
      <circle cx="200" cy="200" r="160" fill={`url(#${id}-halo)`} />
      {/* cloud behind */}
      <path d="M118 128a34 34 0 0164-14 28 28 0 0150 16 24 24 0 01-2 48H124a26 26 0 01-6-50z" fill={c1} fillOpacity=".14" stroke={c1} strokeOpacity=".5" strokeWidth="1.5" transform="translate(30 -40)" />
      {/* stacked windows for depth */}
      <rect x="128" y="112" width="200" height="170" rx="14" fill="#14141d" stroke="#fff" strokeOpacity=".08" />
      <rect x="110" y="126" width="200" height="170" rx="14" fill="#16161f" stroke="#fff" strokeOpacity=".12" />
      {/* front editor */}
      <g filter={`url(#${id}-glow)`}>
        <rect x="88" y="142" width="210" height="176" rx="14" fill={`url(#${id}-win)`} stroke={c1} strokeOpacity=".7" strokeWidth="1.5" />
      </g>
      <rect x="88" y="142" width="210" height="26" rx="14" fill="#262636" />
      {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => <circle key={c} cx={104 + i * 13} cy="155" r="4" fill={c} />)}
      {/* diff highlights */}
      <rect x="96" y="204" width="194" height="14" rx="3" fill="#3ecf8e" fillOpacity=".16" />
      <rect x="96" y="246" width="194" height="14" rx="3" fill="#e50914" fillOpacity=".16" />
      {code.map(([indent, w, c], i) => (
        <g key={i} transform={`translate(${104 + indent} ${182 + i * 15})`}>
          <rect width="12" height="5" rx="2.5" fill="#fff" fillOpacity=".2" />
          <rect x="16" width={w} height="5" rx="2.5" fill={c} fillOpacity=".85" />
        </g>
      ))}
      <rect x="96" y="178" width="194" height="2" fill={c2} opacity=".8"><animate attributeName="y" values="176;306;176" dur="5s" repeatCount="indefinite" /></rect>
      {/* review badge */}
      <g transform="translate(286 136)" filter={`url(#${id}-glow)`}>
        <animateTransform attributeName="transform" type="translate" values="286 136;286 128;286 136" dur="3s" repeatCount="indefinite" />
        <circle r="26" fill="#3ecf8e" />
        <path d="M-11 0l7 8 15-16" fill="none" stroke="#0a0a10" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text className="art-label" x="200" y="352" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>SUBMIT · REVIEW · TEST</text>
    </Stage></>
  )
}

function Bin({ id, c1, c2 }) {
  const body = 'M144 172h112l-12 132h-88z'
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <defs>
        <linearGradient id={`${id}-bin`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1d6b4c" /><stop offset=".45" stopColor={c1} /><stop offset="1" stopColor="#0d3f2c" /></linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b6ffd9" stopOpacity=".9" /><stop offset="1" stopColor={c1} stopOpacity=".4" /></linearGradient>
        <clipPath id={`${id}-clip`}><path d={body} /></clipPath>
        <marker id={`${id}-arw`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="#fff" /></marker>
      </defs>
      <Stage>
      <circle cx="200" cy="210" r="160" fill={`url(#${id}-halo)`} />
      <ellipse cx="200" cy="312" rx="72" ry="10" fill="#000" opacity=".55" />
      {/* bin body with a rising fill level (IoT sensor) */}
      <path d={body} fill={`url(#${id}-bin)`} filter={`url(#${id}-glow)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="140" y="260" width="120" height="60" fill={`url(#${id}-fill)`} opacity=".55">
          <animate attributeName="y" values="290;214;290" dur="6s" repeatCount="indefinite" />
        </rect>
      </g>
      {[0, 1, 2].map((i) => <line key={i} x1={168 + i * 32} y1="192" x2={170 + i * 30} y2="288" stroke="#000" strokeOpacity=".2" strokeWidth="5" strokeLinecap="round" />)}
      <path d="M150 178h100" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      {/* lid */}
      <rect x="132" y="154" width="136" height="18" rx="6" fill="#2ee08e" />
      <rect x="132" y="154" width="136" height="6" rx="3" fill="#fff" fillOpacity=".35" />
      <rect x="182" y="142" width="36" height="14" rx="5" fill="none" stroke="#2ee08e" strokeWidth="5" />
      {/* recycle arrows */}
      <g stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d={arc(200, 238, 24, 200, 320)} markerEnd={`url(#${id}-arw)`} />
        <path d={arc(200, 238, 24, 340, 460)} markerEnd={`url(#${id}-arw)`} />
        <path d={arc(200, 238, 24, 100, 180)} markerEnd={`url(#${id}-arw)`} />
        <animateTransform attributeName="transform" type="rotate" from="0 200 238" to="360 200 238" dur="10s" repeatCount="indefinite" />
      </g>
      {/* sensor signal */}
      {[14, 26, 38].map((r, i) => (
        <path key={r} d={arc(200, 126, r, 220, 320)} fill="none" stroke={c2} strokeWidth="3.5" strokeLinecap="round">
          <animate attributeName="stroke-opacity" values=".15;1;.15" dur="1.8s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
      <circle cx="200" cy="126" r="4" fill={c2} />
      {/* drifting leaves */}
      {[[96, 0], [304, 1.5], [116, 3]].map(([x, d]) => (
        <path key={x} d={`M${x} 250c10-14 26-14 30 0-10 12-24 12-30 0z`} fill={c1} opacity="0">
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -120" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;.9;0" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
        </path>
      ))}
      <text className="art-label" x="200" y="352" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>SENSE · COLLECT · RECYCLE</text>
    </Stage></>
  )
}

function Todo({ id, c1, c2 }) {
  const rows = [true, true, false, false]
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <Stage>
      <circle cx="200" cy="200" r="150" fill={`url(#${id}-halo)`} />
      <g transform="translate(112 118)">
        <rect width="176" height="164" rx="14" fill="#14141d" stroke="#fff" strokeOpacity=".2" />
        <rect x="0" y="0" width="176" height="26" rx="14" fill="#1d1d29" />
        {[0, 1, 2].map((i) => <circle key={i} cx={14 + i * 12} cy="13" r="3.5" fill="#fff" fillOpacity={0.25 + i * 0.1} />)}
        {rows.map((done, i) => (
          <g key={i} transform={`translate(16 ${44 + i * 28})`}>
            <rect width="16" height="16" rx="4" fill={done ? c2 : 'none'} stroke={done ? c2 : '#fff'} strokeOpacity={done ? 1 : 0.4} strokeWidth="1.6" filter={done ? `url(#${id}-glow)` : undefined} />
            {done && <path d="M3.5 8.5l3 3 6-6.5" stroke="#0a0a10" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="26" y="3" width={[104, 84, 112, 70][i]} height="5" rx="2.5" fill="#fff" fillOpacity={done ? 0.25 : 0.6} />
            <rect x="26" y="10.5" width={[56, 44, 60, 38][i]} height="3" rx="1.5" fill="#fff" fillOpacity=".15" />
          </g>
        ))}
      </g>
      {/* JWT token chip */}
      <g transform="translate(244 96)" filter={`url(#${id}-glow)`}>
        <rect width="92" height="30" rx="15" fill={c1} fillOpacity=".18" stroke={c1} />
        <rect x="11" y="12" width="9" height="8" rx="2" fill={c1} /><path d="M13 12v-3a2.5 2.5 0 015 0v3" fill="none" stroke={c1} strokeWidth="1.6" />
        <text className="art-label" x="56" y="19.5" textAnchor="middle" fontSize="10" fill="#fff" style={mono}>JWT</text>
      </g>
      <rect x="112" y="200" width="176" height="2" fill={c2} opacity=".8"><animate attributeName="y" values="146;276;146" dur="5s" repeatCount="indefinite" /></rect>
      <Brackets x0={92} y0={98} x1={308} y1={302} />
      <text className="art-label" x="200" y="336" textAnchor="middle" fontSize="9" fill="#fff" fillOpacity=".4" style={mono}>SPRING BOOT · POSTGRESQL</text>
    </Stage></>
  )
}

function Aws({ id, c1, c2 }) {
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <Stage>
      {/* traffic → LB */}
      <circle cx="200" cy="96" r="16" fill="#14141d" stroke="#fff" strokeOpacity=".5" /><circle cx="200" cy="92" r="4.5" fill="#fff" fillOpacity=".7" /><path d="M191 106a9 6 0 0118 0" fill="#fff" fillOpacity=".7" />
      <path d="M200 112v26" stroke="#fff" strokeOpacity=".4" strokeDasharray="3 4" />
      <g transform="translate(160 138)" filter={`url(#${id}-glow)`}><rect width="80" height="24" rx="6" fill={c2} fillOpacity=".2" stroke={c2} /><text className="art-label" x="40" y="16" textAnchor="middle" fontSize="9" fill="#fff" style={mono}>LOAD BALANCER</text></g>
      {/* auto scaling group */}
      <rect x="92" y="190" width="216" height="76" rx="12" fill="none" stroke={c1} strokeDasharray="5 5" strokeOpacity=".8" />
      <text className="art-label" x="100" y="184" fontSize="8" fill={c1} style={mono}>AUTO SCALING</text>
      {[0, 1, 2].map((i) => {
        const d = `M200 162C200 180 ${124 + i * 76} 176 ${124 + i * 76} 204`
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#fff" strokeOpacity=".3" />
            <circle r="3" fill={c1} filter={`url(#${id}-glow)`}><animateMotion dur="1.8s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} /></circle>
            <g transform={`translate(${104 + i * 76} 204)`}>
              <rect width="40" height="46" rx="7" fill="#14141d" stroke="#fff" strokeOpacity=".5" />
              <rect x="7" y="9" width="26" height="4" rx="2" fill={c1} /><rect x="7" y="18" width="26" height="4" rx="2" fill="#fff" fillOpacity=".25" /><rect x="7" y="27" width="26" height="4" rx="2" fill="#fff" fillOpacity=".25" />
              <text className="art-label" x="20" y="41" textAnchor="middle" fontSize="7" fill="#fff" fillOpacity=".6" style={mono}>EC2</text>
            </g>
          </g>
        )
      })}
      {/* data layer */}
      <path d="M200 266v18" stroke="#fff" strokeOpacity=".4" strokeDasharray="3 4" />
      <g transform="translate(150 284)">
        <ellipse cx="22" cy="8" rx="22" ry="7" fill="#1d1d29" stroke="#5b86ff" /><path d="M0 8v26c0 4 10 7 22 7s22-3 22-7V8" fill="#14141d" stroke="#5b86ff" /><text className="art-label" x="22" y="30" textAnchor="middle" fontSize="7" fill="#fff" style={mono}>PG</text>
      </g>
      <g transform="translate(212 290)">
        <path d="M0 6l5 30h30l5-30z" fill="#14141d" stroke={c1} /><ellipse cx="20" cy="6" rx="20" ry="5" fill="#1d1d29" stroke={c1} /><text className="art-label" x="20" y="28" textAnchor="middle" fontSize="7" fill="#fff" style={mono}>S3</text>
      </g>
    </Stage></>
  )
}

function Clinical({ id, c1, c2 }) {
  const ecg = 'M0 200H120l10-18 10 18h10l12-60 16 120 12-80 8 20H250l10-18 10 18H400'
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <Stage>
      <circle cx="200" cy="200" r="150" fill={`url(#${id}-halo)`} />
      <Pulse cx={200} cy={200} r0={70} r1={150} color={c1} dur={2.2} />
      {/* scanner ring */}
      <circle cx="200" cy="200" r="96" fill="#0d0d14" stroke="#fff" strokeOpacity=".25" strokeWidth="2" />
      <circle cx="200" cy="200" r="110" fill="none" stroke={c2} strokeOpacity=".5" strokeWidth="2" strokeDasharray="40 22">
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="14s" repeatCount="indefinite" />
      </circle>
      {/* medical cross */}
      <g filter={`url(#${id}-glow)`}>
        <rect x="184" y="146" width="32" height="76" rx="7" fill={c1} />
        <rect x="162" y="168" width="76" height="32" rx="7" fill={c1} />
      </g>
      {/* live vital trace sweeping across */}
      <path d={ecg} fill="none" stroke={c2} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" transform="translate(0 50)" strokeOpacity=".25" />
      <path d={ecg} fill="none" stroke={c2} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" transform="translate(0 50)" filter={`url(#${id}-glow)`} strokeDasharray="120 600">
        <animate attributeName="stroke-dashoffset" values="720;0" dur="2.2s" repeatCount="indefinite" />
      </path>
      <Brackets />
      <text className="art-label" x="200" y="338" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>CLINICAL INSIGHTS</text>
    </Stage></>
  )
}

function Leaf({ id, c1, c2 }) {
  const spots = [[214, 168, 7], [184, 214, 5], [226, 228, 6], [198, 262, 4]]
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <defs>
        <linearGradient id={`${id}-leaf`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={c1} stopOpacity=".35" /><stop offset="1" stopColor={c1} stopOpacity=".9" />
        </linearGradient>
      </defs>
      <Stage>
      <circle cx="205" cy="200" r="140" fill={`url(#${id}-halo)`} />
      {/* rice leaf */}
      <g filter={`url(#${id}-glow)`}>
        <path d="M150 320C162 236 200 146 264 82C254 176 224 258 150 320z" fill={`url(#${id}-leaf)`} stroke={c1} strokeWidth="2" />
      </g>
      <path d="M150 320C190 244 228 160 264 82" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 270 - i * 38
        return <path key={i} d={`M${170 + i * 18} ${y}l18 -12`} stroke="#fff" strokeOpacity=".25" strokeWidth="1" />
      })}
      {spots.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={c2} />
          <circle cx={x} cy={y} r={r + 6} fill="none" stroke={c2} strokeOpacity=".6">
            <animate attributeName="r" values={`${r};${r + 12}`} dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values=".8;0" dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <Brackets />
      <rect x="104" y="196" width="192" height="3" fill="#fff" opacity=".85" filter={`url(#${id}-glow)`}><animate attributeName="y" values="96;300;96" dur="4.5s" repeatCount="indefinite" /></rect>
      {/* confidence readout */}
      <g transform="translate(312 120)">
        <circle cx="34" cy="34" r="26" fill="none" stroke="#fff" strokeOpacity=".15" strokeWidth="6" />
        <path d={arc(34, 34, 26, -90, 220)} fill="none" stroke={c2} strokeWidth="6" strokeLinecap="round" filter={`url(#${id}-glow)`} />
        <text className="art-label" x="34" y="38" textAnchor="middle" fontSize="11" fill="#fff" style={mono}>94%</text>
      </g>
      <text className="art-label" x="200" y="338" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>HEALTHY · DISEASED</text>
    </Stage></>
  )
}

function Scan({ id, c1, c2 }) {
  /* hexagonal "molecule" lattice with the flagged polymer atoms lighting up under a sweeping lens */
  const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => polar(cx, cy, r, 60 * i - 30).map((v) => v.toFixed(1)).join(' ')).join(' L')
  const cells = [[160, 160], [240, 160], [120, 229], [200, 229], [280, 229], [160, 298], [240, 298]]
  const bad = [3, 4]
  return (
    <>
      <Backdrop id={id} c1={c1} c2={c2} grid />
      <Stage>
      <circle cx="200" cy="229" r="150" fill={`url(#${id}-halo)`} />
      {cells.map(([x, y], i) => (
        <g key={i}>
          <path d={`M${hex(x, y, 44)}Z`} fill={bad.includes(i) ? '#b20710' : '#fff'} fillOpacity={bad.includes(i) ? 0.18 : 0.03} stroke={bad.includes(i) ? '#e50914' : c1} strokeOpacity={bad.includes(i) ? 1 : 0.45} strokeWidth="1.6" filter={bad.includes(i) ? `url(#${id}-glow)` : undefined} />
          <circle cx={x} cy={y} r="5" fill={bad.includes(i) ? '#e50914' : c2} />
        </g>
      ))}
      {/* magnifying lens sweeping across */}
      <g filter={`url(#${id}-glow)`}>
        <circle cx="0" cy="0" r="38" fill="#fff" fillOpacity=".06" stroke="#fff" strokeWidth="3" />
        <path d="M27 27l26 26" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <animateTransform attributeName="transform" type="translate" values="150 190;250 230;170 280;150 190" dur="7s" repeatCount="indefinite" />
      </g>
      <Brackets x0={70} y0={100} x1={330} y1={350} />
      <text className="art-label" x="200" y="380" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".75" style={mono}>OCR → MICROPLASTIC CHECK</text>
    </Stage></>
  )
}

const ARTS = { selfheal: SelfHeal, lens: Lens, civic: Civic, todo: Todo, aws: Aws, clinical: Clinical, leaf: Leaf, scan: Scan, review: Review, bin: Bin }

export default function ProjectCover({ project, eager = false, frame = false, fit = 'slice' }) {
  const uid = useId().replace(/:/g, '')
  const { cover } = project
  if (cover.kind === 'shot' && project.image) {
    return (
      <div className={`cover cover-shot ${frame ? 'is-framed' : ''}`} style={{ '--c1': cover.c1 }}>
        {frame && <div className="cover-chrome" aria-hidden="true"><i /><i /><i /></div>}
        <img src={asset(project.image)} alt={`${project.title} — screenshot of the application`} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <span className="cover-tint" aria-hidden="true" />
      </div>
    )
  }
  const Art = ARTS[cover.kind]
  return (
    <div className="cover cover-art">
      <svg viewBox="0 0 400 400" preserveAspectRatio={`xMidYMid ${fit}`} role="img" aria-label={`${project.title} — custom project artwork`}>
        <Art id={`${project.id}${uid}`} c1={cover.c1} c2={cover.c2} />
      </svg>
    </div>
  )
}
