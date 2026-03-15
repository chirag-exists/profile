async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // Populate Projects
        const projectsContainer = document.getElementById('projects-container');
        data.projects.forEach(project => {
            projectsContainer.innerHTML += `
                <div class="ach-card">
                    <div>
                        <h3>${project.title}</h3>
                        <p>${project.desc}</p>
                    </div>
                    <a href="${project.link}" target="_blank" class="cert-btn">View Code <i class="fa-brands fa-github"></i></a>
                </div>`;
        });

        // Populate Achievements
        const achContainer = document.getElementById('achievements-container');
        data.achievements.forEach(ach => {
            achContainer.innerHTML += `
                <div class="ach-card">
                    <div>
                        <i class="fa-solid ${ach.icon}"></i>
                        <span class="badge" style="display:block; width:fit-content">${ach.badge}</span>
                        <h3>${ach.title}</h3>
                        <p>${ach.desc}</p>
                    </div>
                    <a href="${ach.link}" target="_blank" class="cert-btn">View Certificate <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>`;
        });

        // Populate Poetry
        const poemContainer = document.getElementById('poetry-container');
        data.poetry.forEach(poem => {
            poemContainer.innerHTML += `
                <div class="ach-card poem-card">
                    <h3>${poem.title}</h3>
                    <p><em>"${poem.excerpt}"</em></p>
                    <a href="${poem.link}" target="_blank" class="cert-btn">Read Collection <i class="fa-solid fa-book-open"></i></a>
                </div>`;
        });

        initScrollObserver();
    } catch (err) {
        console.error("Data failed to load:", err);
    }
}

function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', loadData);
