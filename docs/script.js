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

// STAR & GALAXY TRAIL ANIMATION
(function() {
  let lastX = 0, lastY = 0, lastTime = 0;
  const persistentStars = [];
  const MAX_PERSISTENT_STARS = 1000;
  
  // Cosmic effects system
  let cosmicEffects = [];
  let lastCosmicEffect = 0;
  const COSMIC_EFFECT_INTERVAL = 8000; // 8 seconds between effects
  let activeBlackHoles = []; // Track active black holes for gravitational effects
  
  function createCosmicEffect() {
    const now = Date.now();
    if (now - lastCosmicEffect < COSMIC_EFFECT_INTERVAL) return;
    
    lastCosmicEffect = now;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    createBlackHole(x, y);
  }
  
  function createBlackHole(x, y) {
    const blackhole = document.createElement('div');
    blackhole.className = 'cosmic-blackhole';
    blackhole.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 150px;
      height: 150px;
      z-index: 0;
      pointer-events: none;
      transform: translate(-50%, -50%);
    `;
    
    // Create NASA-style black hole with only event horizon and photon ring (no accretion disk)
    const svg = `
      <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="photon-ring" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fffbe7" stop-opacity="0.2" />
            <stop offset="80%" stop-color="#ffd700" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#fffbe7" stop-opacity="0.3" />
          </radialGradient>
        </defs>
        
        <!-- Thin photon ring -->
        <ellipse cx="75" cy="75" rx="46" ry="16" fill="none" stroke="url(#photon-ring)" stroke-width="2.5" opacity="0.7" />
        
        <!-- Event horizon (perfect black) -->
        <circle cx="75" cy="75" r="28" fill="#000" />
      </svg>
    `;
    
    blackhole.innerHTML = svg;
    document.body.appendChild(blackhole);
    cosmicEffects.push(blackhole);
    
    // Add black hole to active list for gravitational effects
    const blackHoleData = {
      element: blackhole,
      x: x,
      y: y,
      created: Date.now(),
      consumedStars: [],
      isConsuming: false,
      consumptionStartTime: null
    };
    activeBlackHoles.push(blackHoleData);
    
    // Start gravitational effect on nearby stars
    startGravitationalEffect(blackHoleData);
    
    // Fade out after 12 seconds
    setTimeout(() => {
      blackhole.style.transition = 'opacity 5s ease-out';
      blackhole.style.opacity = '0';
      setTimeout(() => {
        if (blackhole.parentNode) {
          blackhole.parentNode.removeChild(blackhole);
          const index = cosmicEffects.indexOf(blackhole);
          if (index > -1) cosmicEffects.splice(index, 1);
        }
        // Remove from active black holes
        const bhIndex = activeBlackHoles.findIndex(bh => bh.element === blackhole);
        if (bhIndex > -1) activeBlackHoles.splice(bhIndex, 1);
      }, 5000);
    }, 12000);
  }
  
  function startGravitationalEffect(blackHoleData) {
    const gravitationalRadius = 200; // Radius of gravitational influence
    const checkInterval = 500; // Check for nearby stars every 500ms
    
    let diskFadedIn = false;
    let diskFadeOutTimeout = null;

    const gravitationalCheck = setInterval(() => {
      if (!blackHoleData.element.parentNode) {
        clearInterval(gravitationalCheck);
        return;
      }
      
      // Check all persistent stars for gravitational pull
      persistentStars.forEach((starContainer, index) => {
        if (!starContainer.parentNode) return;
        
        const starRect = starContainer.getBoundingClientRect();
        const starX = starRect.left + starRect.width / 2;
        const starY = starRect.top + starRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(starX - blackHoleData.x, 2) + 
          Math.pow(starY - blackHoleData.y, 2)
        );
        
        if (distance < gravitationalRadius && !blackHoleData.consumedStars.includes(starContainer)) {
          // Star is within gravitational influence - start spiral effect
          blackHoleData.consumedStars.push(starContainer);
          
          // Fade in accretion disk if not already
          if (!diskFadedIn) {
            diskFadedIn = true;
            setAccretionDiskOpacity(blackHoleData.element.querySelector('svg'), 1, 1500);
          }
          
          // Start consumption effect if not already consuming
          if (!blackHoleData.isConsuming) {
            blackHoleData.isConsuming = true;
            blackHoleData.consumptionStartTime = Date.now();
            updateEventHorizonColor(blackHoleData, true);
          }
          
          createSpiralEffect(starContainer, blackHoleData);
        }
      });
      
      // Check if consumption is complete
      if (blackHoleData.isConsuming && blackHoleData.consumedStars.length > 0) {
        const allStarsConsumed = blackHoleData.consumedStars.every(star => !star.parentNode);
        if (allStarsConsumed) {
          // All stars have been consumed, return to normal
          setTimeout(() => {
            blackHoleData.isConsuming = false;
            blackHoleData.consumptionStartTime = null;
            updateEventHorizonColor(blackHoleData, false);
          }, 2000); // Wait 2 seconds after last star is consumed

          // Fade out accretion disk after a short delay
          if (diskFadedIn && !diskFadeOutTimeout) {
            diskFadeOutTimeout = setTimeout(() => {
              setAccretionDiskOpacity(blackHoleData.element.querySelector('svg'), 0, 1500);
              diskFadedIn = false;
              diskFadeOutTimeout = null;
            }, 2000);
          }
        }
      }
    }, checkInterval);
  }
  
  function updateEventHorizonColor(blackHoleData, isConsuming) {
    const eventHorizon = blackHoleData.element.querySelector('circle[fill="#000"]');
    const blackHoleCore = blackHoleData.element.querySelector('circle[fill="#000"]');
    const outerAccretion = blackHoleData.element.querySelector('ellipse[rx="70"]');
    const innerAccretion = blackHoleData.element.querySelector('ellipse[rx="55"]');
    
    if (!eventHorizon || !blackHoleCore) return;
    
    if (isConsuming) {
      // Create realistic accretion disk heating effect with orange-red colors
      const heatingGradient = `
        <radialGradient id="heating-horizon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#1a0000;stop-opacity:0.98" />
          <stop offset="60%" style="stop-color:#330000;stop-opacity:0.95" />
          <stop offset="100%" style="stop-color:#660000;stop-opacity:0.9" />
        </radialGradient>
        <radialGradient id="heated-accretion" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ff2200;stop-opacity:0.9" />
          <stop offset="30%" style="stop-color:#ff4400;stop-opacity:0.7" />
          <stop offset="60%" style="stop-color:#ff6600;stop-opacity:0.5" />
          <stop offset="100%" style="stop-color:#ff8800;stop-opacity:0.3" />
        </radialGradient>
        <radialGradient id="heated-inner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ff0000;stop-opacity:1" />
          <stop offset="40%" style="stop-color:#ff2200;stop-opacity:0.8" />
          <stop offset="80%" style="stop-color:#ff4400;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#ff6600;stop-opacity:0.4" />
        </radialGradient>
      `;
      
      // Add gradient to defs if not exists
      let defs = blackHoleData.element.querySelector('defs');
      if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        blackHoleData.element.querySelector('svg').insertBefore(defs, blackHoleData.element.querySelector('svg').firstChild);
      }
      
      // Remove existing heating gradients if exists
      const existingGradients = defs.querySelectorAll('#heating-horizon, #heated-accretion, #heated-inner');
      existingGradients.forEach(g => g.remove());
      
      // Add new gradients
      defs.insertAdjacentHTML('beforeend', heatingGradient);
      
      // Apply realistic heating effect with subtle blur
      eventHorizon.setAttribute('fill', 'url(#heating-horizon)');
      eventHorizon.style.filter = 'blur(0.4px)';
      eventHorizon.style.transition = 'all 5s ease-in-out';
      
      blackHoleCore.setAttribute('fill', '#0a0a0a');
      blackHoleCore.style.filter = 'blur(0.2px)';
      blackHoleCore.style.transition = 'all 5s ease-in-out';
      
      // Heat up accretion disk with realistic intensity
      if (outerAccretion) {
        outerAccretion.setAttribute('stroke', 'url(#heated-accretion)');
        outerAccretion.style.filter = 'blur(1.5px)';
        outerAccretion.style.strokeWidth = '3';
        outerAccretion.style.transition = 'all 5s ease-in-out';
      }
      
      if (innerAccretion) {
        innerAccretion.setAttribute('stroke', 'url(#heated-inner)');
        innerAccretion.style.filter = 'blur(1px)';
        innerAccretion.style.strokeWidth = '4';
        innerAccretion.style.transition = 'all 5s ease-in-out';
      }
      
      // Add subtle heating animation
      eventHorizon.style.animation = 'accretion-heating 3s ease-in-out infinite';
      blackHoleCore.style.animation = 'accretion-heating 3s ease-in-out infinite';
      
    } else {
      // Return to normal with realistic cooling
      eventHorizon.style.transition = 'all 3s ease-in-out';
      blackHoleCore.style.transition = 'all 3s ease-in-out';
      
      // Remove heating gradients
      const heatingGradients = blackHoleData.element.querySelectorAll('#heating-horizon, #heated-accretion');
      heatingGradients.forEach(g => g.remove());
      
      // Return to original colors and remove blur
      eventHorizon.setAttribute('fill', '#000');
      blackHoleCore.setAttribute('fill', '#000');
      
      // Cool down accretion disk
      if (outerAccretion) {
        outerAccretion.setAttribute('stroke', 'url(#accretion-disk)');
        outerAccretion.style.filter = '';
        outerAccretion.style.strokeWidth = '3';
        outerAccretion.style.transition = 'all 3s ease-in-out';
      }
      
      if (innerAccretion) {
        innerAccretion.setAttribute('stroke', 'url(#accretion-disk)');
        innerAccretion.style.filter = '';
        innerAccretion.style.strokeWidth = '2';
        innerAccretion.style.transition = 'all 3s ease-in-out';
      }
      
      // Remove heating animation
      eventHorizon.style.animation = '';
      blackHoleCore.style.animation = '';
    }
  }

  function createSpiralEffect(starContainer, blackHoleData) {
    const star = starContainer.querySelector('.star-trail-star--core');
    if (!star) return;
    
    // Completely stop all animations
    star.style.animation = 'none';
    starContainer.style.animation = 'none';
    
    // Get current position
    const starRect = starContainer.getBoundingClientRect();
    const currentX = starRect.left + starRect.width / 2;
    const currentY = starRect.top + starRect.height / 2;
    
    // Calculate distance to black hole
    const startLeft = starContainer.offsetLeft;
    const startTop = starContainer.offsetTop;
    const endLeft = blackHoleData.x;
    const endTop = blackHoleData.y;
    
    // Animate container to black hole center
    const duration = 500;
    const startTime = performance.now();
    function animateMove(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newLeft = startLeft + (endLeft - startLeft) * progress;
      const newTop = startTop + (endTop - startTop) * progress;
      starContainer.style.position = 'fixed';
      starContainer.style.left = newLeft + 'px';
      starContainer.style.top = newTop + 'px';
      if (progress < 1) {
        requestAnimationFrame(animateMove);
      } else {
        // Once at the black hole, start the spiral effect
        startSpiral();
      }
    }
    requestAnimationFrame(animateMove);
    
    function startSpiral() {
      // Get new position (should be at black hole center)
      const starRect2 = starContainer.getBoundingClientRect();
      const currentX2 = starRect2.left + starRect2.width / 2;
      const currentY2 = starRect2.top + starRect2.height / 2;
      // Calculate initial distance and angle from black hole
      const distanceX = currentX2 - blackHoleData.x;
      const distanceY = currentY2 - blackHoleData.y;
      const initialDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const initialAngle = Math.atan2(distanceY, distanceX);
      // Make star absolute inside container
      star.style.position = 'absolute';
      star.style.left = '0px';
      star.style.top = '0px';
      // Spiral parameters
      const spiralDuration = 4000 + Math.random() * 2000; // 4-6 seconds
      const startRadius = Math.max(initialDistance, 46); // photon ring radius
      const endRadius = 10; // disappear into event horizon
      const spiralStartTime = Date.now();
      function animateSpiral() {
        const elapsed = Date.now() - spiralStartTime;
        const progress = Math.min(elapsed / spiralDuration, 1);
        const totalAngle = initialAngle + progress * Math.PI * 8;
        const radius = startRadius - (startRadius - endRadius) * progress;
        const scale = 1 - 0.9 * progress;
        const opacity = 1 - progress;
        const orbitX = Math.cos(totalAngle) * radius;
        const orbitY = Math.sin(totalAngle) * radius;
        star.style.transform = `translate(${orbitX}px, ${orbitY}px) scale(${scale})`;
        star.style.opacity = opacity;
        if (progress < 1) {
          requestAnimationFrame(animateSpiral);
        } else {
          if (starContainer.parentNode) {
            starContainer.parentNode.removeChild(starContainer);
            const index = persistentStars.indexOf(starContainer);
            if (index > -1) persistentStars.splice(index, 1);
          }
        }
      }
      requestAnimationFrame(animateSpiral);
    }
  }

  // Start cosmic effects
  setInterval(createCosmicEffect, 1000);
  
  // Mouse-based star trail
  document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (Math.abs(e.clientX - lastX) > 3 || Math.abs(e.clientY - lastY) > 3 || now - lastTime > 10) {
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
      for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
        const offsetX = e.clientX + (Math.random() - 0.5) * 24;
        const offsetY = e.clientY + (Math.random() - 0.5) * 24;
        createStar(offsetX, offsetY);
      }
      if (Math.random() < 0.05) createGalaxy(e.clientX, e.clientY);
    }
  });

  // Touch-based star trail for mobile
  function handleTouchTrail(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const now = Date.now();
      if (Math.abs(touch.clientX - lastX) > 3 || Math.abs(touch.clientY - lastY) > 3 || now - lastTime > 10) {
        lastX = touch.clientX;
        lastY = touch.clientY;
        lastTime = now;
        for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
          const offsetX = touch.clientX + (Math.random() - 0.5) * 24;
          const offsetY = touch.clientY + (Math.random() - 0.5) * 24;
          createStar(offsetX, offsetY);
        }
        if (Math.random() < 0.05) createGalaxy(touch.clientX, touch.clientY);
      }
    }
  }
  document.addEventListener('touchmove', handleTouchTrail, {passive: true});
  document.addEventListener('touchstart', handleTouchTrail, {passive: true});

  function createStar(x, y) {
    const star = document.createElement('div');
    const types = ['white', 'blue', 'yellow', 'pink'];
    const type = types[Math.floor(Math.random() * types.length)];
    let shape = 'dot';
    const r = Math.random();
    if (r > 0.96) shape = 'sparkle';
    else if (r > 0.92) shape = 'cross';
    let size = 3 + Math.random() * 3;
    if (shape === 'sparkle') size = 10;
    if (shape === 'cross') size = 8;
    star.className = `star-trail-star star-trail-star--${type}`;
    if (shape !== 'dot') star.classList.add(`star-trail-star--${shape}`);
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = (x - size / 2) + 'px';
    star.style.top = (y - size / 2) + 'px';
    star.style.position = 'fixed';
    star.style.pointerEvents = 'none';
    star.style.zIndex = 0;
    star.style.opacity = 0.65 + Math.random() * 0.25;
    star.style.willChange = 'transform, opacity';
    document.body.appendChild(star);
    
    setTimeout(() => {
      // Replace with persistent core for interstellar arc motion
      const container = document.createElement('div');
      container.className = 'star-arc-container';
      container.style.left = x + 'px';
      container.style.top = y + 'px';
      container.style.willChange = 'transform';
      container.style.zIndex = 0;
      
      const core = document.createElement('div');
      core.className = `star-trail-star star-trail-star--core star-trail-star--${type}`;
      core.style.willChange = 'transform, opacity';
      core.style.zIndex = 0;
      
      const moveDurationNum = 20 + Math.random() * 12;
      const moveDuration = moveDurationNum.toFixed(2) + 's';
      const moveDelay = (Math.random() * 0.5) + 's';
      
      let twinkle = false;
      if (Math.random() < 0.4) twinkle = true;
      
      if (twinkle) {
        core.classList.add('sparkle-twinkle');
        const twinkleDelay = (Math.random() * 1.2) + 's';
        core.style.animation = `core-twinkle 1.2s ease-in-out infinite ${twinkleDelay}, star-arc-move ${moveDuration} linear forwards ${moveDelay}`;
      } else {
        core.style.animation = `star-arc-move ${moveDuration} linear forwards ${moveDelay}`;
      }
      
      container.appendChild(core);
      document.body.appendChild(container);
      persistentStars.push(container);
      
      // Clean up old stars
      if (persistentStars.length > MAX_PERSISTENT_STARS) {
        const old = persistentStars.shift();
        if (old && old.parentNode) {
          old.parentNode.removeChild(old);
        }
      }
      
      // Clean up after animation
      setTimeout(() => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
          // Remove from array
          const index = persistentStars.indexOf(container);
          if (index > -1) persistentStars.splice(index, 1);
        }
      }, (moveDurationNum + parseFloat(moveDelay)) * 1000);
      
      star.remove();
    }, 100);
  }

  function createGalaxy(x, y) {
    const galaxy = document.createElement('div');
    galaxy.className = 'star-trail-galaxy';
    const size = 48 + Math.random() * 32;
    galaxy.style.width = size + 'px';
    galaxy.style.height = size + 'px';
    galaxy.style.left = (x - size / 2) + 'px';
    galaxy.style.top = (y - size / 2) + 'px';
    galaxy.style.willChange = 'transform, opacity';
    galaxy.style.zIndex = 0;
    document.body.appendChild(galaxy);
    setTimeout(() => {
      if (galaxy.parentNode) galaxy.parentNode.removeChild(galaxy);
    }, 1400);
  }

  // Helper to fade accretion disk group
  function setAccretionDiskOpacity(svgElement, targetOpacity, duration = 1500) {
    const diskGroup = svgElement.querySelector('#accretion-disk-group');
    if (!diskGroup) return;
    const startOpacity = parseFloat(diskGroup.getAttribute('opacity')) || 0;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      diskGroup.setAttribute('opacity', newOpacity);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        diskGroup.setAttribute('opacity', targetOpacity);
      }
    }
    requestAnimationFrame(animate);
  }
})();

// --- RANDOM SPARKLE STARS ---
function spawnRandomSparkleStar() {
  const star = document.createElement('div');
  star.className = 'star-trail-star star-trail-star--core sparkle-twinkle sparkle-popin';
  // Random position (avoid edges)
  const margin = 40;
  const x = Math.random() * (window.innerWidth - margin * 2) + margin;
  const y = Math.random() * (window.innerHeight - margin * 2) + margin;
  star.style.position = 'fixed';
  star.style.left = x + 'px';
  star.style.top = y + 'px';
  star.style.zIndex = '0';
  star.style.pointerEvents = 'none';
  star.style.opacity = '0';
  star.style.transition = 'opacity 0.3s cubic-bezier(0.4,0,0.2,1)';
  document.body.appendChild(star);
  // Fade in
  setTimeout(() => { star.style.opacity = '1'; }, 10);
  // Sparkle intensely
  star.classList.add('sparkle-twinkle-intense');
  // Fade out and remove after 1.5s
  setTimeout(() => {
    star.style.opacity = '0';
    setTimeout(() => {
      if (star.parentNode) star.parentNode.removeChild(star);
    }, 400);
  }, 1500);
}

function scheduleRandomSparkleStar() {
  const nextDelay = 2000 + Math.random() * 4000; // 2–6s
  setTimeout(() => {
    spawnRandomSparkleStar();
    scheduleRandomSparkleStar();
  }, nextDelay);
}

// Start the random sparkle stars on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleRandomSparkleStar);
} else {
  scheduleRandomSparkleStar();
}

// Swipe detection for special effect
let swipeStartX = null, swipeStartY = null, swipeStartTime = null;
document.addEventListener('touchstart', function(e) {
  if (e.touches && e.touches.length === 1) {
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
    swipeStartTime = Date.now();
  }
}, {passive: true});
document.addEventListener('touchend', function(e) {
  if (swipeStartX !== null && swipeStartY !== null && swipeStartTime !== null) {
    const touch = (e.changedTouches && e.changedTouches[0]) || null;
    if (touch) {
      const dx = touch.clientX - swipeStartX;
      const dy = touch.clientY - swipeStartY;
      const dt = Date.now() - swipeStartTime;
      const distance = Math.sqrt(dx*dx + dy*dy);
      // Consider it a swipe if fast and long enough
      if (distance > 80 && dt < 400) {
        // Burst of stars along the swipe path
        const steps = Math.floor(distance / 18);
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = swipeStartX + dx * t + (Math.random()-0.5)*10;
          const y = swipeStartY + dy * t + (Math.random()-0.5)*10;
          createStar(x, y);
        }
        // Optionally, create a galaxy at the end
        if (Math.random() < 0.5) createGalaxy(touch.clientX, touch.clientY);
      }
    }
  }
  swipeStartX = swipeStartY = swipeStartTime = null;
}, {passive: true});