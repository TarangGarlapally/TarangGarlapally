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