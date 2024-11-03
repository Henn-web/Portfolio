let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });


let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);


menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});


let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};


ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .project-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });



//contact section, send mail
document.addEventListener('DOMContentLoaded', () => {
    // Ambil nilai sebelumnya dari localStorage dan isi ke dalam input
    const storedEmail = localStorage.getItem('userEmail');
    const storedMobileNumber = localStorage.getItem('userMobileNumber');

    if (storedEmail) {
        document.querySelector('input[placeholder="Email Address"]').value = storedEmail;
    }

    if (storedMobileNumber) {
        document.querySelector('input[placeholder="Mobile Number"]').value = storedMobileNumber;
    }
});

document.querySelector('#contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil data dari form
    const fullName = document.querySelector('input[placeholder="Full Name"]').value;
    const email = document.querySelector('input[placeholder="Email Address"]').value;
    const mobileNumber = document.querySelector('input[placeholder="Mobile Number"]').value;
    const message = document.querySelector('textarea').value;

    // Simpan email dan nomor telepon ke localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userMobileNumber', mobileNumber);

    // Kirim data menggunakan AJAX
    fetch('sendEmail.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            fullName: fullName,
            email: email,
            mobileNumber: mobileNumber,
            message: message,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const successMessage = document.getElementById('successMessage');
            if (data.success) {
                // Tampilkan pesan berhasil
                successMessage.style.display = 'block';
                successMessage.classList.add('success-message');
                document.getElementById('contactForm').reset(); // Reset form after submission
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Pesan gagal dikirim.',
                    confirmButtonColor: '#00e7f9',
                });
            }
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Terjadi kesalahan dalam pengiriman.',
                confirmButtonColor: '#00e7f9',
            });
        });
});


