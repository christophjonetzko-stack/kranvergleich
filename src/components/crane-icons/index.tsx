interface CraneIconProps {
  className?: string
}

// Flat technical / blueprint style.
// - Silhouette via filled shapes with currentColor + fill-opacity (0.12 / 0.22 / 0.35)
// - Outlines stroked at width 1.25, mechanical detail at 0.75
// - Booms rendered as a thick currentColor stroke with a thin highlight stroke offset above,
//   mimicking lit cylindrical surface seen in technical manuals.
// All colour still inherits from currentColor so Tailwind text-* classes keep working.

export function MinikranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Compact crawler mini-crane: short tracks, boxy superstructure, small cab, short telescopic boom.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Crawler tracks */}
        <rect x="8" y="46" width="38" height="8" rx="4" fill="currentColor" fillOpacity={0.25} />
        <path d="M14 46 v8 M20 46 v8 M26 46 v8 M32 46 v8 M38 46 v8" strokeWidth={0.75} strokeOpacity={0.7} />
        <circle cx="11.5" cy="50" r="1.6" fill="currentColor" fillOpacity={0.5} />
        <circle cx="42.5" cy="50" r="1.6" fill="currentColor" fillOpacity={0.5} />
        {/* Superstructure body */}
        <path d="M10 38 h28 v8 h-28 z" fill="currentColor" fillOpacity={0.15} />
        {/* Cab with window */}
        <path d="M12 32 h10 v6 h-10 z" fill="currentColor" fillOpacity={0.3} />
        <path d="M14 34 h6 v2 h-6 z" fill="currentColor" fillOpacity={0.55} strokeWidth={0.75} />
        {/* Counterweight slab at back */}
        <path d="M36 34 h6 v4 h-6 z" fill="currentColor" fillOpacity={0.35} />
        {/* Turntable / pedestal */}
        <rect x="22" y="34" width="8" height="4" rx="1" fill="currentColor" fillOpacity={0.3} />
        {/* Main boom — thick stroke for silhouette */}
        <path d="M26 35 L52 14" strokeWidth={4} stroke="currentColor" strokeLinecap="round" />
        {/* Boom highlight — thin lit-edge */}
        <path d="M25 34 L51 13" strokeWidth={0.9} strokeOpacity={0.45} />
        {/* Boom segment ticks */}
        <path d="M35 25 l1.5 1.5 M42 18 l1.5 1.5" strokeWidth={0.75} strokeOpacity={0.55} />
        {/* Sheave block at tip */}
        <circle cx="52" cy="14" r="1.2" fill="currentColor" fillOpacity={0.9} />
        {/* Hoist cable */}
        <path d="M52 15 v6" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        {/* Hook */}
        <path d="M52 21 v2 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

export function AutokranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // 3-axle truck crane: cab + chassis, turntable with counterweight, long telescopic boom.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Chassis */}
        <path d="M4 38 h46 v8 h-46 z" fill="currentColor" fillOpacity={0.18} />
        {/* Truck cab */}
        <path d="M4 38 v-8 a1.5 1.5 0 0 1 1.5 -1.5 h9 a1.5 1.5 0 0 1 1.5 1.5 v8 z" fill="currentColor" fillOpacity={0.3} />
        {/* Windshield */}
        <path d="M6 31 h8 v4.5 h-8 z" fill="currentColor" fillOpacity={0.55} strokeWidth={0.75} />
        {/* Door seam */}
        <path d="M9.5 35.5 v2.5" strokeWidth={0.75} strokeOpacity={0.5} />
        {/* Flatbed behind cab */}
        <path d="M18 36 h32 v2 h-32 z" fill="currentColor" fillOpacity={0.35} strokeWidth={0.75} />
        {/* Turntable */}
        <rect x="24" y="34" width="6" height="4" rx="1" fill="currentColor" fillOpacity={0.4} />
        {/* Counterweight behind turntable */}
        <path d="M30 32 h12 v6 h-12 z" fill="currentColor" fillOpacity={0.4} />
        {/* Outriggers */}
        <path d="M4 46 l-2 4 h3 M50 46 l2 4 h-3" strokeWidth={1} />
        {/* Wheels */}
        <g>
          <circle cx="10" cy="48" r="3.5" fill="currentColor" fillOpacity={0.85} />
          <circle cx="10" cy="48" r="1.4" fill="currentColor" fillOpacity={0.3} stroke="none" />
          <circle cx="38" cy="48" r="3.5" fill="currentColor" fillOpacity={0.85} />
          <circle cx="38" cy="48" r="1.4" fill="currentColor" fillOpacity={0.3} stroke="none" />
          <circle cx="46" cy="48" r="3.5" fill="currentColor" fillOpacity={0.85} />
          <circle cx="46" cy="48" r="1.4" fill="currentColor" fillOpacity={0.3} stroke="none" />
        </g>
        {/* Main boom */}
        <path d="M27 34 L58 8" strokeWidth={4.5} stroke="currentColor" strokeLinecap="round" />
        {/* Boom highlight */}
        <path d="M26 33 L57 7" strokeWidth={1} strokeOpacity={0.45} />
        {/* Boom segment ticks */}
        <path d="M36 26 l1.5 1.5 M45 18 l1.5 1.5" strokeWidth={0.75} strokeOpacity={0.6} />
        {/* Tip sheave */}
        <circle cx="58" cy="8" r="1.4" fill="currentColor" fillOpacity={0.9} />
        {/* Hoist cable */}
        <path d="M58 9.5 v7" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        {/* Hook block */}
        <path d="M56 16.5 h4 v2 h-4 z" fill="currentColor" fillOpacity={0.9} strokeWidth={0.75} />
        <path d="M58 18.5 v1.5 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

