function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 100) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  };
}

function renderError(containerSelector, message) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${message}
    </div>`;
}

function handleNavbarCollapse() {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
}

function createSkillsFromJSON() {
  const container = document.querySelector("#skills .container");
  let row = document.createElement("div");
  row.classList.add("row");

  fetch("data/skills.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} - Impossible de charger skills.json`
        );
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        card.innerHTML = `
          <div class="card skillsText">
            <div class="card-body">
              <img src="./images/${item.image}" alt="${item.alt}" loading="lazy" />
              <h4 class="card-title mt-3">${item.title}</h4>
              <p class="card-text mt-3">${item.text}</p>
            </div>
          </div>
        `;

        row.appendChild(card);

        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des compétences :", error);
      renderError(
        "#skills .container",
        "Impossible de charger les compétences pour le moment."
      );
    });
}

function formatProjectText(text) {
  if (Array.isArray(text)) {
    return text.map((line) => `<p class="card-text">${line}</p>`).join("");
  }

  return `<p class="card-text">${text}</p>`;
}

function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolio .container");
  let row = document.createElement("div");
  row.classList.add("row");

  fetch("data/portfolio.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} - Impossible de charger portfolio.json`
        );
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        card.innerHTML = `
          <div class="card portfolioContent">
            <img
            class="card-img-top"
            src="images/${item.image}-768.webp"
            srcset="
             images/${item.image}-480.webp 480w,
             images/${item.image}-768.webp 768w,
             images/${item.image}-1200.webp 1200w"
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
            alt="${item.alt}"
            loading="lazy"
            width="1200"
            height="675"
            style="width:100%; height:auto;"
>

            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              ${formatProjectText(item.text)}

              <div class="text-center">
                <a href="${item.link}" class="btn btn-success">Lien</a>
              </div>
            </div>
          </div>
        `;

        row.appendChild(card);

        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du portfolio :", error);
      renderError(
        "#portfolio .container",
        "Impossible de charger le portfolio pour le moment."
      );
    });
}

handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
