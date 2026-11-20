import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { productoPorId } from './data/catalogo.js'

/* ---------------- Rutas por hash: #/tienda?cat=faciales ---------------- */
function leerRuta() {
  const h = window.location.hash.replace(/^#\/?/, '')
  const [camino, qs = ''] = h.split('?')
  const partes = camino.split('/').filter(Boolean)
  return { pagina: partes[0] || 'inicio', id: partes[1], query: Object.fromEntries(new URLSearchParams(qs)) }
}

export function useRuta() {
  const [ruta, setRuta] = useState(leerRuta)
  useEffect(() => {
    const cambio = () => {
      setRuta(leerRuta())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', cambio)
    return () => window.removeEventListener('hashchange', cambio)
  }, [])
  return ruta
}

export const ir = (destino) => {
  window.location.hash = destino
}

/* ---------------- Carrito y favoritos (se guardan en el navegador) ---------------- */
const Ctx = createContext(null)

function cargar(clave, def) {
  try {
    const v = JSON.parse(localStorage.getItem(clave))
    return v ?? def
  } catch {
    return def
  }
}

export function TiendaProvider({ children }) {
  const [items, setItems] = useState(() => cargar('qbd-carrito', []))
  const [favoritos, setFavoritos] = useState(() => cargar('qbd-favoritos', []))
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [aviso, setAviso] = useState(null)

  useEffect(() => {
    try { localStorage.setItem('qbd-carrito', JSON.stringify(items)) } catch {}
  }, [items])
  useEffect(() => {
    try { localStorage.setItem('qbd-favoritos', JSON.stringify(favoritos)) } catch {}
  }, [favoritos])

  const agregar = useCallback((id, cant = 1) => {
    setItems((xs) => {
      const e = xs.find((x) => x.id === id)
      return e ? xs.map((x) => (x.id === id ? { ...x, cant: x.cant + cant } : x)) : [...xs, { id, cant }]
    })
    const p = productoPorId(id)
    setAviso(`${p?.nombre ?? 'Producto'} se agregó al carrito`)
  }, [])
  const cambiarCant = (id, cant) =>
    setItems((xs) => (cant <= 0 ? xs.filter((x) => x.id !== id) : xs.map((x) => (x.id === id ? { ...x, cant } : x))))
  const quitar = (id) => setItems((xs) => xs.filter((x) => x.id !== id))
  const vaciar = () => setItems([])
  const alternarFavorito = (id) => setFavoritos((fs) => (fs.includes(id) ? fs.filter((f) => f !== id) : [...fs, id]))

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(null), 2600)
    return () => clearTimeout(t)
  }, [aviso])

  const lineas = useMemo(
    () => items.map((i) => ({ ...i, producto: productoPorId(i.id) })).filter((l) => l.producto),
    [items],
  )
  const cantidad = lineas.reduce((s, l) => s + l.cant, 0)
  const subtotal = lineas.reduce((s, l) => s + (l.producto.precio ?? 0) * l.cant, 0)
  const hayCotizar = lineas.some((l) => l.producto.precio == null)

  const valor = {
    lineas, cantidad, subtotal, hayCotizar,
    agregar, cambiarCant, quitar, vaciar,
    favoritos, alternarFavorito,
    carritoAbierto, setCarritoAbierto,
    aviso,
  }
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export const useTienda = () => useContext(Ctx)
