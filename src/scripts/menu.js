// check if the menu is active
const menuItems = document.querySelectorAll(".navigation__menu a");
// biome-ignore lint/complexity/noForEach: <explanation>
menuItems.forEach((item) => {
	if (item.getAttribute("href") === window.location.pathname) {
		item.classList.add("active");
	}
});

// Mobile menu toggle
const toggle = document.querySelector(".navigation__toggle");
const menu = document.querySelector(".navigation__menu");

if (toggle && menu) {
	toggle.addEventListener("click", () => {
		const isExpanded = toggle.getAttribute("aria-expanded") === "true";
		toggle.setAttribute("aria-expanded", String(!isExpanded));
		menu.classList.toggle("navigation__menu--open");
		toggle.classList.toggle("navigation__toggle--active");
	});

	// Close menu when clicking on a link
	// biome-ignore lint/complexity/noForEach: <explanation>
	menuItems.forEach((item) => {
		item.addEventListener("click", () => {
			menu.classList.remove("navigation__menu--open");
			toggle.classList.remove("navigation__toggle--active");
			toggle.setAttribute("aria-expanded", "false");
		});
	});

	// Close menu when clicking outside
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".navigation")) {
			menu.classList.remove("navigation__menu--open");
			toggle.classList.remove("navigation__toggle--active");
			toggle.setAttribute("aria-expanded", "false");
		}
	});
}
