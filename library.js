document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((carouselContainer) => {
        const leftButton = carouselContainer.querySelector(".carousel-btn.left");
        const rightButton = carouselContainer.querySelector(".carousel-btn.right");
        const carousel = carouselContainer.querySelector(".carousel");

        let scrollPosition = 0; // Current scroll position

        // Calculate scroll step dynamically
        const cardWidth = carousel.querySelector(".card").offsetWidth + 20; // Card width + gap
        const maxScroll = carousel.scrollWidth - carousel.offsetWidth;

        // Left button functionality
        leftButton.addEventListener("click", () => {
            scrollPosition -= cardWidth;
            if (scrollPosition < 0) scrollPosition = 0;
            carousel.style.transform = translateX(-{scrollPosition});
        });

        // Right button functionality
        rightButton.addEventListener("click", () => {
            scrollPosition += cardWidth;
            if (scrollPosition > maxScroll) scrollPosition = maxScroll;
            carousel.style.transform = translateX(-{scrollPosition});
        });
    });
});