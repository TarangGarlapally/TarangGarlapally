var sideBarFlag = false;


function toggleSideBar(companyName){
	if(sideBarFlag === false){
		document.getElementById("sideBarRight" + companyName).style.visibility = "visible"; 
		sideBarFlag = true;
	}
	else {
		document.getElementById("sideBarRight" + companyName).style.visibility = "hidden"; 
		sideBarFlag = false;
	}
}

// --- CARD ENTRANCE ANIMATIONS ---
function animateCardsOnScroll() {
  const cardSelectors = [
    '.experience-card',
    '.project-card',
    '.education-card',
    '.achievement'
  ];
  const cards = document.querySelectorAll(cardSelectors.join(','));
  cards.forEach((card, i) => {
    card.classList.add('card-animate');
    if (i < 6) card.classList.add('stagger-delay-' + (i + 1));
  });

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', animateCardsOnScroll);

// --- SECTION REVEAL ANIMATIONS ---
document.addEventListener('DOMContentLoaded', function() {
  const sectionSelectors = [
    '.experience-section',
    '.projects-section',
    '.education-section',
    '.skills-section',
    '.languages-section',
    '.achievements-section'
  ];
  const sections = document.querySelectorAll(sectionSelectors.join(','));
  sections.forEach((section, i) => {
    section.classList.add('section-animate');
    if (i < 6) section.classList.add('stagger-delay-' + (i + 1));
  });

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  sections.forEach(section => observer.observe(section));
});

// --- SIDEBAR TOGGLE FOR MOBILE ---
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const mainContent = document.querySelector('.main-content');
  function toggleSidebar() {
    sidebar.classList.toggle('sidebar-hidden');
    if (!sidebar.classList.contains('sidebar-hidden')) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      sidebar.setAttribute('aria-hidden', 'false');
    } else {
      toggleBtn.setAttribute('aria-expanded', 'false');
      sidebar.setAttribute('aria-hidden', 'true');
    }
  }
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', toggleSidebar);
  }
  if (mainContent && sidebar) {
    mainContent.addEventListener('click', function() {
      if (window.innerWidth <= 800 && !sidebar.classList.contains('sidebar-hidden')) {
        sidebar.classList.add('sidebar-hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        sidebar.setAttribute('aria-hidden', 'true');
      }
    });
  }
  // Hide sidebar by default on mobile
  function handleResize() {
    if (window.innerWidth <= 800) {
      sidebar.classList.add('sidebar-hidden');
      toggleBtn.style.display = 'flex';
    } else {
      sidebar.classList.remove('sidebar-hidden');
      toggleBtn.style.display = 'none';
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();
});

document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => el.classList.add('reveal-animate'));
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  reveals.forEach(el => observer.observe(el));
});

// PREMIUM PORTFOLIO INTERACTIONS & ANIMATIONS

class PortfolioAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupRevealAnimations();
    this.setupSmoothScrolling();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupTypingEffect();
    this.setupScrollProgress();
    this.setupPerformanceOptimizations();
  }

  // Premium Reveal Animations with Staggered Delays
  setupRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(el => {
      el.classList.add('reveal-animate');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on element type and position
          const delay = this.calculateStaggerDelay(entry.target, index);
          setTimeout(() => {
            entry.target.classList.add('reveal-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  calculateStaggerDelay(element, index) {
    const baseDelay = 100;
    const typeDelay = this.getElementTypeDelay(element);
    return (index * 50) + typeDelay;
  }

  getElementTypeDelay(element) {
    if (element.classList.contains('hero-name')) return 0;
    if (element.classList.contains('hero-title')) return 100;
    if (element.classList.contains('hero-desc')) return 200;
    if (element.classList.contains('card')) return 150;
    if (element.classList.contains('badge')) return 50;
    if (element.classList.contains('section-title')) return 0;
    return 0;
  }

  // Smooth Scrolling with Premium Easing
  setupSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Custom smooth scroll for better performance
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          this.smoothScrollTo(target, 1000);
        }
      });
    });
  }

  smoothScrollTo(target, duration) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  // Subtle Parallax Effects
  setupParallaxEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero::before');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Premium Hover Effects
  setupHoverEffects() {
    const interactiveElements = document.querySelectorAll('.card, .badge, .social-link, .contact-btn');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.addHoverEffect(e.target);
      });
      
      element.addEventListener('mouseleave', (e) => {
        this.removeHoverEffect(e.target);
      });
    });
  }

  addHoverEffect(element) {
    element.style.transform = 'translateY(-4px) scale(1.02)';
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  removeHoverEffect(element) {
    element.style.transform = 'translateY(0) scale(1)';
  }

  // Typing Effect for Hero Title
  setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    };

    // Start typing effect after hero name animation
    setTimeout(typeWriter, 1000);
  }

  // Scroll Progress Indicator
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--gradient-primary);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Debounce scroll events
    let ticking = false;
    
    function updateOnScroll() {
      // Update scroll-based animations here
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);

    // Preload critical resources
    this.preloadResources();
  }

  preloadResources() {
    const criticalImages = [
      // Add any critical images here
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioAnimations();
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Smooth reveal for page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add cursor trail effect for premium feel
class CursorTrail {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'cursor-trail';
    this.cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--accent-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.6;
      transition: all 0.1s ease;
    `;
    document.body.appendChild(this.cursor);
    
    this.setupMouseTracking();
  }

  setupMouseTracking() {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      this.cursor.style.left = mouseX - 4 + 'px';
      this.cursor.style.top = mouseY - 4 + 'px';
    });

    // Hide cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .badge');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(2)';
        this.cursor.style.opacity = '0.3';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursor.style.opacity = '0.6';
      });
    });
  }
}

// Initialize cursor trail (optional - can be disabled for performance)
// new CursorTrail();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
  const focusableElements = document.querySelectorAll('a, button, .card, .badge');
  
  focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.style.outline = '2px solid var(--accent-primary)';
      el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
      el.style.outline = 'none';
    });
  });
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
  });
}