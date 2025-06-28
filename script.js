// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const offcanvas = document.querySelector('.offcanvas');

function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
        offcanvas.classList.add('show');
    }, 10);
}

function closeMobileMenuFunc() {
    offcanvas.classList.remove('show');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
}

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenuFunc);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.classList.remove('text-secondary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-secondary');
        }
    });
});

// Calculator Functions
function calculateSIP() {
    const monthlyAmount = parseFloat(document.getElementById('sip-amount').value);
    const years = parseFloat(document.getElementById('sip-years').value);
    const expectedReturn = parseFloat(document.getElementById('sip-return').value);
    
    if (!monthlyAmount || !years || !expectedReturn) {
        alert('Please fill all fields');
        return;
    }
    
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    
    const futureValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = monthlyAmount * months;
    const totalReturns = futureValue - totalInvestment;
    
    document.getElementById('sip-result').innerHTML = `
        <div class="calculator-result">
            <h3 class="text-xl font-bold mb-4">SIP Calculation Result</h3>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="text-center">
                    <p class="text-gray-300">Total Investment</p>
                    <p class="result-highlight">₹${totalInvestment.toLocaleString('en-IN')}</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-300">Total Returns</p>
                    <p class="result-highlight">₹${totalReturns.toLocaleString('en-IN')}</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-300">Maturity Value</p>
                    <p class="result-highlight">₹${futureValue.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    `;
}

function calculateTermInsurance() {
    const age = parseInt(document.getElementById('term-age').value);
    const income = parseFloat(document.getElementById('term-income').value);
    const dependents = parseInt(document.getElementById('term-dependents').value);
    
    if (!age || !income || !dependents) {
        alert('Please fill all fields');
        return;
    }
    
    // Basic calculation: 10-15 times annual income
    const coverageMultiplier = dependents > 2 ? 15 : 10;
    const recommendedCoverage = income * 12 * coverageMultiplier;
    
    // Estimated premium (rough calculation)
    const premiumRate = age < 30 ? 0.0015 : age < 40 ? 0.002 : 0.003;
    const estimatedPremium = recommendedCoverage * premiumRate;
    
    document.getElementById('term-result').innerHTML = `
        <div class="calculator-result">
            <h3 class="text-xl font-bold mb-4">Term Insurance Recommendation</h3>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="text-center">
                    <p class="text-gray-300">Recommended Coverage</p>
                    <p class="result-highlight">₹${recommendedCoverage.toLocaleString('en-IN')}</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-300">Estimated Annual Premium</p>
                    <p class="result-highlight">₹${estimatedPremium.toLocaleString('en-IN')}</p>
                </div>
            </div>
            <p class="text-center mt-4 text-gray-300">*This is an estimate. Actual premium may vary based on health and other factors.</p>
        </div>
    `;
}

function calculateHealthInsurance() {
    const age = parseInt(document.getElementById('health-age').value);
    const members = parseInt(document.getElementById('health-members').value);
    const coverage = parseFloat(document.getElementById('health-coverage').value);
    
    if (!age || !members || !coverage) {
        alert('Please fill all fields');
        return;
    }
    
    // Basic premium calculation
    let basePremium = coverage * 0.03; // 3% of coverage as base
    
    // Age factor
    if (age > 45) basePremium *= 1.5;
    else if (age > 35) basePremium *= 1.2;
    
    // Family size factor
    if (members > 4) basePremium *= 1.3;
    else if (members > 2) basePremium *= 1.1;
    
    const estimatedPremium = basePremium;
    
    document.getElementById('health-result').innerHTML = `
        <div class="calculator-result">
            <h3 class="text-xl font-bold mb-4">Health Insurance Premium Estimate</h3>
            <div class="text-center">
                <p class="text-gray-300">Estimated Annual Premium</p>
                <p class="result-highlight">₹${estimatedPremium.toLocaleString('en-IN')}</p>
            </div>
            <div class="mt-4 text-center">
                <p class="text-gray-300">Coverage Amount: ₹${coverage.toLocaleString('en-IN')}</p>
                <p class="text-gray-300">Family Members: ${members}</p>
            </div>
            <p class="text-center mt-4 text-gray-300">*This is an estimate. Actual premium depends on health conditions, medical history, and insurer.</p>
        </div>
    `;
}

function calculateGoal() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const timeFrame = parseFloat(document.getElementById('goal-years').value);
    const expectedReturn = parseFloat(document.getElementById('goal-return').value);
    
    if (!goalAmount || !timeFrame || !expectedReturn) {
        alert('Please fill all fields');
        return;
    }
    
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timeFrame * 12;
    
    // Calculate required monthly SIP
    const requiredSIP = goalAmount / (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate);
    
    // Calculate lump sum needed today
    const lumpSumToday = goalAmount / Math.pow(1 + expectedReturn/100, timeFrame);
    
    document.getElementById('goal-result').innerHTML = `
        <div class="calculator-result">
            <h3 class="text-xl font-bold mb-4">Goal Planning Result</h3>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="text-center">
                    <p class="text-gray-300">Required Monthly SIP</p>
                    <p class="result-highlight">₹${requiredSIP.toLocaleString('en-IN')}</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-300">Lump Sum Required Today</p>
                    <p class="result-highlight">₹${lumpSumToday.toLocaleString('en-IN')}</p>
                </div>
            </div>
            <div class="mt-4 text-center">
                <p class="text-gray-300">Goal Amount: ₹${goalAmount.toLocaleString('en-IN')}</p>
                <p class="text-gray-300">Time Frame: ${timeFrame} years</p>
                <p class="text-gray-300">Expected Return: ${expectedReturn}% per annum</p>
            </div>
        </div>
    `;
}

// Form Submission
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success';
        alertDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Thank you for your message! We will get back to you within 24 hours.';
        
        event.target.insertBefore(alertDiv, event.target.firstChild);
        
        // Reset form
        event.target.reset();
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }, 2000);
}

// Newsletter Subscription
function handleNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success';
        alertDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Successfully subscribed to our newsletter!';
        
        event.target.insertBefore(alertDiv, event.target.firstChild);
        event.target.reset();
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }, 1500);
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for contact forms
    const contactForms = document.querySelectorAll('.contact-form form');
    contactForms.forEach(form => {
        form.addEventListener('submit', handleContactForm);
    });
    
    // Add event listeners for newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletter);
    });
    
    // Add event listeners for calculator buttons
    const sipBtn = document.getElementById('calculate-sip');
    if (sipBtn) sipBtn.addEventListener('click', calculateSIP);
    
    const termBtn = document.getElementById('calculate-term');
    if (termBtn) termBtn.addEventListener('click', calculateTermInsurance);
    
    const healthBtn = document.getElementById('calculate-health');
    if (healthBtn) healthBtn.addEventListener('click', calculateHealthInsurance);
    
    const goalBtn = document.getElementById('calculate-goal');
    if (goalBtn) goalBtn.addEventListener('click', calculateGoal);
});

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

// Page Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Cookie Consent (if needed)
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        const consentDiv = document.createElement('div');
        consentDiv.className = 'fixed bottom-0 left-0 right-0 bg-primary text-white p-4 z-50';
        consentDiv.innerHTML = `
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <p class="text-sm mb-4 md:mb-0">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <button onclick="acceptCookies()" class="bg-secondary text-white px-6 py-2 rounded-full hover:bg-secondary/90 transition-colors">
                    Accept
                </button>
            </div>
        `;
        document.body.appendChild(consentDiv);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.querySelector('.fixed.bottom-0').remove();
}

// Initialize cookie consent on page load
setTimeout(showCookieConsent, 2000);