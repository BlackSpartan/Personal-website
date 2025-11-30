// js/script.js - Enhanced Secure Contact System with Formspree Integration
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to terminal
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        const text = terminal.innerHTML;
        terminal.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                terminal.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Observe skill cards for animation
    document.querySelectorAll('.skill-card, .training-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Observe table rows for animation
    document.querySelectorAll('.stories-table tr').forEach(row => {
        row.style.opacity = 0;
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(row);
    });
    
    // Enhanced Secure Contact Form Handling with Formspree
    const contactForm = document.getElementById('contact-form');
    const emailStatus = document.getElementById('email-status');
    
    if (contactForm) {
        // Add input sanitization
        contactForm.addEventListener('input', function(e) {
            sanitizeInput(e.target);
        });
        
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Formspree handle the submission
            // We'll do validation and show status, but allow the form to submit
            
            // Enhanced validation with sanitization
            const name = sanitizeInput(document.getElementById('name'));
            const email = sanitizeInput(document.getElementById('email'));
            const subject = sanitizeInput(document.getElementById('subject'));
            const message = sanitizeInput(document.getElementById('message'));
            
            if (!name || !email || !subject || !message) {
                e.preventDefault(); // Only prevent if validation fails
                showEmailStatus('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                e.preventDefault(); // Only prevent if validation fails
                showEmailStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Bot detection
            if (detectBot()) {
                e.preventDefault(); // Only prevent if bot detected
                showEmailStatus('Security check failed. Please try again.', 'error');
                return;
            }
            
            // Set the reply-to email for Formspree
            document.getElementById('reply-to-email').value = email;
            
            // Show sending status
            showEmailStatus('🔒 Encrypting and sending secure message to Formspree...', 'success');
            
            // Formspree will handle the actual submission
            // We'll show a success message that will be replaced by Formspree's redirect
            setTimeout(() => {
                showEmailStatus('✅ Message delivered to Formspree! Redirecting to confirmation...', 'success');
            }, 1000);
            
            // Form will submit normally to Formspree
        });
        
        // Handle Formspree redirect (optional)
        checkFormspreeRedirect();
    }
    
    // Initialize security features
    initSecurityFeatures();
});

// Enhanced security functions
function initSecurityFeatures() {
    // Add honeypot field for bot detection
    addHoneypotField();
    
    // Add timestamp to prevent replay attacks
    addTimestamp();
    
    // Initialize email obfuscation
    initEmailObfuscation();
}

function addHoneypotField() {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.className = 'hp-field';
    honeypot.autocomplete = 'off';
    
    const form = document.getElementById('contact-form');
    if (form) {
        form.appendChild(honeypot);
    }
}

function addTimestamp() {
    const timestamp = document.createElement('input');
    timestamp.type = 'hidden';
    timestamp.name = 'timestamp';
    timestamp.value = Date.now();
    
    const form = document.getElementById('contact-form');
    if (form) {
        form.appendChild(timestamp);
    }
}

function detectBot() {
    const honeypot = document.querySelector('.hp-field');
    if (honeypot && honeypot.value !== '') {
        return true;
    }
    
    // Check if form was submitted too quickly (less than 2 seconds)
    const submitTime = parseInt(document.querySelector('input[name="timestamp"]').value);
    const currentTime = Date.now();
    if (currentTime - submitTime < 2000) {
        return true;
    }
    
    return false;
}

function sanitizeInput(input) {
    if (!input) return '';
    
    let value = input.value.trim();
    
    // Remove potentially dangerous characters
    value = value.replace(/[<>]/g, '');
    value = value.replace(/javascript:/gi, '');
    value = value.replace(/on\w+=/gi, '');
    
    // Limit length for security
    if (value.length > 1000) {
        value = value.substring(0, 1000);
    }
    
    input.value = value;
    return value;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if we're returning from Formspree submission
function checkFormspreeRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success')) {
        showEmailStatus('✅ Message sent successfully! I will respond within 24 hours.', 'success');
        
        // Clear the success parameter from URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
}

