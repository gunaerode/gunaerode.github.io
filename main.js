document.addEventListener("DOMContentLoaded", () => {
  initScrollEffects();
  initNavbar();
  initCounters();
  initSkillBars();
  initFormHandler();
  initMobileMenu();
  initMobileToggle();
});

function initMobileToggle() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 968) {
      navLinks.classList.remove("open");
    }
  });
}

function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
}

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  const countUp = (counter) => {
    const target = +counter.getAttribute("data-count");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => countUp(counter), 1);
    } else {
      counter.innerText = target + "+";
    }
  };

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        countUp(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        const progress = entry.target.getAttribute("data-progress");
        entry.target.style.width = progress + "%";
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

function initFormHandler() {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = "Message Sent!";
        btn.style.background = "linear-gradient(135deg, #10b981, #059669)";

        setTimeout(() => {
          form.reset();
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = "";
        }, 2000);
      }, 1500);
    });
  }
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      mobileMenuBtn.classList.toggle("active");
    });
  }
}

const floatingCards = document.querySelectorAll(".floating-card");
floatingCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    card.style.animationPlayState = "paused";
  });

  card.addEventListener("mouseleave", () => {
    card.style.animationPlayState = "running";
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});
