// const swiper = new Swiper('.swiper', {
//     direction: 'vertical',   // for ticker-like announcement bar
//     loop: true,
//     autoplay: {
//       delay: 2500,
//       disableOnInteraction: false,
//     },
//   });


document.getElementById("menuToggle").onclick = function () {
    document.getElementById("mobileMenu").classList.toggle("hidden");
};

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