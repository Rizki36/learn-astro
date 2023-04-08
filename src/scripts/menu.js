// check if the menu is active
const menuItems = document.querySelectorAll(".menu a");
menuItems.forEach((item) => {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
  }
});
