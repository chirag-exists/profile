async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        const renderItems = (items, containerId, isPoem = false) => {
            const container = document.getElementById(containerId);
            items.forEach(item => {
                container.innerHTML += `
                    <div class="ach-card ${isPoem ? 'poem-card' : ''}">
                        <div>
                            ${item.icon ? `<i class="fa-solid ${item.icon}"></i>` : ''}
                            ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
                            <h3>${item.title}</h3>
                            <p>${item.desc || item.excerpt}</p>
                        </div>
                        <a href="${item.link}" target="_blank" style="color:var(--primary); text-decoration:none; font-weight:700; margin-top:1rem; display:block;">View Details →</a>
                    </div>`;
            });
        };

        renderItems(data.projects, 'projects-container');
        renderItems(data.achievements, 'achievements-container');
        renderItems(data.poetry, 'poetry-container', true);
        
        initObserver();
    } catch (e) { console.error("Error loading data", e); }
}

function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', loadData);
