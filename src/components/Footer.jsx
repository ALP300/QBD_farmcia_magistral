import { EMPRESA, SEDES, enlaceWhatsApp, esMarcador } from '../config.js'
import { Logo } from './Header.jsx'
import { IcoWhatsApp } from './Iconos.jsx'

const M = ({ v }) => <span className={esMarcador(v) ? 'marcador' : ''}>{v}</span>

export default function Footer() {
  const redes = [
    ['Facebook', EMPRESA.facebook],
    ['Instagram', EMPRESA.instagram],
    ['TikTok', EMPRESA.tiktok],
  ]
  const año = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="contenedor footer-grid">
        <div className="footer-marca">
          <Logo />
          <p>Medicamentos preparados a la medida de tu receta, para personas y mascotas.</p>
        </div>
        <div>
          <h4>Navegación</h4>
          <ul>
            <li><a href="#formula">Fórmula magistral</a></li>
            <li><a href="#lineas">Especialidades</a></li>
            <li><a href="#proceso">Cómo funciona</a></li>
            <li><a href="#preguntas">Preguntas frecuentes</a></li>
          </ul>
        </div>
        <div>
          <h4>Sedes</h4>
          <ul>
            {SEDES.map((s) => (
              <li key={s.id}><a href="#sedes">{s.nombre}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Síguenos</h4>
          <ul>
            {redes.map(([n, url]) => (
              <li key={n}>
                {url ? <a href={url} target="_blank" rel="noopener">{n}</a> : <span className="marcador">[{n.toUpperCase()}]</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="contenedor footer-legal">
        <p>
          Q.F. responsable: <M v={EMPRESA.qfResponsable} /> · C.Q.F.P. <M v={EMPRESA.cqfp} /> · Autorización
          sanitaria: <M v={EMPRESA.registroSanitario} />
        </p>
        <p>
          © {año} <M v={EMPRESA.razonSocial} /> · RUC <M v={EMPRESA.ruc} /> ·{' '}
          {EMPRESA.libroReclamaciones ? (
            <a href={EMPRESA.libroReclamaciones} target="_blank" rel="noopener" className="libro">Libro de Reclamaciones</a>
          ) : (
            <span className="libro">Libro de Reclamaciones <span className="marcador">[ENLACE]</span></span>
          )}
        </p>
      </div>
    </footer>
  )
}

export function WhatsAppFlotante() {
  const wa = enlaceWhatsApp('Hola QBD, tengo una consulta.')
  return (
    <a
      className="wa-flotante"
      href={wa || '#cotizar'}
      aria-label="Escríbenos por WhatsApp"
      {...(wa ? { target: '_blank', rel: 'noopener' } : {})}
    >
      <IcoWhatsApp width={28} height={28} />
    </a>
  )
}
