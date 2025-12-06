function initializeMenu() {
	// check if the menu is active
	const menuItems = document.querySelectorAll(".navigation__menu a");
	menuItems.forEach((item) => {
		if (item.getAttribute("href") === window.location.pathname) {
			item.classList.add("active");
		}
	});

	// Mobile menu toggle
	const toggle = document.querySelector(".navigation__toggle");
	const menu = document.querySelector(".navigation__menu");

	if (toggle && menu) {
		// Remove existing listeners by cloning the toggle button
		const newToggle = toggle.cloneNode(true);
		toggle.parentNode.replaceChild(newToggle, toggle);

		newToggle.addEventListener("click", () => {
			const isExpanded = newToggle.getAttribute("aria-expanded") === "true";
			newToggle.setAttribute("aria-expanded", String(!isExpanded));
			menu.classList.toggle("navigation__menu--open");
			newToggle.classList.toggle("navigation__toggle--active");
		});

		// Close menu when clicking on a link
		menuItems.forEach((item) => {
			item.addEventListener("click", () => {
				menu.classList.remove("navigation__menu--open");
				newToggle.classList.remove("navigation__toggle--active");
				newToggle.setAttribute("aria-expanded", "false");
			});
		});

		// Close menu when clicking outside
		document.addEventListener("click", (e) => {
			if (!e.target.closest(".navigation")) {
				menu.classList.remove("navigation__menu--open");
				newToggle.classList.remove("navigation__toggle--active");
				newToggle.setAttribute("aria-expanded", "false");
			}
		});
	}
}

// Initialize on page load
initializeMenu();

// Re-initialize after page transitions (for SPA-like navigation)
document.addEventListener("astro:page-load", initializeMenu);
