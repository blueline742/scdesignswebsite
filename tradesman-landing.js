// --- Tradesman Landing Page - JavaScript ---
// Stellar Core Designs

document.addEventListener('DOMContentLoaded', function () {

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Hamburger Menu for Mobile ---
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile nav when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- Particles.js Configuration ---
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": ["#A855F7", "#F472B6", "#ffffff"]
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.2,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.5,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#A855F7",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // --- Animated Counter ---
    const counters = document.querySelectorAll('.stat-number');
    const counterObserverOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll(
        '.benefit-card, .trade-card, .feature-item, .process-card, .faq-item'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('open');
                answer.style.maxHeight = null;
            }
        });
    });

    // --- Contact Form Handling ---
    const form = document.getElementById('form');
    const result = document.getElementById('form-result');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            result.style.display = 'block';
            result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            result.style.color = '#E0E0E0';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let jsonResponse = await response.json();
                    if (response.status === 200) {
                        result.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll be in touch within 24 hours.';
                        result.style.color = '#2dd4bf';
                        form.reset();

                        // Track conversion with Facebook Pixel
                        if (typeof fbq !== 'undefined') {
                            fbq('track', 'Lead');
                        }
                    } else {
                        result.innerHTML = jsonResponse.message || 'Something went wrong!';
                        result.style.color = '#F44336';
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
                    result.style.color = '#F44336';
                })
                .finally(() => {
                    setTimeout(() => {
                        result.style.display = 'none';
                    }, 5000);
                });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Add visible class styles dynamically ---
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- Sticky CTA Scroll Behavior ---
    const stickyCta = document.getElementById('sticky-cta');
    const heroSection = document.getElementById('hero');
    const contactSection = document.getElementById('contact');

    if (stickyCta && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const contactTop = contactSection ? contactSection.getBoundingClientRect().top : Infinity;
            const windowHeight = window.innerHeight;

            // Show sticky CTA after hero section, hide when approaching contact
            if (heroBottom < 0 && contactTop > windowHeight) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }

    // --- Exit Intent Popup ---
    const exitPopup = document.getElementById('exit-popup');
    const exitPopupClose = document.getElementById('exit-popup-close');
    let exitPopupShown = false;

    // Detect mouse leaving viewport (desktop only)
    document.addEventListener('mouseout', (e) => {
        if (!exitPopupShown && e.clientY < 10 && exitPopup) {
            // Mouse moved towards browser UI (likely to leave)
            exitPopup.classList.add('visible');
            exitPopupShown = true;

            // Store in session so it doesn't show again
            sessionStorage.setItem('exitPopupShown', 'true');
        }
    });

    // Check if already shown this session
    if (sessionStorage.getItem('exitPopupShown')) {
        exitPopupShown = true;
    }

    // Close popup button
    if (exitPopupClose && exitPopup) {
        exitPopupClose.addEventListener('click', () => {
            exitPopup.classList.remove('visible');
        });

        // Close on background click
        exitPopup.addEventListener('click', (e) => {
            if (e.target === exitPopup) {
                exitPopup.classList.remove('visible');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && exitPopup.classList.contains('visible')) {
                exitPopup.classList.remove('visible');
            }
        });
    }

});
