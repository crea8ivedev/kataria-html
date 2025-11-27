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


  // ===================== LOCATION / MAP SLIDER =====================
  // HTML requirements:
  // - wrap whole block in .location-section (your section)
  // - each slide:  <article data-location-slide> ... </article>
  // - prev button: <button data-location-prev>…</button>
  // - next button: <button data-location-next>…</button>

  const locationSections = document.querySelectorAll(".location-section");

  locationSections.forEach(sectionEl => {
    const slides = sectionEl.querySelectorAll("[data-location-slide]");
    const prevBtn = sectionEl.querySelector("[data-location-prev]");
    const nextBtn = sectionEl.querySelector("[data-location-next]");

    if (!slides.length) return;

    let current = 0;

    function showSlide(newIndex) {
      const total = slides.length;
      current = (newIndex + total) % total;

      slides.forEach((slide, i) => {
        if (i === current) {
          slide.classList.remove("hidden");
        } else {
          slide.classList.add("hidden");
        }
      });
    }

    // buttons
    prevBtn?.addEventListener("click", () => showSlide(current - 1));
    nextBtn?.addEventListener("click", () => showSlide(current + 1));

    // keyboard (left/right arrows)
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") showSlide(current - 1);
      if (e.key === "ArrowRight") showSlide(current + 1);
    });

    // touch swipe (mobile)
    let startX = null;

    sectionEl.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    });

    sectionEl.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          showSlide(current - 1); // swipe right -> previous
        } else {
          showSlide(current + 1); // swipe left -> next
        }
      }
      startX = null;
    });

    // init first slide
    showSlide(0);
    });
};

export default initSliders;
