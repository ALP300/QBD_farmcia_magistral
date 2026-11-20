// Iconos de trazo simples (SVG en línea, sin librerías).
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const IcoMortero = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 11h17c0 4.4-3.4 7.6-7 8v2h-3v-2c-3.6-.4-7-3.6-7-8z" />
    <path d="M15.5 3.5l2 1.5-5.5 6" />
  </svg>
)
export const IcoPiel = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3c3 4 6 7 6 10.5A6 6 0 0 1 6 13.5C6 10 9 7 12 3z" />
    <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
)
export const IcoBebe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9 10.5h.01M15 10.5h.01M9.5 14.5c1.4 1.2 3.6 1.2 5 0" />
    <path d="M12 3.5c-1 1-1 2.5 0 3" />
  </svg>
)
export const IcoHuella = (p) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="16" rx="4" ry="3.5" />
    <circle cx="6" cy="10.5" r="1.8" />
    <circle cx="18" cy="10.5" r="1.8" />
    <circle cx="9.3" cy="6" r="1.8" />
    <circle cx="14.7" cy="6" r="1.8" />
  </svg>
)
export const IcoHoja = (p) => (
  <svg {...base} {...p}>
    <path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15" />
    <path d="M5 19l8-8" />
  </svg>
)
export const IcoCabello = (p) => (
  <svg {...base} {...p}>
    <path d="M6 20c0-6 1-11 6-14M10 20c0-5 1-9 5-12M14 20c0-4 1-7 4-9" />
  </svg>
)
export const IcoCorazon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
    <path d="M8 12h2l1-2 2 4 1-2h2" />
  </svg>
)
export const IcoWhatsApp = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.2A9.7 9.7 0 0 0 3.7 16.9L2.5 21.5l4.7-1.2A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.7.8-2.7-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z" />
  </svg>
)
export const IcoPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
)
export const IcoReloj = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)
export const IcoTel = (p) => (
  <svg {...base} {...p}>
    <path d="M5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)
export const IcoCorreo = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
)
export const IcoBuscar = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
)
export const IcoCarrito = (p) => (
  <svg {...base} {...p}>
    <path d="M3 4h2.2l2.2 11h10.8l2-8H6.3" />
    <circle cx="9.5" cy="19.5" r="1.4" />
    <circle cx="17" cy="19.5" r="1.4" />
  </svg>
)
export const IcoFavorito = ({ lleno, ...p }) => (
  <svg {...base} fill={lleno ? 'currentColor' : 'none'} {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
  </svg>
)
export const IcoUsuario = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </svg>
)
export const IcoCamion = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
)
export const IcoEscudo = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z" />
    <path d="M8.8 12l2.2 2.2 4.2-4.4" />
  </svg>
)
export const IcoTarjeta = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 15h3" />
  </svg>
)
export const IcoReceta = (p) => (
  <svg {...base} {...p}>
    <path d="M6 3h9l3 3v15H6z" />
    <path d="M9 9h3.5a2 2 0 0 1 0 4H9V8M11.5 13l3.5 4M15 13l-3.5 4" />
  </svg>
)
export const IcoCapsula = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)" />
    <path d="M9.6 8.6l4.8 6.8" />
  </svg>
)
export const IcoRostro = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3.5c4 0 6.5 3 6.5 7.5 0 4.6-3 9.5-6.5 9.5S5.5 15.6 5.5 11c0-4.5 2.5-7.5 6.5-7.5z" />
    <path d="M9.5 10.5h.01M14.5 10.5h.01M10 15c1.2.8 2.8.8 4 0" />
  </svg>
)
export const IcoGota = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3.5c3 4 6 7.3 6 10.5a6 6 0 0 1-12 0c0-3.2 3-6.5 6-10.5z" />
  </svg>
)
export const IcoFlecha = ({ dir = 'der', ...p }) => (
  <svg {...base} {...p} style={{ transform: dir === 'izq' ? 'scaleX(-1)' : undefined }}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)
export const IcoMas = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const IcoMenos = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
)
export const IcoBasura = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" />
  </svg>
)
export const IcoMenu = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
export const IcoCerrar = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