export function DachdeckerkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Roofer crane (Böcker-type): compact trailer base, steep telescopic mast, horizontal fly jib at top.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Trailer body */}
        <path d="M8 44 h26 v6 h-26 z" fill="currentColor" fillOpacity={0.22} />
        {/* Drawbar */}
        <path d="M8 47 l-5 2" strokeWidth={1} />
        <circle cx="3" cy="49" r="1.3" fill="currentColor" fillOpacity={0.8} />
        {/* Wheels */}
        <circle cx="15" cy="52" r="3.2" fill="currentColor" fillOpacity={0.85} />
        <circle cx="15" cy="52" r="1.2" fill="currentColor" fillOpacity={0.3} stroke="none" />
        <circle cx="27" cy="52" r="3.2" fill="currentColor" fillOpacity={0.85} />
        <circle cx="27" cy="52" r="1.2" fill="currentColor" fillOpacity={0.3} stroke="none" />
        {/* Stabilizer jack */}
        <path d="M34 50 v4 h-3" strokeWidth={1} />
        {/* Mast base */}
        <path d="M18 42 h6 v2 h-6 z" fill="currentColor" fillOpacity={0.35} />
        {/* Steep telescopic mast */}
        <path d="M21 42 L18 9" strokeWidth={4} stroke="currentColor" strokeLinecap="round" />
        <path d="M20 42 L17 9" strokeWidth={0.9} strokeOpacity={0.45} />
        {/* Mast segment ticks */}
        <path d="M19.5 30 l1.5 .2 M18.5 20 l1.5 .2" strokeWidth={0.75} strokeOpacity={0.55} />
        {/* Knuckle joint at top */}
        <circle cx="18" cy="9" r="1.6" fill="currentColor" fillOpacity={0.9} />
        {/* Horizontal fly jib */}
        <path d="M18 9 L48 9" strokeWidth={2.5} stroke="currentColor" strokeLinecap="round" />
        <path d="M18 8 L48 8" strokeWidth={0.8} strokeOpacity={0.45} />
        {/* Tie rod from mast to jib */}
        <path d="M20 16 L35 9" strokeWidth={0.75} strokeOpacity={0.6} />
        {/* Sheave + cable + hook */}
        <circle cx="48" cy="9" r="1.2" fill="currentColor" fillOpacity={0.9} />
        <path d="M48 10.5 v8" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        <path d="M48 18.5 v1.5 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

