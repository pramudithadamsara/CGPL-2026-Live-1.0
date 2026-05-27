/**
 * Ceylonspizee Global - Main JavaScript
 * Handles component loading, navigation state, and UI interactions
 */

// Configuration
const CONFIG = {
    componentsPath: '/components/',
    headerId: 'site-header',
    footerId: 'site-footer',
    contactSectionId: 'contact-section'
};

/**
 * Load HTML component into specified element
 */
async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            // Re-initialize any component-specific scripts
            if (elementId === CONFIG.headerId) {
                initNavigation();
                initMobileMenu();
            }
        }
    } catch (error) {
        console.error(`Failed to load component ${url}:`, error);
    }
}

/**
 * Initialize navigation active state based on current page
 */
function initNavigation() {
    const pathname = window.location.pathname;
    let pageName;
    
    // Handle blog subdirectory case
    if (pathname.includes('/blog/')) {
        pageName = 'insights';
    } else {
        const currentPage = pathname.split('/').pop() || 'index.html';
        pageName = currentPage.replace('.html', '') || 'index';
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === pageName) {
            link.classList.remove('text-stone-400');
            link.classList.add('text-white', 'border-b-2', 'border-primary', 'pb-1');
        } else {
            link.classList.remove('text-white', 'border-b-2', 'border-primary', 'pb-1');
            link.classList.add('text-stone-400');
        }
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback: load all images immediately
        images.forEach(img => img.classList.add('loaded'));
    }
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Header scroll behavior - add shadow on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 10) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Parallax scroll effect for all parallax elements - Smooth 60fps using requestAnimationFrame
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    if (parallaxElements.length === 0) return;

    let ticking = false;
    const lastYPos = new Map(); // Store last Y position for each element

    function updateParallax() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element, index) => {
            const section = element.closest('section');
            if (!section) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Only animate when section is in or near viewport
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                const speed = 0.4;
                const yPos = (scrolled - sectionTop) * speed;

                // Use translate3d for GPU acceleration
                const currentYPos = lastYPos.get(index) || 0;
                if (Math.abs(yPos - currentYPos) > 0.5) {
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    lastYPos.set(index, yPos);
                }
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Load components with w3-include-html attribute
 */
async function loadIncludeHtmlComponents() {
    const elements = document.querySelectorAll('[w3-include-html]');
    let headerLoaded = false;
    
    for (const el of elements) {
        const file = el.getAttribute('w3-include-html');
        try {
            const response = await fetch(file);
            if (response.ok) {
                const html = await response.text();
                el.innerHTML = html;
                el.removeAttribute('w3-include-html');
                
                // Check if this was a header component
                if (file.includes('header.html')) {
                    headerLoaded = true;
                }
            }
        } catch (error) {
            console.error(`Failed to load ${file}:`, error);
        }
    }
    
    // Initialize mobile menu if header was loaded via w3-include-html
    if (headerLoaded) {
        initMobileMenu();
    }
}

/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Load components if placeholders exist
    const headerPlaceholder = document.getElementById(CONFIG.headerId);
    const footerPlaceholder = document.getElementById(CONFIG.footerId);
    const contactSectionPlaceholder = document.getElementById(CONFIG.contactSectionId);
    
    if (headerPlaceholder) {
        loadComponent(`${CONFIG.componentsPath}header.html`, CONFIG.headerId);
    } else {
        // Header already inline, just init nav
        initNavigation();
    }
    
    if (footerPlaceholder) {
        loadComponent(`${CONFIG.componentsPath}footer.html`, CONFIG.footerId);
    }
    
    if (contactSectionPlaceholder) {
        loadComponent(`${CONFIG.componentsPath}contact-section.html`, CONFIG.contactSectionId);
    }
    
    // Load w3-include-html components
    await loadIncludeHtmlComponents();
    
    // Initialize features
    initLazyLoading();
    initSmoothScroll();
    initHeaderScroll();
    initParallax();
    initSlideshow();
    initScrollFlipCards();
    initHeroParallax();
    initRotatingCircle();
    initRotatingCircleDigital();
    initRotatingCircleWhy();
    initRotatingCircleProductRange();
});

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeBtn = document.getElementById('mobile-menu-close-btn');

    if (!menuBtn || !mobileMenu) return;

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        if (menuIcon) menuIcon.textContent = 'menu';
        document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('translate-x-full');
        if (isOpen) {
            closeMenu();
        } else {
            mobileMenu.classList.remove('translate-x-full');
            if (menuIcon) menuIcon.textContent = 'close';
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * Slideshow functionality for Welcome section
 */
function initSlideshow() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slideshow-container button');
    
    if (slides.length === 0) return;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('opacity-100'));
        slides.forEach(slide => slide.classList.add('opacity-0'));
        
        // Reset all dots
        dots.forEach(dot => {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-white/50');
        });
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.remove('opacity-0');
            slides[index].classList.add('opacity-100');
        }
        
        // Update current dot
        if (dots[index]) {
            dots[index].classList.remove('bg-white/50');
            dots[index].classList.add('bg-white');
        }
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    // Auto-advance slideshow
    setInterval(nextSlide, 4000);

    // Manual control
    window.currentSlide = function(index) {
        currentSlideIndex = index - 1;
        showSlide(currentSlideIndex);
    };
}

