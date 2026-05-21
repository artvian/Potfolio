// 1. Inisialisasi Animasi AOS (Animate on Scroll)
AOS.init({
    duration: 1000,     // Durasi animasi (1 detik)
    once: false,        // Set false agar animasi berulang kembali saat scroll up/down
    mirror: true,       // Animasi terpicu kembali saat elemen dilewati saat scroll up
    offset: 120         // Jarak piksel elemen sebelum animasi dimulai
});

// 2. Logika Deteksi Arah Scroll untuk Header (Dioptimalkan Tanpa Delay)
const header = document.getElementById('mainHeader');
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const currentScrollY = window.scrollY;

    // Efek Transparansi Header di Paling Atas Halaman
    if (currentScrollY === 0) {
        header.classList.add('at-top');
    } else {
        header.classList.remove('at-top');
    }

    // Efek Show/Hide Berdasarkan Arah Scroll Up/Down
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll Ke Bawah -> Sembunyikan Header
        header.classList.add('scroll-down');
    } else {
        // Scroll Ke Atas -> Tampilkan Header Kembali
        header.classList.remove('scroll-down');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

// Event listener dioptimalkan menggunakan requestAnimationFrame dan passive event untuk performa maksimal di HP & Laptop
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, { passive: true });