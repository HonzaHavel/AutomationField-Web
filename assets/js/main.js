// AutomationField marketing site — small, dependency-free interactions.
// No build step: this file is loaded directly via <script defer>.

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Live telemetry ticker ----------------
     Illustrative only — cycles a few plausible tag readings to convey
     "this pushes live state," matching the equipment names shown in the
     real dashboard screenshot below it. Not connected to any backend. */
  var tickerData = [
    [
      { tag: "MOTOR_1", val: "RUNNING", state: "ok" },
      { tag: "PUMP_A", val: "2.6 bar", state: "ok" },
      { tag: "TEMP_01", val: "84.2 °C", state: "ok" },
      { tag: "CONV_B", val: "STOPPED", state: "idle" },
    ],
    [
      { tag: "MOTOR_1", val: "RUNNING", state: "ok" },
      { tag: "PUMP_A", val: "2.4 bar", state: "ok" },
      { tag: "TEMP_01", val: "84.6 °C", state: "ok" },
      { tag: "HEATER_1", val: "FAULT", state: "bad" },
    ],
    [
      { tag: "MOTOR_1", val: "RUNNING", state: "ok" },
      { tag: "PUMP_A", val: "2.5 bar", state: "ok" },
      { tag: "VALVE_01", val: "OPEN", state: "ok" },
      { tag: "HEATER_1", val: "FAULT", state: "bad" },
    ],
  ];

  var tickerEl = document.getElementById("telemetry-ticker");
  if (tickerEl) {
    var frameIdx = 0;

    var stateClass = { ok: "dot-ok", idle: "", bad: "" };
    var stateColor = { ok: "var(--ok)", idle: "var(--text-3)", bad: "var(--bad)" };

    function renderFrame(idx, flash) {
      var rows = tickerData[idx];
      tickerEl.innerHTML = rows
        .map(function (r) {
          return (
            '<div class="ticker-row">' +
            '<span class="ticker-tag">' +
            '<span class="dot" style="background:' + stateColor[r.state] + '"></span> ' +
            r.tag +
            "</span>" +
            '<span class="ticker-val' + (flash ? " flash" : "") + '">' + r.val + "</span>" +
            "</div>"
          );
        })
        .join("");
    }

    renderFrame(0, false);

    if (!reduceMotion) {
      window.setInterval(function () {
        frameIdx = (frameIdx + 1) % tickerData.length;
        renderFrame(frameIdx, true);
      }, 2600);
    }
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
