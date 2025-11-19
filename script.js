// Função para rolar suavemente para uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Animação de entrada dos elementos quando aparecem na tela
function animateOnScroll() {
    const elements = document.querySelectorAll('.quote-card, .polaroid, .timeline-item, .message-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Função para mostrar a surpresa
function showSurprise() {
    const modal = document.getElementById('surprise-modal');
    modal.style.display = 'block';
    
    // Adiciona efeito de digitação na surpresa
    const surpriseText = document.querySelector('.surprise-reveal');
    const originalText = surpriseText.textContent;
    surpriseText.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < originalText.length) {
            surpriseText.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 50);
}

// Função para fechar a surpresa
function closeSurprise() {
    const modal = document.getElementById('surprise-modal');
    modal.style.display = 'none';
}

// Sistema de Amor
let loveLevel = 0;
const maxLove = 10;

function addLove() {
    if (loveLevel < maxLove) {
        loveLevel++;
        updateLoveBar();
        
        if (loveLevel === maxLove) {
            showLoveComplete();
        }
    }
}

function updateLoveBar() {
    const loveBar = document.getElementById('love-bar');
    const percentage = (loveLevel / maxLove) * 100;
    loveBar.style.width = percentage + '%';
}

function showLoveComplete() {
    // Cria confete
    createConfetti();
    
    // Mostra modal após um pequeno delay
    setTimeout(() => {
        const modal = document.getElementById('love-modal');
        modal.style.display = 'block';
    }, 1000);
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        container.appendChild(confetti);
        
        // Remove confete após animação
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function closeLoveModal() {
    const modal = document.getElementById('love-modal');
    modal.style.display = 'none';
    
    // Reset do sistema
    loveLevel = 0;
    updateLoveBar();
}

// Efeito de parallax suave
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Adiciona mais corações flutuantes dinamicamente
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        heartsContainer.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 3000);
}

// Efeito de brilho no cursor (opcional)
function createSparkleEffect() {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) { // 10% de chance de criar brilho
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#ffd700';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    });
}

// Adiciona animação de brilho
const sparkleCSS = `
@keyframes sparkle {
    0% {
        opacity: 1;
        transform: scale(0);
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}
`;

// Adiciona o CSS da animação de brilho
function addSparkleCSS() {
    const style = document.createElement('style');
    style.textContent = sparkleCSS;
    document.head.appendChild(style);
}

// Fechar modal clicando fora dele
window.onclick = function(event) {
    const modal = document.getElementById('surprise-modal');
    if (event.target === modal) {
        closeSurprise();
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicia todas as animações e efeitos
    animateOnScroll();
    parallaxEffect();
    createFloatingHearts();
    createSparkleEffect();
    addSparkleCSS();
    
    // Inicializa sistema de amor
    updateLoveBar();
    
    // Adiciona um pequeno delay para a animação inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Adiciona efeito suave de entrada na página
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// Função para adicionar efeito de hover nas polaroids
document.addEventListener('DOMContentLoaded', function() {
    const polaroids = document.querySelectorAll('.polaroid');
    
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        polaroid.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});

// Efeito de digitação para frases românticas
function typeWriterEffect() {
    const quotes = document.querySelectorAll('.quote-card p');
    
    quotes.forEach((quote, index) => {
        const text = quote.textContent;
        quote.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    quote.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 30);
        }, index * 500);
    });
}

// Adiciona efeito de pulsação nos corações
function pulseHearts() {
    const hearts = document.querySelectorAll('.floating-hearts .heart');
    
    hearts.forEach(heart => {
        heart.addEventListener('animationiteration', () => {
            if (Math.random() > 0.8) {
                heart.style.animation = 'float 6s ease-in-out infinite, pulse 0.5s ease-in-out';
                setTimeout(() => {
                    heart.style.animation = 'float 6s ease-in-out infinite';
                }, 500);
            }
        });
    });
}