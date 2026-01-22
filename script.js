document.addEventListener('DOMContentLoaded', () => {

    // 1. ELITE PRELOADER
    const progress = document.querySelector('.progress');
    const preloader = document.querySelector('.preloader');
    let width = 0;

    // Simulação de carregamento de assets
    const loadInterval = setInterval(() => {
        width += Math.random() * 30;
        if (width > 100) width = 100;
        progress.style.width = width + '%';

        if (width === 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 500);
        }
    }, 200);

    // 2. CUSTOM LUXURY CURSOR (Desktop)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot segue instantaneamente
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline com delay suave (Physics)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect nos Links
        document.querySelectorAll('a, button, .card-elite').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // 3. SCROLL REVEAL ENGINE (Observer API)
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-anim');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // 4. NAVBAR & MOBILE MENU
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Transforma o Hamburger em X
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    // Fechar menu mobile ao clicar em link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(s => s.style.transform = 'none');
        });
    });

    // 5. MODAL SYSTEM (Reserva & Pagamento)
    const resModal = document.getElementById('reservation-modal');
    const payModal = document.getElementById('payment-modal');
    const openResBtn = document.getElementById('open-reservation');
    const closeBtns = document.querySelectorAll('.close-modal, .close-modal-pay');

    // Open Reservation
    if (openResBtn) {
        openResBtn.addEventListener('click', () => {
            resModal.classList.add('active');
        });
    }

    // Close Logic
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resModal.classList.remove('active');
            payModal.classList.remove('active');
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === resModal) resModal.classList.remove('active');
        if (e.target === payModal) payModal.classList.remove('active');
    });

    // Form Submit Simulation
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Confirmando...';
        btn.style.background = '#fff';
        btn.style.color = '#000';

        setTimeout(() => {
            btn.innerText = 'Mesa Reservada com Sucesso!';
            btn.style.background = '#4CAF50';
            btn.style.color = '#fff';
            setTimeout(() => {
                resModal.classList.remove('active');
                btn.innerText = originalText;
                btn.style.background = 'var(--gold-primary)';
                bookingForm.reset();
            }, 2000);
        }, 1500);
    });
});

// 6. GLOBAL PAYMENT FUNCTION
// Exposta globalmente para funcionar no onclick do HTML
window.openPaymentModal = (item, price) => {
    const modal = document.getElementById('payment-modal');
    document.getElementById('item-name').innerText = item;
    document.getElementById('item-price').innerText = `R$ ${price},00`;
    modal.classList.add('active');
};