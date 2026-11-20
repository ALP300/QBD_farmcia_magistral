import { useState } from 'react'
import { useTienda } from '../tienda.jsx'
import { soles } from '../data/catalogo.js'
import { EMPRESA, SEDES, enlaceWhatsApp, esMarcador } from '../config.js'
import { ProductoImagen } from './Producto.jsx'
import { IcoCerrar, IcoMas, IcoMenos, IcoBasura, IcoWhatsApp, IcoCarrito } from './Iconos.jsx'

function Cantidad({ id, cant }) {
  const { cambiarCant } = useTienda()
  return (
    <div className="cantidad" role="group" aria-label="Cantidad">
      <button type="button" aria-label="Quitar uno" onClick={() => cambiarCant(id, cant - 1)}><IcoMenos width={16} height={16} /></button>
      <span>{cant}</span>
      <button type="button" aria-label="Agregar uno" onClick={() => cambiarCant(id, cant + 1)}><IcoMas width={16} height={16} /></button>
    </div>
  )
}

export function LineasCarrito() {
  const { lineas, quitar } = useTienda()
  return (
    <ul className="lineas">
      {lineas.map(({ id, cant, producto }) => (
        <li key={id} className="linea-carrito">
          <a href={`#/producto/${id}`}><ProductoImagen producto={producto} className="mini" /></a>
          <div className="linea-info">
            <a href={`#/producto/${id}`} className="linea-nombre">{producto.nombre}</a>
            <span className="linea-pres">{producto.presentacion}</span>
            <div className="linea-fila">
              <Cantidad id={id} cant={cant} />
              <strong>{producto.precio == null ? 'Cotizar' : soles(producto.precio * cant)}</strong>
            </div>
          </div>
          <button type="button" className="icono-btn linea-quitar" aria-label={`Quitar ${producto.nombre}`} onClick={() => quitar(id)}>
            <IcoBasura width={18} height={18} />
          </button>
        </li>
      ))}
    </ul>
  )
}

function Vacio() {
  const { setCarritoAbierto } = useTienda()
  return (
    <div className="vacio">
      <span className="vacio-icono"><IcoCarrito width={36} height={36} /></span>
      <p><strong>Tu carrito está vacío</strong></p>
      <p>Explora la tienda o cotiza tu fórmula magistral.</p>
      <a href="#/tienda" className="btn btn-primario" onClick={() => setCarritoAbierto(false)}>Ir a la tienda</a>
    </div>
  )
}

