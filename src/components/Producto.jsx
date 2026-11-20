import { useTienda } from '../tienda.jsx'
import { soles, descuento, categoriaPorId } from '../data/catalogo.js'
import {
  IcoFavorito, IcoCarrito, IcoReceta, IcoMortero, IcoRostro, IcoCabello, IcoGota, IcoBebe, IcoCapsula, IcoHuella,
} from './Iconos.jsx'

export const ICONOS_CATEGORIA = {
  mortero: IcoMortero, rostro: IcoRostro, cabello: IcoCabello, gota: IcoGota, bebe: IcoBebe, capsula: IcoCapsula, huella: IcoHuella,
}

// Tono de fondo y de envase por categoría (siempre dentro de la paleta del logo)
const TONOS = {
  formulas: ['#e3f1fb', '#0076BE'],
  faciales: ['#e8fbef', '#0076BE'],
  capilares: ['#eaf4fb', '#01568B'],
  corporales: ['#ecfdf2', '#08A84A'],
  bebes: ['#eef7fd', '#3d9be0'],
  vitaminas: ['#e9fcef', '#0aa846'],
  veterinaria: ['#eaf3fa', '#01568B'],
}

/* Dibujo del envase cuando aún no hay foto real del producto */
function Envase({ forma, color }) {
  const tapa = '#01568B'
  const etiqueta = (
    <g>
      <rect x="-22" y="-6" width="44" height="30" rx="4" fill="#fff" />
      <rect x="-14" y="2" width="28" height="4" rx="2" fill={color} />
      <rect x="-10" y="11" width="20" height="3" rx="1.5" fill="#1DE863" />
    </g>
  )
  switch (forma) {
    case 'tubo':
      return (
        <g transform="translate(100 104) rotate(-12)">
          <path d="M-26 -58 h52 l-6 112 h-40 z" fill={color} />
          <rect x="-14" y="54" width="28" height="18" rx="3" fill={tapa} />
          <rect x="-28" y="-64" width="56" height="8" rx="2" fill={color} opacity=".75" />
          <g transform="translate(0 -6)">{etiqueta}</g>
        </g>
      )
    case 'pote':
      return (
        <g transform="translate(100 118)">
          <rect x="-46" y="-36" width="92" height="62" rx="12" fill={color} />
          <rect x="-50" y="-56" width="100" height="24" rx="8" fill={tapa} />
          <g transform="translate(0 -12) scale(1.2)">{etiqueta}</g>
        </g>
      )
    case 'gotero':
      return (
        <g transform="translate(100 112)">
          <rect x="-28" y="-26" width="56" height="74" rx="10" fill={color} />
          <rect x="-12" y="-44" width="24" height="20" rx="3" fill={tapa} />
          <rect x="-8" y="-74" width="16" height="32" rx="8" fill="#0d2f4d" />
          <g transform="translate(0 2)">{etiqueta}</g>
        </g>
      )
    case 'capsulas':
      return (
        <g transform="translate(100 112)">
          <rect x="-34" y="-36" width="68" height="84" rx="10" fill={color} />
          <rect x="-38" y="-58" width="76" height="26" rx="6" fill={tapa} />
          <g transform="translate(0 0)">{etiqueta}</g>
          <g transform="translate(46 40) rotate(-35)">
            <rect x="-16" y="-7" width="32" height="14" rx="7" fill="#1DE863" />
            <rect x="0" y="-7" width="16" height="14" rx="7" fill="#fff" />
          </g>
        </g>
      )
    case 'champu':
      return (
        <g transform="translate(100 108)">
          <path d="M-32 -36 q0 -14 14 -14 h36 q14 0 14 14 v86 q0 8 -8 8 h-48 q-8 0 -8 -8 z" fill={color} />
          <rect x="-16" y="-66" width="32" height="18" rx="4" fill={tapa} />
          <g transform="translate(0 8) scale(1.1)">{etiqueta}</g>
        </g>
      )
    case 'receta':
      return (
        <g transform="translate(100 104)">
          <rect x="-44" y="-58" width="88" height="112" rx="8" fill="#fff" stroke={color} strokeWidth="3" />
          <text x="-30" y="-20" fontFamily="Poppins, sans-serif" fontStyle="italic" fontWeight="700" fontSize="30" fill={color}>Rp/</text>
          <rect x="-30" y="-2" width="60" height="5" rx="2.5" fill="#cfe3f2" />
          <rect x="-30" y="12" width="48" height="5" rx="2.5" fill="#cfe3f2" />
          <rect x="-30" y="26" width="54" height="5" rx="2.5" fill="#cfe3f2" />
          <circle cx="30" cy="42" r="14" fill="#1DE863" />
          <path d="M30 34v16M22 42h16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </g>
      )
    default: // frasco con dosificador
      return (
        <g transform="translate(100 112)">
          <rect x="-30" y="-34" width="60" height="86" rx="12" fill={color} />
          <rect x="-10" y="-50" width="20" height="18" fill={tapa} />
          <path d="M-4 -50 v-14 h28 v8 h-18 v6" fill={tapa} />
          <g transform="translate(0 4)">{etiqueta}</g>
        </g>
      )
  }
}

