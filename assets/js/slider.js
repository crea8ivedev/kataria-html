const initSliders = () => {
  if (document.querySelector('.announcement')) {
    new Swiper('.announcement-bar', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: true,
      loopAdditionalSlides: 5,        
      speed: 80000,                   
      autoplay: {
        delay: 0,                     
        disableOnInteraction: false,
      },
      freeMode: true,
      freeModeMomentum: false,        
      allowTouchMove: false,
    });
  }
  

  if (document.querySelector('.service-slider-main')) {
    new Swiper(".featureSwiper", {
      slidesPerView: 1.3,
      spaceBetween: 0,
      loop: true,
      autoplay: { delay: 0 },
      speed: 8000,
      breakpoints: {
        640: { slidesPerView: 2.2 },
        768: { slidesPerView: 3.2 },
        1024: { slidesPerView: 5 }
      }
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
};

export default initSliders;
