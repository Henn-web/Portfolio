// Menu icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky header
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove menu icon navbar when clicking navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Swiper
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

// Dark mode
let darkModeIcon = document.querySelector('#darkMode-icon');

// Cek apakah pengguna sudah mengaktifkan dark mode sebelumnya
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.add('bx-sun'); // Sesuaikan ikon
}

darkModeIcon.onclick = () => {
    document.body.classList.toggle('dark-mode');
    darkModeIcon.classList.toggle('bx-sun');

    // Simpan status dark mode di localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
};


// Scroll reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .project-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

// Inisialisasi EmailJS
emailjs.init("eeaXaToePavyKbUwY"); // Gunakan Public Key

// Tangani pengiriman form
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah halaman refresh

    // Ambil data dari input form
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const mobileNumber = document.getElementById('mobileNumber');
    const message = document.getElementById('message');

    // Hapus border merah sebelumnya
    [fullName, email, mobileNumber, message].forEach(input => {
        input.style.border = "";
    });

    // Validasi input agar tidak ada yang kosong
    if (!fullName.value.trim() || !email.value.trim() || !mobileNumber.value.trim() || !message.value.trim()) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning!',
            text: 'All fields must be filled in!',
            confirmButtonColor: '#00e7f9',
            timer: 1500, // Tampilkan selama 1.5 detik
            showConfirmButton: false
        });

        // Tambahkan border merah di kolom yang kosong
        [fullName, email, mobileNumber, message].forEach(input => {
            if (!input.value.trim()) {
                input.style.border = "2px solid red";
            }
        });

        return;
    }

    // Tampilkan loading saat mengirim pesan
    Swal.fire({
        title: 'Sending your message...',
        text: 'Please wait a moment...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Kirim email melalui EmailJS
    emailjs.send("service_zonl8kd", "template_st8qap5", {
        to_name: "Admin",
        from_name: fullName.value,
        email: email.value,
        mobileNumber: mobileNumber.value,
        message: message.value
    }).then(() => {
        // Jika berhasil, tampilkan notifikasi sukses
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you! Your message has been successfully sent.',
            confirmButtonColor: '#00e7f9',
        });

        // Reset form setelah sukses
        document.getElementById('contactForm').reset();
    }).catch((error) => {
        // Jika gagal, tampilkan notifikasi error
        Swal.fire({
            icon: 'error',
            title: 'Failed to Send!',
            text: 'Your message could not be sent. Please try again later.',
            confirmButtonColor: '#00e7f9',
        });
        console.error("Error:", error);
    });
});

// Reset form saat halaman dimuat ulang
window.addEventListener('load', () => {
    document.getElementById('contactForm').reset();
});



// Typewriter Effect
class TypeWriter {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.querySelector('.wrap').innerText = this.txt;

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

// Initialize Typewriter effect
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.typewrite');
    elements.forEach((el) => {
        const toRotate = el.getAttribute('data-type');
        const period = el.getAttribute('data-period');

        if (toRotate) {
            new TypeWriter(el, JSON.parse(toRotate), period);
        }
    });
});

// Tailwind configuration
module.exports = {
    theme: {
        extend: {
            keyframes: {
                blink: {
                    '0%, 100%': { borderColor: 'transparent' },
                    '50%': { borderColor: '#000' },
                },
            },
            animation: {
                blink: 'blink 0.7s steps(2, start) infinite',
            },
        },
    },
};

// bagian menu about dan service di html yang berbeda

// Ambil elemen body dan tombol theme switcher
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

// Fungsi untuk mengubah tema
function toggleTheme() {
    let currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '🌙'; // Ganti ikon ke mode malam
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '☀️'; // Ganti ikon ke mode siang
    }
}

// Cek localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    } else {
        themeToggle.innerHTML = '🌙';
    }
});

// Event listener untuk mengubah tema saat ikon diklik
themeToggle.addEventListener('click', toggleTheme);

// Warna tampilan
document.addEventListener("DOMContentLoaded", () => {
    const darkModeIcon = document.getElementById("darkMode-icon");
    const body = document.body;

    // Cek apakah ada mode tersimpan di localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    darkModeIcon.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Simpan preferensi pengguna
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});



