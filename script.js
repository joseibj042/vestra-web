"use strict";
(() => {
  const cfg = window.VESTRA_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const announcedVersion = String(cfg.currentVersion || "6.0").replace(/^[vV]/, "");
  document.querySelectorAll("[data-announced-version]").forEach((el) => { el.textContent = announcedVersion; });
  $("download-version").textContent = announcedVersion;
  $("year").textContent = String(new Date().getFullYear());

  // Navegación accesible para móviles.
  const menuToggle = $("menu-toggle");
  const nav = $("primary-nav");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  };
  menuToggle.addEventListener("click", () => {
    const opening = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", opening);
    menuToggle.setAttribute("aria-expanded", String(opening));
    menuToggle.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  // Ampliación opcional de las dos imágenes de la campaña visual.
  const promoDialog = $("promo-dialog");
  const promoDialogImage = $("promo-dialog-img");
  const closePreviewButton = $("close-preview");
  if (promoDialog && promoDialogImage && typeof promoDialog.showModal === "function") {
    document.querySelectorAll("[data-preview-src]").forEach((button) => {
      button.addEventListener("click", () => {
        promoDialogImage.src = button.dataset.previewSrc;
        promoDialogImage.alt = button.dataset.previewAlt || "Arte promocional ampliado de VESTRA";
        promoDialog.showModal();
      });
    });
    closePreviewButton.addEventListener("click", () => promoDialog.close());
    promoDialog.addEventListener("click", (event) => { if (event.target === promoDialog) promoDialog.close(); });
  }

  const isHttps = (value) => {
    if (typeof value !== "string" || !value.trim()) return false;
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  };
  const isRepo = (value) => /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(value);
  const versionParts = (tag) => {
    // Acepta etiquetas GitHub "v6.0", "6.0", "v6.0.0" y "v6.0.1".
    const match = String(tag || "").trim().match(/^v?(\d+)\.(\d+)(?:\.(\d+))?(?:$|[-+])/i);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3] || 0)] : null;
  };
  const compareVersions = (a, b) => {
    const x = versionParts(a), y = versionParts(b);
    if (!x || !y) return null;
    for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return Math.sign(x[i] - y[i]);
    return 0;
  };
  const safeDate = (s) => {
    if (!s) return "";
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });
  };

  function enableDownload(url, version, filename) {
    const a = $("download-button");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.classList.remove("is-disabled");
    a.removeAttribute("aria-disabled");
    a.removeAttribute("tabindex");
    a.textContent = `Descargar APK ${version ? "v" + String(version).replace(/^v/i, "") : ""} ↗`;
    $("release-status").textContent = "Descarga disponible";
    $("availability-dot").classList.add("is-available");
    $("download-version").textContent = String(version || announcedVersion).replace(/^v/i, "");
    $("download-message").textContent = filename ? `Archivo: ${filename}` : "Enlace de descarga oficial activo.";
  }

  const directUrl = String(cfg.directApkUrl || "").trim();
  if (isHttps(directUrl)) enableDownload(directUrl, announcedVersion, "");

  // Capturas opcionales: nunca repetimos la imagen promocional como galería.
  const screenshots = Array.isArray(cfg.screenshots) ? cfg.screenshots : [];
  const validShots = screenshots.filter((path) => typeof path === "string" && /^assets\/[\w./-]+\.(?:webp|jpg|jpeg|png)$/i.test(path) && !path.includes("..")).slice(0, 8);
  if (validShots.length) {
    const gallery = $("screenshots");
    validShots.forEach((path, i) => {
      const img = document.createElement("img");
      img.src = path;
      img.alt = `Captura del juego VESTRA ${i + 1}`;
      img.loading = "lazy";
      img.decoding = "async";
      gallery.appendChild(img);
    });
    $("capturas").hidden = false;
  }

  const repo = String(cfg.githubRepo || "").trim();
  if (!isRepo(repo)) return;

  function appendHistory(releases) {
    const older = releases.filter((r) => r.tag_name && compareVersions(r.tag_name, announcedVersion) === -1).slice(0, 5);
    if (!older.length) return;
    const list = $("history-list");
    older.forEach((release) => {
      const row = document.createElement("div");
      row.className = "history-item";
      const label = document.createElement("div");
      const version = document.createElement("strong");
      version.textContent = release.tag_name;
      label.appendChild(version);
      const date = safeDate(release.published_at);
      if (date) {
        const small = document.createElement("small");
        small.textContent = date;
        label.appendChild(small);
      }
      row.appendChild(label);
      const apk = (release.assets || []).find((asset) => /\.apk$/i.test(asset.name || "") && isHttps(asset.browser_download_url));
      if (apk) {
        const a = document.createElement("a");
        a.href = apk.browser_download_url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Descargar ↗";
        row.appendChild(a);
      } else {
        const span = document.createElement("span");
        span.textContent = "Sin APK";
        row.appendChild(span);
      }
      list.appendChild(row);
    });
    $("all-releases").href = `https://github.com/${repo}/releases`;
    $("history").hidden = false;
  }

  async function fetchReleases() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=30`, {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Formato de respuesta inesperado");
      const releases = data.filter((r) => r && !r.draft && !r.prerelease).sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0));
      appendHistory(releases);
      // Descarga solo versiones iguales o posteriores a la anunciada; no ofrecer un APK anterior.
      const candidates = releases.filter((r) =>
        compareVersions(r.tag_name, announcedVersion) !== null &&
        compareVersions(r.tag_name, announcedVersion) >= 0 &&
        (r.assets || []).some((a) => /\.apk$/i.test(a.name || "") && isHttps(a.browser_download_url))
      ).sort((a, b) => compareVersions(b.tag_name, a.tag_name) || new Date(b.published_at || 0) - new Date(a.published_at || 0));
      if (!isHttps(directUrl) && candidates.length) {
        const release = candidates[0];
        const asset = release.assets.find((a) => /\.apk$/i.test(a.name || "") && isHttps(a.browser_download_url));
        enableDownload(asset.browser_download_url, release.tag_name, asset.name);
      } else if (!isHttps(directUrl)) {
        $("download-message").textContent = `La versión ${announcedVersion} aún no tiene un APK publicado en este repositorio.`;
      }
    } catch (e) {
      if (!isHttps(directUrl)) {
        $("download-message").textContent = "No fue posible comprobar las descargas de GitHub. Inténtalo nuevamente más tarde.";
      }
      console.warn("VESTRA: no se pudieron cargar los lanzamientos.", e.message);
    } finally {
      clearTimeout(timeout);
    }
  }
  fetchReleases();
})();
