// ===== Data Loading =====
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        renderProjects(data.projects);
        renderAchievements(data.achievements);
        renderPoetry(data.poetry);
        initObserver();
    } catch (e) {
        console.error('Error loading data:', e);
        showError('projects-container');
        showError('achievements-container');
        showError('poetry-container');
    }
}

// ===== Render Projects =====
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3 class="card-title">${project.title}</h3>
            <p class="card-desc">${project.desc}</p>
            <div class="card-tech">
                ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="card-link">
                View Code <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// ===== Render Achievements =====
function renderAchievements(achievements) {
    const container = document.getElementById('achievements-container');
    container.innerHTML = achievements.map(ach => `
        <div class="ach-card">
            <div class="card-icon">
                <i class="fas ${ach.icon}"></i>
            </div>
            <span class="card-badge">${ach.badge}</span>
            <h3 class="card-title">${ach.title}</h3>
            <p class="card-desc">${ach.desc}</p>
            <a href="${ach.link}" target="_blank" rel="noopener noreferrer" class="card-link">
                View Proof <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// ===== Render Poetry =====
function renderPoetry(poetry) {
    const container = document.getElementById('poetry-container');
    if (!poetry || poetry.length === 0) {
        container.innerHTML = '<p style="color: var(--text-dim);">More poems coming soon...</p>';
        return;
    }
    container.innerHTML = poetry.map(poem => `
        <div class="poetry-card">
            <h3>${poem.title}</h3>
            <p class="poetry-excerpt">${poem.excerpt}</p>
            <a href="${poem.link}" target="_blank" rel="noopener noreferrer" class="card-link">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// ===== Error State =====
function showError(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-triangle-exclamation"></i>
            <p>Something went wrong loading this section.<br>Please try refreshing the page.</p>
        </div>
    `;
}

// ===== Intersection Observer (Scroll Animations) =====
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
}

// ===== Navigation =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const allNavLinks = navLinks.querySelectorAll('a');

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // Active link highlighting & nav shrink on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Shrink nav on scroll
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Show/hide scroll-to-top button
        scrollTopBtn.classList.toggle('show', scrollY > 400);

        // Highlight active section in nav
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = navLinks.querySelector(`a[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', scrollY >= top && scrollY < bottom);
            }
        });
    });

    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Keyboard support for hamburger
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initNavigation();
});