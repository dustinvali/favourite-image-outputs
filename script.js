const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

async function loadImages() {
  try {
    const res = await fetch("images.json", { cache: "no-store" });
    const images = await res.json();
    render(images);
  } catch (err) {
    console.error("could not load images.json", err);
    renderPlaceholders();
  }
}

function render(images) {
  if (!images.length) return renderPlaceholders();
  grid.innerHTML = "";
  for (const item of images) {
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = `images/${item.file}`;
    img.alt = item.caption || item.file;
    img.loading = "lazy";
    card.appendChild(img);
    if (item.caption) {
      const cap = document.createElement("div");
      cap.className = "caption";
      cap.textContent = item.caption;
      card.appendChild(cap);
    }
    card.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.showModal();
    });
    grid.appendChild(card);
  }
}

function renderPlaceholders() {
  grid.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const card = document.createElement("div");
    card.className = "card empty";
    grid.appendChild(card);
  }
}

lightbox.addEventListener("click", () => lightbox.close());

loadImages();
