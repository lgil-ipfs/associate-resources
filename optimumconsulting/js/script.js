document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Scroll event for Navbar (Glassmorphism effect trigger)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Trigger initial check
    if (window.scrollY > 50) navbar.classList.add('scrolled');

    // 3. Scroll Reveal Animations
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    // Initial hero fade animation trigger
    setTimeout(() => {
        fadeUpElements.forEach(el => el.classList.add('active'));
    }, 100);

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger earlier/later
        
        reveals.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check for elements in viewport
    revealOnScroll();

    // Attach scroll listener
    window.addEventListener('scroll', revealOnScroll);
});
