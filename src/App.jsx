import { TiendaProvider, useRuta } from './tienda.jsx'
import Cabecera from './components/Cabecera.jsx'
import Pie, { WhatsAppFlotante } from './components/Pie.jsx'
import { PanelCarrito, PaginaCarrito, AvisoAgregado } from './components/Carrito.jsx'
import Inicio from './paginas/Inicio.jsx'
import Tienda from './paginas/Tienda.jsx'
import Detalle from './paginas/Detalle.jsx'
import { FormulaMagistral, Sedes, Contacto, Favoritos } from './paginas/Informativas.jsx'

function Pagina({ ruta }) {
  switch (ruta.pagina) {
    case 'tienda': return <Tienda ruta={ruta} />
    case 'producto': return <Detalle id={ruta.id} />
    case 'formula-magistral': return <FormulaMagistral />
    case 'sedes': return <Sedes />
    case 'contacto': return <Contacto />
    case 'favoritos': return <Favoritos />
    case 'carrito': return <PaginaCarrito />
    default: return <Inicio />
  }
}

export default function App() {
  const ruta = useRuta()
  return (
    <TiendaProvider>
      <a href="#contenido" className="saltar" onClick={(e) => { e.preventDefault(); document.getElementById('contenido')?.focus() }}>
        Saltar al contenido
      </a>
      <Cabecera ruta={ruta} />
      <main id="contenido" tabIndex={-1}>
        <Pagina ruta={ruta} />
      </main>
      <Pie />
      <PanelCarrito />
      <AvisoAgregado />
      <WhatsAppFlotante />
    </TiendaProvider>
  )
}
