# VESTRA — Web oficial, edición 5.0.1

Una web estática (HTML/CSS/JavaScript) de VESTRA que integra tres nuevas imágenes promocionales aportadas. Compatible con PC y Android, sin compilación, sin backend ni suscripción obligatoria.

## Novedades incluidas en el sitio

- La **versión actual anunciada** es **5.0.1**.
- **Luces LED** incorporadas.
- **Mejoras en las mascotas**.
- **Azotea habilitada**.
- Nueva imagen promocional principal en la portada, enlazada a la sección de descarga.
- Dos piezas adicionales en una galería editorial que permite ampliarlas.
- Cada una de las tres nuevas imágenes aparece una sola vez en la página; se muestran completas y sin recortes.
- Las imágenes están optimizadas en WebP para acelerar la carga en dispositivos móviles.
- La galería opcional de **capturas reales** sigue siendo independiente de los artes promocionales.
- Se retiraron textos y secciones promocionales redundantes.
- Descargas desde GitHub Releases (recomendado) o un enlace directo HTTPS.
- Historial de versiones anteriores solo si existen publicaciones en GitHub.

## Probar en Visual Studio Code

1. Descomprime el ZIP.
2. Abre la carpeta en **Visual Studio Code**.
3. Instala **Live Server** (Ritwick Dey), abre `index.html` y selecciona **Open with Live Server**.
4. Alternativamente, desde la carpeta ejecuta `python -m http.server 8000` y visita `http://localhost:8000/`.

## Activar la descarga de la versión 5.0.1

La web no incluye un APK. Por seguridad, la descarga aparece deshabilitada hasta añadir un enlace real.

**Opción A — GitHub Releases (recomendado):**
1. Crea un repositorio público de GitHub, por ejemplo `TU_USUARIO/vestra-releases`.
2. En **Releases → Draft a new release**, crea la etiqueta **`v5.0.1`**.
3. Adjunta el archivo `.apk` de la versión 5.0.1 y publica la release (no draft ni prerelease).
4. En `config.js` escribe `githubRepo: "TU_USUARIO/vestra-releases"`.
5. Guarda y recarga la web. La descarga se activa al detectar la versión 5.0.1 (o posterior) con APK.

**Opción B — URL directa:**
1. Sube el APK a un servicio que proporcione un enlace **HTTPS directo** al archivo.
2. En `config.js` rellena `directApkUrl: "https://.../VESTRA-5.0.1.apk"`.
3. El botón de descarga se activará sin consultar GitHub.

**Nota:** la página jamás permite descargar un APK de una versión *anterior* a la anunciada como si fuera 5.0.1. Las versiones previas, si están disponibles, aparecen aparte. Para el mismo juego en Android, conserva el mismo package name, firma y aumenta `versionCode`.

## Añadir capturas reales

Guarda tus capturas en `assets/` e incluye las rutas en `config.js`:

```js
screenshots: ["assets/imagen1.webp", "assets/imagen2.webp"]
```

Sin capturas no se muestra ningún módulo vacío de galería ni se reutiliza la imagen promocional como falsa captura de gameplay.

## Publicar gratis con GitHub Pages

1. Crea un repositorio público, por ejemplo `vestra-web`.
2. Sube el contenido de esta carpeta (`index.html`, `styles.css`, `config.js`, `script.js`, `assets/`, `.nojekyll`).
3. En **Settings → Pages**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. El sitio quedará en una dirección del tipo `https://TU_USUARIO.github.io/vestra-web/` cuando GitHub complete la publicación.

El servicio es gratuito dentro de sus condiciones y límites; GitHub Releases no es un CDN ilimitado. No guardes claves ni tokens privados en `config.js`. Esta web no detecta la versión instalada en el celular ni instala APK automáticamente: Android siempre requiere las autorizaciones correspondientes.

## Estructura

- `index.html`: contenido de la página.
- `styles.css`: estilos y adaptación móvil.
- `config.js`: versión, enlaces y capturas.
- `script.js`: navegación, comprobación de releases y descargas.
- `assets/vestra-campana-principal.webp`: portada promocional (imagen 1).
- `assets/vestra-campana-moda.webp`: collage promocional (imagen 2).
- `assets/vestra-campana-azul.webp`: promoción azul (imagen 3).
- `assets/icono-vestra.png`: icono personalizado a partir de la imagen aportada.

## Ver las tres imágenes

- **Imagen 1**: se muestra completa en la portada. Si la pulsas, te desplaza a la sección de descarga; los botones dibujados dentro de la imagen no son controles reales.
- **Imagen 2**: aparece en la galería, con opción de ampliación.
- **Imagen 3**: aparece junto a la imagen 2, con opción de ampliación.

Los textos y botones ilustrados dentro de las imágenes promocionales son parte del arte original. El **botón real** de descarga es el que se activa en la sección «Descargar» al configurar el APK.
