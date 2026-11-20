const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Gallery lightbox: click any supplied photo to view it larger.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

// The enquiry is composed in WhatsApp; the visitor reviews and sends it there.
document.getElementById("quoteForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const message = [
    "Hi Renzo, I'd like to request a quote.",
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Service: ${data.get("service")}`,
    `Area: ${data.get("location") || "Not specified"}`,
    `Details: ${data.get("message")}`
  ].join("\n");

  const whatsappUrl = `https://wa.me/27737430631?text=${encodeURIComponent(message)}`;
  document.getElementById("formStatus").textContent = "Your enquiry is ready in WhatsApp. Please press Send there to submit it.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
