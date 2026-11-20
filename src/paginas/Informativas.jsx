import { useState } from 'react'
import { EMPRESA, SEDES, enlaceWhatsApp, esMarcador } from '../config.js'
import { PRODUCTOS } from '../data/catalogo.js'
import { useTienda } from '../tienda.jsx'
import { PasosFormula } from './Inicio.jsx'
import { ProductoCard } from '../components/Producto.jsx'
import { AvisoWhatsApp } from '../components/Carrito.jsx'
import { IcoWhatsApp, IcoTel, IcoCorreo, IcoPin, IcoReloj, IcoRostro, IcoBebe, IcoHuella, IcoCapsula, IcoCabello, IcoCorazon } from '../components/Iconos.jsx'

const M = ({ v }) => <span className={esMarcador(v) ? 'marcador' : ''}>{v}</span>

/* ---------------- Formulario de cotización (reutilizable) ---------------- */
export function FormCotizar() {
  const [d, setD] = useState({ nombre: '', para: 'Persona', sede: SEDES[0]?.nombre ?? '', detalle: '' })
  const [res, setRes] = useState(null)
  const cambiar = (e) => setD((x) => ({ ...x, [e.target.name]: e.target.value }))
  const enviar = (e) => {
    e.preventDefault()
    const mensaje =
      `Hola QBD, quiero cotizar una receta magistral.\nNombre: ${d.nombre}\nEs para: ${d.para}\nEntrega: ${d.sede}\n` +
      (d.detalle ? `Detalle: ${d.detalle}\n` : '') +
      '(Adjunto la foto de la receta en este chat.)'
    const enlace = enlaceWhatsApp(mensaje)
    if (enlace) window.open(enlace, '_blank', 'noopener')
    setRes({ mensaje, enlace })
  }
  return (
    <form className="form-tarjeta" onSubmit={enviar}>
      <h2>Cotiza tu receta</h2>
      <p className="nota">Completa tus datos, abrimos WhatsApp con el mensaje listo y solo adjuntas la foto de tu receta.</p>
      <div className="campo">
        <label htmlFor="ct-nombre">Nombre</label>
        <input id="ct-nombre" name="nombre" required autoComplete="name" value={d.nombre} onChange={cambiar} placeholder="Nombre y apellido" />
      </div>
      <div className="campo-fila">
        <div className="campo">
          <label htmlFor="ct-para">La receta es para</label>
          <select id="ct-para" name="para" value={d.para} onChange={cambiar}>
            <option>Persona</option>
            <option>Niño o bebé</option>
            <option>Mascota</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="ct-sede">Entrega</label>
          <select id="ct-sede" name="sede" value={d.sede} onChange={cambiar}>
            {SEDES.map((s) => <option key={s.id}>{s.nombre}</option>)}
            <option>Delivery</option>
          </select>
        </div>
      </div>
      <div className="campo">
        <label htmlFor="ct-detalle">Detalle (opcional)</label>
        <textarea id="ct-detalle" name="detalle" rows={3} value={d.detalle} onChange={cambiar} placeholder="Ej.: necesito dos frascos, o soy alérgico a la lactosa" />
      </div>
      <button type="submit" className="btn btn-verde btn-bloque"><IcoWhatsApp width={18} height={18} /> Continuar en WhatsApp</button>
      {res && <AvisoWhatsApp {...res} />}
    </form>
  )
}

/* ---------------- Fórmula magistral ---------------- */
const LINEAS = [
  [IcoRostro, 'Dermatología', 'Cremas, geles y lociones para acné, manchas, rosácea y dermatitis.'],
  [IcoBebe, 'Pediatría', 'Jarabes y suspensiones con dosis por peso, en sabores agradables.'],
  [IcoHuella, 'Veterinaria', 'Dosis pequeñas y formas fáciles de dar a perros y gatos.'],
  [IcoCapsula, 'Nutrición', 'Vitaminas y nutrientes combinados en una sola toma.'],
  [IcoCabello, 'Tricología', 'Soluciones y champús para la caída del cabello.'],
  [IcoCorazon, 'Adulto mayor', 'Menos tomas y formas más fáciles de tragar.'],
]
const FORMAS = ['Cápsulas', 'Cremas', 'Geles', 'Lociones', 'Soluciones', 'Jarabes', 'Suspensiones', 'Papelillos', 'Champús', 'Óvulos']

