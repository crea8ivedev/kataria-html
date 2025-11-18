const initSliders = () => {

    if (document.querySelector('.announcement')) {
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

    const section = document.getElementById('distribution-stats');
    const counters = section.querySelectorAll('.counter');

    // Animate one counter
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
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

    // Trigger when section comes into view
    const observer = new IntersectionObserver(
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

    const tabs = document.querySelectorAll(".year-tab");
    const contents = document.querySelectorAll(".year-content");
    const dot = document.getElementById("activeDot");

    function moveDotTo(tab) {
        const wrapper = document.getElementById("yearWrapper");
        const offsetLeft = tab.offsetLeft + (tab.offsetWidth / 2) - (dot.offsetWidth / 2) + wrapper.offsetLeft;
        dot.style.left = offsetLeft + "px";
    }

    // Initial position
    moveDotTo(document.querySelector(".year-tab.active"));

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(btn => btn.classList.remove("text-[#D82626]", "active"));
            contents.forEach(box => box.classList.add("hidden"));

            tab.classList.add("text-[#D82626]", "active");
            document.getElementById(tab.dataset.target).classList.remove("hidden");

            moveDotTo(tab);
        });
    });

    // Adjust on resize
    window.addEventListener("resize", () => moveDotTo(document.querySelector(".year-tab.active")));


    observer.observe(section);

};

export default initSliders