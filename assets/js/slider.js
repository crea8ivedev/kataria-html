const initSliders = () => {
  if (document.querySelector('.announcement')) {
    new Swiper('.announcement-bar', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: true,
      loopAdditionalSlides: 5,
      speed: 10000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      freeMode: true,
      freeModeMomentum: false,
      allowTouchMove: false,
    });
  }


  if (document.querySelector('.service-slider-main .featureSwiper')) {
    new Swiper(".featureSwiper", {
      // marquee behaviour
      loop: true,
      speed: 8000,
      autoplay: {
        delay: 0,                 // continuous scroll
        disableOnInteraction: false,
      },

      slidesPerView: 1.4,
      spaceBetween: 16,

      breakpoints: {
        480: {                    // small phones
          slidesPerView: 1.8,
          spaceBetween: 16,
        },
        640: {                    // larger phones
          slidesPerView: 2.2,
          spaceBetween: 18,
        },
        768: {                    // tablets
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {                   // 1024–1199px (your problem zone)
          slidesPerView: 3.5,     // < 4 so it has room & no weird wrap
          spaceBetween: 22,
        },
        1200: {                   // bigger laptops / desktops
          slidesPerView: 4,       // you only have 4 slides
          spaceBetween: 24,
        },
      },
    });
  }


  // COUNTERS
  const section = document.getElementById('distribution-stats');
  const counters = section ? section.querySelectorAll('.counter') : null;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(target * progress);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if (section && counters && counters.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counters.forEach(animateCounter);
            obs.unobserve(section);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }

  // HISTORY TABS & DOT
  const tabs = document.querySelectorAll(".year-tab");
  const contents = document.querySelectorAll(".year-content");
  const dot = document.getElementById("activeDot");
  const wrapper = document.getElementById("yearWrapper");

  function moveDotTo(tab) {
    if (!tab || !dot) return;
    const wrapperOffset = wrapper ? wrapper.offsetLeft : 0;
    const offsetLeft =
      tab.offsetLeft + tab.offsetWidth / 2 - dot.offsetWidth / 2 + wrapperOffset;
    dot.style.left = offsetLeft + "px";
  }

  const initialActive = document.querySelector(".year-tab.active");

  if (initialActive) {
    contents.forEach(box => box.classList.add("hidden"));
    const targetId = initialActive.dataset.target;
    if (targetId) {
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.remove("hidden");
    }
    moveDotTo(initialActive);
  }

  if (tabs && tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(btn => btn.classList.remove("text-[#D82626]", "active"));
        tab.classList.add("text-[#D82626]", "active");

        if (contents && contents.length) {
          contents.forEach(box => box.classList.add("hidden"));
        }
        const targetId = tab.dataset.target;
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) targetEl.classList.remove("hidden");
        }

        moveDotTo(tab);
      });
    });
  }

  window.addEventListener("resize", () => {
    const active = document.querySelector(".year-tab.active");
    if (active) moveDotTo(active);
  });


  // ===================== LOCATION / MAP SLIDER (sliding track, delegated) =====================
  const locationSections = document.querySelectorAll(".location-section");

  locationSections.forEach(sectionEl => {
    const track = sectionEl.querySelector(".location-slides-track");
    const slides = sectionEl.querySelectorAll("[data-location-slide]");
    if (!track || slides.length === 0) return;

    const total = slides.length;
    let current = 0;
    let isAnimating = false;

    slides.forEach(s => s.style.width = "100%");

    function goTo(index) {
      if (isAnimating) return;
      isAnimating = true;

      const newIndex = ((index % total) + total) % total;
      const translateX = -newIndex * 100;
      track.style.transform = `translateX(${translateX}%)`;

      slides.forEach((s, i) => {
        s.setAttribute("aria-hidden", i === newIndex ? "false" : "true");
      });

      const onEnd = () => {
        isAnimating = false;
        track.removeEventListener("transitionend", onEnd);
      };
      track.addEventListener("transitionend", onEnd);

      current = newIndex;
    }

    // delegated clicks
    sectionEl.addEventListener("click", (e) => {
      const prev = e.target.closest("[data-location-prev]");
      if (prev) { e.preventDefault(); goTo(current - 1); return; }

      const next = e.target.closest("[data-location-next]");
      if (next) { e.preventDefault(); goTo(current + 1); return; }
    });

    // keyboard when section in view
    window.addEventListener("keydown", (e) => {
      const rect = sectionEl.getBoundingClientRect();
      if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    });

    // swipe on track
    let startX = null;
    track.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const diff = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(current - 1);
        else goTo(current + 1);
      }
    }, { passive: true });

    // init state
    track.style.transform = `translateX(0%)`;
    slides.forEach((s, i) => s.setAttribute("aria-hidden", i === 0 ? "false" : "true"));
  });


  const swiper = new Swiper('.story-slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    // helpful when slides or container change size
    observer: true,
    observeParents: true,
    // responsive if you want more slides on wider screens
    breakpoints: {
      1024: {
        slidesPerView: 1,
      }
    }
  });




  /* BRANDS module: apply 1-red / 2-yellow / 3-yellow / 4-red pattern and arrow scrolling */
  (function brandsModule() {
    const container = document.getElementById('brandsCards');
    const prev = document.getElementById('brands-prev');
    const next = document.getElementById('brands-next');
    if (!container || !prev || !next) return;

    // Pattern: index % 4 -> 0:red, 1:yellow, 2:yellow, 3:red
    const cards = Array.from(container.querySelectorAll('.brand-card'));
    cards.forEach((card, i) => {
      card.classList.remove('brand-card--yellow');
      const mod = i % 4;
      if (mod === 1 || mod === 2) {
        card.classList.add('brand-card--yellow');
      }
    });

    // compute scroll nudge amount (half visible width, clamped)
    function scrollAmount() {
      return Math.min(container.clientWidth * 0.5, 560);
    }

    function updateArrows() {
      const overflow = container.scrollWidth > container.clientWidth + 2;
      prev.style.display = overflow ? 'inline-flex' : 'none';
      next.style.display = overflow ? 'inline-flex' : 'none';
    }

    prev.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    // observe container size changes
    window.addEventListener('resize', updateArrows);
    try {
      const ro = new ResizeObserver(updateArrows);
      ro.observe(container);
    } catch (e) {
      // ResizeObserver may not be available in older browsers; fallback to resize listener (above)
    }

    // initial state
    updateArrows();
  })();

  // const brandEl = document.querySelector(".brandSwiper");
  // if (brandEl) {

  //   // auto red/yellow pattern
  //   (function applyPattern() {
  //     const cards = Array.from(document.querySelectorAll(".brand-card"));
  //     cards.forEach((c, i) => {
  //       c.classList.remove("brand-card--red", "brand-card--yellow");
  //       const mod = i % 4;
  //       if (mod === 1 || mod === 2) {
  //         c.classList.add("brand-card--yellow");
  //       } else {
  //         c.classList.add("brand-card--red");
  //       }
  //     });
  //   })();

  //   // Swiper initialization
  //   const brandSwiper = new Swiper(".brandSwiper", {
  //     loop: true,
  //     slidesPerView: 1,
  //     spaceBetween: 30,
  //     observeParents: true,
  //     observer: true,

  //     pagination: {
  //       el: ".brandSwiper .swiper-pagination",
  //       clickable: true,
  //     },

  //     navigation: {
  //       nextEl: ".brand-next",
  //       prevEl: ".brand-prev",
  //     },

  //     breakpoints: {
  //       768: { slidesPerView: 1 },
  //       1024: { slidesPerView: 1 },
  //     },
  //   });
  // }



  // color pattern 1-red, 2-yellow, 3-yellow, 4-red
  document.querySelectorAll(".swiper-slide").forEach(slide => {
    const cards = slide.querySelectorAll(".brand-card");
    cards.forEach((card, i) => {
      const mod = i % 4;
      if (mod === 1 || mod === 2) {
        card.classList.remove("text-white", "border-white");
        card.classList.add("bg-yellow-300", "text-black", "border-black");
      } else {
        card.classList.remove("text-black", "border-black", "bg-yellow-300");
        card.classList.add("text-white", "border-white");
      }
    });
  });

  // Swiper
  const brandswiper = new Swiper(".brandSwiper", {
    speed: 800,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,

    navigation: {
      nextEl: "#brands-next",
      prevEl: "#brands-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    observer: true,
    observeParents: true,
  });










};

export default initSliders;