export function RaupenkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Crawler crane: wide crawler tracks, superstructure with counterweight, tall lattice boom.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Crawler track */}
        <rect x="4" y="48" width="34" height="8" rx="4" fill="currentColor" fillOpacity={0.28} />
        <path d="M10 48 v8 M15 48 v8 M20 48 v8 M25 48 v8 M30 48 v8" strokeWidth={0.75} strokeOpacity={0.7} />
        <circle cx="7.5" cy="52" r="1.6" fill="currentColor" fillOpacity={0.55} />
        <circle cx="34.5" cy="52" r="1.6" fill="currentColor" fillOpacity={0.55} />
        {/* Superstructure */}
        <path d="M6 38 h28 v10 h-28 z" fill="currentColor" fillOpacity={0.18} />
        {/* Counterweight block at rear */}
        <path d="M3 40 h6 v6 h-6 z" fill="currentColor" fillOpacity={0.4} />
        {/* Operator cab */}
        <path d="M22 32 h10 v6 h-10 z" fill="currentColor" fillOpacity={0.3} />
        <path d="M24 34 h6 v2.5 h-6 z" fill="currentColor" fillOpacity={0.55} strokeWidth={0.75} />
        {/* A-frame mast behind cab */}
        <path d="M16 38 L22 24 M22 24 L16 38" strokeWidth={0.9} strokeOpacity={0.6} />
        {/* Lattice boom — two chord lines + cross-bracing */}
        <path d="M20 38 L50 8" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" />
        <path d="M26 38 L56 8" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" />
        {/* Cross-bracing pattern (X trusses) */}
        <path
          d="M22 34 L32 24 M26 34 L20 28
             M30 26 L40 16 M34 26 L28 20
             M38 18 L48 8 M42 18 L36 12"
          strokeWidth={0.75}
          strokeOpacity={0.65}
        />
        {/* Tip sheave */}
        <circle cx="53" cy="8" r="1.4" fill="currentColor" fillOpacity={0.9} />
        {/* Hoist line + hook */}
        <path d="M53 9.5 v7" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        <path d="M53 16.5 v1.5 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

export function AnhaengerkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Trailer crane: drawbar + hitch, single-axle trailer, stabilizer legs, telescopic boom raised.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Drawbar */}
        <path d="M5 40 L14 38" strokeWidth={1} />
        <circle cx="4" cy="40" r="1.5" fill="currentColor" fillOpacity={0.8} />
        {/* Trailer chassis */}
        <path d="M12 36 h26 v8 h-26 z" fill="currentColor" fillOpacity={0.2} />
        {/* Stabilizer jacks */}
        <path d="M14 44 v5 h-2 M36 44 v5 h2" strokeWidth={1} />
        {/* Wheel */}
        <circle cx="25" cy="47" r="3.5" fill="currentColor" fillOpacity={0.85} />
        <circle cx="25" cy="47" r="1.4" fill="currentColor" fillOpacity={0.3} stroke="none" />
        {/* Turntable / pedestal */}
        <path d="M22 32 h8 v4 h-8 z" fill="currentColor" fillOpacity={0.38} />
        {/* Boom pivot */}
        <circle cx="26" cy="32" r="1.4" fill="currentColor" fillOpacity={0.9} />
        {/* Main boom */}
        <path d="M26 32 L52 10" strokeWidth={3.8} stroke="currentColor" strokeLinecap="round" />
        <path d="M25 31 L51 9" strokeWidth={0.9} strokeOpacity={0.45} />
        {/* Boom segment tick */}
        <path d="M37 22 l1.5 1.5" strokeWidth={0.75} strokeOpacity={0.55} />
        {/* Hydraulic cylinder below boom */}
        <path d="M24 34 L34 28" strokeWidth={1.2} strokeOpacity={0.7} />
        {/* Tip sheave + cable + hook */}
        <circle cx="52" cy="10" r="1.3" fill="currentColor" fillOpacity={0.9} />
        <path d="M52 11.5 v6" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        <path d="M52 17.5 v1.5 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

