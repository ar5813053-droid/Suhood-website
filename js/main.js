(function () {
  "use strict";

  const APK_DOWNLOAD_URL = "https://u.gy/Suhood-app";
  const INSTAGRAM_URL = "https://www.instagram.com/suhood.app?cplk=MTQzdzdwbWQ2bTRm";
  const SUPPORT_EMAIL = "support.suhood@gmail.com";

  // Expose for any inline use
  window.SUHOOD = {
    APK_DOWNLOAD_URL,
    INSTAGRAM_URL,
    SUPPORT_EMAIL,
  };

  // Wire all download CTAs
  document.querySelectorAll("[data-download]").forEach(function (el) {
    el.setAttribute("href", APK_DOWNLOAD_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Nav scroll
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.querySelector(".mobile-menu");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Smooth secondary CTA
  document.querySelectorAll("[data-scroll]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var id = el.getAttribute("data-scroll");
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Reveal on scroll
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObs.observe(el);
    });

    var founder = document.querySelector(".founder");
    if (founder) {
      var fObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              founder.classList.add("is-visible");
              fObs.unobserve(founder);
            }
          });
        },
        { threshold: 0.25 }
      );
      fObs.observe(founder);
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
    var f = document.querySelector(".founder");
    if (f) f.classList.add("is-visible");
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector("button").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !open);
      btn.setAttribute("aria-expanded", !open ? "true" : "false");
    });
  });

  // Carousel
  var slides = Array.prototype.slice.call(document.querySelectorAll(".carousel-slide"));
  if (slides.length) {
    var index = 0;
    var dotsRoot = document.querySelector(".carousel-dots");
    var captionTitle = document.querySelector(".carousel-caption h4");
    var captionText = document.querySelector(".carousel-caption p");
    var autoplayTimer = null;
    var locked = false;
    var stage = document.querySelector(".carousel");

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show slide " + (i + 1));
      if (i === 0) dot.setAttribute("aria-current", "true");
      dot.addEventListener("click", function () {
        goTo(i);
        restartAutoplay();
      });
      if (dotsRoot) dotsRoot.appendChild(dot);
    });

    function update() {
      var n = slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.remove("active", "prev", "next");
        if (i === index) slide.classList.add("active");
        else if (i === (index - 1 + n) % n) slide.classList.add("prev");
        else if (i === (index + 1) % n) slide.classList.add("next");
      });
      var dots = dotsRoot ? dotsRoot.querySelectorAll("button") : [];
      dots.forEach(function (d, i) {
        if (i === index) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      var active = slides[index];
      if (captionTitle) captionTitle.textContent = active.getAttribute("data-title") || "";
      if (captionText) captionText.textContent = active.getAttribute("data-desc") || "";
    }

    function goTo(i) {
      if (locked) return;
      locked = true;
      index = (i + slides.length) % slides.length;
      update();
      setTimeout(function () {
        locked = false;
      }, 650);
    }

    function next() {
      goTo(index + 1);
    }
    function prev() {
      goTo(index - 1);
    }

    var nextBtn = document.querySelector(".carousel-btn.next");
    var prevBtn = document.querySelector(".carousel-btn.prev");
    if (nextBtn) nextBtn.addEventListener("click", function () {
      next();
      restartAutoplay();
    });
    if (prevBtn) prevBtn.addEventListener("click", function () {
      prev();
      restartAutoplay();
    });

    // Click side slides
    slides.forEach(function (slide, i) {
      slide.addEventListener("click", function () {
        if (slide.classList.contains("prev") || slide.classList.contains("next")) {
          goTo(i);
          restartAutoplay();
        }
      });
    });

    // Keyboard
    if (stage) {
      stage.setAttribute("tabindex", "0");
      stage.setAttribute("role", "region");
      stage.setAttribute("aria-label", "App screenshot carousel");
      stage.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") {
          next();
          restartAutoplay();
        } else if (e.key === "ArrowLeft") {
          prev();
          restartAutoplay();
        }
      });
    }

    // Swipe
    var startX = 0;
    var tracking = false;
    if (stage) {
      stage.addEventListener(
        "touchstart",
        function (e) {
          tracking = true;
          startX = e.changedTouches[0].clientX;
        },
        { passive: true }
      );
      stage.addEventListener(
        "touchend",
        function (e) {
          if (!tracking) return;
          tracking = false;
          var dx = e.changedTouches[0].clientX - startX;
          if (Math.abs(dx) > 40) {
            if (dx < 0) next();
            else prev();
            restartAutoplay();
          }
        },
        { passive: true }
      );
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
    function startAutoplay() {
      if (reduceMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(next, 5000);
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (stage) {
      stage.addEventListener("mouseenter", stopAutoplay);
      stage.addEventListener("mouseleave", startAutoplay);
      stage.addEventListener("focusin", stopAutoplay);
      stage.addEventListener("focusout", startAutoplay);
    }

    // Pause when off-screen
    if ("IntersectionObserver" in window && stage) {
      var cObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) startAutoplay();
            else stopAutoplay();
          });
        },
        { threshold: 0.2 }
      );
      cObs.observe(stage);
    } else {
      startAutoplay();
    }

    update();
  }
})();
