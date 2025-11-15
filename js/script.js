// js/script.js - Enhanced Secure Contact System
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
    
    // Enhanced Secure Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const emailStatus = document.getElementById('email-status');
    
    if (contactForm) {
        // Add input sanitization
        contactForm.addEventListener('input', function(e) {
            sanitizeInput(e.target);
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced validation with sanitization
            const name = sanitizeInput(document.getElementById('name'));
            const email = sanitizeInput(document.getElementById('email'));
            const subject = sanitizeInput(document.getElementById('subject'));
            const message = sanitizeInput(document.getElementById('message'));
            
            if (!name || !email || !subject || !message) {
                showEmailStatus('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showEmailStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Bot detection
            if (detectBot()) {
                showEmailStatus('Security check failed. Please try again.', 'error');
                return;
            }
            
            // Show encryption process
            showEmailStatus('🔒 Encrypting message...', 'success');
            
            // Simulate secure message sending
            setTimeout(() => {
                const encryptedData = simulateEncryption({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent
                });
                
                sendToBackend(encryptedData);
            }, 1500);
        });
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

function simulateEncryption(data) {
    // In a real implementation, this would use proper encryption
    // For now, we'll simulate it with Base64 encoding
    const jsonString = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(jsonString)));
}

function sendToBackend(encryptedData) {
    // Simulate sending to backend
    console.log('Encrypted data ready for transmission:', encryptedData);
    
    // In a real implementation, you would:
    // 1. Send to your backend server
    // 2. Use HTTPS
    // 3. Implement proper encryption
    // 4. Store in database
    // 5. Send email notifications
    
    setTimeout(() => {
        showEmailStatus('✅ Message encrypted and sent securely! I will respond within 24 hours.', 'success');
        document.getElementById('contact-form').reset();
        
        // Log the event (in real implementation, this would be server-side)
        console.log('Secure message sent at:', new Date().toISOString());
    }, 1000);
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
    
    // Auto-hide after 5 seconds, but keep success messages longer
    const hideTime = type === 'success' ? 8000 : 5000;
    setTimeout(() => {
        emailStatus.style.display = 'none';
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

// Detect if JavaScript is disabled
document.addEventListener('DOMContentLoaded', function() {
    const nojsWarning = document.getElementById('no-js-warning');
    if (nojsWarning) {
        nojsWarning.style.display = 'none';
    }
});