import { useEffect, useState } from 'react'
import { CATEGORIAS, PRODUCTOS } from '../data/catalogo.js'
import { EMPRESA, SEDES, enlaceWhatsApp, esMarcador } from '../config.js'
import { ProductoCard, ICONOS_CATEGORIA } from '../components/Producto.jsx'
import { IcoFlecha, IcoWhatsApp, IcoEscudo, IcoCamion, IcoTarjeta, IcoReceta, IcoPin, IcoReloj } from '../components/Iconos.jsx'

/* ---------------- Carrusel principal ---------------- */
function Carrusel() {
  const wa = enlaceWhatsApp('Hola QBD, quiero cotizar una receta magistral.')
  const slides = [
    {
      clave: 'marca',
      contenido: (
        <div className="slide slide-imagen">
          <img src="img/banner-qbd.png" alt="QBD Farmacia Magistral" />
          <div className="slide-imagen-cta">
            <a href="#/tienda" className="btn btn-primario">Ver la tienda</a>
          </div>
        </div>
      ),
    },
    {
      clave: 'formula',
      contenido: (
        <div className="slide slide-azul">
          <div className="slide-texto">
            <span className="slide-eyebrow">Fórmulas magistrales</span>
            <h2>Tu tratamiento, preparado <em>a tu medida</em></h2>
            <p>Envíanos la foto de tu receta y un químico farmacéutico te cotiza hoy mismo.</p>
            <div className="slide-botones">
              <a href="#/formula-magistral" className="btn btn-verde">Cotizar mi receta</a>
              <a href={wa || '#/contacto'} className="btn btn-blanco" {...(wa ? { target: '_blank', rel: 'noopener' } : {})}>
                <IcoWhatsApp width={18} height={18} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="slide-arte">
            <img src="img/cuidamos-tu-salud.png" alt="" />
          </div>
        </div>
      ),
    },
    {
      clave: 'ofertas',
      contenido: (
        <div className="slide slide-verde">
          <div className="slide-texto">
            <span className="slide-eyebrow">Ofertas de la semana</span>
            <h2>Cuidado de la piel y vitaminas con descuento</h2>
            <p>Protectores solares, sérums, multivitamínicos y más.</p>
            <div className="slide-botones">
              <a href="#/tienda?ofertas=1" className="btn btn-azul-osc">Ver ofertas</a>
            </div>
          </div>
          <div className="slide-arte slide-arte-iso">
            <img src="img/isotipo-qbd.png" alt="" />
          </div>
        </div>
      ),
    },
  ]
  const [i, setI] = useState(0)
  const [pausa, setPausa] = useState(false)
  useEffect(() => {
    if (pausa || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [pausa, slides.length])

  return (
    <section className="carrusel" aria-roledescription="carrusel" aria-label="Destacados" onMouseEnter={() => setPausa(true)} onMouseLeave={() => setPausa(false)}>
      <div className="carrusel-pista" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, n) => (
          <div key={s.clave} className="carrusel-item" aria-hidden={n !== i} inert={n !== i ? '' : undefined}>
            {s.contenido}
          </div>
        ))}
      </div>
      <button type="button" className="carrusel-flecha izq" aria-label="Anterior" onClick={() => setI((i - 1 + slides.length) % slides.length)}>
        <IcoFlecha dir="izq" />
      </button>
      <button type="button" className="carrusel-flecha der" aria-label="Siguiente" onClick={() => setI((i + 1) % slides.length)}>
        <IcoFlecha />
      </button>
      <div className="carrusel-puntos">
        {slides.map((s, n) => (
          <button key={s.clave} type="button" aria-label={`Ir a la diapositiva ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} />
        ))}
      </div>
    </section>
  )
}

/* ---------------- Beneficios ---------------- */
function Beneficios() {
  const items = [
    [IcoReceta, 'Fórmulas a medida', 'Preparadas según tu receta'],
    [IcoEscudo, 'Q.F. responsable', 'Control en cada preparado'],
    [IcoCamion, 'Envíos', EMPRESA.coberturaEnvio],
    [IcoTarjeta, 'Paga fácil', EMPRESA.mediosPago],
  ]
  return (
    <section className="beneficios">
      <div className="contenedor beneficios-grid">
        {items.map(([I, t, d]) => (
          <div key={t} className="beneficio">
            <span className="beneficio-icono"><I /></span>
            <div>
              <strong>{t}</strong>
              <span className={esMarcador(d) ? 'marcador' : ''}>{d}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Categorías ---------------- */
function Categorias() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2>Compra por categoría</h2>
          <a href="#/tienda" className="ver-todo">Ver todo <IcoFlecha width={16} height={16} /></a>
        </div>
        <div className="cats-grid">
          {CATEGORIAS.map((c) => {
            const I = ICONOS_CATEGORIA[c.icono]
            const n = PRODUCTOS.filter((p) => p.categoria === c.id).length
            return (
              <a key={c.id} href={c.id === 'formulas' ? '#/formula-magistral' : `#/tienda?cat=${c.id}`} className={`cat-card ${c.id === 'formulas' ? 'cat-card-destacada' : ''}`}>
                <span className="cat-icono"><I width={30} height={30} /></span>
                <strong>{c.corto}</strong>
                <small>{c.id === 'formulas' ? 'Cotiza tu receta' : `${n} productos`}</small>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Banners promocionales ---------------- */
function Banners() {
  return (
    <section className="seccion seccion-sin-arriba">
      <div className="contenedor banners">
        <a href="#/formula-magistral" className="banner banner-azul">
          <span className="banner-eyebrow">Laboratorio QBD</span>
          <strong>Fórmulas dermatológicas</strong>
          <span>Cremas y geles con la concentración exacta de tu receta</span>
          <span className="banner-link">Cotizar <IcoFlecha width={16} height={16} /></span>
        </a>
        <a href="#/tienda?cat=veterinaria" className="banner banner-verde">
          <span className="banner-eyebrow">Veterinaria</span>
          <strong>Cuidado para tus mascotas</strong>
          <span>Dosis pequeñas y formas fáciles de dar</span>
          <span className="banner-link">Ver productos <IcoFlecha width={16} height={16} /></span>
        </a>
        <a href="#/tienda?cat=bebes" className="banner banner-claro">
          <span className="banner-eyebrow">Bebés y niños</span>
          <strong>Pieles delicadas</strong>
          <span>Jarabes pediátricos a medida y cuidado diario</span>
          <span className="banner-link">Ver productos <IcoFlecha width={16} height={16} /></span>
        </a>
      </div>
    </section>
  )
}

/* ---------------- Vitrina con pestañas ---------------- */
function Vitrina() {
  const pestañas = [
    ['destacados', 'Destacados', (p) => p.destacado],
    ['ofertas', 'En oferta', (p) => p.antes],
    ['nuevos', 'Novedades', (p) => p.nuevo],
  ]
  const [tab, setTab] = useState('destacados')
  const filtro = pestañas.find((p) => p[0] === tab)[2]
  const lista = PRODUCTOS.filter(filtro).slice(0, 8)
  return (
    <section className="seccion seccion-gris">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2>Nuestros productos</h2>
          <div className="tabs" role="tablist">
            {pestañas.map(([k, t]) => (
              <button key={k} role="tab" type="button" aria-selected={tab === k} className={tab === k ? 'activa' : ''} onClick={() => setTab(k)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid-productos">
          {lista.map((p) => <ProductoCard key={p.id} producto={p} />)}
        </div>
        <div className="centrado">
          <a href="#/tienda" className="btn btn-contorno">Ver todos los productos</a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Cómo pedir tu fórmula ---------------- */
export function PasosFormula() {
  const pasos = [
    ['Envía tu receta', 'Foto clara por WhatsApp o en cualquiera de nuestras sedes.'],
    ['Recibe tu cotización', 'Un químico farmacéutico revisa la fórmula y te confirma precio y fecha.'],
    ['La preparamos', 'Elaboración en laboratorio con control de pesaje y etiqueta con lote.'],
    ['Recógela o te la enviamos', 'En la sede que elijas o con delivery.'],
  ]
  return (
    <ol className="pasos">
      {pasos.map(([t, d], n) => (
        <li key={t} className="paso">
          <span className="paso-num">{n + 1}</span>
          <div>
            <strong>{t}</strong>
            <p>{d}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function BloqueFormula() {
  return (
    <section className="seccion">
      <div className="contenedor bloque-formula">
        <div className="bloque-formula-texto">
          <span className="eyebrow">Fórmula magistral</span>
          <h2>¿Tienes una receta? La preparamos para ti</h2>
          <p>
            Medicamentos elaborados uno a uno con la dosis, la forma y la base que indica tu médico o
            veterinario. Ideal cuando el producto comercial no existe en la concentración que necesitas.
          </p>
          <PasosFormula />
          <a href="#/formula-magistral" className="btn btn-primario">Cotizar mi receta</a>
        </div>
        <div className="bloque-formula-img">
          <img src="img/cuidamos-tu-salud.png" alt="QBD Farmacia Magistral. Cuidamos tu salud." loading="lazy" />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Sedes (resumen) ---------------- */
function SedesResumen() {
  return (
    <section className="seccion seccion-azul">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2>Visítanos en nuestras sedes</h2>
          <a href="#/sedes" className="ver-todo ver-todo-claro">Ver detalles <IcoFlecha width={16} height={16} /></a>
        </div>
        <div className="sedes-mini">
          {SEDES.map((s) => (
            <a key={s.id} href="#/sedes" className="sede-mini">
              <strong>{s.nombre}</strong>
              <span><IcoPin width={16} height={16} /> <span className={esMarcador(s.direccion) ? 'marcador marcador-osc' : ''}>{s.direccion}</span></span>
              <span><IcoReloj width={16} height={16} /> <span className={esMarcador(s.horario) ? 'marcador marcador-osc' : ''}>{s.horario}</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Inicio() {
  return (
    <>
      <div className="contenedor"><Carrusel /></div>
      <Beneficios />
      <Categorias />
      <Banners />
      <Vitrina />
      <BloqueFormula />
      <SedesResumen />
    </>
  )
}
