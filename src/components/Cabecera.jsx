import { useState, useEffect } from 'react'
import { EMPRESA, esMarcador } from '../config.js'
import { CATEGORIAS, soles } from '../data/catalogo.js'
import { useTienda, ir } from '../tienda.jsx'
import { ICONOS_CATEGORIA } from './Producto.jsx'
import { IcoBuscar, IcoCarrito, IcoFavorito, IcoMenu, IcoCerrar, IcoWhatsApp, IcoCamion, IcoFlecha } from './Iconos.jsx'

export function Logo({ claro = false }) {
  return (
    <a href="#/" className={`logo ${claro ? 'logo-claro' : ''}`} aria-label="QBD Farmacia Magistral, ir al inicio">
      <img src="img/logo-qbd.png" alt="QBD Farmacia Magistral" width="236" height="89" />
    </a>
  )
}

const MENU = [
  ['#/', 'Inicio', 'inicio'],
  ['#/tienda', 'Tienda', 'tienda'],
  ['#/formula-magistral', 'Fórmula magistral', 'formula-magistral'],
  ['#/tienda?ofertas=1', 'Ofertas', 'ofertas'],
  ['#/sedes', 'Sedes', 'sedes'],
  ['#/contacto', 'Contacto', 'contacto'],
]

export default function Cabecera({ ruta }) {
  const { cantidad, subtotal, favoritos, setCarritoAbierto } = useTienda()
  const [q, setQ] = useState(ruta.query.q ?? '')
  const [cat, setCat] = useState(ruta.query.cat ?? '')
  const [menu, setMenu] = useState(false)
  const [catAbierto, setCatAbierto] = useState(false)

  useEffect(() => {
    setMenu(false)
    setCatAbierto(false)
    setCarritoAbierto(false)
  }, [setCarritoAbierto,ruta.pagina, ruta.id, ruta.query.cat, ruta.query.q])

  const buscar = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q.trim()) p.set('q', q.trim())
    if (cat) p.set('cat', cat)
    ir(`/tienda${p.toString() ? `?${p}` : ''}`)
  }

  const activo = (clave) =>
    clave === 'ofertas' ? ruta.pagina === 'tienda' && ruta.query.ofertas : clave === ruta.pagina && !(clave === 'tienda' && ruta.query.ofertas)

  return (
    <header className="cabecera">
      <div className="barra-sup">
        <div className="contenedor barra-sup-fila">
          <span className="barra-sup-envio">
            <IcoCamion width={16} height={16} /> Envíos a{' '}
            <span className={esMarcador(EMPRESA.coberturaEnvio) ? 'marcador marcador-osc' : ''}>{EMPRESA.coberturaEnvio}</span>
          </span>
          <span className="barra-sup-der">
            <span>
              <IcoWhatsApp width={15} height={15} /> WhatsApp:{' '}
              <span className={esMarcador(EMPRESA.whatsappVisible) ? 'marcador marcador-osc' : ''}>{EMPRESA.whatsappVisible}</span>
            </span>
            <a href="#/sedes">Nuestras sedes</a>
          </span>
        </div>
      </div>

      <div className="cabecera-principal">
        <div className="contenedor cabecera-fila">
          <button className="icono-btn solo-movil" type="button" aria-label="Abrir menú" onClick={() => setMenu(true)}>
            <IcoMenu />
          </button>
          <Logo />
          <form className="buscador" role="search" onSubmit={buscar}>
            <label htmlFor="buscar-cat" className="sr-only">Categoría</label>
            <select id="buscar-cat" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="">Todas</option>
              {CATEGORIAS.map((c) => (
                <option key={c.id} value={c.id}>{c.corto}</option>
              ))}
            </select>
            <label htmlFor="buscar-q" className="sr-only">Buscar productos</label>
            <input id="buscar-q" type="search" placeholder="Buscar productos, marcas o fórmulas…" value={q} onChange={(e) => setQ(e.target.value)} />
            <button type="submit" aria-label="Buscar">
              <IcoBuscar width={20} height={20} />
            </button>
          </form>
          <div className="cabecera-acciones">
            <a href="#/favoritos" className="icono-btn" aria-label={`Favoritos (${favoritos.length})`}>
              <IcoFavorito />
              {favoritos.length > 0 && <span className="contador">{favoritos.length}</span>}
            </a>
            <button type="button" className="carrito-btn" onClick={() => setCarritoAbierto(true)} aria-label={`Carrito, ${cantidad} productos`}>
              <span className="icono-btn">
                <IcoCarrito />
                <span className="contador contador-verde">{cantidad}</span>
              </span>
              <span className="carrito-btn-texto">
                <small>Mi carrito</small>
                <strong>{soles(subtotal)}</strong>
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav className="nav-principal" aria-label="Principal">
        <div className="contenedor nav-fila">
          <div className="cat-menu" onMouseLeave={() => setCatAbierto(false)}>
            <button type="button" className="cat-boton" aria-expanded={catAbierto} onClick={() => setCatAbierto((v) => !v)} onMouseEnter={() => setCatAbierto(true)}>
              <IcoMenu width={20} height={20} /> Categorías
            </button>
            {catAbierto && (
              <ul className="cat-desplegable">
                {CATEGORIAS.map((c) => {
                  const I = ICONOS_CATEGORIA[c.icono]
                  return (
                    <li key={c.id}>
                      <a href={c.id === 'formulas' ? '#/formula-magistral' : `#/tienda?cat=${c.id}`}>
                        <I width={20} height={20} /> {c.nombre} <IcoFlecha width={14} height={14} className="cat-flecha" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <ul className="nav-enlaces">
            {MENU.map(([href, texto, clave]) => (
              <li key={clave}>
                <a href={href} className={activo(clave) ? 'activo' : ''}>{texto}</a>
              </li>
            ))}
          </ul>
          <a href="#/formula-magistral" className="nav-cta">
            ¿Tienes una receta? <strong>Cotízala aquí</strong>
          </a>
        </div>
      </nav>

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
          {MENU.map(([href, texto, clave]) => (
            <li key={clave}><a href={href}>{texto}</a></li>
          ))}
        </ul>
        <p className="cajon-titulo">Categorías</p>
        <ul className="cajon-lista cajon-cats">
          {CATEGORIAS.map((c) => {
            const I = ICONOS_CATEGORIA[c.icono]
            return (
              <li key={c.id}>
                <a href={c.id === 'formulas' ? '#/formula-magistral' : `#/tienda?cat=${c.id}`}>
                  <I width={20} height={20} /> {c.nombre}
                </a>
              </li>
            )
          })}
        </ul>
      </aside>
    </header>
  )
}
