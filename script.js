const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let items = [];
let currentIndex = 0;

async function loadImages() {
  const res = await fetch("images.json", { cache: "no-store" });
  items = await res.json();
  render(items);
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
    card.addEventListener("click", () => openAt(i));
    grid.appendChild(card);
  });
}

function openAt(index) {
  currentIndex = index;
  lightboxImg.src = `images/${items[index].file}`;
  if (!lightbox.open) lightbox.showModal();
}

function goTo(index) {
  if (!items.length) return;
  currentIndex = (index + items.length) % items.length;
  lightboxImg.style.opacity = "0";
  const next = new Image();
  const src = `images/${items[currentIndex].file}`;
  next.onload = () => {
    lightboxImg.src = src;
    lightboxImg.style.opacity = "1";
  };
  next.src = src;
}

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  goTo(currentIndex - 1);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  goTo(currentIndex + 1);
});

lightboxImg.addEventListener("click", (e) => {
  e.stopPropagation();
  lightbox.close();
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.open) return;
  if (e.key === "ArrowLeft") { e.preventDefault(); goTo(currentIndex - 1); }
  else if (e.key === "ArrowRight") { e.preventDefault(); goTo(currentIndex + 1); }
});

loadImages();
