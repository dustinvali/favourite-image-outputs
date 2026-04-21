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
  }
}

function render(images) {
  grid.innerHTML = "";
  for (const item of images) {
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = `images/${item.file}`;
    img.alt = "";
    img.loading = "lazy";
    card.appendChild(img);
    card.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.showModal();
    });
    grid.appendChild(card);
  }
}

lightbox.addEventListener("click", () => lightbox.close());

loadImages();
