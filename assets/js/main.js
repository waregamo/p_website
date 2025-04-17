/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

const navLinks = document.querySelectorAll(".nav__link")
function linkAction() {
  navMenu.classList.remove("show-menu")
}
navLinks.forEach((n) => n.addEventListener("click", linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header")

function toggleSkills() {
  const itemClass = this.parentNode.className
  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close"
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open"
  }
}
skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]")

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target)
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active")
    })
    target.classList.add("qualification__active")
    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active")
    })
    tab.classList.add("qualification__active")
  })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close")

const modal = (modalClick) => {
  modalViews[modalClick].classList.add("active-modal")
}

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i)
  })
})

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal")
    })
  })
})

/*==================== PORTFOLIO & TESTIMONIAL SWIPER ====================*/
let swiperPortfolio
let swiperTestimonial

document.addEventListener("DOMContentLoaded", () => {
  swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      568: { slidesPerView: 1, spaceBetween: 30 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 2, spaceBetween: 40 },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    effect: 'slide',
    grabCursor: true,
    on: {
      init() {
        const activeSlides = document.querySelectorAll('.swiper-slide-active, .swiper-slide-next');
        activeSlides.forEach(slide => {
          slide.querySelector('.portfolio__content')?.classList.add('visible');
        });
      },
      slideChangeTransitionStart() {
        document.querySelectorAll('.portfolio__content').forEach(content => {
          content.classList.remove('visible');
        });
      },
      slideChangeTransitionEnd() {
        const activeSlides = document.querySelectorAll('.swiper-slide-active, .swiper-slide-next');
        activeSlides.forEach(slide => {
          slide.querySelector('.portfolio__content')?.classList.add('visible');
        });
      }
    }
  });

  swiperTestimonial = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      568: { slidesPerView: 2 },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  /*==================== ENHANCED PORTFOLIO INTERACTIONS ====================*/
  document.querySelectorAll(".portfolio__content").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector(".portfolio__img").style.transform = "scale(1.05)"
      this.querySelector(".portfolio__title").style.color = "var(--first-color)"
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)"
    })
    item.addEventListener("mouseleave", function () {
      this.querySelector(".portfolio__img").style.transform = ""
      this.querySelector(".portfolio__title").style.color = ""
      this.style.boxShadow = ""
    })
    item.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.98)"
    })
    item.addEventListener("mouseup", function () {
      this.style.transform = ""
    })
  })

  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("animate__animated")
    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      section.classList.add("visible")
      if (section.id === "portfolio") {
        document.querySelectorAll(".portfolio__content").forEach((item, index) => {
          setTimeout(() => item.classList.add("visible"), 200 * index)
        })
      }
    }
  })
})

/*==================== INTERSECTION OBSERVER ====================*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      if (entry.target.id === "skills") {
        document.querySelectorAll(".skills__percentage").forEach((bar) => {
          bar.style.width = "0"
          setTimeout(() => {
            bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent
          }, 300)
        })
      }

      if (entry.target.id === "portfolio") {
        document.querySelectorAll(".portfolio__content").forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("visible")
          }, 200 * index)
        })
      }
    }
  })
}, observerOptions)

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section)
})

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]")
function scrollActive() {
  const scrollY = window.pageYOffset
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(".nav__menu a[href*=" + sectionId + "]")
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link")
    } else {
      sectionsClass.classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header")
  if (this.scrollY >= 80) nav.classList.add("scroll-header")
  else nav.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up")
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll")
  else scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "uil-sun"
const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light")
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun")

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme)
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem("selected-theme", getCurrentTheme())
  localStorage.setItem("selected-icon", getCurrentIcon())
})

// CONTACT FORM SUBMISSION HANDLER
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageContainer = document.getElementById("form-message");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        messageContainer.textContent = "Thanks for your message! I'll get back to you soon.";
        messageContainer.classList.remove("error");
        messageContainer.classList.add("success");
        messageContainer.style.display = "block";
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          messageContainer.textContent = data.errors.map(error => error.message).join(", ");
        } else {
          messageContainer.textContent = "Oops! Something went wrong.";
        }
        messageContainer.classList.remove("success");
        messageContainer.classList.add("error");
        messageContainer.style.display = "block";
      }
    } catch (error) {
      messageContainer.textContent = "Oops! Something went wrong.";
      messageContainer.classList.remove("success");
      messageContainer.classList.add("error");
      messageContainer.style.display = "block";
    }
  });
});

