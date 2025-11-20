const initMObileMenu = () => {

const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");

    if (btn && menu) {
      btn.addEventListener("click", function () {
        menu.classList.toggle("hidden");
      });

      // Optional: hide mobile menu when resizing to desktop
      window.addEventListener("resize", function () {
        if (window.innerWidth >= 1024) {
          menu.classList.add("hidden");
        }
      });
    }
}
export default initMObileMenu;
