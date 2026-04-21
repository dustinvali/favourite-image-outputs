const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let items = [];
let currentIndex = 0;

async function loadImages() {
  try {
    const res = await fetch("images.json", { cache: "no-store" });
    items = await res.json();
    render(items);
  } catch (err) {
    console.error("could not load images.json", err);
  }
}

function render(images) {
  grid.innerHTML = "";
  images.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = `images/${item.file}`;
    img.alt = "";
    img.loading = "lazy";
    card.appendChild(img);
    card.addEventListener("click", () => openLightbox(i));
    grid.appendChild(card);
  });
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = `images/${items[index].file}`;
  if (!lightbox.open) lightbox.showModal();
}

function showAt(index) {
  if (!items.length) return;
  currentIndex = (index + items.length) % items.length;
  lightboxImg.style.opacity = "0";
  const next = new Image();
  next.onload = () => {
    lightboxImg.src = next.src;
    lightboxImg.style.opacity = "1";
  };
  next.src = `images/${items[currentIndex].file}`;
}

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showAt(currentIndex - 1);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showAt(currentIndex + 1);
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxImg) lightbox.close();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.open) return;
  if (e.key === "ArrowLeft") showAt(currentIndex - 1);
  else if (e.key === "ArrowRight") showAt(currentIndex + 1);
});

loadImages();