export function MobilkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // All-terrain mobile crane: long 5-axle chassis, unified cab at front, heavy counterweight, very long boom.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Long chassis */}
        <path d="M2 40 h54 v7 h-54 z" fill="currentColor" fillOpacity={0.18} />
        {/* Unified cab at front (driver + operator in one low cab) */}
        <path d="M2 40 v-5 a1.5 1.5 0 0 1 1.5 -1.5 h8 a1.5 1.5 0 0 1 1.5 1.5 v5 z" fill="currentColor" fillOpacity={0.3} />
        <path d="M4 35 h7 v3.5 h-7 z" fill="currentColor" fillOpacity={0.55} strokeWidth={0.75} />
        {/* Deck plating */}
        <path d="M14 38 h30 v2 h-30 z" fill="currentColor" fillOpacity={0.35} strokeWidth={0.75} />
        {/* Turntable */}
        <rect x="26" y="36" width="6" height="4" rx="1" fill="currentColor" fillOpacity={0.4} />
        {/* Heavy counterweight stack at rear */}
        <path d="M32 32 h16 v8 h-16 z" fill="currentColor" fillOpacity={0.42} />
        <path d="M32 36 h16" strokeWidth={0.75} strokeOpacity={0.5} />
        {/* 5 wheels */}
        <g>
          {[8, 17, 26, 35, 44].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="49" r="3" fill="currentColor" fillOpacity={0.85} />
              <circle cx={cx} cy="49" r="1.1" fill="currentColor" fillOpacity={0.3} stroke="none" />
            </g>
          ))}
        </g>
        {/* Outriggers */}
        <path d="M2 48 l-1 3 h2 M56 48 l1 3 h-2" strokeWidth={1} />
        {/* Very long telescopic boom */}
        <path d="M29 35 L60 6" strokeWidth={4.5} stroke="currentColor" strokeLinecap="round" />
        <path d="M28 34 L59 5" strokeWidth={1} strokeOpacity={0.45} />
        {/* Boom segment ticks */}
        <path d="M38 26 l1.5 1.5 M47 18 l1.5 1.5" strokeWidth={0.75} strokeOpacity={0.6} />
        {/* Tip + cable + hook */}
        <circle cx="60" cy="6" r="1.4" fill="currentColor" fillOpacity={0.9} />
        <path d="M60 7.5 v7" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        <path d="M60 14.5 v1.5 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

export function BaukranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Tower crane: concrete ballast base, tall lattice tower with X-bracing, horizontal jib + counter-jib, cab, trolley, hook.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Concrete ballast base */}
        <path d="M20 56 h24 v4 h-24 z" fill="currentColor" fillOpacity={0.4} />
        <path d="M22 56 L17 60 M42 56 L47 60" strokeWidth={0.9} />
        {/* Tower chords */}
        <line x1="28" y1="56" x2="28" y2="14" />
        <line x1="36" y1="56" x2="36" y2="14" />
        {/* Tower X-bracing (multiple storeys) */}
        <path
          d="M28 52 L36 46 M36 52 L28 46
             M28 42 L36 36 M36 42 L28 36
             M28 32 L36 26 M36 32 L28 26
             M28 22 L36 16 M36 22 L28 16"
          strokeWidth={0.75}
          strokeOpacity={0.7}
        />
        {/* Horizontal struts at tower storey bounds */}
        <path d="M28 52 L36 52 M28 42 L36 42 M28 32 L36 32 M28 22 L36 22" strokeWidth={0.75} strokeOpacity={0.5} />
        {/* Slewing unit */}
        <path d="M26 12 h12 v2 h-12 z" fill="currentColor" fillOpacity={0.35} />
        {/* Operator cab */}
        <path d="M32 8 h6 v4 h-6 z" fill="currentColor" fillOpacity={0.32} />
        <path d="M33.5 9 h3 v2 h-3 z" fill="currentColor" fillOpacity={0.6} strokeWidth={0.6} />
        {/* Main jib (right) */}
        <path d="M38 10 L60 10" strokeWidth={2.2} stroke="currentColor" strokeLinecap="round" />
        <path d="M38 9 L60 9" strokeWidth={0.8} strokeOpacity={0.4} />
        {/* Jib tie (apex cable) */}
        <path d="M32 4 L58 10 M32 4 L12 10" strokeWidth={0.7} strokeOpacity={0.55} />
        <path d="M32 4 v4" strokeWidth={0.75} strokeOpacity={0.7} />
        {/* Counter-jib (left) */}
        <path d="M26 10 L10 10" strokeWidth={2.2} stroke="currentColor" strokeLinecap="round" />
        {/* Counter-weight slab */}
        <path d="M8 8 h6 v4 h-6 z" fill="currentColor" fillOpacity={0.45} />
        {/* Trolley on main jib */}
        <path d="M48 11 h5 v2.5 h-5 z" fill="currentColor" fillOpacity={0.8} strokeWidth={0.7} />
        {/* Hoist cable + hook */}
        <path d="M50.5 13.5 v8" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        <path d="M50.5 21.5 v1.5 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

