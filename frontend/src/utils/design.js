// let slideIndex = 0;
// carousel();

// function carousel() {
//   let slides = document.getElementsByClassName("slides");
//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }
//   slides[slideIndex - 1].style.display = "block";
//   setTimeout(carousel, 3000);
// }

const modal = document.getElementById("modal");
let products = document.querySelectorAll(".image");

window.addEventListener("click", (e) => {
  if (e.target == modal) modal.style.visibility = "hidden";
});

for (let i = 0; i < products.length; i++) {
  products[i].addEventListener("click", () => {
    modal.style.visibility = "visible";
  });
}
