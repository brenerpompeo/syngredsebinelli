// --- CONFIGURAÇÃO E ESTILOS DINÂMICOS ---
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                accent: 'var(--accent-color)',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                serif: ['Orbitron', 'sans-serif'],
            }
        }
    }
}

const applyBaseStyles = () => {
    document.querySelectorAll('.nav-link').forEach(el => el.classList.add('hover:text-[var(--primary-color)]', 'transition-colors'));
    document.querySelectorAll('.menu-link').forEach(el => el.classList.add('text-2xl', 'font-bold', 'tracking-widest', 'hover:text-[var(--primary-color)]', 'transition-colors'));
    document.querySelectorAll('.cta-button').forEach(el => el.classList.add('bg-[var(--primary-color)]', 'text-black', 'font-bold', 'py-3', 'px-8', 'rounded-lg', 'transition-all', 'transform', 'hover:scale-105', 'hover:shadow-[0_0_20px_var(--primary-color)]', 'tracking-widest'));
    document.querySelectorAll('.cta-button-secondary').forEach(el => el.classList.add('bg-transparent', 'text-[var(--primary-color)]', 'font-bold', 'py-3', 'px-8', 'rounded-lg', 'transition-all', 'transform', 'hover:scale-105', 'border-2', 'border-[var(--primary-color)]', 'hover:bg-[var(--primary-color)]', 'hover:text-black', 'tracking-widest'));
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('text-3xl', 'md:text-4xl', 'font-bold', 'text-white'));
    document.querySelectorAll('.section-subtitle').forEach(el => el.classList.add('text-lg', 'text-gray-400', 'mt-2', 'font-sans', 'normal-case', 'tracking-normal'));
    document.querySelectorAll('.social-link').forEach(el => el.classList.add('text-gray-400', 'hover:text-[var(--primary-color)]', 'transition-colors'));
    document.querySelectorAll('.project-card').forEach(el => el.classList.add('group', 'block', 'rounded-lg', 'afro-card', 'overflow-hidden', 'cursor-pointer'));
    document.querySelectorAll('.project-image').forEach(el => el.classList.add('w-full', 'h-full', 'object-cover', 'transition-transform', 'duration-500', 'group-hover:scale-105'));
    document.querySelectorAll('.form-input').forEach(el => el.classList.add('w-full', 'p-3', 'bg-black/20', 'border', 'border-[var(--border-color)]', 'rounded-lg', 'focus:outline-none', 'focus:ring-2', 'focus:ring-[var(--primary-color)]', 'transition-all', 'placeholder-gray-500', 'font-sans'));
};

// --- MENU MOBILE ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const toggleMenu = () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    document.body.style.overflow = isHidden ? '' : 'hidden';
    menuBtn.querySelector('i').setAttribute('data-lucide', isHidden ? 'menu' : 'x');
    lucide.createIcons();
};
menuBtn.addEventListener('click', toggleMenu);
document.querySelectorAll('.menu-link, .nav-link').forEach(link => link.addEventListener('click', () => !mobileMenu.classList.contains('hidden') && toggleMenu()));

// --- ANIMAÇÃO DE SCROLL (REVEAL) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- LÓGICA DO MODAL DE PROJETOS ---
const projectModal = document.getElementById('project-modal');
const modalContentContainer = document.getElementById('modal-content-container');

let projectData = {};

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        projectData = data;
    });

const createModalContent = (data) => {
    return `
        <div class="flex justify-between items-start">
            <div>
                <h2 class="text-3xl font-bold mb-2">${data.title}</h2>
                <p class="text-sm text-gray-400 mb-6 font-sans normal-case tracking-normal">${data.category}</p>
            </div>
            <i data-lucide="x" class="close-modal w-8 h-8 text-gray-400 hover:text-white transition-colors"></i>
        </div>
        <img src="${data.image}" alt="${data.title}" class="w-full rounded-lg mb-8">
        <div class="space-y-6 text-gray-300 font-sans">
            <div><h3 class="font-serif uppercase tracking-widest font-bold text-lg text-white mb-1">Conceito</h3><p>${data.concept}</p></div>
            <div><h3 class="font-serif uppercase tracking-widest font-bold text-lg text-white mb-1">Materiais e Tecnologia</h3><p>${data.materials}</p></div>
            <div><h3 class="font-serif uppercase tracking-widest font-bold text-lg text-white mb-1">Processo de Tecelagem</h3><p>${data.process}</p></div>
            <div><h4 class="font-serif uppercase tracking-widest font-bold text-lg text-white mb-2">O Artefato Final</h4><p class="italic text-[var(--primary-color)]">"${data.finalPiece}"</p></div>
        </div>
        <div class="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
            <a href="#contato" class="cta-button modal-cta">Comissionar um Artefato</a>
        </div>
    `;
};

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const data = projectData[projectId];
        modalContentContainer.innerHTML = createModalContent(data);
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
        projectModal.querySelector('.close-modal').addEventListener('click', closeModal);
        projectModal.querySelector('.modal-cta').addEventListener('click', closeModal);
    });
});

const closeModal = () => {
    projectModal.style.display = 'none';
    document.body.style.overflow = '';
}

window.addEventListener('click', (event) => {
    if (event.target == projectModal) closeModal();
});

// --- FORMULÁRIO DE CONTATO ---
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.textContent = 'Transmitindo...';
    formStatus.style.color = 'var(--text-color)';

    setTimeout(() => {
        formStatus.textContent = 'Conexão Estabelecida. Mensagem Recebida.';
        formStatus.style.color = 'var(--primary-color)';
        form.reset();
    }, 1500);
});

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    applyBaseStyles();
    lucide.createIcons();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
