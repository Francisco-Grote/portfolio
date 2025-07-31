// Variables globales
let currentLang = 'es';
let updateNavbarBackground; // Declarar la variable globalmente

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio JavaScript iniciado');
    
    // Initialize all functionality
    initThemeToggle();
    initLanguageToggle();
    initSmoothScrolling();
    initNavbarEffects();
    initScrollAnimations();
    initInteractiveExperience();
    initActiveNavigation();
    initProgressBars();
    initButtonEffects();
    initCursorEffect();
    
    console.log('Todas las funciones inicializadas');
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
        
        console.log('Theme set to:', theme);
        
        // Update navbar background if function exists
        if (typeof updateNavbarBackground === 'function') {
            updateNavbarBackground();
        }
    }

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    console.log('Theme toggle initialized');
}

// Language Toggle Functionality
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    if (!langToggle) {
        console.error('Language toggle button not found');
        return;
    }

    function setLanguage(lang) {
        currentLang = lang;
        langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        // Update all elements with data attributes
        document.querySelectorAll('[data-es][data-en]').forEach(element => {
            const content = element.getAttribute(`data-${lang}`);
            if (content) {
                element.textContent = content;
            }
        });

        // Update page title based on language
        document.title = lang === 'es' 
            ? 'Francisco Perez Grote - Junior Developer & Analista de Sistemas'
            : 'Francisco Perez Grote - Junior Developer & Systems Analyst';
            
        console.log('Language set to:', lang);
    }

    // Load saved language or default to Spanish
    const savedLang = localStorage.getItem('language') || 'es';
    setLanguage(savedLang);

    // Language toggle event listener
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        setLanguage(newLang);
    });
    
    console.log('Language toggle initialized');
}

// Navbar Effects on Scroll
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.error('Navbar not found');
        return;
    }
    
    // Define the function
    updateNavbarBackground = function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(17, 24, 39, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(17, 24, 39, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    };

    window.addEventListener('scroll', updateNavbarBackground);
    console.log('Navbar effects initialized');
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    try {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    } catch (e) {
                        console.log('Bootstrap collapse not available');
                    }
                }
            }
        });
    });
    console.log('Smooth scrolling initialized');
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger progress bars animation
                if (entry.target.querySelector('.progress-bar')) {
                    animateProgressBars(entry.target);
                }
                
                // Add stagger animation to cards
                if (entry.target.id === 'skills') {
                    addStaggerAnimation('.skill-card', 150);
                } else if (entry.target.id === 'experience') {
                    addStaggerAnimation('.timeline-item', 300);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    console.log('Scroll animations initialized');
}

// Interactive Experience Section
function initInteractiveExperience() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        // Add click event to expand/collapse
        card.addEventListener('click', function() {
            // Close all other cards
            experienceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            this.classList.toggle('expanded');
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 200);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    console.log('Interactive experience initialized');
}

// Add stagger animation to elements
function addStaggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * delay}ms`;
        el.style.animation = 'fadeInUp 0.6s ease forwards';
    });
}

// Active Navigation Based on Scroll Position
function initActiveNavigation() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    console.log('Active navigation initialized');
}

// Progress Bars Animation
function initProgressBars() {
    window.animateProgressBars = function(container) {
        const progressBars = container.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    };
    console.log('Progress bars initialized');
}

// Button Click Effects
function initButtonEffects() {
    // Add hover effects to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    console.log('Button effects initialized');
}

// Custom Cursor Effect
function initCursorEffect() {
    // Only initialize cursor on desktop devices
    if (window.innerWidth > 768) {
        try {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.cssText = `
                width: 20px;
                height: 20px;
                border: 2px solid var(--primary-color);
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
                opacity: 0;
            `;
            document.body.appendChild(cursor);
            
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
                cursor.style.opacity = '1';
            });
            
            console.log('Custom cursor initialized');
        } catch (e) {
            console.log('Custom cursor not initialized:', e);
        }
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Simple utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('Portfolio JavaScript loaded successfully!');