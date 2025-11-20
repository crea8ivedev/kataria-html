// testimonial.js
export default function initTestimonialSlider() {
  const slider = document.querySelector("[data-testimonial-slider]");
  const track = document.querySelector("[data-testimonial-track]");
  const dotsContainer = document.querySelector("[data-testimonial-dots]");
  const hitArea =
    document.querySelector("[data-testimonial-hitarea]") || slider;
  const prevBtn = document.querySelector("[data-testimonial-prev]");
  const nextBtn = document.querySelector("[data-testimonial-next]");

  if (!slider || !track || !hitArea) return;

  const slides = Array.from(track.children);

  const isMobile = () => window.innerWidth < 768;

  function perView() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  // current = index of the **first visible slide**
  let current = 0;

  function pagesCount() {
    const pv = perView();
    return Math.max(1, slides.length - pv + 1);
  }

  function updateTrack() {
    const pv = perView();
    const step = 100 / pv;
    track.style.transform = `translateX(-${current * step}%)`;
  }

  // ---------- DOTS ----------
  function renderDots() {
    if (!dotsContainer) return;

    if (isMobile()) {
      dotsContainer.innerHTML = "";
      return;
    }

    const pages = pagesCount();
    dotsContainer.innerHTML = "";

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      // dot.className = "testimonial-dot";
      dot.className = "testimonial-dot cursor-pointer";


      if (i === current) {
        dot.classList.add("testimonial-dot--active");
      }

      dot.addEventListener("click", () => {
        current = i;
        clampAndUpdate();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function clampAndUpdate() {
    const pages = pagesCount();
    if (current < 0) current = 0;
    if (current > pages - 1) current = pages - 1;
    updateTrack();
    renderDots();
  }

  window.addEventListener("resize", clampAndUpdate);

  // ---------- DRAG / SWIPE ----------
  let dragging = false;
  let startX = 0;

  const getX = (e) =>
    e.touches && e.touches.length
      ? e.touches[0].clientX
      : e.changedTouches && e.changedTouches.length
      ? e.changedTouches[0].clientX
      : e.clientX;

  function startDrag(e) {
    // left click or touch
    if (e.button !== undefined && e.button !== 0) return;

    // NEW: don't start drag on buttons/links (arrows, dots, etc.)
    const target = e.target;
    if (target.closest("button, a")) return;

    dragging = true;
    startX = getX(e);
    slider.classList.add("cursor-grabbing");
    slider.classList.remove("cursor-grab");

    // NEW: only preventDefault for mouse drag (not touch)
    if (e.type === "mousedown") {
      e.preventDefault();
    }
  }

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;

    const diff = getX(e) - startX; // + right, - left
    slider.classList.remove("cursor-grabbing");
    slider.classList.add("cursor-grab");

    const threshold = 10;
    if (Math.abs(diff) > threshold) {
      if (diff < 0) current += 1;
      else current -= 1;
    }

    clampAndUpdate();
  }

  hitArea.addEventListener("mousedown", startDrag);
  window.addEventListener("mouseup", endDrag);

  hitArea.addEventListener("touchstart", startDrag, { passive: true });
  window.addEventListener("touchend", endDrag);

  hitArea.addEventListener("dragstart", (e) => e.preventDefault());

  // ---------- ARROW BUTTONS ----------
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      current -= 1;
      clampAndUpdate();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      current += 1;
      clampAndUpdate();
    });
  }

  // ---------- INIT ----------
  clampAndUpdate();
}
