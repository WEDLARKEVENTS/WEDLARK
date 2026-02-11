/**
 * Luxury Digital Wedding Invitation
 * Gokulnath & Dhiya Dharshini
 * Subtle animations and countdown
 */

document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initRevealAnimations();
    initCountdown();
    initSmoothScroll();
});

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */
function initScrollProgress() {
    const scrollLine = document.querySelector('.scroll-line');
    
    if (!scrollLine) return;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        scrollLine.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/* ============================================
   REVEAL ANIMATIONS ON SCROLL
   ============================================ */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-text');
    
    if (revealElements.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Trigger initial animations for elements in viewport
    setTimeout(() => {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            }
        });
    }, 100);
}

/* ============================================
   ELEGANT COUNTDOWN TIMER
   ============================================ */
function initCountdown() {
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    
    if (countdownNumbers.length === 0) return;
    
    // Target date: March 5, 2026 (Wedding Day)
    const targetDate = new Date('2026-03-05T00:00:00').getTime();
    
    // Store previous values for ticking animation
    const previousValues = {
        days: -1,
        hours: -1,
        minutes: -1,
        seconds: -1
    };
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Event has passed
            countdownNumbers.forEach(el => {
                el.textContent = '--';
                el.style.opacity = '0.5';
            });
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        updateCountdownItem('days', days);
        updateCountdownItem('hours', hours);
        updateCountdownItem('minutes', minutes);
        updateCountdownItem('seconds', seconds);
    }
    
    function updateCountdownItem(type, value) {
        const element = document.querySelector(`[data-countdown="${type}"]`);
        if (element) {
            const formattedValue = value.toString().padStart(2, '0');
            
            if (element.textContent !== formattedValue) {
                // Add subtle ticking animation
                element.classList.add('ticking');
                
                // Update the value
                element.textContent = formattedValue;
                
                // Remove ticking class after animation
                setTimeout(() => {
                    element.classList.remove('ticking');
                }, 300);
            }
            
            previousValues[type] = value;
        }
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second with smooth ticking
    setInterval(updateCountdown, 1000);
}

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */
function initSmoothScroll() {
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add subtle parallax effect to watercolor backgrounds
    initParallaxEffect();
}

/* ============================================
   SUBTLE PARALLAX EFFECT
   ============================================ */
function initParallaxEffect() {
    const watercolorBgs = document.querySelectorAll('.watercolor-bg');
    
    if (watercolorBgs.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        watercolorBgs.forEach((bg, index) => {
            const speed = 0.02 + (index * 0.005);
            const yPos = -(scrolled * speed);
            bg.style.transform = `translateY(${yPos}px)`;
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

/* ============================================
   UTILITY: Debounce Function
   ============================================ */
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