export function LadekranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Loader crane / knuckle boom: truck with flatbed, Z-shaped articulated boom with knuckle joint, hook.
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* Truck chassis */}
        <path d="M4 40 h48 v8 h-48 z" fill="currentColor" fillOpacity={0.18} />
        {/* Cab */}
        <path d="M4 40 v-8 a1.5 1.5 0 0 1 1.5 -1.5 h9 a1.5 1.5 0 0 1 1.5 1.5 v8 z" fill="currentColor" fillOpacity={0.3} />
        <path d="M6 33 h8 v4.5 h-8 z" fill="currentColor" fillOpacity={0.55} strokeWidth={0.75} />
        {/* Flatbed cargo area */}
        <path d="M30 36 h22 v4 h-22 z" fill="currentColor" fillOpacity={0.35} />
        <path d="M30 36 v4 M36 36 v4 M42 36 v4 M48 36 v4" strokeWidth={0.6} strokeOpacity={0.5} />
        {/* Wheels */}
        <circle cx="10" cy="50" r="3.5" fill="currentColor" fillOpacity={0.85} />
        <circle cx="10" cy="50" r="1.4" fill="currentColor" fillOpacity={0.3} stroke="none" />
        <circle cx="40" cy="50" r="3.5" fill="currentColor" fillOpacity={0.85} />
        <circle cx="40" cy="50" r="1.4" fill="currentColor" fillOpacity={0.3} stroke="none" />
        <circle cx="48" cy="50" r="3.5" fill="currentColor" fillOpacity={0.85} />
        <circle cx="48" cy="50" r="1.4" fill="currentColor" fillOpacity={0.3} stroke="none" />
        {/* Crane pedestal on flatbed */}
        <path d="M22 32 h6 v4 h-6 z" fill="currentColor" fillOpacity={0.42} />
        {/* First boom section — steep up-right */}
        <path d="M25 32 L34 10" strokeWidth={3.2} stroke="currentColor" strokeLinecap="round" />
        <path d="M24 31 L33 9" strokeWidth={0.9} strokeOpacity={0.45} />
        {/* Knuckle joint */}
        <circle cx="34" cy="10" r="2" fill="currentColor" fillOpacity={0.9} />
        {/* Second boom section — down-right */}
        <path d="M34 10 L55 22" strokeWidth={2.8} stroke="currentColor" strokeLinecap="round" />
        <path d="M34 9 L55 21" strokeWidth={0.8} strokeOpacity={0.45} />
        {/* Cable + hook */}
        <path d="M55 23 v5" strokeWidth={0.75} strokeDasharray="1.5 1.5" />
        <path d="M55 28 v1.5 a1.5 1.5 0 1 1 -3 0" strokeWidth={1} />
      </g>
    </svg>
  )
}

const craneIconMap: Record<string, React.FC<CraneIconProps>> = {
  'minikran-mieten': MinikranIcon,
  'autokran-mieten': AutokranIcon,
  'dachdeckerkran-mieten': DachdeckerkranIcon,
  'raupenkran-mieten': RaupenkranIcon,
  'anhaengerkran-mieten': AnhaengerkranIcon,
  'mobilkran-mieten': MobilkranIcon,
  'baukran-mieten': BaukranIcon,
  'ladekran-mieten': LadekranIcon,
}

export function getCraneIcon(slug: string): React.FC<CraneIconProps> {
  return craneIconMap[slug] ?? MinikranIcon
}

const craneIconByName: Record<string, React.FC<CraneIconProps>> = {
  'Minikran': MinikranIcon,
  'Autokran': AutokranIcon,
  'Dachdeckerkran': DachdeckerkranIcon,
  'Raupenkran': RaupenkranIcon,
  'Anhängerkran': AnhaengerkranIcon,
  'Mobilkran': MobilkranIcon,
  'Baukran': BaukranIcon,
  'Ladekran': LadekranIcon,
}

export function getCraneIconByName(name: string): React.FC<CraneIconProps> {
  return craneIconByName[name] ?? MinikranIcon
}
