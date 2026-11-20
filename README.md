# QBD Farmacia Magistral — tienda en línea

Web pública con tienda, hecha con React + Vite. Es independiente del sistema interno (`D:\Qbd_farmacia_web`).
Los colores salen del logo de QBD: azul `#0076BE`, azul profundo `#01568B` y verde `#1DE863`.

## Páginas

| Ruta | Contenido |
|---|---|
| `#/` | Inicio: carrusel, beneficios, categorías, banners, productos (destacados, ofertas, novedades), fórmula magistral y sedes |
| `#/tienda` | Catálogo con buscador, filtro por categoría, solo ofertas y orden por precio |
| `#/producto/<id>` | Detalle del producto, cantidad, favoritos y relacionados |
| `#/formula-magistral` | Qué es, especialidades, pasos, preguntas frecuentes y formulario de cotización |
| `#/carrito` | Resumen y pedido por WhatsApp |
| `#/sedes`, `#/contacto`, `#/favoritos` | Sedes, canales de contacto y productos guardados |

El carrito y los favoritos se guardan en el navegador del cliente. Por ahora el pedido se envía por WhatsApp, con el detalle de los productos ya escrito; todavía no hay pago en línea.

## Cómo verla

```powershell
cd D:\QBD_farmcia_magistral
npm run dev
```

Abre http://localhost:5173. Para generar la versión que se sube al hosting:

```powershell
npm run build
```

El resultado queda en `dist/`; sube el contenido de esa carpeta a cualquier hosting estático.

> El disco C: está casi lleno. Si reinstalas dependencias, usa la caché en D:
> `npm install --cache D:\npm-cache-qbd`

## Qué falta completar

### 1. Productos reales — `src/data/catalogo.js`
Los productos y precios actuales son **de ejemplo**. Reemplázalos por los tuyos. Si tienes fotos, ponlas en `public/img/productos/` y usa el campo `imagen`; sin foto, la web dibuja un envase con los colores de QBD.

### 2. Datos de la empresa — `src/config.js`
En la web aparecen resaltados en amarillo, como `[WHATSAPP]`.

| Dato | Campo |
|---|---|
| WhatsApp (formato `51XXXXXXXXX`) y cómo se muestra | `whatsapp`, `whatsappVisible` |
| Teléfono y correo | `telefono`, `correo` |
| Zonas de envío, medios de pago, plazo de preparación | `coberturaEnvio`, `mediosPago`, `plazoPreparacion` |
| Q.F. responsable y N° C.Q.F.P. | `qfResponsable`, `cqfp` |
| Autorización sanitaria, razón social, RUC | `registroSanitario`, `razonSocial`, `ruc` |
| Facebook, Instagram, TikTok | `facebook`, `instagram`, `tiktok` |
| Libro de Reclamaciones virtual (obligatorio en Perú) | `libroReclamaciones` |
| Por sede: ciudad (Central), dirección, referencia, horario, teléfono, enlace de Google Maps | `SEDES` |

### 3. Imágenes
El logo y los banners están en `public/img/` y salen de los archivos del sistema interno (`logo_qbd34.png`, `logo_qbd32.png`, `logo_farmacia.png`). Si tienes el logo en mejor calidad (SVG o PNG con fondo transparente), reemplaza `public/img/logo-qbd.png`.
