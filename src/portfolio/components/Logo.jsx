// Monograma "MP": la pata derecha de la M es también el asta de la P.
export default function Logo({ size = 40, className = '' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`logo ${className}`} role="img" aria-label="MP">
      <rect width="64" height="64" rx="16" fill="#c8f542" />
      <g fill="none" stroke="#0b0c10" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <path className="logo-draw" pathLength="1" d="M10.5 46V18L22 34l11.5-16v28" />
        <path className="logo-draw logo-draw-2" pathLength="1" d="M33.5 18H43a7.5 7.5 0 0 1 0 15H33.5" />
      </g>
    </svg>
  );
}
