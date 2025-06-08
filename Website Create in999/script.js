// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize back to top button
    window.Components.addBackToTop();

    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');

    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
            nav.classList.remove('active');
            menuBtn.textContent = '☰';
        }
    });

    // Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Search Functionality
    const searchBox = document.querySelector('.search-box input');
    const searchIcon = document.querySelector('.search-icon');
    const gamesGrid = document.querySelector('.games-grid');

    function performSearch() {
        const searchTerm = searchBox.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // If search is empty, show all games
            document.querySelectorAll('.game-card').forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        // Filter games based on search term
        document.querySelectorAll('.game-card').forEach(card => {
            const gameTitle = card.querySelector('h3').textContent.toLowerCase();
            const gameDescription = card.querySelector('p').textContent.toLowerCase();
            
            if (gameTitle.includes(searchTerm) || gameDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Search on input change
    searchBox.addEventListener('input', performSearch);

    // Search when clicking the search icon
    searchIcon.addEventListener('click', performSearch);

    // Search when pressing Enter
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Add loading state to Play buttons
const playButtons = document.querySelectorAll('.play-btn, .play-now-btn');
playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.style.opacity = '0.7';
        
        // Simulate loading (replace with actual game loading logic)
        setTimeout(() => {
            this.textContent = originalText;
            this.style.opacity = '1';
            window.location.href = this.href;
        }, 1000);
    });
});

// Lazy loading for game images
if ('IntersectionObserver' in window) {
    const gameImages = document.querySelectorAll('.game-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    });

    gameImages.forEach(img => imageObserver.observe(img));
}

// Add touch feedback
document.addEventListener('touchstart', function() {}, true);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// FAQ Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const toggleIcon = question.querySelector('.toggle-icon');
    const isOpen = answer.style.display === 'block';

    // Close all other answers
    document.querySelectorAll('.faq-answer').forEach(item => {
      item.style.display = 'none';
    });
    document.querySelectorAll('.toggle-icon').forEach(icon => {
      icon.textContent = '+';
    });

    // Toggle current answer
    answer.style.display = isOpen ? 'none' : 'block';
    toggleIcon.textContent = isOpen ? '+' : '-';
  });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate API call (replace with actual API endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    } catch (error) {
      // Show error message
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      // Reset button state
      const submitBtn = contactForm.querySelector('.submit-btn');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
}

// Copy Gift Code Functionality
document.querySelectorAll('.copy-code').forEach(button => {
  button.addEventListener('click', () => {
    const codeElement = button.parentElement.querySelector('h3');
    const code = codeElement.textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }).catch(() => {
      alert('Failed to copy code. Please try again.');
    });
  });
});

// Back to Top Button Functionality
const backToTopButton = document.querySelector('.back-to-top');

// Show button when user scrolls down 200px
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hide back to top button when user reaches top
window.addEventListener('scroll', () => {
    if (window.pageYOffset === 0) {
        backToTopButton.classList.remove('visible');
    }
});

// Throttle scroll event for better performance
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        if (window.pageYOffset > 200) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 50);
});