/**
 * Initialize scroll-triggered flip cards animation
 */
function initScrollFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const flipCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for sequential animation
                setTimeout(() => {
                    const cardInner = entry.target.querySelector('.flip-card-inner');
                    if (cardInner) {
                        // Mark card as animated
                        entry.target.classList.add('scroll-animated');
                        
                        cardInner.style.transform = 'rotateY(180deg)';
                        cardInner.style.transition = 'transform 0.8s ease-in-out';
                        
                        // Reset after animation
                        setTimeout(() => {
                            cardInner.style.transform = 'rotateY(0deg)';
                            setTimeout(() => {
                                cardInner.style.transform = 'rotateY(180deg)';
                            }, 200);
                        }, 2000);
                    }
                }, index * 200); // 200ms stagger between cards
                
                // Unobserve after animation
                flipCardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    flipCards.forEach(card => {
        flipCardObserver.observe(card);
        
        // Add hover/tap interaction
        card.addEventListener('mouseenter', function() {
            const cardInner = this.querySelector('.flip-card-inner');
            if (cardInner) {
                cardInner.style.transform = 'rotateY(180deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cardInner = this.querySelector('.flip-card-inner');
            if (cardInner) {
                cardInner.style.transform = 'rotateY(0deg)';
            }
        });
        
        // Mobile touch interaction
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const cardInner = this.querySelector('.flip-card-inner');
            if (cardInner) {
                const currentTransform = cardInner.style.transform;
                if (currentTransform === 'rotateY(180deg)') {
                    cardInner.style.transform = 'rotateY(0deg)';
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                }
            }
        });
    });
}

/**
 * Initialize hero parallax layers (two-layer opposite direction parallax)
 */
function initHeroParallax() {
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const layer3 = document.getElementById('layer3');
    const layer4 = document.getElementById('layer4');

    if (!layer1 || !layer2) return;

    const SPEED_LAYER_1 = 0.5;
    const SPEED_LAYER_2 = -0.3;
    const SPEED_LAYER_3 = 0.5;
    const SPEED_LAYER_4 = -0.5;

    function handleParallax() {
        const scrolled = window.pageYOffset;
        const layer1Transform = scrolled * SPEED_LAYER_1;
        const layer2Transform = scrolled * SPEED_LAYER_2;
        layer1.style.transform = `translateY(${layer1Transform}px)`;
        layer2.style.transform = `translateY(${layer2Transform}px)`;

        // Handle Industry Basics section parallax
        if (layer3 && layer4) {
            const section3 = document.getElementById('what-is-pl');
            if (section3) {
                const sectionTop = section3.offsetTop;
                const sectionHeight = section3.offsetHeight;
                const scrollIntoSection = scrolled - sectionTop + window.innerHeight;

                if (scrollIntoSection > 0 && scrolled < sectionTop + sectionHeight) {
                    const layer3Transform = (scrolled - sectionTop) * SPEED_LAYER_3;
                    const layer4Transform = (scrolled - sectionTop) * SPEED_LAYER_4;
                    layer3.style.transform = `translateY(${layer3Transform}px)`;
                    layer4.style.transform = `translateY(${layer4Transform}px)`;
                }
            }
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });
}

