(() => {
  "use strict";

  const PLAY_HOST = "https://play.swkotor.net";
  const HOST_PROBE = PLAY_HOST + "/launcher/";

  const gameTargets = {
    kotor: {
      label: "KotOR I",
      url: PLAY_HOST + "/game/?key=kotor",
    },
    tsl: {
      label: "KotOR II: The Sith Lords",
      url: PLAY_HOST + "/game/?key=tsl",
    },
  };

  const path = window.location.pathname.split("/").pop() || "index.html";
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
      fail: "directory picker missing — use desktop Chrome or Edge",
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

  function paintCapability(name, pass, okText, failText) {
    const row = document.querySelector(`[data-capability="${name}"]`);
    if (!row) return;
    row.classList.remove("is-pass", "is-fail", "is-pending");
    row.classList.add(pass === null ? "is-pending" : pass ? "is-pass" : "is-fail");
    const state = row.querySelector("[data-cap-state]");
    const detail = row.querySelector("[data-cap-detail]");
    if (state) {
      state.textContent = pass === null ? "…" : pass ? "OK" : "Missing";
    }
    if (detail) {
      detail.textContent = pass === null ? "checking…" : pass ? okText : failText;
    }
  }

  let browserPassed = 0;
  const browserTotal = Object.keys(checks).length;
  Object.entries(checks).forEach(([name, result]) => {
    paintCapability(name, result.pass, result.ok, result.fail);
    if (result.pass) browserPassed += 1;
  });

  const browserReady = browserPassed === browserTotal;
  const pickerOk = checks.picker.pass;

  const fallback = document.querySelector("[data-fallback]");
  if (fallback) {
    fallback.hidden = pickerOk;
  }

  paintCapability("host", null, "", "");

  const summary = document.querySelector("[data-cap-summary]");
  const details = document.querySelector(".preflight-details");
  const launchNote = document.querySelector("[data-launch-note]");
  const banner = document.querySelector("[data-preflight-banner]");
  const launchLinks = document.querySelectorAll("[data-launch-target]");
  let hostOk = null;
  let confirmBound = false;

  function applyLaunchState() {
    const hostKnown = hostOk !== null;
    const fullyReady = browserReady && hostOk === true;
    const degraded = !browserReady || hostOk === false;

    if (summary) {
      summary.classList.remove("is-pass", "is-warn", "is-pending");
      if (!hostKnown) {
        summary.textContent = `Checking host… browser ${browserPassed}/${browserTotal}`;
        summary.classList.add("is-pending");
      } else if (fullyReady) {
        summary.textContent = `Ready — ${browserPassed}/${browserTotal} browser checks · host reachable`;
        summary.classList.add("is-pass");
      } else if (!browserReady && hostOk) {
        summary.textContent = `${browserPassed}/${browserTotal} browser checks failed — review before launch`;
        summary.classList.add("is-warn");
      } else if (browserReady && !hostOk) {
        summary.textContent = "Browser OK — Holowan play host unreachable right now";
        summary.classList.add("is-warn");
      } else {
        summary.textContent = `${browserPassed}/${browserTotal} browser checks failed · host unreachable`;
        summary.classList.add("is-warn");
      }
    }

    if (details) {
      details.open = degraded || !hostKnown;
    }

    if (banner) {
      banner.hidden = false;
      banner.classList.remove("is-ready", "is-warn", "is-pending");
      if (!hostKnown) {
        banner.textContent = "Preflight: probing Holowan play host…";
        banner.classList.add("is-pending");
      } else if (fullyReady) {
        banner.textContent = "Preflight: ready to launch " + target.label + ".";
        banner.classList.add("is-ready");
      } else if (!browserReady && hostOk) {
        banner.textContent =
          "Preflight: browser gaps detected. Prefer desktop Chrome or Edge.";
        banner.classList.add("is-warn");
      } else if (browserReady && !hostOk) {
        banner.textContent =
          "Preflight: play host unreachable. You can retry launch later.";
        banner.classList.add("is-warn");
      } else {
        banner.textContent =
          "Preflight: browser gaps and unreachable host. Fix environment before launch.";
        banner.classList.add("is-warn");
      }
    }

    if (launchNote) {
      if (!hostKnown) {
        launchNote.textContent = "Probing Holowan play host…";
      } else if (fullyReady) {
        launchNote.textContent =
          "Browser and host look good. Launch opens the Holowan play host in a new tab.";
      } else if (!browserReady && hostOk) {
        launchNote.textContent =
          "Some browser checks failed. Prefer desktop Chrome or Edge before launching.";
      } else if (browserReady && !hostOk) {
        launchNote.textContent =
          "Holowan play host looks unreachable from this network. Try again later.";
      } else {
        launchNote.textContent =
          "Browser checks failed and the play host looks unreachable.";
      }
    }

    document.querySelectorAll("[data-runtime-reach]").forEach((reachEl) => {
      if (!hostKnown) {
        reachEl.textContent = "checking…";
        reachEl.classList.remove("ok", "err");
        return;
      }
      reachEl.textContent = hostOk ? "reachable" : "unreachable (try later)";
      reachEl.classList.toggle("ok", hostOk);
      reachEl.classList.toggle("err", !hostOk);
    });

    launchLinks.forEach((link) => {
      link.classList.toggle("is-ready", fullyReady);
      link.classList.toggle("is-degraded", degraded);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    if (!confirmBound && degraded && hostKnown) {
      confirmBound = true;
      launchLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          let message =
            "Holowan Browser Runtime preflight did not fully pass.\n\nContinue to the play host anyway?";
          if (!browserReady) {
            message +=
              "\n\nIf the directory picker is missing, use desktop Chrome or Edge.";
          }
          if (hostOk === false) {
            message += "\n\nThe play host looked unreachable a moment ago.";
          }
          if (!window.confirm(message)) event.preventDefault();
        });
      });
    }
  }

  applyLaunchState();

  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timeoutId = window.setTimeout(() => {
    if (controller) controller.abort();
  }, 8000);

  fetch(HOST_PROBE, {
    method: "GET",
    mode: "no-cors",
    cache: "no-store",
    signal: controller ? controller.signal : undefined,
  })
    .then(() => {
      hostOk = true;
      paintCapability(
        "host",
        true,
        "Holowan play host responded",
        "Holowan play host unreachable"
      );
    })
    .catch(() => {
      hostOk = false;
      paintCapability(
        "host",
        false,
        "Holowan play host responded",
        "Holowan play host unreachable from this network"
      );
    })
    .finally(() => {
      window.clearTimeout(timeoutId);
      applyLaunchState();
    });
})();
