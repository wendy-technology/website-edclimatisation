// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add scroll transition
    header.style.transition = 'transform 0.3s ease-in-out';
});

// Form validation and submission
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Ce champ est requis';
                errorElement.style.display = 'block';
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Veuillez entrer une adresse email valide';
                    errorElement.style.display = 'block';
                }
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Veuillez entrer un numéro de téléphone valide';
                    errorElement.style.display = 'block';
                }
            }
        }
    });
    
    return isValid;
}

// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Envoi en cours...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showNotification('Votre demande a été envoyée avec succès !', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Handle close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Cookie consent banner
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookieConsent')) {
        showCookieBanner();
    }
});

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.</p>
            <div class="cookie-buttons">
                <button class="btn btn-primary" onclick="acceptCookies()">Accepter</button>
                <a href="/mentions-legales/" class="btn btn-secondary">En savoir plus</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    setTimeout(() => {
        banner.classList.add('show');
    }, 1000);
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.remove();
        }, 300);
    }
}

// Analytics (Google Analytics placeholder)
function initAnalytics() {
    if (localStorage.getItem('cookieConsent') === 'true') {
        // Initialize Google Analytics here
        console.log('Analytics initialized');
    }
}

// Call analytics initialization if consent is already given
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('cookieConsent') === 'true') {
        initAnalytics();
    }
});

// Contact form specific enhancements
document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('.contact-form, .devis-form');
    
    contactForms.forEach(form => {
        // Add postal code validation for service area
        const postalCodeField = form.querySelector('input[name="postal_code"]');
        if (postalCodeField) {
            postalCodeField.addEventListener('blur', function() {
                validateServiceArea(this.value);
            });
        }
        
        // Add service type dependent fields
        const serviceSelect = form.querySelector('select[name="service_type"]');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function() {
                updateFormFields(this.value);
            });
        }
    });
});

function validateServiceArea(postalCode) {
    const serviceAreas = ['75', '77', '78', '91', '92', '93', '94', '95'];
    const departmentCode = postalCode.substring(0, 2);
    
    if (!serviceAreas.includes(departmentCode)) {
        showNotification('Nous intervenons uniquement en Île-de-France. Contactez-nous pour plus d\'informations.', 'warning');
    }
}

function updateFormFields(serviceType) {
    // Dynamically show/hide fields based on service type
    const additionalFields = document.querySelector('.additional-fields');
    if (additionalFields) {
        if (serviceType === 'installation') {
            additionalFields.innerHTML = `
                <div class="form-group">
                    <label for="surface">Surface à climatiser (m²)</label>
                    <input type="number" id="surface" name="surface" min="1" max="1000">
                </div>
                <div class="form-group">
                    <label for="rooms">Nombre de pièces</label>
                    <select id="rooms" name="rooms">
                        <option value="">Sélectionnez</option>
                        <option value="1">1 pièce</option>
                        <option value="2-3">2-3 pièces</option>
                        <option value="4-5">4-5 pièces</option>
                        <option value="6+">6+ pièces</option>
                    </select>
                </div>
            `;
        } else if (serviceType === 'maintenance') {
            additionalFields.innerHTML = `
                <div class="form-group">
                    <label for="equipment_age">Âge de l'équipement</label>
                    <select id="equipment_age" name="equipment_age">
                        <option value="">Sélectionnez</option>
                        <option value="less-1">Moins d'1 an</option>
                        <option value="1-3">1 à 3 ans</option>
                        <option value="3-5">3 à 5 ans</option>
                        <option value="5+">Plus de 5 ans</option>
                    </select>
                </div>
            `;
        }
    }
}