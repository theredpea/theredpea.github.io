const cardRotateYSlider = document.querySelector("#cardRotateY");
const cardRotateXSlider = document.querySelector("#cardRotateX");
const card = document.querySelector(".card");
const bdy = document.querySelector("body");

function cardRotateChanged() {
  // const newVal = ;
  // https://stackoverflow.com/a/42267468/1175496
  // console.warn(card.style.transform);
  // const oldTransform = window.getComputedStyle(card).transform.replace(/rotateY[^\)]+\)/,'');
  // console.warn(oldTransform);
  // card.style.transform = `rotateY(${newVal}deg) ${oldTransform}`;
  card.style.transform = getCardStyle(
    cardRotateYSlider.value,
    cardRotateXSlider.value
  );
  // bdy.style.perspective = `-${newVal*50}px`;
}

function getCardStyle(rotateY, rotateX) {
  // return `rotateY(${rotateY}deg) rotateX(-10deg) scale(0.8) translateY(-50%) translateX(-50%)`;
  return `rotateY(${rotateY}deg)  rotateX(${rotateX}deg) translateY(-50%) translateX(-50%)`;
}

bdy.addEventListener("mousemove", onMouseMove);

function onMouseMove(event) {
  // console.warn(event);
  // event.clientX;
  // https://stackoverflow.com/a/21452887/1175496
  const xPercentage = event.clientX / window.outerWidth;
  // console.warn();
  // cardRotateYSlider.value = cardRot
  // console.warn(ca)
  const yValRange = +cardRotateYSlider.max - +cardRotateYSlider.min;
  cardRotateYSlider.value = +cardRotateYSlider.min + yValRange * xPercentage;

  const yPercentage = (event.clientY * 2) / window.outerHeight;
  const xValRange = +cardRotateXSlider.max - +cardRotateXSlider.min;
  cardRotateXSlider.value = +cardRotateXSlider.min + xValRange * yPercentage;

  cardRotateChanged();
}

cardRotateChanged();
// document.addEventListener("DOMContentLoaded", function(event) {
//     // Your code to run since DOM is loaded and ready

//   cardRotateYChange();
// });