document.addEventListener("DOMContentLoaded", function () {
  const memberCountElement = document.getElementById("memberCount");
  const MensagensCountElement = document.getElementById("MessagesCount");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://testerota.vercel.app/api/server-info"
      );
      const data = await response.json();

      const response1 = await fetch(
        "https://raw.githubusercontent.com/JDD-live/Mensagens/main/mensagens.json"
      );
      const data1 = await response1.json();

      memberCountElement.textContent = data.memberCount;
      MensagensCountElement.textContent = data1.count;
    } catch (error) {
      console.error("Error fetching data:", error);
      memberCountElement.textContent = "Erro ao carregar";
      MensagensCountElement.textContent = "Erro ao carregar";
    }
  };

  fetchData();
});

document.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (document.documentElement.scrollTop > 0) {
    header.style.backgroundColor = "rgb(13, 13, 13, 0.9)";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

const header = document.getElementById("header");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeButton = document.getElementById("close-button");
const footer = document.querySelector(".footer");

mobileMenuButton.addEventListener("click", function () {
  if (mobileMenu.style.display === "block") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "block";
  }
});

closeButton.addEventListener("click", function () {
  mobileMenu.style.display = "none";
});

const membersBox = document.querySelector("#members");
const messagesBox = document.querySelector("#Messages");
let currentBox = "members";
let intervalId;

function boxloop() {
  if (window.innerWidth <= 767) {
    if (currentBox === "members") {
      membersBox.classList.add("fade-out");
      setTimeout(() => {
        membersBox.style.display = "none";
        membersBox.classList.remove("fade-out");
        messagesBox.style.display = "flex";
        messagesBox.classList.add("fade-in");
        setTimeout(() => {
          messagesBox.classList.remove("fade-in");
          currentBox = "messages";
        }, 1000);
      }, 1000);
    } else {
      messagesBox.classList.add("fade-out");
      setTimeout(() => {
        messagesBox.style.display = "none";
        messagesBox.classList.remove("fade-out");
        membersBox.style.display = "flex";
        membersBox.classList.add("fade-in");
        setTimeout(() => {
          membersBox.classList.remove("fade-in");
          currentBox = "members";
        }, 1000);
      }, 1000);
    }
  }
}

function loopbox() {
  if (intervalId) clearInterval(intervalId);
  if (window.innerWidth <= 767) {
    intervalId = setInterval(boxloop, 1000);
  }
}
loopbox();
window.addEventListener("resize", loopbox);

function switchSection(activeSectionId) {
  const sections = ["main-section", "bios-section", "partner-section"];
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (sectionId === activeSectionId) {
      section.classList.remove("fade-out");
      section.classList.add("fade-in");
      setTimeout(() => {
        section.style.display = sectionId === "bios-section" ? "flex" : "block";
      }, 500);
    } else {
      section.classList.remove("fade-in");
      section.classList.add("fade-out");
      setTimeout(() => {
        section.style.display = "none";
      }, 500);
    }
  });
}

document.getElementById("about-button").addEventListener("click", function () {
  switchSection("bios-section");
  footer.style.display = "none";
});

document.getElementById("home-button").addEventListener("click", function () {
  switchSection("main-section");
  footer.style.display = "flex";
});

document
  .getElementById("partner-button")
  .addEventListener("click", function () {
    switchSection("partner-section");
    footer.style.display = "none";
  });

// Botões móveis
document
  .getElementById("mobile-about-button")
  .addEventListener("click", function () {
    switchSection("bios-section");
    mobileMenu.style.display = "none";
    footer.style.display = "none";
  });

document
  .getElementById("mobile-home-button")
  .addEventListener("click", function () {
    switchSection("main-section");
    mobileMenu.style.display = "none";
    footer.style.display = "flex";
  });

document
  .getElementById("mobile-partner-button")
  .addEventListener("click", function () {
    switchSection("partner-section");
    mobileMenu.style.display = "none";
    footer.style.display = "none";
  });

document.querySelectorAll(".partner-list li, .bios-list li").forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.classList.add("light-beam-effect");
  });

  item.addEventListener("mouseout", () => {
    item.classList.remove("light-beam-effect");
  });
});

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________██░░";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = ["Sobre Nós, Veja abaixo", "The Gods >> ALL"];

const el = document.querySelector(".abouttext");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 2000);
  });
  counter = (counter + 1) % phrases.length;
};

next();
