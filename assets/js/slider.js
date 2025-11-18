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

};

export default initSliders