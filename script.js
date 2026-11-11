const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const emptyMessage = document.querySelector(".filter-empty");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        projectCards.forEach((card) => {
            const isVisible = filter === "all" || card.dataset.category === filter;
            card.classList.toggle("is-hidden", !isVisible);
            if (isVisible) visibleCount += 1;
        });

        if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    });
});

const projectDialog = document.querySelector(".project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector(".dialog-description");
const dialogType = document.querySelector(".dialog-type");

if (projectDialog && dialogTitle && dialogDescription && dialogType) {
    document.querySelectorAll(".project-open").forEach((button) => {
        button.addEventListener("click", () => {
            dialogTitle.textContent = button.dataset.title ?? "";
            dialogDescription.textContent = button.dataset.description ?? "";
            dialogType.textContent = button.dataset.type ?? "";
            projectDialog.showModal();
        });
    });

    projectDialog.querySelector(".dialog-close")?.addEventListener("click", () => {
        projectDialog.close();
    });
    projectDialog.querySelector(".dialog-done")?.addEventListener("click", () => {
        projectDialog.close();
    });
    projectDialog.addEventListener("click", (event) => {
        if (event.target === projectDialog) projectDialog.close();
    });
}

const revealTargets = document.querySelectorAll(
    ".about-layout, .skills-row, .projects-heading, .project-card, .contact-content"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((target) => target.setAttribute("data-reveal", ""));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => revealObserver.observe(target));
}
