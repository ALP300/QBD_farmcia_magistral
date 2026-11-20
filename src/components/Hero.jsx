import { EMPRESA, SEDES, enlaceWhatsApp } from '../config.js'
import { IcoWhatsApp } from './Iconos.jsx'

export default function Hero() {
  const wa = enlaceWhatsApp('Hola QBD, quiero cotizar una receta magistral.')
  const ciudades = SEDES.map((s) => (s.ciudad.startsWith('[') ? s.nombre.replace('Sede ', '') : s.ciudad))

  return (
    <section id="inicio" className="hero">
      <div className="contenedor hero-grid">
        <div className="hero-texto">
          <p className="eyebrow">Farmacia magistral · {ciudades.join(' · ')}</p>
          <h1>
            Tu receta, preparada <em>a tu medida</em>.
          </h1>
          <p className="hero-lead">
            En QBD elaboramos medicamentos personalizados con la dosis, la forma y la base que
            indica tu médico. Para personas de todas las edades y también para tus mascotas.
          </p>
          <div className="hero-acciones">
            <a className="btn btn-primario" href="#cotizar">
              Cotizar mi receta
            </a>
            <a
              className="btn btn-secundario"
              href={wa || '#contacto'}
              {...(wa ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <IcoWhatsApp width={18} height={18} /> Escribir por WhatsApp
            </a>
          </div>
          <ul className="hero-datos">
            <li>
              <strong>{SEDES.length}+</strong> sedes para atenderte
            </li>
            <li>
              <strong>Q.F.</strong> responsable en cada preparación
            </li>
            <li>
              <strong>Humana</strong> y veterinaria
            </li>
          </ul>
        </div>

        {/* Etiqueta de preparado magistral: el detalle propio del oficio */}
        <figure className="etiqueta" aria-label="Ejemplo de etiqueta de un preparado magistral">
          <div className="etiqueta-cabeza">
            <span>QBD · Preparado magistral</span>
            <span className="mono">Lote 2611-024</span>
          </div>
          <p className="etiqueta-rp">Rp/</p>
          <ul className="etiqueta-formula mono">
            <li>
              <span>Principio activo</span>
              <span>según receta</span>
            </li>
            <li>
              <span>Concentración</span>
              <span>% indicado</span>
            </li>
            <li>
              <span>Base / vehículo</span>
              <span>c.s.p. 30 g</span>
            </li>
          </ul>
          <div className="etiqueta-pie">
            <div>
              <small>Paciente</small>
              <span className="linea-firma" />
            </div>
            <div>
              <small>Q.F. responsable</small>
              <span className="mono">{EMPRESA.cqfp}</span>
            </div>
          </div>
          <figcaption>Ejemplo ilustrativo. Cada preparado lleva su etiqueta con lote y datos del paciente.</figcaption>
        </figure>
      </div>
    </section>
  )
}
