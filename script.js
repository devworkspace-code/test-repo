const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const menuBackdrop = document.querySelector("#menu-backdrop");

function setNavigationOpen(isOpen) {
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
	navigation.hidden = !isOpen;
	menuBackdrop.hidden = !isOpen;
	document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => {
	setNavigationOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		setNavigationOpen(false);
	}
});

document.addEventListener("click", (event) => {
	if (
		menuToggle.getAttribute("aria-expanded") === "true" &&
		!navigation.contains(event.target) &&
		!menuToggle.contains(event.target)
	) {
		setNavigationOpen(false);
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
		setNavigationOpen(false);
		menuToggle.focus();
	}
});

const projectsSection = document.querySelector('[aria-labelledby="projects-heading"]');
const projectCards = [...projectsSection.querySelectorAll(":scope > article")];
const projectCategory = document.querySelector("#project-category");
const projectFilterStatus = document.querySelector("#project-filter-status");

function filterProjects(category) {
	const selectedCategory = category.toLowerCase();
	let visibleCount = 0;

	projectCards.forEach((project) => {
		const isVisible = selectedCategory === "all" || project.dataset.category === selectedCategory;
		project.hidden = !isVisible;
		visibleCount += Number(isVisible);
	});

	projectFilterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"}.`;
}

projectCategory.addEventListener("change", (event) => {
	filterProjects(event.currentTarget.value);
});

const projectLightbox = document.querySelector("#project-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");

function openProjectImage(image, projectName) {
	lightboxImage.src = image.currentSrc || image.src;
	lightboxImage.alt = image.alt;
	lightboxCaption.textContent = projectName;
	projectLightbox.showModal();
}

projectsSection.addEventListener("click", (event) => {
	const imageButton = event.target.closest(".project-image-button");

	if (!imageButton) {
		return;
	}

	const projectName = imageButton.closest("article").querySelector("h3").textContent;
	openProjectImage(imageButton.querySelector("img"), projectName);
});

lightboxClose.addEventListener("click", () => {
	projectLightbox.close();
});

projectLightbox.addEventListener("click", (event) => {
	if (event.target === projectLightbox) {
		projectLightbox.close();
	}
});

projectLightbox.addEventListener("close", () => {
	lightboxImage.removeAttribute("src");
	lightboxImage.alt = "";
});

const contactForm = document.querySelector("#contact-form");
const sendButton = contactForm.querySelector('button[type="submit"]');
const contactStatus = document.querySelector("#contact-status");

sendButton.addEventListener("click", (event) => {
	event.preventDefault();

	if (!contactForm.reportValidity()) {
		return;
	}

	contactStatus.textContent = "This demo form is not connected to a messaging service, so your message was not sent.";
});

contactForm.addEventListener("input", () => {
	contactStatus.textContent = "";
});
