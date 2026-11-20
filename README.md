# VESTRA 6.0 — Página web oficial

Web estática para publicar VESTRA en Android. Se abre con Visual Studio Code + Live Server y puede publicarse gratis mediante GitHub Pages, dentro de los límites de GitHub. No necesitas Node.js, base de datos ni pagar por un hosting. **El APK no está incluido**: debes subirlo a GitHub Releases y conectar el repositorio.

## Novedades de VESTRA 6.0 anunciadas en la página

1. Plato de agua para las mascotas.
2. Nuevas prendas.
3. Corrección de errores.
4. Interruptores en las demás plantas.
5. Nuevas figuras.
6. Nuevos pósteres.
7. Nuevas luces LED RGB.
8. Nueva ventana de novedades.
9. Nuevo árbol de habilidades.

La sección da mayor protagonismo al árbol de habilidades, las luces RGB y el plato de agua; agrupa los seis cambios restantes sin repetir contenido. Mantiene las tres imágenes de campaña y distingue el collage que contiene el número **5.0.1** como **campaña anterior**, para que nadie lo confunda con la versión actual. Son imágenes promocionales y no capturas reales del juego.

## Probar en Visual Studio Code

1. Extrae este ZIP.
2. Abre la carpeta `VESTRA_Web_6.0` en **Visual Studio Code**.
3. Abre `index.html` con **Live Server** (extensión de Ritwick Dey).
4. Alternativamente ejecuta `python -m http.server 8000` dentro de esta carpeta y visita `http://localhost:8000/`.

## Conectar la descarga del APK VESTRA 6.0

En `config.js`, coloca el nombre real de tu repositorio de APK:

```js
window.VESTRA_CONFIG = {
  currentVersion: "6.0",
  githubRepo: "TU_USUARIO/vestra-releases",
  directApkUrl: "",
  screenshots: []
};
```

Después:

1. En GitHub abre el repositorio **público** `vestra-releases`.
2. Ve a **Releases → Draft a new release**.
3. Crea un tag **`v6.0`** (también se acepta `v6.0.0`).
4. Adjunta el archivo del juego (por ejemplo, `VESTRA-6.0.apk`) en la sección de archivos adjuntos.
5. Pulsa **Publish release**. No la marques como borrador ni como *pre-release*.
6. Vuelve a la página. El botón de descarga se activará cuando GitHub devuelva una release pública igual o posterior a la **6.0** con un archivo `.apk`.

El sitio también puede usar `directApkUrl` con un enlace HTTPS **directo** al APK, si no deseas usar GitHub Releases. En ese caso el enlace directo tiene prioridad sobre las releases del repositorio.

**Importante:** si todavía tienes publicada únicamente la versión 5.0.1, la página **no la presentará como si fuera la 6.0**. El botón de descarga permanecerá inactivo hasta subir la 6.0 o configurar un enlace directo.

## Subir la página a GitHub Pages

1. Crea o abre tu repositorio público de la web, por ejemplo `vestra-web`.
2. Para sustituir la web anterior, **sube el contenido de esta carpeta** en la raíz del repositorio (no la carpeta contenedora y no el ZIP): `index.html`, `styles.css`, `config.js`, `script.js`, `.nojekyll` y la carpeta `assets/`.
3. En GitHub: **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
4. Visita `https://TU_USUARIO.github.io/vestra-web/` cuando se publique.

### Si GitHub no te deja subir la carpeta `assets`

Utiliza **GitHub Desktop**, que mantiene la estructura de carpetas:

1. En GitHub Desktop, selecciona **File → Clone repository** y elige `vestra-web`.
2. Abre desde el Explorador de Windows la carpeta local del repositorio que clonaste.
3. Copia **todos los archivos y la carpeta `assets`** de `VESTRA_Web_6.0` dentro de la carpeta del repositorio. Acepta reemplazar los archivos de la versión anterior.
4. En GitHub Desktop, escribe el resumen `Actualizar web VESTRA a 6.0`.
5. Haz clic en **Commit to main** y después **Push origin**.

### Para publicar las siguientes versiones

Sube otro APK a una release nueva de GitHub (por ejemplo `v6.0.1`). El enlace del botón podrá detectar esa versión automáticamente. **Los textos y la sección de novedades de portada no se reescriben solos**: al lanzar una nueva versión, tendrás que actualizar el contenido de `index.html` y `currentVersion` de `config.js`.

## Precauciones

- Mantén el mismo **package name** y firma del APK para las actualizaciones de Android y aumenta el **versionCode** en Unity.
- Android puede pedir permiso de instalación de APK y confirmación del usuario. Esta web no instala APK silenciosamente.
- No coloques tokens, contraseñas ni secretos en `config.js`.
- GitHub Pages y GitHub Releases están sujetos a límites y condiciones de uso, especialmente si el volumen de descargas crece mucho.
- Si no existen enlaces reales de descarga, el botón permanece desactivado; **no hay APK incluido en el ZIP**.

## Archivos

- `index.html`: portada y notas de la actualización 6.0.
- `styles.css`: presentación visual y diseño móvil.
- `script.js`: menú, ampliación de imágenes y consulta de GitHub Releases.
- `config.js`: repo de APK, versión y capturas opcionales.
- `assets/vestra-campana-principal.webp`: imagen principal.
- `assets/vestra-campana-azul.webp`: promocional azul.
- `assets/vestra-campana-moda.webp`: collage histórico, contiene texto 5.0.1 de la campaña anterior.
- `assets/icono-vestra.png`: icono de la web.

Los botones que están **dibujados dentro de las imágenes** son parte de las ilustraciones; el botón funcional para descargar está en el apartado **Descargar**.
