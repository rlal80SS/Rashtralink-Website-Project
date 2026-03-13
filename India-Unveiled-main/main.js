// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Intersection Observer for Section Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
});

// Content Loading Function
async function loadContent(sectionId) {
    try {
        const response = await fetch(`/data/${sectionId}.json`);
        const data = await response.json();
        updateSectionContent(sectionId, data);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Update Section Content
function updateSectionContent(sectionId, data) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const contentCards = section.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (data[title]) {
            const contentText = card.querySelector('.content-text');
            contentText.innerHTML = formatContent(data[title]);
        }
    });
}

// Format Content
function formatContent(content) {
    if (typeof content === 'string') {
        return `<p>${content}</p>`;
    } else if (Array.isArray(content)) {
        return content.map(item => `<p>${item}</p>`).join('');
    } else if (typeof content === 'object') {
        return Object.entries(content)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');
    }
    return '';
}

// Initialize Content
document.addEventListener('DOMContentLoaded', () => {
    // Load content for each section
    sections.forEach(section => {
        const sectionId = section.id;
        loadContent(sectionId);
    });

    // Add hover effects to content cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        background: var(--card-background);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.info {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification.success {
        border-left: 4px solid var(--secondary-color);
    }
    
    .notification.error {
        border-left: 4px solid #FF3B30;
    }
`;
 