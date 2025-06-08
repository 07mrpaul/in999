// Add Back to Top Button to the page
function addBackToTop() {
    // Create the button element if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = '↑';
        document.body.appendChild(button);
    }

    const backToTopButton = document.querySelector('.back-to-top');

    // Show button when user scrolls down 200px
    function toggleBackToTop() {
        if (window.pageYOffset > 200) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Throttle scroll event for better performance
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(toggleBackToTop, 50);
    });

    // Initial check for scroll position
    toggleBackToTop();
}

// Export functions to be used in other files
window.Components = {
    addBackToTop
}; 