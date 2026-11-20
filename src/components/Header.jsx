import { useState } from 'react'
import { enlaceWhatsApp } from '../config.js'
import { IcoMortero, IcoMenu, IcoCerrar, IcoWhatsApp } from './Iconos.jsx'

const NAV = [
  ['#formula', 'Fórmula magistral'],
  ['#lineas', 'Especialidades'],
  ['#proceso', 'Cómo funciona'],
  ['#sedes', 'Sedes'],
  ['#contacto', 'Contacto'],
]

export function Logo() {
  // [LOGO]: reemplaza este bloque por <img src="/logo.svg" alt="QBD Farmacia Magistral" />
  return (
    <a href="#inicio" className="logo" aria-label="QBD Farmacia Magistral, ir al inicio">
      <span className="logo-marca">
        <IcoMortero width={20} height={20} />
      </span>
      <span className="logo-texto">
        <strong>QBD</strong>
        <small>Farmacia Magistral</small>
      </span>
    </a>
  )
}

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const wa = enlaceWhatsApp('Hola QBD, quiero cotizar una receta.')

  return (
    <header className="header">
      <div className="contenedor header-fila">
        <Logo />
        <nav className={`nav ${abierto ? 'nav-abierto' : ''}`} aria-label="Principal">
          {NAV.map(([href, texto]) => (
            <a key={href} href={href} onClick={() => setAbierto(false)}>
              {texto}
            </a>
          ))}
        </nav>
        <a
          className="btn btn-primario btn-chico header-cta"
          href={wa || '#cotizar'}
          {...(wa ? { target: '_blank', rel: 'noopener' } : {})}
        >
          <IcoWhatsApp width={18} height={18} /> Cotizar
        </a>
        <button
          className="menu-boton"
          type="button"
          aria-expanded={abierto}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? <IcoCerrar /> : <IcoMenu />}
        </button>
      </div>
    </header>
  )
}
