// // testimonial.js
// export default function initTestimonialSlider() {
//   const slider = document.querySelector("[data-testimonial-slider]");
//   const track = document.querySelector("[data-testimonial-track]");
//   const dotsContainer = document.querySelector("[data-testimonial-dots]");
//   const hitArea =
//     document.querySelector("[data-testimonial-hitarea]") || slider;
//   const prevBtn = document.querySelector("[data-testimonial-prev]");
//   const nextBtn = document.querySelector("[data-testimonial-next]");

//   if (!slider || !track || !hitArea) return;

//   const slides = Array.from(track.children);

//   const isMobile = () => window.innerWidth < 768;

//   function perView() {
//     const w = window.innerWidth;
//     if (w >= 1024) return 3;
//     if (w >= 768) return 2;
//     return 1;
//   }

//   let current = 0; // page index

//   function pagesCount() {
//     return Math.max(1, Math.ceil(slides.length / perView()));
//   }

//   function updateTrack() {
//     // Each page is 100% of the viewport width
//     const step = 100;
//     track.style.transform = `translateX(-${current * step}%)`;
//   }

//   // ---------- DOTS ----------
//   function renderDots() {
//     if (!dotsContainer) return;

//     // Mobile: no dots, only arrows
//     if (isMobile()) {
//       dotsContainer.innerHTML = "";
//       return;
//     }

//     const pages = pagesCount();
//     dotsContainer.innerHTML = "";

//     for (let i = 0; i < pages; i++) {
//       const dot = document.createElement("button");
//       dot.type = "button";
//       dot.className = "testimonial-dot";

//       if (i === current) {
//         dot.classList.add("testimonial-dot--active");
//       }

//       dot.addEventListener("click", () => {
//         current = i;
//         clampAndUpdate();
//       });

//       dotsContainer.appendChild(dot);
//     }
//   }

//   function clampAndUpdate() {
//     const pages = pagesCount();
//     if (current < 0) current = 0;
//     if (current > pages - 1) current = pages - 1;
//     updateTrack();
//     renderDots();
//   }

//   window.addEventListener("resize", clampAndUpdate);

//   // ---------- DRAG / SWIPE ----------
//   let dragging = false;
//   let startX = 0;

//   const getX = (e) =>
//     e.touches && e.touches.length
//       ? e.touches[0].clientX
//       : e.changedTouches && e.changedTouches.length
//       ? e.changedTouches[0].clientX
//       : e.clientX;

//   function startDrag(e) {
//     // left click or touch
//     if (e.button !== undefined && e.button !== 0) return;
//     dragging = true;
//     startX = getX(e);
//     slider.classList.add("cursor-grabbing");
//     slider.classList.remove("cursor-grab");
//     e.preventDefault(); // stop text selection on mouse drag
//   }

//   function endDrag(e) {
//     if (!dragging) return;
//     dragging = false;

//     const diff = getX(e) - startX; // + right, - left
//     slider.classList.remove("cursor-grabbing");
//     slider.classList.add("cursor-grab");

//     const threshold = 10; // smaller -> easier to swipe
//     if (Math.abs(diff) > threshold) {
//       if (diff < 0) current += 1; // next
//       else current -= 1; // prev
//     }

//     clampAndUpdate();
//   }

//   hitArea.addEventListener("mousedown", startDrag);
//   window.addEventListener("mouseup", endDrag);

//   hitArea.addEventListener("touchstart", startDrag, { passive: true });
//   window.addEventListener("touchend", endDrag);

//   // Prevent ghost image / accidental drag of images
//   hitArea.addEventListener("dragstart", (e) => e.preventDefault());

//   // ---------- ARROW BUTTONS (MOBILE) ----------
//   if (prevBtn) {
//     prevBtn.addEventListener("click", () => {
//       current -= 1;
//       clampAndUpdate();
//     });
//   }

//   if (nextBtn) {
//     nextBtn.addEventListener("click", () => {
//       current += 1;
//       clampAndUpdate();
//     });
//   }

//   // ---------- INIT ----------
//   clampAndUpdate(); // sets first active state + correct position
// }
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

  // how many different "start positions" we can have
  function pagesCount() {
    const pv = perView();
    // example: 6 slides, perView = 3  ->  6 - 3 + 1 = 4 positions (0,1,2,3)
    return Math.max(1, slides.length - pv + 1);
  }

  function updateTrack() {
    // slide by one-card-width each step
    const pv = perView();
    const step = 100 / pv; // e.g. pv=3 -> 33.333% per card
    track.style.transform = `translateX(-${current * step}%)`;
  }

  // ---------- DOTS ----------
  function renderDots() {
    if (!dotsContainer) return;

    // Mobile: no dots, only arrows
    if (isMobile()) {
      dotsContainer.innerHTML = "";
      return;
    }

    const pages = pagesCount();
    dotsContainer.innerHTML = "";

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "testimonial-dot";

      if (i === current) {
        dot.classList.add("testimonial-dot--active");
      }

      dot.addEventListener("click", () => {
        current = i; // first visible slide index
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
    dragging = true;
    startX = getX(e);
    slider.classList.add("cursor-grabbing");
    slider.classList.remove("cursor-grab");
    e.preventDefault(); // stop text selection on mouse drag
  }

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;

    const diff = getX(e) - startX; // + right, - left
    slider.classList.remove("cursor-grabbing");
    slider.classList.add("cursor-grab");

    const threshold = 10; // small swipe is enough
    if (Math.abs(diff) > threshold) {
      if (diff < 0) current += 1; // slide forward by 1 card
      else current -= 1;          // slide back by 1 card
    }

    clampAndUpdate();
  }

  hitArea.addEventListener("mousedown", startDrag);
  window.addEventListener("mouseup", endDrag);

  hitArea.addEventListener("touchstart", startDrag, { passive: true });
  window.addEventListener("touchend", endDrag);

  // Prevent ghost image / accidental drag of images
  hitArea.addEventListener("dragstart", (e) => e.preventDefault());

  // ---------- ARROW BUTTONS (MOBILE) ----------
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
  clampAndUpdate(); // sets first active state + correct position
}
