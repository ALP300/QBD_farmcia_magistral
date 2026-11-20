import { useState } from 'react'
import { PRODUCTOS, productoPorId, categoriaPorId, soles, descuento } from '../data/catalogo.js'
import { useTienda } from '../tienda.jsx'
import { EMPRESA, enlaceWhatsApp, esMarcador } from '../config.js'
import { ProductoImagen, ProductoCard } from '../components/Producto.jsx'
import { IcoCarrito, IcoFavorito, IcoMas, IcoMenos, IcoWhatsApp, IcoCamion, IcoEscudo, IcoReceta } from '../components/Iconos.jsx'

export default function Detalle({ id }) {
  const p = productoPorId(id)
  const { agregar, favoritos, alternarFavorito } = useTienda()
  const [cant, setCant] = useState(1)

  if (!p) {
    return (
      <div className="contenedor pagina vacio">
        <p><strong>No encontramos este producto.</strong></p>
        <a href="#/tienda" className="btn btn-primario">Volver a la tienda</a>
      </div>
    )
  }
  const cat = categoriaPorId(p.categoria)
  const dcto = descuento(p)
  const fav = favoritos.includes(p.id)
  const cotizar = p.precio == null
  const relacionados = PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 4)
  const wa = enlaceWhatsApp(`Hola QBD, tengo una consulta sobre: ${p.nombre} (${p.presentacion}).`)

  return (
    <div className="contenedor pagina">
      <nav className="migas" aria-label="Ruta">
        <a href="#/">Inicio</a> / <a href={`#/tienda?cat=${p.categoria}`}>{cat?.nombre}</a> / <span>{p.nombre}</span>
      </nav>
      <div className="detalle">
        <div className="detalle-media">
          <ProductoImagen producto={p} className="grande" />
          {dcto > 0 && <span className="badge badge-oferta detalle-badge">-{dcto}%</span>}
        </div>
        <div className="detalle-info">
          <a href={`#/tienda?cat=${p.categoria}`} className="card-cat">{cat?.nombre}</a>
          <h1>{p.nombre}</h1>
          <p className="detalle-pres">Presentación: <strong>{p.presentacion}</strong></p>
          <div className="detalle-precio">
            {cotizar ? (
              <strong className="precio-cotizar">Precio según receta</strong>
            ) : (
              <>
                <strong>{soles(p.precio)}</strong>
                {p.antes && <del>{soles(p.antes)}</del>}
              </>
            )}
          </div>
          <p className="detalle-desc">{p.descripcion}</p>

          {cotizar ? (
            <div className="detalle-acciones">
              <a href="#/formula-magistral" className="btn btn-primario"><IcoReceta width={18} height={18} /> Cotizar con mi receta</a>
            </div>
          ) : (
            <div className="detalle-acciones">
              <div className="cantidad cantidad-grande" role="group" aria-label="Cantidad">
                <button type="button" aria-label="Quitar uno" onClick={() => setCant((c) => Math.max(1, c - 1))}><IcoMenos width={18} height={18} /></button>
                <span>{cant}</span>
                <button type="button" aria-label="Agregar uno" onClick={() => setCant((c) => c + 1)}><IcoMas width={18} height={18} /></button>
              </div>
              <button type="button" className="btn btn-primario detalle-agregar" onClick={() => agregar(p.id, cant)}>
                <IcoCarrito width={18} height={18} /> Agregar al carrito
              </button>
              <button type="button" className={`btn-fav btn-fav-grande ${fav ? 'activo' : ''}`} aria-pressed={fav} aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'} onClick={() => alternarFavorito(p.id)}>
                <IcoFavorito lleno={fav} />
              </button>
            </div>
          )}
          <a href={wa || '#/contacto'} className="detalle-wa" {...(wa ? { target: '_blank', rel: 'noopener' } : {})}>
            <IcoWhatsApp width={18} height={18} /> ¿Dudas? Consulta a un químico farmacéutico
          </a>
          <ul className="detalle-garantias">
            <li><IcoCamion width={20} height={20} /> Envíos a <span className={esMarcador(EMPRESA.coberturaEnvio) ? 'marcador' : ''}>{EMPRESA.coberturaEnvio}</span></li>
            <li><IcoEscudo width={20} height={20} /> Atención de químico farmacéutico</li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="seccion seccion-sin-abajo">
          <div className="seccion-cabeza"><h2>También te puede interesar</h2></div>
          <div className="grid-productos">
            {relacionados.map((x) => <ProductoCard key={x.id} producto={x} />)}
          </div>
        </section>
      )}
    </div>
  )
}
