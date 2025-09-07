// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleBackToTopButton);

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Background on Scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
        navbar.style.borderBottom = '1px solid #404040';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
        navbar.style.borderBottom = '1px solid #262626';
    }
}

window.addEventListener('scroll', updateNavbarBackground);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.overview-card, .detail-card, .usecase-card, .step, .tech-category, .api-section'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary) !important;
        background-color: var(--bg-tertiary) !important;
    }
`;
document.head.appendChild(style);

// Copy Code Functionality
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block pre, .code-content pre');
    
    codeBlocks.forEach(block => {
        const wrapper = block.parentElement;
        wrapper.style.position = 'relative';
        
        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.className = 'copy-button';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary);
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        `;
        
        wrapper.appendChild(button);
        
        wrapper.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        wrapper.addEventListener('mouseleave', () => {
            button.style.opacity = '0';
        });
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Copied!';
                button.style.background = 'var(--success)';
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.background = 'var(--primary)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                button.textContent = 'Failed';
                button.style.background = 'var(--error)';
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.background = 'var(--primary)';
                }, 2000);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', addCopyButtons);

// Search Functionality
function addSearchFeature() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search documentation...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 300px;
        padding: 10px 16px;
        border: 1px solid var(--border-primary);
        border-radius: 8px;
        background: var(--bg-card);
        color: var(--text-primary);
        font-size: 14px;
        outline: none;
    `;
    
    searchContainer.appendChild(searchInput);
    document.body.appendChild(searchContainer);
    
    // Toggle search with Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            
            if (searchContainer.style.opacity === '0') {
                searchContainer.style.opacity = '1';
                searchContainer.style.visibility = 'visible';
                searchInput.focus();
            } else {
                searchContainer.style.opacity = '0';
                searchContainer.style.visibility = 'hidden';
                searchInput.blur();
            }
        }
        
        if (e.key === 'Escape') {
            searchContainer.style.opacity = '0';
            searchContainer.style.visibility = 'hidden';
            searchInput.blur();
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('section[id]');
        
        if (query.length < 2) return;
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const heading = section.querySelector('h2, h3');
            
            if (text.includes(query) && heading) {
                // Highlight the section briefly
                section.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                setTimeout(() => {
                    section.style.boxShadow = '';
                }, 2000);
                
                // Scroll to section
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = section.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close search
                searchContainer.style.opacity = '0';
                searchContainer.style.visibility = 'hidden';
                searchInput.value = '';
                searchInput.blur();
            }
        });
    });
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.style.opacity = '0';
            searchContainer.style.visibility = 'hidden';
            searchInput.blur();
        }
    });
}

document.addEventListener('DOMContentLoaded', addSearchFeature);

// Theme Switcher (Optional Enhancement)
function addThemeSwitcher() {
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '🌙';
    themeButton.className = 'theme-switcher';
    themeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 80px;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1001;
        border: 1px solid var(--border-primary);
    `;
    
    document.body.appendChild(themeButton);
    
    // Theme switching functionality (can be extended for light mode)
    themeButton.addEventListener('click', () => {
        // Currently only dark theme is implemented
        // This can be extended to toggle between light and dark themes
        themeButton.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeButton.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    themeButton.addEventListener('mouseenter', () => {
        themeButton.style.background = 'var(--primary)';
    });
    
    themeButton.addEventListener('mouseleave', () => {
        themeButton.style.background = 'var(--bg-tertiary)';
    });
}

document.addEventListener('DOMContentLoaded', addThemeSwitcher);

// Performance Monitor
function addPerformanceMonitor() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is high:', loadTime + 'ms');
            }
            
            // Monitor largest contentful paint
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    
                    if (lastEntry.renderTime > 2500) {
                        console.warn('Largest Contentful Paint is slow:', lastEntry.renderTime);
                    }
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', addPerformanceMonitor);

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    
    // Optional: Send error to analytics or logging service
    // analytics.track('js_error', { message: e.message, filename: e.filename });
});

// Service Worker Registration (if needed for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// Accessibility Improvements
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add aria-current to active nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.removeAttribute('aria-current'));
            link.setAttribute('aria-current', 'page');
        });
    });
    
    // Add aria-labels to buttons
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.setAttribute('aria-label', 'Go back to top of page');
    }
}

document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Documentation site loaded successfully!');
    console.log('💡 Tip: Press Ctrl+K (or Cmd+K) to search the documentation');
    
    // Add main content ID for accessibility
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
});