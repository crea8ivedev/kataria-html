const initSliders = () => {

    if (document.querySelector('.announcement')) {
        // `announcement` var isn't used, but kept in case you want it later
        const announcement = document.querySelector('.announcement');

        new Swiper('.announcement-bar', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 0,
            },
            speed: 8000,
            allowTouchMove: false,
        });
    }


    if (document.querySelector('.service-slider-main')) {
        const service = document.querySelector('.service-slider-main');

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

    // COUNTERS: guard if the section exists
    const section = document.getElementById('distribution-stats');
    const counters = section ? section.querySelectorAll('.counter') : null;

    // Animate one counter
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const duration = 1800; // slower than before
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(start + (target - start) * progress);

            // No commas formatting
            el.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Trigger when section comes into view (only if section exists and there are counters)
    let observer = null;
    if (section && counters && counters.length) {
        observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counters.forEach(animateCounter);
                        obs.unobserve(section); // run only once
                    }
                });
            },
            { threshold: 0.3 } // 30% visible
        );

        observer.observe(section);
    }

    // TABS & DOT
    const tabs = document.querySelectorAll(".year-tab");
    const contents = document.querySelectorAll(".year-content");
    const dot = document.getElementById("activeDot");

    function moveDotTo(tab) {
        if (!tab || !dot) return;

        const wrapper = document.getElementById("yearWrapper");
        // If wrapper is missing, position relative to tab only
        const wrapperOffset = wrapper ? wrapper.offsetLeft : 0;
        const offsetLeft = tab.offsetLeft + (tab.offsetWidth / 2) - (dot.offsetWidth / 2) + wrapperOffset;
        dot.style.left = offsetLeft + "px";
    }

    // Initial position: only attempt if there is an active tab and dot exists
    const initialActive = document.querySelector(".year-tab.active");
    if (initialActive && dot) {
        moveDotTo(initialActive);
    }

    // Attach click handlers only if there are tabs
    if (tabs && tabs.length) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {

                tabs.forEach(btn => btn.classList.remove("text-[#D82626]", "active"));
                if (contents && contents.length) {
                    contents.forEach(box => box.classList.add("hidden"));
                }

                tab.classList.add("text-[#D82626]", "active");
                const targetId = tab.dataset.target;
                if (targetId) {
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) targetEl.classList.remove("hidden");
                }

                moveDotTo(tab);
            });
        });
    }

    // Adjust on resize (only if an active tab exists)
    window.addEventListener("resize", () => {
        const active = document.querySelector(".year-tab.active");
        if (active) moveDotTo(active);
    });

};

export default initSliders;
