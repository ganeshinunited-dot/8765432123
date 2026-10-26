/**
 * Decorative red world-map globe for the landing hero, drawn as inline SVG
 * (no image asset). Stylised continents + glowing network nodes and arcs,
 * in the Growentix signal-red family on the dark hero background.
 * Purely decorative — aria-hidden, no animation, no client JS.
 */
export function HeroGlobe({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hero-globe-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3d0a0a" />
          <stop offset="55%" stopColor="#1c0505" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
        <filter id="hero-node-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Globe disc */}
      <circle cx="300" cy="300" r="282" fill="url(#hero-globe-fade)" />
      <circle cx="300" cy="300" r="282" stroke="rgba(255,77,94,0.28)" strokeWidth="1.5" />

      {/* Stylised continents */}
      <g fill="#6d0d0d" stroke="#ff3b47" strokeOpacity="0.55" strokeWidth="1.2">
        {/* North America */}
        <path d="M 92 152 Q 128 108 178 128 Q 208 148 196 188 Q 182 228 142 224 Q 96 212 92 152 Z" />
        {/* South America */}
        <path d="M 176 282 Q 214 270 230 310 Q 242 360 216 420 Q 196 446 180 400 Q 166 340 176 282 Z" />
        {/* Europe */}
        <path d="M 300 132 Q 338 116 364 140 Q 376 164 350 180 Q 320 186 300 162 Q 294 146 300 132 Z" />
        {/* Africa */}
        <path d="M 306 202 Q 350 190 376 220 Q 392 260 372 310 Q 352 350 326 330 Q 300 292 296 242 Q 300 216 306 202 Z" />
        {/* Asia */}
        <path d="M 382 122 Q 450 102 508 130 Q 544 160 530 200 Q 516 240 470 250 Q 420 246 396 212 Q 376 172 382 122 Z" />
        {/* Australia */}
        <path d="M 456 352 Q 504 342 530 366 Q 536 390 500 400 Q 466 396 456 376 Q 450 362 456 352 Z" />
      </g>

      {/* Network arcs */}
      <g stroke="#ff2d3d" strokeOpacity="0.75" strokeWidth="1.5">
        <path d="M 150 180 Q 300 78 430 152" />
        <path d="M 200 300 Q 350 220 472 368" />
        <path d="M 330 160 Q 450 118 520 182" />
        <path d="M 322 280 Q 400 322 470 362" />
      </g>

      {/* Glowing nodes */}
      <g filter="url(#hero-node-glow)" fill="#ff4d5e">
        <circle cx="150" cy="180" r="5" />
        <circle cx="430" cy="152" r="5" />
        <circle cx="200" cy="300" r="5" />
        <circle cx="472" cy="368" r="5" />
        <circle cx="330" cy="160" r="4" />
        <circle cx="520" cy="182" r="4" />
        <circle cx="322" cy="280" r="4" />
      </g>
      <g fill="#ff8a94">
        <circle cx="250" cy="210" r="2.5" />
        <circle cx="400" cy="230" r="2.5" />
        <circle cx="280" cy="350" r="2.5" />
        <circle cx="440" cy="300" r="2.5" />
      </g>
    </svg>
  );
}
