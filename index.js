import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const enterBtn = document.querySelector(".home__item-image__btn");
const enterText = document.querySelector(".enter-btn");
const backBtn = document.querySelector(".btn-back");
const gridConatiner = document.querySelector(".grid__conatiner");
const body = document.querySelector("body");
const homeTopName = document.querySelector(".home__item-name__item.top");
const homeBottomName = document.querySelector(".home__item-name__item.bottom");
const gridTileTopName = document.querySelector(".grid__name__item.top");
const gridTileBottomName = document.querySelector(".grid__name__item.bottom");
const mainImage = document.querySelector(".home__item-image__img");
const gridImageFive = document.querySelector(".grid__item.img-five");
const mainImageContainer = document.querySelector(".home__item-image");
const circle = document.querySelector(".circle");
const gridItems = document.querySelectorAll(
  ".grid__item:not(.grid__item.img-five)"
);

let isAnimating = false;

let imagePositions = {};

const getPosition = (i, matrix) => {
  return { ...imagePositions, [i]: matrix };
};

enterBtn.addEventListener("click", () => showGrid());

backBtn.addEventListener("click", () => hideGrid());

const showGrid = () => {
  if (isAnimating) return;
  isAnimating = true;

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    },
  });
  tl.addLabel("start", 0)
    .to(
      homeTopName,
      {
        y: -250,
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      homeBottomName,
      {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      enterText,
      {
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      circle,
      {
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .add(() => {
      gridConatiner.classList.add("grid--open");
      const imageState = Flip.getState(mainImage);
      gridImageFive.appendChild(mainImage);
      Flip.from(imageState, {
        absolute: true,
        zIndex: 1000,
        duration: 1.5,
        ease: "expo.inOut",
      });
    }, "start")
    .to(
      body,
      {
        background: "hsl(108, 5%, 80%)",
        duration: 1.5,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      gridTileTopName,
      {
        duration: 1,
        ease: "expo.inOut",
        startAt: {
          x: -100,
          opacity: 0,
        },
        x: 5,
        opacity: 1,
      },
      "start"
    )
    .to(
      gridTileBottomName,
      {
        duration: 1,
        ease: "expo.inOut",
        startAt: {
          x: 100,
          opacity: 0,
        },
        x: 40,
        opacity: 1,
      },
      "start"
    )
    .to(
      backBtn,
      {
        duration: 1,
        ease: "expo.inOut",
        startAt: {
          x: 100,
          opacity: 0,
        },
        x: 0,
        opacity: 1,
      },
      "start"
    );

  gridItems.forEach((item, i) => {
    imagePositions = getPosition(i, getComputedStyle(item).transform);

    tl.to(
      item,
      {
        duration: 1.5,
        ease: "expo.inOut",
        x: 0,
        y: 0,
      },
      "start"
    ).to(
      ".grid__item__title",
      {
        duration: 0.5,
        ease: "expo.inOut",
        startAt: {
          yPercent: 101,
        },
        yPercent: 0,
        opacity: 1,
      },
      "start+=0.8"
    );
  });

  tl.to(gridConatiner, {
    zIndex: 200,
    duration: 0.1,
    ease: "expo.inOut",
  });
};

const hideGrid = () => {
  if (isAnimating) return;
  isAnimating = true;

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    },
  });
  tl.addLabel("start", 0)
    .to(
      homeTopName,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      homeBottomName,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      enterText,
      {
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      circle,
      {
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
      },
      "start"
    )
    .add(() => {
      const imageState = Flip.getState(mainImage);
      mainImageContainer.appendChild(mainImage);
      Flip.from(imageState, {
        absolute: true,
        duration: 1.5,
        ease: "expo.inOut",
      });
    }, "start")
    .to(
      body,
      {
        background: "hsl(116, 29%, 57%)",
        duration: 1.5,
        ease: "expo.inOut",
      },
      "start"
    )
    .to(
      gridTileTopName,
      {
        duration: 1,
        ease: "expo.inOut",
        x: -100,
        opacity: 0,
      },
      "start"
    )
    .to(
      gridTileBottomName,
      {
        duration: 1,
        ease: "expo.inOut",
        x: 100,
        opacity: 0,
      },
      "start"
    )
    .to(
      backBtn,
      {
        duration: 1,
        ease: "expo.inOut",
        x: 100,
        opacity: 0,
      },
      "start"
    );

  gridItems.forEach((item, i) => {
    tl.to(
      item,
      {
        duration: 1.5,
        ease: "expo.inOut",
        transform: imagePositions[i],
      },
      "start"
    ).to(
      ".grid__item__title",
      {
        duration: 0.5,
        ease: "expo.inOut",
        yPercent: -101,
        opacity: 0,
      },
      "start+=0.8"
    );
  });

  tl.to(gridConatiner, {
    zIndex: 0,
    duration: 0.1,
    ease: "expo.inOut",
  });
};
