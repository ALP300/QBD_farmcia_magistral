import { useMemo, useState } from 'react'
import { CATEGORIAS, PRODUCTOS, categoriaPorId } from '../data/catalogo.js'
import { ProductoCard } from '../components/Producto.jsx'
import { ir } from '../tienda.jsx'

const normalizar = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export default function Tienda({ ruta }) {
  const { cat = '', q = '', ofertas } = ruta.query
  const [orden, setOrden] = useState('relevancia')
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)

  const navegar = (cambios) => {
    const p = new URLSearchParams({ ...ruta.query, ...cambios })
    for (const [k, v] of [...p]) if (!v) p.delete(k)
    ir(`/tienda${p.toString() ? `?${p}` : ''}`)
  }

  const lista = useMemo(() => {
    let xs = PRODUCTOS.filter((p) => (!cat || p.categoria === cat) && (!ofertas || p.antes))
    if (q) {
      const t = normalizar(q)
      xs = xs.filter((p) => normalizar(`${p.nombre} ${p.descripcion} ${categoriaPorId(p.categoria)?.nombre}`).includes(t))
    }
    const precio = (p) => p.precio ?? Infinity
    if (orden === 'menor') xs = [...xs].sort((a, b) => precio(a) - precio(b))
    if (orden === 'mayor') xs = [...xs].sort((a, b) => (b.precio ?? -1) - (a.precio ?? -1))
    if (orden === 'nombre') xs = [...xs].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    return xs
  }, [cat, q, ofertas, orden])

  const categoria = categoriaPorId(cat)
  const titulo = ofertas ? 'Ofertas' : categoria?.nombre ?? 'Tienda'

  return (
    <div className="contenedor pagina">
      <nav className="migas" aria-label="Ruta">
        <a href="#/">Inicio</a> / <a href="#/tienda">Tienda</a>
        {(categoria || ofertas) && <> / <span>{titulo}</span></>}
      </nav>
      <div className="tienda-cabeza">
        <div>
          <h1 className="titulo-pagina">{titulo}</h1>
          <p className="tienda-conteo">
            {lista.length} {lista.length === 1 ? 'producto' : 'productos'}
            {q && <> para “{q}” <button type="button" className="enlace-sutil" onClick={() => navegar({ q: '' })}>quitar búsqueda</button></>}
          </p>
        </div>
        <div className="tienda-controles">
          <button type="button" className="btn btn-contorno btn-chico solo-movil" onClick={() => setFiltrosAbiertos((v) => !v)} aria-expanded={filtrosAbiertos}>
            Filtros
          </button>
          <label htmlFor="orden" className="sr-only">Ordenar por</label>
          <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="relevancia">Ordenar: relevancia</option>
            <option value="menor">Precio: menor a mayor</option>
            <option value="mayor">Precio: mayor a menor</option>
            <option value="nombre">Nombre A–Z</option>
          </select>
        </div>
      </div>

      <div className="tienda">
        <aside className={`filtros ${filtrosAbiertos ? 'abierto' : ''}`}>
          <h2>Categorías</h2>
          <ul>
            <li>
              <button type="button" className={!cat ? 'activo' : ''} onClick={() => navegar({ cat: '' })}>
                Todas <span>{PRODUCTOS.length}</span>
              </button>
            </li>
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <button type="button" className={cat === c.id ? 'activo' : ''} onClick={() => navegar({ cat: c.id })}>
                  {c.nombre} <span>{PRODUCTOS.filter((p) => p.categoria === c.id).length}</span>
                </button>
              </li>
            ))}
          </ul>
          <label className="check">
            <input type="checkbox" id="solo-ofertas" checked={!!ofertas} onChange={(e) => navegar({ ofertas: e.target.checked ? '1' : '' })} />
            Solo ofertas
          </label>
          <div className="filtros-promo">
            <strong>¿No encuentras tu producto?</strong>
            <p>Lo preparamos con tu receta.</p>
            <a href="#/formula-magistral" className="btn btn-verde btn-chico">Cotizar receta</a>
          </div>
        </aside>

        <section className="tienda-resultados">
          {lista.length ? (
            <div className="grid-productos grid-3">
              {lista.map((p) => <ProductoCard key={p.id} producto={p} />)}
            </div>
          ) : (
            <div className="vacio">
              <p><strong>No encontramos productos con esos filtros.</strong></p>
              <p>Prueba con otra búsqueda o cotiza una fórmula magistral.</p>
              <a href="#/tienda" className="btn btn-primario">Ver todos</a>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
