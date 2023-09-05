// Update current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Mobile nav working buttons: (.nav-open)
const headerEl = document.querySelector(".header");
const menuBtnEl = document.querySelector(".btn-mobile-nav");

menuBtnEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

// Sticky navigation
const sectionHeroEl = document.querySelector(".hero");

const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) document.body.classList.add("sticky");
    else document.body.classList.remove("sticky");
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px", //same height sticky nav
  }
);
obs.observe(sectionHeroEl);

// SMOOTH SCROOLING ANIMATION
const allLinks = document.querySelectorAll(".main-nav-link");
allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const href = link.getAttribute("href");

    // SCROLL BACK TO TOP
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // SCROLL TO OTHER LINKS
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // CLOSE MENU WHEN LINK CLICKED
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// Popup
const privacyLink = document.querySelector(".privacy");

const popup = document.querySelector(".privacy-popup");
const closeBtn = document.querySelector(".popup__close-btn");

privacyLink.addEventListener("click", () => {
  popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

const headings = document.querySelectorAll(".card-grid__heading");
headings.forEach((heading, index) => {
  const underline = heading.nextElementSibling; // Найти следующий элемент, который является линией

  heading.addEventListener("mouseover", () => {
    const rect = heading.getBoundingClientRect();
    const containerRect = heading
      .closest(".card-grid__column")
      .getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.transform = `translateX(${
      rect.left - containerRect.left
    }px)`;
  });

  heading.addEventListener("mouseout", () => {
    underline.style.width = "0";
    underline.style.transform = "translateX(0)";
  });

  // Добавляем обработчик события фокусировки на кнопку
  heading.addEventListener("focus", () => {
    const rect = heading.getBoundingClientRect();
    const containerRect = heading
      .closest(".card-grid__column")
      .getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.transform = `translateX(${
      rect.left - containerRect.left
    }px)`;
  });

  // Добавляем обработчик события ухода фокуса с кнопки
  heading.addEventListener("blur", () => {
    underline.style.width = "0";
    underline.style.transform = "translateX(0)";
  });

  // Добавляем обработчик события нажатия на клавишу Tab
  heading.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Предотвращаем стандартное поведение клавиши Tab
      headings[(index + 1) % headings.length].focus(); // Перемещаем фокус на следующую кнопку
    }
  });
});

const form = document.getElementById("form");
const submit = document.getElementById("submit");

form.addEventListener("input", function () {
  const allFieldsFilled = Array.from(form.elements)
    .slice(0, -1)
    .every((field) => field.value.trim() !== "");

  // Проверка правильности формата email
  const emailField = document.getElementById("email");
  const emailFormatValid = isValidEmail(emailField.value);

  // Включаем/отключаем кнопку в зависимости от результатов проверок
  submit.disabled = !allFieldsFilled || !emailFormatValid;
  console.log(allFieldsFilled);
  console.log(!allFieldsFilled);
  console.log(emailFormatValid);
});

function isValidEmail(email) {
  // Регулярное выражение для проверки правильности формата email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.querySelectorAll(".input-field");

  function updateStyles(input) {
    const inputContainer = input.closest(".contact__input");
    const icon = inputContainer.querySelector(".contact__icon svg");

    if (input === document.activeElement) {
      inputContainer.classList.add("focused");
    } else {
      inputContainer.classList.remove("focused");
    }
  }

  inputElements.forEach((input) => {
    input.addEventListener("input", function () {
      updateStyles(this);
    });

    input.addEventListener("focus", function () {
      updateStyles(this);
    });

    input.addEventListener("blur", function () {
      updateStyles(this);
    });
  });
});

//scroll для блоков
const boxes = document.querySelectorAll(".box");

const checkBoxes = () => {
  const trigger = (window.innerHeight / 5) * 4;
  for (const box of boxes) {
    const topOfBox = box.getBoundingClientRect().top;
    const bottomOfBox = box.getBoundingClientRect().bottom;
    if (topOfBox < trigger && bottomOfBox > 0) {
      box.classList.add("show");
      box.classList.remove("hide");
    } else {
      box.classList.remove("show");
      box.classList.add("hide");
    }
  }
};

checkBoxes();

window.addEventListener("scroll", checkBoxes);

//убираем фокус с кнопки
document
  .getElementById("downloadLink")
  .addEventListener("click", function (event) {
    // Предотвращаем стандартное поведение ссылки (открытие новой страницы)
    event.preventDefault();

    // Убираем фокус с элемента через небольшую задержку
    setTimeout(
      function () {
        this.blur();

        // Открываем ссылку в новом окне/вкладке
        window.open(this.href, "_blank");
      }.bind(this),
      100
    ); // Задержка в 100 миллисекунд
  });

function loader() {
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.transition = "opacity 1s, left 1s";
  loaderContainer.style.opacity = 0;
  loaderContainer.style.left = "-110%";

  setTimeout(() => {
    loaderContainer.style.display = "none";
  }, 1000); // После завершения анимации исчезновения, скройте элемент
}

function fadeOut() {
  setTimeout(loader, 5500);
}

// Проверяем, является ли устройство мобильным
function isMobileDevice() {
  return window.matchMedia("only screen and (max-width: 768px)").matches;
}

if (isMobileDevice()) {
  window.addEventListener("load", fadeOut);
} else {
  // Если это не мобильное устройство, скрываем загрузчик сразу
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.style.display = "none";
}
