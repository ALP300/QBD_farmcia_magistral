import { IcoPiel, IcoBebe, IcoHuella, IcoHoja, IcoCabello, IcoCorazon } from './Iconos.jsx'

/* ---------- ¿Qué es una fórmula magistral? ---------- */
const COMPARA = [
  ['Dosis', 'Concentraciones fijas de fábrica', 'La dosis exacta que indica tu médico'],
  ['Forma', 'Solo las presentaciones disponibles', 'Cápsula, crema, jarabe, gel o solución, según convenga'],
  ['Componentes', 'Excipientes estándar', 'Sin el colorante, azúcar o lactosa que no toleras'],
  ['Combinación', 'Un activo por producto, a veces varios frascos', 'Varios activos compatibles en un solo preparado'],
]

const FORMAS = ['Cápsulas', 'Cremas', 'Geles', 'Lociones', 'Soluciones', 'Jarabes', 'Suspensiones', 'Papelillos', 'Champús', 'Óvulos']

export function FormulaMagistral() {
  return (
    <section id="formula" className="seccion">
      <div className="contenedor dos-columnas">
        <div className="col-texto">
          <p className="eyebrow">Qué hacemos</p>
          <h2>¿Qué es una fórmula magistral?</h2>
          <p>
            Es un medicamento que se prepara de forma individual para un paciente, a partir de la
            receta de su médico. Lo elabora un químico farmacéutico en el laboratorio de la farmacia,
            pesando y mezclando cada componente según lo indicado.
          </p>
          <p>
            Es la solución cuando el medicamento que necesitas no existe en la concentración
            adecuada, cuando hay que ajustar la dosis por peso o edad, o cuando un componente del
            producto comercial te cae mal.
          </p>
          <div className="formas" aria-label="Formas farmacéuticas que preparamos">
            {FORMAS.map((f) => (
              <span key={f} className="chip">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="tabla-envoltura">
          <table className="tabla-compara">
            <caption className="sr-only">Medicamento industrial frente a fórmula magistral</caption>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Medicamento industrial</th>
                <th scope="col" className="col-qbd">Fórmula magistral QBD</th>
              </tr>
            </thead>
            <tbody>
              {COMPARA.map(([k, a, b]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td data-label="Industrial">{a}</td>
                  <td data-label="Magistral QBD" className="col-qbd">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ---------- Especialidades ---------- */
const LINEAS = [
  {
    Icono: IcoPiel,
    titulo: 'Dermatología',
    texto: 'Cremas, geles y lociones para acné, manchas, rosácea, dermatitis y cuidado de la piel, con la concentración que indica el dermatólogo.',
  },
  {
    Icono: IcoBebe,
    titulo: 'Pediatría',
    texto: 'Jarabes y suspensiones con la dosis ajustada al peso del niño, en sabores agradables y sin azúcar cuando hace falta.',
  },
  {
    Icono: IcoHuella,
    titulo: 'Veterinaria',
    texto: 'Medicamentos para perros, gatos y otras mascotas, en dosis pequeñas y formas fáciles de dar, a partir de la receta del veterinario.',
  },
  {
    Icono: IcoHoja,
    titulo: 'Nutrición y suplementos',
    texto: 'Cápsulas de vitaminas, minerales y nutrientes combinados en una sola toma, según la indicación del médico o nutricionista.',
  },
  {
    Icono: IcoCabello,
    titulo: 'Tricología',
    texto: 'Soluciones y champús para la caída del cabello y el cuidado del cuero cabelludo.',
  },
  {
    Icono: IcoCorazon,
    titulo: 'Adulto mayor',
    texto: 'Varias indicaciones reunidas en menos tomas y formas más fáciles de tragar, para simplificar el tratamiento diario.',
  },
]

export function Lineas() {
  return (
    <section id="lineas" className="seccion seccion-tinta">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <p className="eyebrow">Especialidades</p>
          <h2>Preparamos para cada etapa y cada especie</h2>
          <p>Trabajamos con recetas de médicos de distintas especialidades y de médicos veterinarios.</p>
        </div>
        <div className="lineas-grid">
          {LINEAS.map(({ Icono, titulo, texto }) => (
            <article key={titulo} className="linea">
              <span className="linea-icono">
                <Icono />
              </span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Cómo funciona ---------- */
const PASOS = [
  ['Envía tu receta', 'Mándanos una foto clara de la receta por WhatsApp o tráela a cualquiera de nuestras sedes.'],
  ['Recibe tu cotización', 'Un químico farmacéutico revisa la fórmula y te confirma el precio y la fecha de entrega.'],
  ['La preparamos', 'Elaboramos tu medicamento en el laboratorio, con control de pesaje y etiqueta con lote.'],
  ['Recógela o te la enviamos', 'Retírala en la sede que elijas o coordina la entrega a domicilio.'],
]

export function ComoFunciona() {
  return (
    <section id="proceso" className="seccion">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <p className="eyebrow">Cómo funciona</p>
          <h2>De la receta a tus manos en cuatro pasos</h2>
        </div>
        <ol className="pasos">
          {PASOS.map(([t, d], i) => (
            <li key={t} className="paso">
              <span className="paso-num mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Preguntas frecuentes ---------- */
const PREGUNTAS = [
  [
    '¿Necesito receta médica?',
    'Sí. Las fórmulas magistrales se preparan a partir de la receta de un médico, odontólogo u obstetra, o de un médico veterinario en el caso de mascotas.',
  ],
  [
    '¿Cuánto demora la preparación?',
    'Depende de la fórmula. Al cotizar te confirmamos la fecha exacta. Plazo habitual: [PLAZO DE PREPARACIÓN].',
  ],
  [
    '¿Hacen envíos?',
    'Coordinamos entregas desde nuestras sedes. Consulta por WhatsApp la cobertura y el costo para tu zona: [COBERTURA DE DELIVERY].',
  ],
  [
    '¿Cómo pago?',
    'Medios de pago aceptados: [MEDIOS DE PAGO].',
  ],
  [
    '¿Cómo conservo mi preparado?',
    'Cada etiqueta indica la fecha de vencimiento y la forma de conservación. Si tienes dudas, escríbenos y un químico farmacéutico te orienta.',
  ],
]

export function Preguntas() {
  return (
    <section id="preguntas" className="seccion">
      <div className="contenedor preguntas">
        <div className="seccion-cabeza">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2>Lo que más nos consultan</h2>
        </div>
        <div className="acordeon">
          {PREGUNTAS.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
