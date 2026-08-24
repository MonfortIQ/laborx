// assets/js/navigation.js

document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.getElementById('main-header');
    if (header && !header.classList.contains('lx-header')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md', 'bg-surface/90', 'backdrop-blur-md');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('shadow-md', 'bg-surface/90', 'backdrop-blur-md');
                header.classList.add('bg-transparent');
            }
        });
    }

    // Mobile Menu Toggle with Animated Hamburger
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        const lines = mobileMenuBtn.querySelectorAll('span');
        let isOpen = false;
        
        mobileMenuBtn.addEventListener('click', () => {
            isOpen = !isOpen;
            
            if (isOpen) {
                // Open Menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', 'translate-x-full');
                    mobileMenu.classList.add('opacity-100', 'translate-x-0');
                }, 10);
                document.body.classList.add('overflow-hidden');
                
                // Animate to X (if lines exist)
                if(lines.length === 3) {
                    lines[0].classList.remove('-translate-y-1.5');
                    lines[0].classList.add('rotate-45');
                    lines[1].classList.add('opacity-0');
                    lines[2].classList.remove('translate-y-1.5');
                    lines[2].classList.add('-rotate-45');
                }
            } else {
                // Close Menu
                mobileMenu.classList.remove('opacity-100', 'translate-x-0');
                mobileMenu.classList.add('opacity-0', 'translate-x-full');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    document.body.classList.remove('overflow-hidden');
                }, 300);
                
                // Animate to Hamburger (if lines exist)
                if(lines.length === 3) {
                    lines[0].classList.remove('rotate-45');
                    lines[0].classList.add('-translate-y-1.5');
                    lines[1].classList.remove('opacity-0');
                    lines[2].classList.remove('-rotate-45');
                    lines[2].classList.add('translate-y-1.5');
                }
            }
        });
    }

    // Dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const targetMenu = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    if (otherToggle.nextElementSibling) {
                        otherToggle.nextElementSibling.classList.add('hidden');
                    }
                }
            });

            // Toggle current
            if (isExpanded) {
                toggle.setAttribute('aria-expanded', 'false');
                targetMenu.classList.add('hidden');
            } else {
                toggle.setAttribute('aria-expanded', 'true');
                targetMenu.classList.remove('hidden');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            dropdownToggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                if (toggle.nextElementSibling) {
                    toggle.nextElementSibling.classList.add('hidden');
                }
            });
        }
    });
});
