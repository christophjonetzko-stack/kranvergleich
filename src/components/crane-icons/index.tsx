interface CraneIconProps {
  className?: string
}

// Blueprint / technical line-drawing style — stroke only, currentColor, 2px uniform stroke

export function MinikranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Spider crane: compact body on 4 hydraulic outrigger legs, short telescopic boom
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Compact body */}
      <rect x="22" y="28" width="14" height="8" rx="2" />
      {/* Turntable/pedestal */}
      <rect x="26" y="24" width="6" height="4" rx="1" />
      {/* Spider outrigger legs with ground pads */}
      <path d="M22 30 L6 46" />
      <path d="M6 46 h4" />
      <path d="M22 34 L10 46" />
      <path d="M10 46 h4" />
      <path d="M36 30 L52 46" />
      <path d="M52 46 h-4" />
      <path d="M36 34 L48 46" />
      <path d="M48 46 h-4" />
      {/* Short telescopic boom */}
      <path d="M29 24 L44 12" />
      {/* Boom section line */}
      <line x1="35" y1="19" x2="37" y2="17" strokeWidth={1.5} />
      {/* Cable */}
      <path d="M44 12 v6" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M44 18 v3 c0 2.5 -3.5 2.5 -3.5 0" />
    </svg>
  )
}

export function AutokranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Truck crane: multi-axle truck chassis, operator cab, turntable, long telescopic boom
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Truck chassis */}
      <rect x="4" y="34" width="38" height="8" rx="2" />
      {/* Cab with windshield */}
      <path d="M4 34 v-7 a2 2 0 0 1 2-2 h9 a2 2 0 0 1 2 2 v7" />
      <line x1="7" y1="29" x2="14" y2="29" />
      {/* 3 wheel axles */}
      <circle cx="10" cy="46" r="3.5" />
      <circle cx="30" cy="46" r="3.5" />
      <circle cx="38" cy="46" r="3.5" />
      {/* Turntable */}
      <circle cx="24" cy="34" r="3" />
      {/* Telescopic boom */}
      <path d="M24 31 L54 8" />
      {/* Boom section markers */}
      <line x1="34" y1="23" x2="36" y2="21" strokeWidth={1.5} />
      <line x1="44" y1="15" x2="46" y2="13" strokeWidth={1.5} />
      {/* Cable */}
      <path d="M54 8 v7" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M54 15 v3 c0 2.5 -3.5 2.5 -3.5 0" />
    </svg>
  )
}

export function DachdeckerkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Roofer crane (Böcker-type): small trailer base, very steep near-vertical telescopic mast, short fly jib at top
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Trailer base */}
      <rect x="8" y="42" width="24" height="6" rx="2" />
      {/* Wheels */}
      <circle cx="14" cy="52" r="3.5" />
      <circle cx="26" cy="52" r="3.5" />
      {/* Steep vertical mast (~80°) */}
      <path d="M20 42 L17 8" />
      {/* Mast section lines */}
      <line x1="19" y1="30" x2="17.5" y2="30" strokeWidth={1.5} />
      <line x1="18.5" y1="20" x2="17" y2="20" strokeWidth={1.5} />
      {/* Fly jib at top */}
      <path d="M17 8 L50 8" />
      {/* Support wire from mast to jib */}
      <path d="M18 18 L34 8" strokeWidth={1} />
      {/* Cable */}
      <path d="M50 8 v8" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M50 16 v3 c0 2.5 -3.5 2.5 -3.5 0" />
    </svg>
  )
}

export function RaupenkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Crawler crane: wide crawler tracks, superstructure with counterweight, lattice boom
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Crawler track */}
      <rect x="4" y="46" width="30" height="8" rx="4" />
      {/* Track tread segments */}
      <line x1="11" y1="46" x2="11" y2="54" strokeWidth={1.5} />
      <line x1="18" y1="46" x2="18" y2="54" strokeWidth={1.5} />
      <line x1="25" y1="46" x2="25" y2="54" strokeWidth={1.5} />
      {/* Superstructure */}
      <rect x="8" y="38" width="22" height="8" rx="2" />
      {/* Counterweight block */}
      <rect x="4" y="39" width="7" height="5" rx="1" />
      {/* Lattice boom — outlined */}
      <path d="M20 38 L48 8" />
      <path d="M24 38 L52 8" />
      {/* Lattice cross-bracing */}
      <path d="M24 34 L32 24 M28 34 L20 26" strokeWidth={1} />
      <path d="M32 26 L40 16 M36 26 L28 18" strokeWidth={1} />
      <path d="M40 18 L48 8 M44 18 L36 10" strokeWidth={1} />
      {/* Cable */}
      <path d="M50 8 v7" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M50 15 v3 c0 2.5 -3.5 2.5 -3.5 0" />
    </svg>
  )
}