/**
 * Initialize rotating circle animation for section 2
 */
function initRotatingCircle() {
    const logoCircle = document.getElementById('logoCircle');
    const logoSection = document.querySelector('.py-12.md\\:py-20.bg-surface-container-low');

    if (!logoCircle || !logoSection) return;

    const ROTATION_SPEED = 0.15;

    function handleScroll() {
        const scrolled = window.pageYOffset;
        const sectionTop = logoSection.offsetTop;
        const sectionHeight = logoSection.offsetHeight;

        const scrollIntoSection = scrolled - sectionTop + window.innerHeight;

        if (scrollIntoSection > 0 && scrolled < sectionTop + sectionHeight) {
            const rotation = scrollIntoSection * ROTATION_SPEED;
            logoCircle.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Initialize rotating circle animation for digital system section
 */
function initRotatingCircleDigital() {
    const logoCircle = document.getElementById('logoCircleDigital');
    const logoSection = document.querySelector('section.py-12.md\\:py-16.lg\\:py-\\[100px\\].max-w-screen-2xl');

    if (!logoCircle || !logoSection) return;

    const ROTATION_SPEED = 0.15;

    function handleScroll() {
        const scrolled = window.pageYOffset;
        const sectionTop = logoSection.offsetTop;
        const sectionHeight = logoSection.offsetHeight;

        const scrollIntoSection = scrolled - sectionTop + window.innerHeight;

        if (scrollIntoSection > 0 && scrolled < sectionTop + sectionHeight) {
            const rotation = scrollIntoSection * ROTATION_SPEED;
            logoCircle.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Initialize rotating circle animation for product range section
 */
function initRotatingCircleProductRange() {
    const logoCircle = document.getElementById('logoCircleDigital');
    const logoSection = document.getElementById('spices');

    if (!logoCircle || !logoSection) return;

    const ROTATION_SPEED = 0.15;

    function handleScroll() {
        const scrolled = window.pageYOffset;
        const sectionTop = logoSection.offsetTop;
        const sectionHeight = logoSection.offsetHeight;

        const scrollIntoSection = scrolled - sectionTop + window.innerHeight;

        if (scrollIntoSection > 0 && scrolled < sectionTop + sectionHeight) {
            const rotation = scrollIntoSection * ROTATION_SPEED;
            logoCircle.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Initialize rotating circle animation for why choose us section
 */
function initRotatingCircleWhy() {
    const logoCircle = document.getElementById('logoCircleWhy');
    const logoSection = document.querySelector('section.py-12.md\\:py-16.lg\\:py-\\[100px\\].bg-white');

    if (!logoCircle || !logoSection) return;

    const ROTATION_SPEED = 0.15;

    function handleScroll() {
        const scrolled = window.pageYOffset;
        const sectionTop = logoSection.offsetTop;
        const sectionHeight = logoSection.offsetHeight;

        const scrollIntoSection = scrolled - sectionTop + window.innerHeight;

        if (scrollIntoSection > 0 && scrolled < sectionTop + sectionHeight) {
            const rotation = scrollIntoSection * ROTATION_SPEED;
            logoCircle.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Initialize parallax effect for hero background image
 */
function initHeroParallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (!parallaxBg) return;

    function handleScroll() {
        const scrolled = window.pageYOffset;
        const parallaxOffset = scrolled * 0.5; // Adjust speed multiplier
        parallaxBg.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Handle contact form submission via Formspree
 */
async function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('contact-submit-btn');
    const messageDiv = document.getElementById('form-message');
    
    if (!form) return;
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        // Show message
        messageDiv.classList.remove('hidden');
        
        if (response.ok) {
            messageDiv.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            messageDiv.className = 'mt-4 text-center text-sm text-green-400';
            form.reset();
        } else {
            messageDiv.textContent = result.error || 'Failed to send message. Please try again.';
            messageDiv.className = 'mt-4 text-center text-sm text-red-400';
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        // If Formspree returns a redirect, that's also success
        messageDiv.classList.remove('hidden');
        messageDiv.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        messageDiv.className = 'mt-4 text-center text-sm text-green-400';
        form.reset();
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
}

// Initialize contact form handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

// Expose for global access
window.Ceylonspizee = {
    loadComponent,
    initNavigation,
    handleContactFormSubmit
};
