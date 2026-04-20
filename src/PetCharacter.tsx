import { type PetStatus } from "./pet";

type PetCharacterProps = {
  status: PetStatus;
  name: string;
  reaction: string;
};

const STATUS_LABELS: Record<PetStatus, string> = {
  normal: "happy and healthy",
  sick: "feeling sick with a thermometer",
  evolved: "energized evolved form",
};

export function PetCharacter({ status, name, reaction }: PetCharacterProps) {
  const isSick = status === "sick";
  const isEvolved = status === "evolved";

  const bodyGradient = isSick
    ? "url(#pet-body-sick)"
    : isEvolved
      ? "url(#pet-body-evolved)"
      : "url(#pet-body-normal)";

  const wingGradient = isSick
    ? "url(#pet-wing-sick)"
    : isEvolved
      ? "url(#pet-wing-evolved)"
      : "url(#pet-wing-normal)";

  const faceColor = isSick ? "#dcfce7" : "#f8fafc";
  const cheekColor = isSick ? "#bef264" : "#fca5a5";
  const eyeColor = isSick ? "#1f2937" : "#0f172a";

  return (
    <div className="relative mx-auto w-full max-w-[21rem]">
      <div className="relative z-20 mb-3 ml-auto mr-auto max-w-[17rem]">
        <div className="relative rounded-[1.35rem] border border-white/12 bg-slate-950/88 px-4 py-3 shadow-[0_16px_36px_rgba(2,6,23,0.45)] backdrop-blur">
          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_52%)]" />
          <p className="relative text-sm leading-5 text-slate-100">{reaction}</p>
        </div>
        <div className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/12 bg-slate-950/88" />
      </div>
      <div className="absolute inset-x-12 bottom-4 h-16 rounded-full bg-emerald-400/15 blur-3xl" />
      <svg
        viewBox="0 0 320 320"
        role="img"
        aria-label={`${name} looking ${STATUS_LABELS[status]}`}
        className="relative z-10 w-full drop-shadow-[0_28px_60px_rgba(16,185,129,0.25)]"
      >
        <defs>
          <linearGradient id="pet-body-normal" x1="70" y1="70" x2="250" y2="255">
            <stop offset="0%" stopColor="#7cf6c9" />
            <stop offset="60%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="pet-body-sick" x1="70" y1="70" x2="250" y2="255">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="60%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
          <linearGradient id="pet-body-evolved" x1="70" y1="70" x2="250" y2="255">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="35%" stopColor="#7cf6c9" />
            <stop offset="70%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="pet-wing-normal" x1="32" y1="160" x2="110" y2="220">
            <stop offset="0%" stopColor="#99f6e4" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="pet-wing-sick" x1="32" y1="160" x2="110" y2="220">
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
          <linearGradient id="pet-wing-evolved" x1="32" y1="160" x2="110" y2="220">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id="pet-belly" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor={isSick ? "#f7fee7" : "#ecfeff"} />
            <stop offset="100%" stopColor={isSick ? "#d9f99d" : "#c4b5fd"} />
          </radialGradient>
          <filter id="soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.3 0"
            />
          </filter>
        </defs>

        {isEvolved ? (
          <g filter="url(#soft-glow)">
            <path
              d="M70 54 L82 90 L118 84 L95 108 L118 132 L84 126 L70 160 L58 126 L24 132 L48 108 L24 84 L58 90 Z"
              fill="#fde68a"
              opacity="0.9"
            />
            <path
              d="M256 66 L264 92 L290 88 L274 106 L290 124 L266 120 L256 146 L248 120 L224 124 L240 106 L224 88 L248 92 Z"
              fill="#67e8f9"
              opacity="0.85"
            />
            <path
              d="M250 212 L258 236 L282 232 L266 248 L282 264 L260 260 L250 284 L240 260 L218 264 L234 248 L218 232 L242 236 Z"
              fill="#c4b5fd"
              opacity="0.8"
            />
          </g>
        ) : null}

        <ellipse cx="160" cy="278" rx="86" ry="18" fill="#020617" opacity="0.5" />

        <path
          d="M103 86 C98 52 122 32 146 50 C155 58 160 70 160 82 C153 97 132 106 118 104 C112 102 107 95 103 86 Z"
          fill={wingGradient}
        />
        <path
          d="M217 86 C222 52 198 32 174 50 C165 58 160 70 160 82 C167 97 188 106 202 104 C208 102 213 95 217 86 Z"
          fill={wingGradient}
        />

        <path
          d="M82 172 C48 150 40 194 72 214 C88 225 106 222 114 204 C118 194 114 182 82 172 Z"
          fill={wingGradient}
          opacity={isSick ? 0.65 : 0.85}
        />
        <path
          d="M238 172 C272 150 280 194 248 214 C232 225 214 222 206 204 C202 194 206 182 238 172 Z"
          fill={wingGradient}
          opacity={isSick ? 0.65 : 0.85}
        />

        <path
          d="M160 56 C224 56 266 104 264 174 C262 234 226 270 160 270 C94 270 58 234 56 174 C54 104 96 56 160 56 Z"
          fill={bodyGradient}
        />
        <ellipse cx="160" cy="192" rx="68" ry="60" fill="url(#pet-belly)" opacity="0.95" />

        <circle cx="124" cy="132" r={isSick ? 20 : 24} fill={faceColor} />
        <circle cx="196" cy="132" r={isSick ? 20 : 24} fill={faceColor} />
        <circle cx="126" cy="136" r={isSick ? 6 : 8} fill={eyeColor} />
        <circle cx="194" cy="136" r={isSick ? 6 : 8} fill={eyeColor} />
        {!isSick ? <circle cx="129" cy="131" r="3" fill="#ffffff" opacity="0.9" /> : null}
        {!isSick ? <circle cx="197" cy="131" r="3" fill="#ffffff" opacity="0.9" /> : null}

        {isSick ? (
          <>
            <path d="M102 117 Q125 108 146 120" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M174 120 Q195 108 218 117" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <path d="M106 114 Q124 102 144 114" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M176 114 Q196 102 214 114" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        <ellipse cx="112" cy="168" rx="12" ry="8" fill={cheekColor} opacity={isSick ? 0.35 : 0.6} />
        <ellipse cx="208" cy="168" rx="12" ry="8" fill={cheekColor} opacity={isSick ? 0.35 : 0.6} />

        <path d="M144 168 Q160 181 176 168" fill="#f59e0b" />
        <path d="M148 169 Q160 180 172 169" fill="#fb923c" />

        {isSick ? (
          <>
            <path
              d="M126 194 Q160 182 194 194"
              stroke="#475569"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <g transform="translate(170 184) rotate(6)">
              <rect x="0" y="0" width="56" height="12" rx="6" fill="#e2e8f0" />
              <rect x="34" y="2" width="16" height="8" rx="4" fill="#f87171" />
              <rect x="44" y="4" width="4" height="4" rx="2" fill="#dc2626" />
            </g>
            <path
              d="M88 94 C80 82 80 70 90 60 C95 72 98 84 88 94 Z"
              fill="#67e8f9"
              opacity="0.9"
            />
          </>
        ) : (
          <path
            d={isEvolved ? "M124 191 Q160 224 196 191" : "M128 193 Q160 214 192 193"}
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {isEvolved ? (
          <>
            <path
              d="M103 200 L90 226 L114 220 L108 248 L134 214 L114 216 L126 196 Z"
              fill="#fde68a"
              opacity="0.95"
            />
            <path
              d="M216 198 L208 220 L230 214 L218 246 L246 210 L224 212 L234 194 Z"
              fill="#67e8f9"
              opacity="0.95"
            />
            <circle cx="160" cy="66" r="10" fill="#fde68a" />
            <circle cx="160" cy="66" r="20" fill="#fde68a" opacity="0.18" />
          </>
        ) : null}

        <path
          d="M136 252 C138 266 146 278 160 278 C174 278 182 266 184 252"
          stroke="#0f172a"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.26"
        />
      </svg>
    </div>
  );
}
