(() => {
  "use strict";

  const RUNTIME_VERSION_FALLBACK = "2.1.0";
  const gameTargets = {
    kotor: {
      label: "KotOR I",
      url: "https://play.swkotor.net/game/?key=kotor",
    },
    tsl: {
      label: "KotOR II: The Sith Lords",
      url: "https://play.swkotor.net/game/?key=tsl",
    },
  };

  const path = window.location.pathname.split("/").pop() || "index.html";
  // Bookmark redirects: downloads → tools, mirrors → play
  const navAlias =
    path === "downloads.html" ? "tools.html" : path === "mirrors.html" ? "play.html" : path;
  document.querySelectorAll(".primary-nav a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const file = href.split("?")[0].split("/").pop();
    if (file && file === navAlias) {
      link.setAttribute("aria-current", "page");
    }
  });

  const query = new URLSearchParams(window.location.search);
  const selectedGame = query.get("game") === "tsl" ? "tsl" : "kotor";
  const target = gameTargets[selectedGame];

  document.querySelectorAll("[data-game-choice]").forEach((choice) => {
    const isSelected = choice.dataset.gameChoice === selectedGame;
    choice.classList.toggle("is-selected", isSelected);
    if (isSelected) {
      choice.setAttribute("aria-current", "true");
    } else {
      choice.removeAttribute("aria-current");
    }
  });

  document.querySelectorAll("[data-launch-target]").forEach((link) => {
    link.href = target.url;
  });

  document.querySelectorAll("[data-selected-game]").forEach((label) => {
    label.textContent = target.label;
  });

  const checks = {
    secure: {
      pass: window.isSecureContext,
      ok: "secure context",
      fail: "HTTPS is required (file:// and plain HTTP will not work)",
    },
    picker: {
      pass: typeof window.showDirectoryPicker === "function",
      ok: "directory picker available",
      fail: "directory picker missing — use desktop Chrome/Edge, or play via reone on desktop",
    },
    webgl2: {
      pass: (() => {
        try {
          return Boolean(document.createElement("canvas").getContext("webgl2"));
        } catch {
          return false;
        }
      })(),
      ok: "WebGL 2 available",
      fail: "WebGL 2 is unavailable or disabled",
    },
    indexeddb: {
      pass: "indexedDB" in window,
      ok: "browser storage available",
      fail: "IndexedDB is unavailable",
    },
  };

  let passed = 0;
  const total = Object.keys(checks).length;
  Object.entries(checks).forEach(([name, result]) => {
    const row = document.querySelector(`[data-capability="${name}"]`);
    if (!row) return;

    row.classList.add(result.pass ? "is-pass" : "is-fail");
    const state = row.querySelector("[data-cap-state]");
    const detail = row.querySelector("[data-cap-detail]");
    if (state) state.textContent = result.pass ? "OK" : "Missing";
    if (detail) detail.textContent = result.pass ? result.ok : result.fail;
    if (result.pass) passed += 1;
  });

  const ready = passed === total;
  const pickerOk = checks.picker.pass;
  const summary = document.querySelector("[data-cap-summary]");
  const details = document.querySelector(".preflight-details");
  if (summary) {
    summary.textContent = ready
      ? `Ready — ${passed}/${total} checks passed`
      : `${passed}/${total} checks passed — review before launch`;
    summary.classList.add(ready ? "is-pass" : "is-warn");
  }
  if (details) {
    details.open = !ready;
  }

  const fallback = document.querySelector("[data-fallback]");
  if (fallback) {
    fallback.hidden = pickerOk;
  }

  const launchNote = document.querySelector("[data-launch-note]");
  if (launchNote) {
    launchNote.textContent = ready
      ? "Browser looks good. Launch opens play.swkotor.net in a new tab."
      : "Some checks failed. Prefer desktop Chrome/Edge, or use reone on desktop.";
  }

  document.querySelectorAll("[data-launch-target]").forEach((link) => {
    link.classList.toggle("is-ready", ready);
    link.classList.toggle("is-degraded", !ready);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    if (!ready) {
      link.addEventListener("click", (event) => {
        const ok = window.confirm(
          "This browser did not pass all KotOR.js checks.\n\nContinue to play.swkotor.net anyway?\n\nIf the directory picker is missing, prefer desktop Chrome/Edge or install reone."
        );
        if (!ok) event.preventDefault();
      });
    }
  });

  // Runtime identity: version from upstream package.json + reachability via logo ping
  const versionEl = document.querySelector("[data-runtime-version]");
  const reachEl = document.querySelector("[data-runtime-reach]");
  if (versionEl) {
    versionEl.textContent = RUNTIME_VERSION_FALLBACK;
    fetch("https://raw.githubusercontent.com/KobaltBlu/KotOR.js/master/package.json", {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((pkg) => {
        if (pkg && pkg.version) versionEl.textContent = pkg.version;
      })
      .catch(() => {});
  }
  if (reachEl) {
    reachEl.textContent = "checking…";
    const img = new Image();
    const done = (ok) => {
      reachEl.textContent = ok ? "reachable" : "unreachable (try later)";
      reachEl.classList.toggle("ok", ok);
      reachEl.classList.toggle("err", !ok);
    };
    img.onload = () => done(true);
    img.onerror = () => done(false);
    img.src =
      "https://play.swkotor.net/launcher/images/kotor-js-logo.png?holowan=" +
      Date.now();
  }
})();
