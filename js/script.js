// js/script.js
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
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const emailStatus = document.getElementById('email-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showEmailStatus('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate sending the message
            showEmailStatus('Encrypting(This is a simulation) and sending your message...', 'success');
            
            // Not a real server
            setTimeout(() => {
                showEmailStatus('Message sent securely! I will respond within 24 hours.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
});

// Function to reveal email address (anti-spam measure)
function revealEmail() {
    const emailElement = document.getElementById('secure-email');
    const button = event.target;
    
    // Obfuscated email assembly to prevent harvesting
    const user = 'shokomelu';
    const domain = 'gmail.com';
    const email = user + '@' + domain;
    
    emailElement.innerHTML = `<a href="mailto:${email}" style="color: #00ff88;">${email}</a>`;
    button.style.display = 'none';
}

// Function to show email status
function showEmailStatus(message, type) {
    const emailStatus = document.getElementById('email-status');
    emailStatus.textContent = message;
    emailStatus.className = 'email-status ' + type;
    
    // Hide status after 5 seconds
    setTimeout(() => {
        emailStatus.style.display = 'none';
    }, 5000);
}