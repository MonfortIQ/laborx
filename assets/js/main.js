// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const content = acc.nextElementSibling;
            const icon = acc.querySelector('.accordion-icon');
            
            // Close others (optional based on design, but usually good for FAQs)
            const parent = acc.closest('.accordion-container');
            if (parent) {
                const allContents = parent.querySelectorAll('.accordion-content');
                const allIcons = parent.querySelectorAll('.accordion-icon');
                
                allContents.forEach(c => {
                    if (c !== content) {
                        c.style.maxHeight = null;
                        c.classList.remove('py-4');
                    }
                });
                allIcons.forEach(i => {
                    if (i !== icon) {
                        i.classList.remove('rotate-180');
                    }
                });
            }

            // Toggle current
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('py-4');
                if (icon) icon.classList.remove('rotate-180');
            } else {
                content.classList.add('py-4');
                content.style.maxHeight = content.scrollHeight + 40 + "px"; // added extra space for padding
                if (icon) icon.classList.add('rotate-180');
            }
        });
    });

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Remove active classes
            tabBtns.forEach(b => {
                b.classList.remove('border-primary', 'text-primary');
                b.classList.add('border-transparent', 'text-muted');
                b.setAttribute('aria-selected', 'false');
            });
            
            tabContents.forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('block');
            });

            // Set active
            btn.classList.add('border-primary', 'text-primary');
            btn.classList.remove('border-transparent', 'text-muted');
            btn.setAttribute('aria-selected', 'true');
            
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('block', 'animate-fade-in');
            }
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; // lower is slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
                }
            };
            
            // Intersection Observer to start counting when visible
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            });
            observer.observe(counter);
        });
    }
    
    if (counters.length > 0) {
        animateCounters();
    }
    
    // Scroll Reveal Animation (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
});
