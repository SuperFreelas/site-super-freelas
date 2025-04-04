// Elementos do DOM
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const header = document.querySelector('header');

// Menu Mobile - Toggle do menu com ícone
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevenir scroll quando menu está aberto
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Scroll suave para seções em dispositivos móveis
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('nav') && !target.closest('.menu-toggle') && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Animar links do menu ao scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Header com fundo quando scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animação de fade-in para elementos
const fadeElements = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulação de envio de email - em produção, substitua por seu serviço de email
        console.log('Formulário enviado:', { name, email, subject, message });
        
        // Feedback para o usuário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        contactForm.reset();
    });
}

// Efeito de contagem para números
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Inicialização quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('SuperFreelas website loaded');
    
    // Inicializar contadores
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateValue(counter, 0, target, 1500);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Ajustes para viewport em dispositivos móveis
    function adjustViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    adjustViewportHeight();
    window.addEventListener('resize', adjustViewportHeight);
});

// Language Switcher
const languageBtn = document.getElementById('language-btn');
if (languageBtn) {
    languageBtn.addEventListener('click', function() {
        // Simple direct navigation to English version
        window.location.href = 'en/';
    });
} 