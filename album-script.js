// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255,255,255,0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = 'none';
    }
});

// Photo gallery lightbox effect
document.querySelectorAll('.photo-item, .christmas-photo').forEach(photo => {
    photo.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            createLightbox(img.src, img.alt);
        }
    });
});

// Create lightbox
function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    }
    
    // Animate lightbox
    setTimeout(() => {
        lightbox.style.opacity = '1';
        lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)';
    }, 10);
}

// Add lightbox styles
const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .lightbox img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: -40px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: rgba(255,255,255,0.3);
    }
    
    @media (max-width: 768px) {
        .lightbox-close {
            top: 10px;
            right: 10px;
        }
    }
`;

// Inject lightbox styles
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.cssText = `
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 4s ease-out forwards;
        left: ${Math.random() * 100}vw;
        bottom: -50px;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Add floating hearts keyframes
const heartStyles = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;

const heartStyleSheet = document.createElement('style');
heartStyleSheet.textContent = heartStyles;
document.head.appendChild(heartStyleSheet);

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add love counter
let loveCount = 0;
const loveCounter = document.createElement('div');
loveCounter.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff6b6b;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    font-weight: 600;
    z-index: 1000;
    cursor: pointer;
    transition: transform 0.3s ease;
`;
loveCounter.innerHTML = `💕 ${loveCount} Loves`;
document.body.appendChild(loveCounter);

loveCounter.addEventListener('click', function() {
    loveCount++;
    this.innerHTML = `💕 ${loveCount} Loves`;
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    createFloatingHeart();
});

// Typewriter effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter when page loads
window.addEventListener('load', function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all photo items
document.querySelectorAll('.photo-item, .timeline-item, .christmas-photo').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});