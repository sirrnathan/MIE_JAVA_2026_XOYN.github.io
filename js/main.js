// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('show');
        });
    }

    // Handle navigation links
    const links = document.querySelectorAll('.nav-links a');

    // Check if we're on a separate page (not index.html)
    const isSeparatePage = !window.location.pathname.endsWith('index.html') &&
        window.location.pathname !== '/' &&
        !window.location.pathname.endsWith('/');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // If it's a hash link and we're on index.html, handle smooth scroll
            if (href.includes('#') && (window.location.pathname.endsWith('index.html') ||
                window.location.pathname === '/' ||
                window.location.pathname.endsWith('/'))) {
                e.preventDefault();

                const targetId = href.split('#')[1];
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('show');
                    }

                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active class
                    links.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // Otherwise let the link behave normally (navigate to index.html#section)
        });
    });

    // Update active nav link on scroll (only on index page)
    if (!isSeparatePage) {
        window.addEventListener('scroll', function () {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                    if (correspondingLink) {
                        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                        correspondingLink.classList.add('active');
                    }
                }
            });
        });
    }

    // Contact form validation (works on both index and contact.html)
    const contactForm = document.getElementById('contactForm') || document.getElementById('contactPageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate
            let isValid = true;

            // Name validation
            if (name === '') {
                showError('name', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }

            // Email validation
            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Message validation
            if (message === '') {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }

            // If form is valid, show success message
            if (isValid) {
                showSuccess();
                contactForm.reset();
            }
        });
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + 'Error');

    if (field && errorSpan) {
        field.classList.add('error');
        errorSpan.textContent = message;
    }
}

// Helper function to clear all errors
function clearErrors() {
    const errorFields = ['name', 'email', 'message'];
    errorFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + 'Error');

        if (field) field.classList.remove('error');
        if (errorSpan) errorSpan.textContent = '';
    });

    // Hide success message
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
        successMsg.style.display = 'none';
    }
}

// Helper function to show success
function showSuccess() {
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
        successMsg.textContent = 'Message sent successfully! (Demo - no actual email sent)';
        successMsg.style.display = 'block';

        // Auto hide after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
}

// Handle window resize for mobile menu
window.addEventListener('resize', function () {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        navLinks.classList.remove('show');
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = '';
    }
});