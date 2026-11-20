import { useState } from 'react'
import { EMPRESA, SEDES, enlaceWhatsApp, esMarcador } from '../config.js'
import { IcoWhatsApp, IcoTel, IcoCorreo } from './Iconos.jsx'

const INICIAL = { nombre: '', para: 'Persona', sede: SEDES[0]?.nombre ?? '', detalle: '' }

export default function Cotizar() {
  const [datos, setDatos] = useState(INICIAL)
  const [resultado, setResultado] = useState(null)

  const cambiar = (e) => setDatos((d) => ({ ...d, [e.target.name]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault()
    const mensaje =
      `Hola QBD, quiero cotizar una receta magistral.\n` +
      `Nombre: ${datos.nombre}\n` +
      `Es para: ${datos.para}\n` +
      `Sede para recoger: ${datos.sede}\n` +
      (datos.detalle ? `Detalle: ${datos.detalle}\n` : '') +
      `(Adjunto la foto de la receta en este chat.)`
    const enlace = enlaceWhatsApp(mensaje)
    if (enlace) window.open(enlace, '_blank', 'noopener')
    setResultado({ mensaje, enlace })
  }

  return (
    <section id="cotizar" className="seccion seccion-tinta">
      <div className="contenedor dos-columnas cotizar">
        <div className="col-texto" id="contacto">
          <p className="eyebrow">Cotiza tu receta</p>
          <h2>Envíanos tu receta y te respondemos con el precio</h2>
          <p>
            Completa tus datos y te abrimos WhatsApp con el mensaje listo. Solo adjunta la foto de
            tu receta en el chat.
          </p>
          <ul className="contacto-lista">
            <li>
              <IcoWhatsApp width={20} height={20} />
              <span>
                <small>WhatsApp</small>
                <span className={esMarcador(EMPRESA.whatsappVisible) ? 'marcador' : ''}>{EMPRESA.whatsappVisible}</span>
              </span>
            </li>
            <li>
              <IcoTel width={20} height={20} />
              <span>
                <small>Teléfono</small>
                <span className={esMarcador(EMPRESA.telefono) ? 'marcador' : ''}>{EMPRESA.telefono}</span>
              </span>
            </li>
            <li>
              <IcoCorreo width={20} height={20} />
              <span>
                <small>Correo</small>
                <span className={esMarcador(EMPRESA.correo) ? 'marcador' : ''}>{EMPRESA.correo}</span>
              </span>
            </li>
          </ul>
        </div>

        <form className="formulario" onSubmit={enviar}>
          <div className="campo">
            <label htmlFor="nombre">Tu nombre</label>
            <input id="nombre" name="nombre" required autoComplete="name" value={datos.nombre} onChange={cambiar} placeholder="Nombre y apellido" />
          </div>
          <div className="campo-fila">
            <div className="campo">
              <label htmlFor="para">La receta es para</label>
              <select id="para" name="para" value={datos.para} onChange={cambiar}>
                <option>Persona</option>
                <option>Niño o bebé</option>
                <option>Mascota</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="sede">Sede para recoger</label>
              <select id="sede" name="sede" value={datos.sede} onChange={cambiar}>
                {SEDES.map((s) => (
                  <option key={s.id}>{s.nombre}</option>
                ))}
                <option>Delivery</option>
              </select>
            </div>
          </div>
          <div className="campo">
            <label htmlFor="detalle">Detalle (opcional)</label>
            <textarea id="detalle" name="detalle" rows={3} value={datos.detalle} onChange={cambiar} placeholder="Ej.: necesito dos frascos, o tengo alergia a la lactosa" />
          </div>
          <button type="submit" className="btn btn-primario btn-ancho">
            <IcoWhatsApp width={18} height={18} /> Continuar en WhatsApp
          </button>

          {resultado && (
            <div className="aviso" role="status">
              {resultado.enlace ? (
                <p>
                  Si WhatsApp no se abrió,{' '}
                  <a href={resultado.enlace} target="_blank" rel="noopener">
                    toca aquí para abrirlo
                  </a>
                  .
                </p>
              ) : (
                <p>
                  El número de WhatsApp aún no está configurado (<code>src/config.js</code>). Este es el
                  mensaje que se enviará:
                </p>
              )}
              <pre>{resultado.mensaje}</pre>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
