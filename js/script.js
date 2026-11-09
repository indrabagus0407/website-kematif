const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();
    // Ganti alamat email di bawah dengan email resmi KEMATIF.
    const tujuanEmail = "email-resmi-kematif@example.com";
    const subject = encodeURIComponent("Pesan dari website KEMATIF - " + nama);
    const body = encodeURIComponent("Nama: " + nama + "\nEmail: " + email + "\n\nPesan:\n" + pesan);
    window.location.href = `mailto:${tujuanEmail}?subject=${subject}&body=${body}`;
  });
}
