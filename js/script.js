document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 75,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-dark');
        }
    });

    // Color selection functionality
    const colorOptions = document.querySelectorAll('.color-option');
    const phoneImages = document.querySelectorAll('.phone-img');

    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Hapus kelas active dari semua tombol warna
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Ambil warna yang dipilih
            const selectedColor = this.getAttribute('data-color');

            // Sembunyikan semua gambar
            phoneImages.forEach(img => {
                if (img.getAttribute('data-color') === selectedColor) {
                    img.style.display = 'block';
                } else {
                    img.style.display = 'none';
                }
            });

            // Jika ada form, sinkronkan pilihan warna
            const colorSelect = document.getElementById('warna');
            if (colorSelect) {
                colorSelect.value = selectedColor;
            }
        });
    });

    // Form validation
    const preorderForm = document.getElementById('preorderForm');
    
    if (preorderForm) {
        preorderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const namaInput = document.getElementById('nama');
            const emailInput = document.getElementById('email');
            const noHPInput = document.getElementById('noHP');
            const warnaSelect = document.getElementById('warna');
            
            // Reset validation
            resetValidation();
            
            // Validate inputs
            let isValid = true;
            
            // Validate name
            if (!namaInput.value.trim()) {
                setInvalid(namaInput, 'Silakan masukkan nama lengkap Anda.');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                setInvalid(emailInput, 'Silakan masukkan alamat email Anda.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                setInvalid(emailInput, 'Silakan masukkan alamat email yang valid.');
                isValid = false;
            }
            
            // Validate phone number
            if (!noHPInput.value.trim()) {
                setInvalid(noHPInput, 'Silakan masukkan nomor HP Anda.');
                isValid = false;
            }
            
            // Validate color selection
            if (!warnaSelect.value) {
                setInvalid(warnaSelect, 'Silakan pilih warna.');
                isValid = false;
            }
            
            // If form is valid, submit
            if (isValid) {
                // In a real project, you would send this to a server
                // For now, we'll just show a success message
                alert('Terima kasih telah melakukan pre-order!');
                preorderForm.reset();
            }
        });
    }
    
    // Helper functions for form validation
    function setInvalid(element, message) {
        element.classList.add('is-invalid');
        const feedbackElement = element.nextElementSibling;
        if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
            feedbackElement.textContent = message;
        }
    }
    
    function resetValidation() {
        const invalidInputs = document.querySelectorAll('.is-invalid');
        invalidInputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Animation on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .section-title, .phone-display');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = 1;
                
                if (element.classList.contains('feature-card')) {
                    element.style.transform = 'translateY(0)';
                }
            }
        });
    }

    // Initialize elements with opacity 0
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Call once to reveal elements already in viewport
    revealOnScroll();
}
)