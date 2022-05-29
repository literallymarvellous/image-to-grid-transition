import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const enterBtn = document.querySelector(".home__item-image__btn");
const backBtn = document.querySelector(".btn-back");
const gridConatiner = document.querySelector(".grid__conatiner");
const home = document.querySelector(".home");
console.log(home);

enterBtn.addEventListener("click", () => {
  home.classList.add("nodisplay");
  gridConatiner.classList.add("grid--open");
  console.log("hey");
});

backBtn.addEventListener("click", () => {
  gridConatiner.classList.remove("no-display");
  home.classList.remove("grid--open");
});