export function ProductoImagen({ producto, className = '' }) {
  const [fondo, color] = TONOS[producto.categoria] ?? TONOS.formulas
  if (producto.imagen) {
    return (
      <div className={`prod-img ${className}`} style={{ background: fondo }}>
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      </div>
    )
  }
  return (
    <div className={`prod-img ${className}`} style={{ background: fondo }}>
      <svg viewBox="0 0 200 200" role="img" aria-label={producto.nombre}>
        <ellipse cx="100" cy="176" rx="56" ry="7" fill="#01568B" opacity=".08" />
        <Envase forma={producto.forma} color={color} />
      </svg>
    </div>
  )
}

export function ProductoCard({ producto }) {
  const { agregar, favoritos, alternarFavorito } = useTienda()
  const dcto = descuento(producto)
  const fav = favoritos.includes(producto.id)
  const cat = categoriaPorId(producto.categoria)
  const cotizar = producto.precio == null

  return (
    <article className="card-prod">
      <div className="card-prod-media">
        <a href={`#/producto/${producto.id}`} tabIndex={-1} aria-hidden="true">
          <ProductoImagen producto={producto} />
        </a>
        <div className="card-badges">
          {dcto > 0 && <span className="badge badge-oferta">-{dcto}%</span>}
          {producto.nuevo && <span className="badge badge-nuevo">Nuevo</span>}
          {cotizar && <span className="badge badge-receta">Con receta</span>}
        </div>
        <button
          type="button"
          className={`btn-fav ${fav ? 'activo' : ''}`}
          aria-pressed={fav}
          aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          onClick={() => alternarFavorito(producto.id)}
        >
          <IcoFavorito lleno={fav} width={18} height={18} />
        </button>
      </div>
      <div className="card-prod-cuerpo">
        <span className="card-cat">{cat?.corto}</span>
        <h3>
          <a href={`#/producto/${producto.id}`}>{producto.nombre}</a>
        </h3>
        <span className="card-pres">{producto.presentacion}</span>
        <div className="card-precio">
          {cotizar ? (
            <strong className="precio-cotizar">Precio según receta</strong>
          ) : (
            <>
              <strong>{soles(producto.precio)}</strong>
              {producto.antes && <del>{soles(producto.antes)}</del>}
            </>
          )}
        </div>
      </div>
      {cotizar ? (
        <a className="btn btn-contorno btn-bloque" href="#/formula-magistral">
          <IcoReceta width={18} height={18} /> Cotizar receta
        </a>
      ) : (
        <button type="button" className="btn btn-primario btn-bloque" onClick={() => agregar(producto.id)}>
          <IcoCarrito width={18} height={18} /> Agregar
        </button>
      )}
    </article>
  )
}
