# QBD Farmacia Magistral — web pública

Página de presentación hecha con React + Vite. Es independiente del sistema interno (`D:\Qbd_farmacia_web`).

## Cómo verla

```powershell
cd D:\QBD_farmcia_magistral
npm run dev
```

Abre http://localhost:5173. Para generar la versión final, que se sube al hosting:

```powershell
npm run build
```

El resultado queda en `dist/`; sube el contenido de esa carpeta a cualquier hosting estático.

> El disco C: está casi lleno. Si reinstalas dependencias, usa la caché en D:
> `npm install --cache D:\npm-cache-qbd`

## Datos que faltan completar

Todos están en **`src/config.js`** y se ven en la web resaltados en amarillo, como `[TELÉFONO]`.

| Dato | Dónde |
|---|---|
| Número de WhatsApp (formato `51XXXXXXXXX`) y cómo mostrarlo | `EMPRESA.whatsapp`, `EMPRESA.whatsappVisible` |
| Teléfono y correo | `EMPRESA.telefono`, `EMPRESA.correo` |
| Q.F. responsable y N° C.Q.F.P. | `EMPRESA.qfResponsable`, `EMPRESA.cqfp` |
| N° de autorización sanitaria | `EMPRESA.registroSanitario` |
| Razón social y RUC | `EMPRESA.razonSocial`, `EMPRESA.ruc` |
| Facebook, Instagram, TikTok | `EMPRESA.facebook`, etc. |
| Enlace al Libro de Reclamaciones virtual | `EMPRESA.libroReclamaciones` |
| Por sede: ciudad (Central), dirección, referencia, horario, teléfono, enlace de Google Maps | `SEDES` |
| Otras sedes | Agrega objetos a `SEDES` |

Textos con marcador en `src/components/Secciones.jsx` (preguntas frecuentes):
`[PLAZO DE PREPARACIÓN]`, `[COBERTURA DE DELIVERY]`, `[MEDIOS DE PAGO]`.

**Logo:** hoy es un ícono genérico de mortero con el texto "QBD". Para usar el logo real, copia el archivo a `public/logo.svg` (o `.png`) y reemplaza el contenido de `Logo()` en `src/components/Header.jsx`. Cambia también `public/favicon.svg`.

**Fotos:** la página no usa fotos. Si quieres agregar fotos del laboratorio o de las sedes, ponlas en `public/`.
