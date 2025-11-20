const initMObileMenu = () => {

  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  
  if (btn && menu) {
    btn.addEventListener("click", function () {
      menu.classList.toggle("hidden");
    });
  
    // when going back to desktop, always hide mobile menu
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1199) {
        menu.classList.add("hidden");
      }
    });
  }
  
}
export default initMObileMenu;
