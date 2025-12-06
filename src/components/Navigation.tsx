import { useEffect, useRef, useState } from "react";
import logo from "../images/logo.svg";
import "../styles/navigation.css";

const menus = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "About",
		link: "/about",
	},
	{
		name: "Portfolio",
		link: "/portfolio",
	},
	{
		name: "Blog & Article",
		link: "/posts",
	},
];

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navRef = useRef<HTMLElement>(null);

	useEffect(() => {
		// Set active menu item based on current pathname
		const menuItems = document.querySelectorAll(".navigation__menu a");
		for (const item of menuItems) {
			if (item.getAttribute("href") === window.location.pathname) {
				item.classList.add("active");
			}
		}

		// Close menu when clicking outside
		const handleClickOutside = (e: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className="navigation" ref={navRef}>
			<div className="navigation__brand">
				<img
					className="navigation__brand_logo"
					src={logo.src}
					alt="Logo"
					width={40}
					height={40}
				/>
				DevFitra
			</div>
			<button
				type="button"
				className={`navigation__toggle ${isMenuOpen ? "navigation__toggle--active" : ""}`}
				aria-label="Toggle menu"
				aria-expanded={isMenuOpen}
				onClick={toggleMenu}
			>
				<span className="navigation__toggle-icon" />
			</button>
			<div
				className={`navigation__menu ${isMenuOpen ? "navigation__menu--open" : ""}`}
			>
				{menus.map((menu) => {
					return (
						<a key={menu.name} href={menu.link} onClick={closeMenu}>
							{menu.name}
						</a>
					);
				})}
			</div>
		</nav>
	);
};

export default Navigation;
