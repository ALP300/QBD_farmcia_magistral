// =====================================================================
//  CATÁLOGO — DATOS DE EJEMPLO
//  Los productos y precios de abajo son SOLO DE EJEMPLO para mostrar el
//  diseño de la tienda. Reemplázalos por tus productos y precios reales
//  antes de publicar la web.
//
//  Campos de cada producto:
//   id        texto único, se usa en la URL (#/producto/id)
//   nombre    nombre visible
//   categoria id de una categoría de CATEGORIAS
//   precio    precio en soles (número). null = "Cotizar" (fórmulas a medida)
//   antes     precio anterior si está en oferta (opcional)
//   presentacion  ej. "50 mL"
//   forma     dibujo si no hay foto: frasco | tubo | pote | gotero | capsulas | champu | receta
//   imagen    ruta a la foto real, ej. "img/productos/protector.jpg" (opcional)
//   destacado / nuevo  true para mostrarlo en esas pestañas
// =====================================================================

export const CATEGORIAS = [
  { id: 'formulas', nombre: 'Fórmulas magistrales', corto: 'Fórmulas', icono: 'mortero', descripcion: 'Preparados a la medida de tu receta' },
  { id: 'faciales', nombre: 'Cuidado facial', corto: 'Faciales', icono: 'rostro', descripcion: 'Limpieza, hidratación y protección' },
  { id: 'capilares', nombre: 'Cuidado capilar', corto: 'Capilares', icono: 'cabello', descripcion: 'Anticaída y cuero cabelludo' },
  { id: 'corporales', nombre: 'Cuidado corporal', corto: 'Corporales', icono: 'gota', descripcion: 'Hidratación y piel sensible' },
  { id: 'bebes', nombre: 'Bebés y niños', corto: 'Bebés y niños', icono: 'bebe', descripcion: 'Pieles delicadas' },
  { id: 'vitaminas', nombre: 'Vitaminas y suplementos', corto: 'Vitaminas', icono: 'capsula', descripcion: 'Nutrición y bienestar' },
  { id: 'veterinaria', nombre: 'Veterinaria', corto: 'Veterinaria', icono: 'huella', descripcion: 'Para perros y gatos' },
]

