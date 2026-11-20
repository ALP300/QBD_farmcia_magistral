import { useState, useEffect } from 'react'
import { CATEGORIAS, soles } from '../data/catalogo.js'
import { useTienda, ir } from '../tienda.jsx'
import { ICONOS_CATEGORIA } from './Producto.jsx'
import { IcoBuscar, IcoCarrito, IcoFavorito, IcoMenu, IcoCerrar, IcoMas, IcoReceta } from './Iconos.jsx'

/* Logo a color (fondo claro) o en blanco y verde (sobre la cabecera azul) */
export function Logo({ blanco = false }) {
  return (
    <a href="#/" className="logo" aria-label="QBD Farmacia Magistral, ir al inicio">
      <img src={blanco ? 'img/logo-qbd-blanco.png' : 'img/logo-qbd.png'} alt="QBD Farmacia Magistral" width="236" height="89" />
    </a>
  )
}

const IcoBolsa = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M5 9h14l-1.2 10.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3z" />
    <path d="M9 9V7a3 3 0 0 1 6 0v2M9.5 13v4M14.5 13v4" />
  </svg>
)

const enlaceCategoria = (c) => (c.id === 'formulas' ? '#/formula-magistral' : `#/tienda?cat=${c.id}`)

export default function Cabecera({ ruta }) {
  const { cantidad, subtotal, favoritos, setCarritoAbierto } = useTienda()
  const [q, setQ] = useState(ruta.query.q ?? '')
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    setMenu(false)
    setCarritoAbierto(false)
  }, [setCarritoAbierto, ruta.pagina, ruta.id, ruta.query.cat, ruta.query.q])

  const buscar = (e) => {
    e.preventDefault()
    ir(q.trim() ? `/tienda?q=${encodeURIComponent(q.trim())}` : '/tienda')
  }

  const enTienda = ruta.pagina === 'tienda' || ruta.pagina === 'producto'

  return (
    <header className="cabecera">
      <div className="contenedor cabecera-grid">
        <button className="icono-btn icono-claro solo-movil menu-movil" type="button" aria-label="Abrir menú" onClick={() => setMenu(true)}>
          <IcoMenu />
        </button>

        <div className="cabecera-logo"><Logo blanco /></div>

        <form className="buscador" role="search" onSubmit={buscar}>
          <label htmlFor="buscar-q" className="sr-only">Buscar productos</label>
          <input id="buscar-q" type="search" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} />
          <button type="submit" aria-label="Buscar">
            <IcoBuscar width={20} height={20} />
          </button>
        </form>

        <div className="cabecera-acciones">
          <a href="#/formula-magistral" className="accion-texto">
            <IcoReceta width={20} height={20} className="solo-movil" />
            <span>Cotizar receta</span>
          </a>
          <a href="#/favoritos" className="icono-btn icono-claro" aria-label={`Favoritos (${favoritos.length})`}>
            <IcoFavorito width={26} height={26} />
            {favoritos.length > 0 && <span className="contador">{favoritos.length}</span>}
          </a>
          <button type="button" className="carrito-btn" onClick={() => setCarritoAbierto(true)} aria-label={`Carrito, ${cantidad} productos, ${soles(subtotal)}`}>
            <span className="icono-btn icono-claro">
              <IcoCarrito width={26} height={26} />
              <span className="contador">{cantidad}</span>
            </span>
            <strong className="carrito-total">{soles(subtotal)}</strong>
          </button>
          <a href="#/tienda" className="boton-tienda">
            <span className="boton-tienda-circulo"><IcoBolsa width={22} height={22} /></span>
            <span className="boton-tienda-texto">Tienda</span>
          </a>
        </div>

        <nav className="nav-principal" aria-label="Principal">
          <ul>
            <li className="nav-desplegable">
              <a href="#/tienda" className={enTienda && !ruta.query.ofertas ? 'activo' : ''}>
                Tienda <IcoMas width={14} height={14} className="nav-mas" />
              </a>
              <ul className="submenu">
                {CATEGORIAS.map((c) => {
                  const I = ICONOS_CATEGORIA[c.icono]
                  return (
                    <li key={c.id}>
                      <a href={enlaceCategoria(c)}><I width={18} height={18} /> {c.nombre}</a>
                    </li>
                  )
                })}
              </ul>
            </li>
            <li className="nav-desplegable">
              <a href="#/formula-magistral" className={ruta.pagina === 'formula-magistral' ? 'activo' : ''}>
                Fórmula magistral <IcoMas width={14} height={14} className="nav-mas" />
              </a>
              <ul className="submenu">
                <li><a href="#/formula-magistral">¿Qué es una fórmula magistral?</a></li>
                <li><a href="#/formula-magistral">Cotizar mi receta</a></li>
                <li><a href="#/tienda?cat=veterinaria">Veterinaria</a></li>
              </ul>
            </li>
            <li><a href="#/tienda?ofertas=1" className={ruta.query.ofertas ? 'activo' : ''}>Ofertas</a></li>
            <li><a href="#/sedes" className={ruta.pagina === 'sedes' ? 'activo' : ''}>Sedes</a></li>
            <li><a href="#/contacto" className={ruta.pagina === 'contacto' ? 'activo' : ''}>Contacto</a></li>
          </ul>
        </nav>
      </div>

      {/* Menú lateral en celular */}
      <div className={`cajon-fondo ${menu ? 'visible' : ''}`} onClick={() => setMenu(false)} aria-hidden="true" />
      <aside className={`cajon cajon-izq ${menu ? 'abierto' : ''}`} aria-label="Menú" aria-hidden={!menu}>
        <div className="cajon-cabeza">
          <Logo />
          <button className="icono-btn" type="button" aria-label="Cerrar menú" onClick={() => setMenu(false)}>
            <IcoCerrar />
          </button>
        </div>
        <ul className="cajon-lista">
          <li><a href="#/">Inicio</a></li>
          <li><a href="#/tienda">Tienda</a></li>
          <li><a href="#/formula-magistral">Fórmula magistral</a></li>
          <li><a href="#/tienda?ofertas=1">Ofertas</a></li>
          <li><a href="#/sedes">Sedes</a></li>
          <li><a href="#/contacto">Contacto</a></li>
        </ul>
        <p className="cajon-titulo">Categorías</p>
        <ul className="cajon-lista cajon-cats">
          {CATEGORIAS.map((c) => {
            const I = ICONOS_CATEGORIA[c.icono]
            return (
              <li key={c.id}><a href={enlaceCategoria(c)}><I width={20} height={20} /> {c.nombre}</a></li>
            )
          })}
        </ul>
      </aside>
    </header>
  )
}