export function AnhaengerkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Trailer crane: tow hitch, single-axle trailer, telescopic boom, stabilizer legs
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Drawbar and hitch coupling */}
      <path d="M4 38 h8" />
      <circle cx="4" cy="38" r="2" />
      {/* Trailer body */}
      <rect x="12" y="34" width="22" height="8" rx="2" />
      {/* Wheels */}
      <circle cx="18" cy="46" r="3.5" />
      <circle cx="28" cy="46" r="3.5" />
      {/* Stabilizer legs */}
      <path d="M14 42 v4 h2" />
      <path d="M32 42 v4 h-2" />
      {/* Boom base column */}
      <line x1="23" y1="34" x2="23" y2="28" />
      {/* Telescopic boom */}
      <path d="M23 28 L48 12" />
      {/* Boom section line */}
      <line x1="34" y1="21" x2="36" y2="19" strokeWidth={1.5} />
      {/* Cable */}
      <path d="M48 12 v6" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M48 18 v3 c0 2.5 -3.5 2.5 -3.5 0" />
    </svg>
  )
}

export function MobilkranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // All-terrain mobile crane: very long multi-axle chassis (5 axles), counterweight, very long telescopic boom
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Long chassis */}
      <rect x="2" y="34" width="50" height="8" rx="2" />
      {/* Cab */}
      <path d="M2 34 v-6 a2 2 0 0 1 2-2 h8 a2 2 0 0 1 2 2 v6" />
      <line x1="5" y1="28" x2="11" y2="28" />
      {/* 5 wheel axles */}
      <circle cx="8" cy="46" r="3" />
      <circle cx="18" cy="46" r="3" />
      <circle cx="28" cy="46" r="3" />
      <circle cx="38" cy="46" r="3" />
      <circle cx="48" cy="46" r="3" />
      {/* Counterweight behind turntable */}
      <rect x="38" y="28" width="12" height="6" rx="2" />
      {/* Turntable */}
      <circle cx="32" cy="34" r="3" />
      {/* Very long telescopic boom */}
      <path d="M32 31 L58 6" />
      {/* Boom section markers */}
      <line x1="40" y1="24" x2="42" y2="22" strokeWidth={1.5} />
      <line x1="48" y1="17" x2="50" y2="15" strokeWidth={1.5} />
      {/* Cable */}
      <path d="M58 6 v7" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M58 13 v3 c0 2.5 -3.5 2.5 -3.5 0" />
    </svg>
  )
}

export function BaukranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Tower crane: concrete base, tall lattice tower, horizontal jib + counter-jib, counterweight, trolley, cable + hook
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Concrete base */}
      <rect x="26" y="56" width="12" height="4" rx="1" />
      {/* Base support struts */}
      <path d="M28 56 L23 60" />
      <path d="M36 56 L41 60" />
      {/* Tower — two parallel vertical lines */}
      <line x1="30" y1="56" x2="30" y2="14" />
      <line x1="34" y1="56" x2="34" y2="14" />
      {/* Tower lattice cross-bracing */}
      <path d="M30 52 L34 46 M34 52 L30 46" strokeWidth={1} />
      <path d="M30 42 L34 36 M34 42 L30 36" strokeWidth={1} />
      <path d="M30 32 L34 26 M34 32 L30 26" strokeWidth={1} />
      <path d="M30 22 L34 16 M34 22 L30 16" strokeWidth={1} />
      {/* Operator cabin at slewing unit */}
      <rect x="28" y="10" width="8" height="5" rx="1" />
      {/* Main jib extending right */}
      <line x1="36" y1="12" x2="58" y2="12" />
      {/* Counter-jib extending left */}
      <line x1="28" y1="12" x2="8" y2="12" />
      {/* Counterweight on counter-jib */}
      <rect x="6" y="10" width="6" height="4" rx="1" />
      {/* Trolley on main jib */}
      <rect x="48" y="12" width="4" height="3" rx="0.5" />
      {/* Cable from trolley */}
      <path d="M50 15 v7" strokeDasharray="2 2" />
      {/* Hook */}
      <path d="M50 22 v3 c0 2.5 -3.5 2.5 -3.5 0" />
    </svg>
  )
}

export function LadekranIcon({ className = 'w-16 h-16' }: CraneIconProps) {
  // Loader crane / knuckle boom: truck with flatbed, articulated Z-shaped boom (two segments with knuckle joint)
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Truck chassis */}
      <rect x="4" y="36" width="46" height="8" rx="2" />
      {/* Cab */}
      <path d="M4 36 v-7 a2 2 0 0 1 2-2 h9 a2 2 0 0 1 2 2 v7" />
      <line x1="7" y1="29" x2="14" y2="29" />
      {/* Flatbed cargo area */}
      <rect x="28" y="34" width="20" height="3" rx="1" />
      {/* Wheels */}
      <circle cx="10" cy="48" r="3.5" />
      <circle cx="36" cy="48" r="3.5" />
      <circle cx="46" cy="48" r="3.5" />
      {/* Boom base column */}
      <line x1="24" y1="36" x2="24" y2="28" />
      {/* First arm — steep angle up */}
      <path d="M24 28 L32 10" />
      {/* Knuckle joint */}
      <circle cx="32" cy="10" r="2" />
      {/* Second arm — extending out and down */}
      <path d="M32 10 L52 22" />
      {/* Hook */}
      <path d="M52 22 v3 c0 2.5 -3.5 2.5 -3.5 0" />
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
