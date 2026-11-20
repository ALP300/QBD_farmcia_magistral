// =====================================================================
//  DATOS DE QBD — EDITA SOLO ESTE ARCHIVO
//  Todo lo que está entre [CORCHETES] es un marcador pendiente.
//  Reemplázalo por el dato real y guarda: la web se actualiza sola.
// =====================================================================

export const EMPRESA = {
  nombre: 'QBD Farmacia Magistral',
  // WhatsApp en formato internacional, solo dígitos. Ej. Perú: '51987654321'
  whatsapp: '[WHATSAPP]',
  // Como se muestra en pantalla. Ej: '987 654 321'
  whatsappVisible: '[WHATSAPP]',
  telefono: '[TELÉFONO]',
  correo: '[CORREO]',
  // Químico Farmacéutico responsable y su colegiatura (C.Q.F.P.)
  qfResponsable: '[NOMBRE DEL Q.F. RESPONSABLE]',
  cqfp: '[N° C.Q.F.P.]',
  // Autorización sanitaria del establecimiento (DIGEMID / DIRESA)
  registroSanitario: '[N° AUTORIZACIÓN SANITARIA]',
  ruc: '[RUC]',
  razonSocial: '[RAZÓN SOCIAL]',
  // Enlaces (deja '' si no tienes alguna red)
  facebook: '',
  instagram: '',
  tiktok: '',
  libroReclamaciones: '', // URL del Libro de Reclamaciones virtual
}

// Sedes. Agrega o quita objetos para sumar más sedes.
export const SEDES = [
  {
    id: 'central',
    nombre: 'Sede Central',
    ciudad: '[CIUDAD]',
    direccion: '[DIRECCIÓN SEDE CENTRAL]',
    referencia: '[REFERENCIA]',
    horario: '[HORARIO SEDE CENTRAL]',
    telefono: '[TELÉFONO SEDE CENTRAL]',
    mapa: '', // enlace de Google Maps
    principal: true,
  },
  {
    id: 'puno',
    nombre: 'Sede Puno',
    ciudad: 'Puno',
    direccion: '[DIRECCIÓN SEDE PUNO]',
    referencia: '[REFERENCIA]',
    horario: '[HORARIO SEDE PUNO]',
    telefono: '[TELÉFONO SEDE PUNO]',
    mapa: '',
  },
  {
    id: 'juliaca',
    nombre: 'Sede Juliaca',
    ciudad: 'Juliaca',
    direccion: '[DIRECCIÓN SEDE JULIACA]',
    referencia: '[REFERENCIA]',
    horario: '[HORARIO SEDE JULIACA]',
    telefono: '[TELÉFONO SEDE JULIACA]',
    mapa: '',
  },
]

// Devuelve true si el valor sigue siendo un marcador [ASÍ].
export const esMarcador = (v) => !v || /^\[.*\]$/.test(String(v).trim())

// Enlace de WhatsApp con mensaje. Si el número aún es marcador, devuelve null.
export function enlaceWhatsApp(mensaje = '') {
  const num = String(EMPRESA.whatsapp).replace(/\D/g, '')
  if (esMarcador(EMPRESA.whatsapp) || num.length < 9) return null
  const q = mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''
  return `https://wa.me/${num}${q}`
}