export function FormulaMagistral() {
  return (
    <>
      <section className="cabecera-pagina">
        <div className="contenedor cabecera-pagina-grid">
          <div>
            <nav className="migas migas-claro" aria-label="Ruta"><a href="#/">Inicio</a> / <span>Fórmula magistral</span></nav>
            <h1>Fórmulas magistrales a la medida de tu receta</h1>
            <p>
              Un medicamento preparado de forma individual para ti, con la dosis, la forma y la base que
              indica tu médico. Lo elabora un químico farmacéutico en nuestro laboratorio.
            </p>
            <div className="chips">
              {FORMAS.map((f) => <span key={f} className="chip">{f}</span>)}
            </div>
          </div>
          <FormCotizar />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <div className="seccion-cabeza"><h2>¿Cuándo conviene una fórmula magistral?</h2></div>
          <div className="razones">
            <div><strong>La dosis no existe</strong><p>El producto comercial no viene en la concentración que te indicaron.</p></div>
            <div><strong>Hay que ajustarla</strong><p>Por peso o edad, en niños, adultos mayores o mascotas.</p></div>
            <div><strong>Un componente te cae mal</strong><p>Preparamos sin el colorante, azúcar o lactosa que no toleras.</p></div>
            <div><strong>Muchas tomas</strong><p>Reunimos activos compatibles en un solo preparado.</p></div>
          </div>
        </div>
      </section>

      <section className="seccion seccion-gris">
        <div className="contenedor">
          <div className="seccion-cabeza"><h2>Especialidades</h2></div>
          <div className="lineas-grid">
            {LINEAS.map(([I, t, d]) => (
              <article key={t} className="linea-card">
                <span className="cat-icono"><I width={28} height={28} /></span>
                <strong>{t}</strong>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor bloque-pasos">
          <div>
            <span className="eyebrow">Cómo funciona</span>
            <h2>De tu receta a tus manos</h2>
            <p className="nota">Plazo habitual de preparación: <M v={EMPRESA.plazoPreparacion} /></p>
          </div>
          <PasosFormula />
        </div>
      </section>

      <section className="seccion seccion-gris">
        <div className="contenedor">
          <div className="seccion-cabeza"><h2>Preguntas frecuentes</h2></div>
          <div className="acordeon">
            {[
              ['¿Necesito receta médica?', 'Sí. Preparamos a partir de la receta de un médico, odontólogo u obstetra, o de un médico veterinario para mascotas.'],
              ['¿Cuánto demora?', <>Depende de la fórmula; al cotizar te confirmamos la fecha. Plazo habitual: <M v={EMPRESA.plazoPreparacion} />.</>],
              ['¿Hacen envíos?', <>Sí, coordinamos entregas a <M v={EMPRESA.coberturaEnvio} />.</>],
              ['¿Cómo pago?', <>Aceptamos <M v={EMPRESA.mediosPago} />.</>],
            ].map(([q, a], n) => (
              <details key={q} open={n === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------------- Sedes ---------------- */
export function Sedes() {
  return (
    <div className="contenedor pagina">
      <nav className="migas" aria-label="Ruta"><a href="#/">Inicio</a> / <span>Sedes</span></nav>
      <h1 className="titulo-pagina">Nuestras sedes</h1>
      <p className="subtitulo-pagina">Lleva tu receta a cualquiera de nuestras sedes o envíala por WhatsApp y elige dónde recogerla.</p>
      <div className="sedes-grid">
        {SEDES.map((s) => (
          <article key={s.id} className={`sede ${s.principal ? 'sede-principal' : ''}`}>
            <div className="sede-mapa" aria-hidden="true">
              <IcoPin width={34} height={34} />
            </div>
            <div className="sede-cuerpo">
              <div className="sede-titulo">
                <h2>{s.nombre}</h2>
                {s.principal && <span className="badge badge-nuevo">Principal</span>}
              </div>
              <p className="sede-ciudad"><M v={s.ciudad} /></p>
              <ul className="sede-datos">
                <li><IcoPin width={18} height={18} /> <span><M v={s.direccion} /><br /><small><M v={s.referencia} /></small></span></li>
                <li><IcoReloj width={18} height={18} /> <M v={s.horario} /></li>
                <li><IcoTel width={18} height={18} /> <M v={s.telefono} /></li>
              </ul>
              {s.mapa ? (
                <a className="btn btn-contorno btn-chico" href={s.mapa} target="_blank" rel="noopener">Cómo llegar</a>
              ) : (
                <span className="marcador">[ENLACE GOOGLE MAPS]</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Contacto ---------------- */
export function Contacto() {
  const wa = enlaceWhatsApp('Hola QBD, tengo una consulta.')
  return (
    <div className="contenedor pagina">
      <nav className="migas" aria-label="Ruta"><a href="#/">Inicio</a> / <span>Contacto</span></nav>
      <h1 className="titulo-pagina">Contáctanos</h1>
      <div className="contacto">
        <div className="contacto-canales">
          <a className="canal canal-wa" href={wa || '#/contacto'} {...(wa ? { target: '_blank', rel: 'noopener' } : {})}>
            <IcoWhatsApp width={26} height={26} />
            <span><small>WhatsApp</small><M v={EMPRESA.whatsappVisible} /></span>
          </a>
          <div className="canal"><IcoTel width={24} height={24} /><span><small>Teléfono</small><M v={EMPRESA.telefono} /></span></div>
          <div className="canal"><IcoCorreo width={24} height={24} /><span><small>Correo</small><M v={EMPRESA.correo} /></span></div>
          <a className="canal" href="#/sedes"><IcoPin width={24} height={24} /><span><small>Sedes</small>{SEDES.map((s) => s.nombre.replace('Sede ', '')).join(', ')}</span></a>
        </div>
        <FormCotizar />
      </div>
    </div>
  )
}

/* ---------------- Favoritos ---------------- */
export function Favoritos() {
  const { favoritos } = useTienda()
  const lista = PRODUCTOS.filter((p) => favoritos.includes(p.id))
  return (
    <div className="contenedor pagina">
      <nav className="migas" aria-label="Ruta"><a href="#/">Inicio</a> / <span>Favoritos</span></nav>
      <h1 className="titulo-pagina">Mis favoritos</h1>
      {lista.length ? (
        <div className="grid-productos">{lista.map((p) => <ProductoCard key={p.id} producto={p} />)}</div>
      ) : (
        <div className="vacio">
          <p><strong>Aún no tienes favoritos.</strong></p>
          <p>Toca el corazón de un producto para guardarlo aquí.</p>
          <a href="#/tienda" className="btn btn-primario">Ir a la tienda</a>
        </div>
      )}
    </div>
  )
}
