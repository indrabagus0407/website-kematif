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

// ===== Form kontak: kirim ke email KEMATIF =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const note = document.getElementById("formNote");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const EMAIL_TUJUAN = "kematif.polije@gmail.com";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm));
    data.nama = data.nama.trim();
    data.email = data.email.trim();
    data.pesan = data.pesan.trim();
    data._subject = "Pesan baru dari website KEMATIF - " + data.nama;
    data._captcha = "false";
    data._template = "table";

    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";
    note.style.color = "";
    note.textContent = "Sedang mengirim pesan...";

    try {
      const res = await fetch("https://formsubmit.co/ajax/" + EMAIL_TUJUAN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (res.ok && (result.success === true || result.success === "true")) {
        note.style.color = "#16a34a";
        note.textContent = "Pesan berhasil dikirim. Terima kasih!";
        contactForm.reset();
      } else {
        throw new Error(result.message || "Gagal mengirim");
      }
    } catch (err) {
      // Cadangan: buka Gmail dengan isi pesan sudah terisi
      note.style.color = "#dc2626";
      note.textContent = "Pengiriman otomatis gagal. Membuka Gmail sebagai cadangan...";

      const subject = encodeURIComponent("Pesan dari " + data.nama + " (website KEMATIF)");
      const body = encodeURIComponent(
        "Nama: " + data.nama + "\nEmail: " + data.email + "\n\nPesan:\n" + data.pesan
      );
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=" + EMAIL_TUJUAN +
        "&su=" + subject + "&body=" + body,
        "_blank"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Kirim melalui Email";
    }
  });
}