/* Panel lateral del carrito */
export function PanelCarrito() {
  const { lineas, subtotal, carritoAbierto, setCarritoAbierto, cantidad } = useTienda()
  return (
    <>
      <div className={`cajon-fondo ${carritoAbierto ? 'visible' : ''}`} onClick={() => setCarritoAbierto(false)} aria-hidden="true" />
      <aside className={`cajon cajon-der ${carritoAbierto ? 'abierto' : ''}`} aria-label="Carrito" aria-hidden={!carritoAbierto}>
        <div className="cajon-cabeza">
          <h2>Mi carrito <span>({cantidad})</span></h2>
          <button className="icono-btn" type="button" aria-label="Cerrar carrito" onClick={() => setCarritoAbierto(false)}>
            <IcoCerrar />
          </button>
        </div>
        {lineas.length === 0 ? (
          <Vacio />
        ) : (
          <>
            <div className="cajon-cuerpo"><LineasCarrito /></div>
            <div className="cajon-pie">
              <div className="total-fila"><span>Subtotal</span><strong>{soles(subtotal)}</strong></div>
              <a href="#/carrito" className="btn btn-verde btn-bloque" onClick={() => setCarritoAbierto(false)}>Finalizar pedido</a>
              <a href="#/tienda" className="btn btn-contorno btn-bloque" onClick={() => setCarritoAbierto(false)}>Seguir comprando</a>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

/* Página #/carrito: resumen y pedido por WhatsApp */
export function PaginaCarrito() {
  const { lineas, subtotal, hayCotizar, vaciar } = useTienda()
  const [datos, setDatos] = useState({ nombre: '', entrega: SEDES[0]?.nombre ?? 'Delivery', direccion: '', nota: '' })
  const [resultado, setResultado] = useState(null)
  const cambiar = (e) => setDatos((d) => ({ ...d, [e.target.name]: e.target.value }))
  const esDelivery = datos.entrega === 'Delivery'

  const enviar = (e) => {
    e.preventDefault()
    const detalle = lineas
      .map((l) => `• ${l.cant} x ${l.producto.nombre} (${l.producto.presentacion}) – ${l.producto.precio == null ? 'cotizar' : soles(l.producto.precio * l.cant)}`)
      .join('\n')
    const mensaje =
      `Hola QBD, quiero hacer este pedido:\n${detalle}\n` +
      `Subtotal: ${soles(subtotal)}${hayCotizar ? ' + fórmulas por cotizar' : ''}\n` +
      `Nombre: ${datos.nombre}\nEntrega: ${datos.entrega}` +
      (esDelivery && datos.direccion ? `\nDirección: ${datos.direccion}` : '') +
      (datos.nota ? `\nNota: ${datos.nota}` : '')
    const enlace = enlaceWhatsApp(mensaje)
    if (enlace) window.open(enlace, '_blank', 'noopener')
    setResultado({ mensaje, enlace })
  }

  return (
    <div className="contenedor pagina">
      <nav className="migas" aria-label="Ruta"><a href="#/">Inicio</a> / <span>Carrito</span></nav>
      <h1 className="titulo-pagina">Mi carrito</h1>
      {lineas.length === 0 ? (
        <Vacio />
      ) : (
        <div className="checkout">
          <section className="checkout-lista">
            <LineasCarrito />
            <button type="button" className="enlace-sutil" onClick={vaciar}>Vaciar carrito</button>
          </section>
          <form className="checkout-resumen" onSubmit={enviar}>
            <h2>Resumen del pedido</h2>
            <div className="total-fila"><span>Subtotal</span><strong>{soles(subtotal)}</strong></div>
            {hayCotizar && <p className="nota">Las fórmulas magistrales se cotizan con tu receta.</p>}
            <div className="total-fila total-envio"><span>Envío</span><span>Se coordina por WhatsApp</span></div>
            <div className="campo">
              <label htmlFor="co-nombre">Nombre</label>
              <input id="co-nombre" name="nombre" required autoComplete="name" value={datos.nombre} onChange={cambiar} />
            </div>
            <div className="campo">
              <label htmlFor="co-entrega">Entrega</label>
              <select id="co-entrega" name="entrega" value={datos.entrega} onChange={cambiar}>
                {SEDES.map((s) => <option key={s.id} value={s.nombre}>Recojo en {s.nombre}</option>)}
                <option value="Delivery">Delivery</option>
              </select>
            </div>
            {esDelivery && (
              <div className="campo">
                <label htmlFor="co-direccion">Dirección de entrega</label>
                <input id="co-direccion" name="direccion" required autoComplete="street-address" value={datos.direccion} onChange={cambiar} />
              </div>
            )}
            <div className="campo">
              <label htmlFor="co-nota">Nota (opcional)</label>
              <textarea id="co-nota" name="nota" rows={2} value={datos.nota} onChange={cambiar} />
            </div>
            <button type="submit" className="btn btn-verde btn-bloque"><IcoWhatsApp width={18} height={18} /> Enviar pedido por WhatsApp</button>
            <p className="nota">
              Medios de pago: <span className={esMarcador(EMPRESA.mediosPago) ? 'marcador' : ''}>{EMPRESA.mediosPago}</span>
            </p>
            {resultado && <AvisoWhatsApp {...resultado} />}
          </form>
        </div>
      )}
    </div>
  )
}

export function AvisoWhatsApp({ enlace, mensaje }) {
  return (
    <div className="aviso" role="status">
      {enlace ? (
        <p>Si WhatsApp no se abrió, <a href={enlace} target="_blank" rel="noopener">toca aquí para abrirlo</a>.</p>
      ) : (
        <p>El número de WhatsApp aún no está configurado (<code>src/config.js</code>). Este es el mensaje que se enviará:</p>
      )}
      <pre>{mensaje}</pre>
    </div>
  )
}

export function AvisoAgregado() {
  const { aviso, carritoAbierto, setCarritoAbierto } = useTienda()
  if (!aviso || carritoAbierto) return null
  return (
    <div className="toast" role="status">
      <span>{aviso}</span>
      <button type="button" onClick={() => setCarritoAbierto(true)}>Ver carrito</button>
    </div>
  )
}
