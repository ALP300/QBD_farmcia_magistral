import { SEDES, esMarcador } from '../config.js'
import { IcoPin, IcoReloj, IcoTel } from './Iconos.jsx'

function Dato({ Icono, etiqueta, valor }) {
  return (
    <li>
      <Icono width={18} height={18} />
      <span>
        <small>{etiqueta}</small>
        <span className={esMarcador(valor) ? 'marcador' : ''}>{valor}</span>
      </span>
    </li>
  )
}

export default function Sedes() {
  return (
    <section id="sedes" className="seccion seccion-suave">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <p className="eyebrow">Sedes</p>
          <h2>Encuéntranos cerca de ti</h2>
          <p>Lleva tu receta a cualquiera de nuestras sedes o envíala por WhatsApp y elige dónde recogerla.</p>
        </div>
        <div className="sedes-grid">
          {SEDES.map((s) => (
            <article key={s.id} className={`sede ${s.principal ? 'sede-principal' : ''}`}>
              <div className="sede-cabeza">
                <h3>{s.nombre}</h3>
                {s.principal && <span className="pill">Principal</span>}
              </div>
              <p className={`sede-ciudad ${esMarcador(s.ciudad) ? 'marcador' : ''}`}>{s.ciudad}</p>
              <ul className="sede-datos">
                <Dato Icono={IcoPin} etiqueta="Dirección" valor={s.direccion} />
                <Dato Icono={IcoReloj} etiqueta="Horario" valor={s.horario} />
                <Dato Icono={IcoTel} etiqueta="Teléfono" valor={s.telefono} />
              </ul>
              {s.mapa ? (
                <a className="enlace" href={s.mapa} target="_blank" rel="noopener">
                  Ver en el mapa →
                </a>
              ) : (
                <span className="enlace enlace-inactivo">[ENLACE GOOGLE MAPS]</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
