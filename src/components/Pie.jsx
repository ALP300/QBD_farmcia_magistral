import { EMPRESA, SEDES, enlaceWhatsApp, esMarcador } from '../config.js'
import { CATEGORIAS } from '../data/catalogo.js'
import { IcoWhatsApp, IcoTel, IcoCorreo, IcoPin } from './Iconos.jsx'

const M = ({ v }) => <span className={esMarcador(v) ? 'marcador marcador-osc' : ''}>{v}</span>

export default function Pie() {
  const redes = [['Facebook', EMPRESA.facebook], ['Instagram', EMPRESA.instagram], ['TikTok', EMPRESA.tiktok]]
  return (
    <footer className="pie">
      <div className="pie-ola" aria-hidden="true" />
      <div className="contenedor pie-grid">
        <div className="pie-marca">
          <div className="pie-logo">
            <img src="img/logo-qbd.png" alt="QBD Farmacia Magistral" width="200" height="75" />
          </div>
          <p>Fórmulas magistrales a la medida de tu receta y productos para el cuidado de toda la familia.</p>
          <ul className="pie-contacto">
            <li><IcoWhatsApp width={18} height={18} /> <M v={EMPRESA.whatsappVisible} /></li>
            <li><IcoTel width={18} height={18} /> <M v={EMPRESA.telefono} /></li>
            <li><IcoCorreo width={18} height={18} /> <M v={EMPRESA.correo} /></li>
          </ul>
        </div>
        <div>
          <h4>Categorías</h4>
          <ul>
            {CATEGORIAS.map((c) => (
              <li key={c.id}><a href={c.id === 'formulas' ? '#/formula-magistral' : `#/tienda?cat=${c.id}`}>{c.nombre}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>QBD</h4>
          <ul>
            <li><a href="#/formula-magistral">¿Qué es una fórmula magistral?</a></li>
            <li><a href="#/sedes">Nuestras sedes</a></li>
            <li><a href="#/contacto">Contacto</a></li>
            <li><a href="#/tienda?ofertas=1">Ofertas</a></li>
          </ul>
        </div>
        <div>
          <h4>Sedes</h4>
          <ul>
            {SEDES.map((s) => (
              <li key={s.id}><a href="#/sedes"><IcoPin width={15} height={15} /> {s.nombre}</a></li>
            ))}
          </ul>
          <h4 className="pie-h4-sep">Síguenos</h4>
          <ul className="pie-redes">
            {redes.map(([n, url]) => (
              <li key={n}>{url ? <a href={url} target="_blank" rel="noopener">{n}</a> : <span className="marcador marcador-osc">[{n.toUpperCase()}]</span>}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="contenedor pie-legal">
        <div>
          <p>Q.F. responsable: <M v={EMPRESA.qfResponsable} /> · C.Q.F.P. <M v={EMPRESA.cqfp} /></p>
          <p>Autorización sanitaria: <M v={EMPRESA.registroSanitario} /> · RUC <M v={EMPRESA.ruc} /></p>
          <p>© {new Date().getFullYear()} <M v={EMPRESA.razonSocial} />. Todos los derechos reservados.</p>
        </div>
        {EMPRESA.libroReclamaciones ? (
          <a className="libro" href={EMPRESA.libroReclamaciones} target="_blank" rel="noopener">Libro de Reclamaciones</a>
        ) : (
          <span className="libro">Libro de Reclamaciones <M v="[ENLACE]" /></span>
        )}
      </div>
    </footer>
  )
}

export function WhatsAppFlotante() {
  const wa = enlaceWhatsApp('Hola QBD, tengo una consulta.')
  return (
    <a className="wa-flotante" href={wa || '#/contacto'} aria-label="Escríbenos por WhatsApp" {...(wa ? { target: '_blank', rel: 'noopener' } : {})}>
      <IcoWhatsApp width={30} height={30} />
      <span className="wa-burbuja">¿Necesitas ayuda?</span>
    </a>
  )
}