export const PRODUCTOS = [
  { id: 'formula-dermatologica', nombre: 'Fórmula dermatológica a medida', categoria: 'formulas', precio: null, presentacion: 'Según receta', forma: 'receta', destacado: true,
    descripcion: 'Crema, gel o loción preparada con los activos y la concentración que indica tu dermatólogo. Envíanos tu receta y te cotizamos.' },
  { id: 'formula-pediatrica', nombre: 'Jarabe pediátrico a medida', categoria: 'formulas', precio: null, presentacion: 'Según receta', forma: 'receta',
    descripcion: 'Dosis ajustada al peso del niño, en sabor agradable y sin azúcar si hace falta.' },
  { id: 'formula-veterinaria', nombre: 'Fórmula veterinaria a medida', categoria: 'formulas', precio: null, presentacion: 'Según receta', forma: 'receta', nuevo: true,
    descripcion: 'Medicamentos en dosis pequeñas y formas fáciles de dar, a partir de la receta de tu veterinario.' },

  { id: 'protector-solar-fps50', nombre: 'Protector solar facial FPS 50 toque seco', categoria: 'faciales', precio: 69.9, antes: 84.9, presentacion: '50 mL', forma: 'tubo', destacado: true,
    descripcion: 'Protección alta de amplio espectro, textura ligera que no deja brillo. Uso diario.' },
  { id: 'gel-limpiador-piel-grasa', nombre: 'Gel limpiador para piel grasa', categoria: 'faciales', precio: 42.0, presentacion: '150 mL', forma: 'frasco', destacado: true,
    descripcion: 'Limpia en profundidad y ayuda a controlar el exceso de grasa sin resecar.' },
  { id: 'serum-vitamina-c', nombre: 'Sérum facial con vitamina C', categoria: 'faciales', precio: 79.0, antes: 95.0, presentacion: '30 mL', forma: 'gotero', nuevo: true,
    descripcion: 'Antioxidante para una piel más uniforme y luminosa. Aplicar por la mañana.' },
  { id: 'crema-hidratante-facial', nombre: 'Crema hidratante facial piel sensible', categoria: 'faciales', precio: 55.0, presentacion: '50 g', forma: 'pote',
    descripcion: 'Hidratación de larga duración para pieles sensibles o reactivas.' },

  { id: 'champu-anticaida', nombre: 'Champú anticaída fortalecedor', categoria: 'capilares', precio: 48.5, presentacion: '250 mL', forma: 'champu', destacado: true,
    descripcion: 'Limpia suavemente y ayuda a fortalecer el cabello desde la raíz.' },
  { id: 'locion-capilar', nombre: 'Loción capilar revitalizante', categoria: 'capilares', precio: 62.0, antes: 72.0, presentacion: '60 mL', forma: 'gotero',
    descripcion: 'Aplicación directa en cuero cabelludo. Complemento del tratamiento anticaída.' },

  { id: 'crema-urea-10', nombre: 'Crema corporal con urea 10%', categoria: 'corporales', precio: 39.9, presentacion: '200 g', forma: 'pote', nuevo: true,
    descripcion: 'Para piel seca y áspera en codos, rodillas y talones.' },
  { id: 'locion-corporal-avena', nombre: 'Loción corporal de avena', categoria: 'corporales', precio: 34.0, presentacion: '400 mL', forma: 'frasco',
    descripcion: 'Calma y protege la piel sensible. Apta para toda la familia.' },

  { id: 'crema-panal', nombre: 'Crema protectora para zona del pañal', categoria: 'bebes', precio: 28.0, presentacion: '60 g', forma: 'tubo', destacado: true,
    descripcion: 'Forma una barrera que protege la piel del bebé del enrojecimiento.' },
  { id: 'champu-bebe', nombre: 'Champú suave para bebé', categoria: 'bebes', precio: 26.5, presentacion: '200 mL', forma: 'champu',
    descripcion: 'Fórmula suave que no irrita los ojos.' },

  { id: 'multivitaminico', nombre: 'Multivitamínico diario', categoria: 'vitaminas', precio: 45.0, antes: 52.0, presentacion: '60 cápsulas', forma: 'capsulas', destacado: true,
    descripcion: 'Vitaminas y minerales en una toma diaria.' },
  { id: 'vitamina-d3', nombre: 'Vitamina D3 2000 UI', categoria: 'vitaminas', precio: 38.0, presentacion: '60 cápsulas', forma: 'capsulas', nuevo: true,
    descripcion: 'Contribuye a la salud de huesos y defensas.' },
  { id: 'magnesio-b6', nombre: 'Magnesio con vitamina B6', categoria: 'vitaminas', precio: 41.0, presentacion: '60 cápsulas', forma: 'capsulas',
    descripcion: 'Apoyo para músculos y sistema nervioso.' },

  { id: 'champu-perros', nombre: 'Champú dermatológico para perros', categoria: 'veterinaria', precio: 36.0, presentacion: '250 mL', forma: 'champu', destacado: true,
    descripcion: 'Limpieza suave para pieles sensibles de perros.' },
  { id: 'suplemento-articular-mascotas', nombre: 'Suplemento articular para mascotas', categoria: 'veterinaria', precio: 58.0, antes: 66.0, presentacion: '30 cápsulas', forma: 'capsulas',
    descripcion: 'Apoyo para articulaciones de perros y gatos adultos.' },
]

export const categoriaPorId = (id) => CATEGORIAS.find((c) => c.id === id)
export const productoPorId = (id) => PRODUCTOS.find((p) => p.id === id)
export const soles = (n) => `S/ ${n.toFixed(2)}`
export const descuento = (p) => (p.antes && p.precio ? Math.round((1 - p.precio / p.antes) * 100) : 0)
