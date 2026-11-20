import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import { FormulaMagistral, Lineas, ComoFunciona, Preguntas } from './components/Secciones.jsx'
import Sedes from './components/Sedes.jsx'
import Cotizar from './components/Cotizar.jsx'
import Footer, { WhatsAppFlotante } from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a href="#contenido" className="saltar">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />
        <FormulaMagistral />
        <Lineas />
        <ComoFunciona />
        <Sedes />
        <Cotizar />
        <Preguntas />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  )
}
