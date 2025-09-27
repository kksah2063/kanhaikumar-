document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const alertBox = document.getElementById("formAlert");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!confirm("Are you sure you want to send this message?")) return;

      const formData = {
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        const response = await fetch("/submit-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.text();

        alertBox.classList.remove("d-none", "alert-success", "alert-danger");

        if (response.ok) {
          alertBox.textContent = result;
          alertBox.classList.add("alert-success");
          form.reset(); 
        } else {
          alertBox.textContent = result;
          alertBox.classList.add("alert-danger");
        }

        setTimeout(() => {
          alertBox.classList.add("d-none");
        }, 3000);
      } catch (err) {
        alertBox.textContent = "❌ Something went wrong. Please try again.";
        alertBox.classList.remove("d-none", "alert-success");
        alertBox.classList.add("alert-danger");

        setTimeout(() => {
          alertBox.classList.add("d-none");
        }, 5000);
      }
    });
  });

  // Show or hide the scroll-to-top button based on scroll position
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Scroll smoothly to top when the button is clicked
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// Smooth scroll to section when nav link is clicked
document.querySelectorAll("a.nav-link,a.quick-link,a[href^='#']").forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1); 
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault(); 
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});