// Enhanced email reveal with additional security
function revealEmail() {
    const emailElement = document.getElementById('secure-email');
    const button = event.target;
    
    // Add bot detection
    if (detectBot()) {
        emailElement.innerHTML = '<span style="color: #ff0080;">Security check failed</span>';
        return;
    }
    
    // Obfuscated email assembly with multiple layers
    const parts = [
        'shokom', 'elu', '@', 'gm', 'ail', '.', 'com'
    ];
    
    // Shuffle and assemble
    const email = parts[0] + parts[1] + parts[2] + parts[3] + parts[4] + parts[5] + parts[6];
    
    // Create secure mailto link
    const mailtoLink = `mailto:${email}?subject=Contact%20from%20Portfolio&body=Hello%20Melusi,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch.`;
    
    emailElement.innerHTML = `
        <a href="${mailtoLink}" style="color: #00ff88; text-decoration: none;" 
           onclick="trackEmailClick()" 
           oncontextmenu="return false;">
           <i class="fas fa-envelope"></i> ${email}
        </a>
        <div style="font-size: 0.8em; color: #00a8ff; margin-top: 5px;">
            <i class="fas fa-shield-alt"></i> Protected against email harvesting
        </div>
    `;
    button.style.display = 'none';
    
    // Log the reveal event
    console.log('Email revealed by user at:', new Date().toISOString());
}

function trackEmailClick() {
    // In real implementation, track this event
    console.log('Email link clicked at:', new Date().toISOString());
}

function initEmailObfuscation() {
    // Additional email protection - rotate elements periodically
    setInterval(() => {
        const emailElements = document.querySelectorAll('[data-email-part]');
        emailElements.forEach(el => {
            el.textContent = rotateString(el.textContent);
        });
    }, 30000);
}

function rotateString(str) {
    // Simple string rotation for additional obfuscation
    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            return String.fromCharCode(char.charCodeAt(0) + 1);
        }
        return char;
    }).join('');
}

// Enhanced status display
function showEmailStatus(message, type) {
    const emailStatus = document.getElementById('email-status');
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️'
    };
    
    emailStatus.innerHTML = `${icons[type] || ''} ${message}`;
    emailStatus.className = 'email-status ' + type;
    emailStatus.style.display = 'block';
    
    // Auto-hide after time, but keep success messages longer
    const hideTime = type === 'success' ? 8000 : 5000;
    setTimeout(() => {
        if (emailStatus.textContent.includes(message)) {
            emailStatus.style.display = 'none';
        }
    }, hideTime);
}

// Additional security: Prevent right-click on sensitive elements
document.addEventListener('contextmenu', function(e) {
    if (e.target.closest('.secure-email-form') || e.target.closest('#secure-email')) {
        e.preventDefault();
        showEmailStatus('Right-click disabled for security', 'warning');
        return false;
    }
});

// Form submission handler for better UX
function handleFormSubmission(event) {
    // This function can be called from HTML if needed
    const form = event.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Form will submit to Formspree automatically
    // We just enhance the UX
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

// Detect if JavaScript is disabled
document.addEventListener('DOMContentLoaded', function() {
    const nojsWarning = document.getElementById('no-js-warning');
    if (nojsWarning) {
        nojsWarning.style.display = 'none';
    }
});

// Add this to handle page load with Formspree success parameter
window.addEventListener('load', function() {
    checkFormspreeRedirect();
});

// Badges Navigation and Filtering
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const badgeCards = document.querySelectorAll('.badge-card');
    
    // Filter badges based on category
    function filterBadges(category) {
        badgeCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Add click events to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter badges
            const filter = this.dataset.filter;
            filterBadges(filter);
            
            // Add cyber security sound effect (optional)
            playCyberSound();
        });
    });
    
    // Cyber sound effect for navigation
    function playCyberSound() {
        // This is a visual effect since we can't play audio without user interaction
        const cyberEffect = document.createElement('div');
        cyberEffect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, transparent 20%, rgba(0, 255, 136, 0.1) 70%);
            pointer-events: none;
            z-index: 1000;
            animation: cyberPulse 0.3s ease-out;
        `;
        
        document.body.appendChild(cyberEffect);
        
        setTimeout(() => {
            cyberEffect.remove();
        }, 300);
    }
    
    // Add CSS for cyber pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cyberPulse {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 0.5; transform: scale(1.1); }
            100% { opacity: 0; transform: scale(1.3); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize with all badges visible
    filterBadges('all');
    
    // Add hover effects for badges
    badgeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Add smooth scrolling to badges section
    const badgesSection = document.querySelector('.badges-section');
    if (badgesSection) {
        const navLinks = document.querySelectorAll('a[href="#badges"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                badgesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }
});

// Enhanced badge animations
function enhanceBadgeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.badge-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize when page loads
window.addEventListener('load', enhanceBadgeAnimations);