"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const getColor = document.getElementById("color");
const decreaseSize = document.getElementById("decrease");
const increaseSize = document.getElementById("increase");
const getSize = document.getElementById("size");
const clearCanvas = document.getElementById("clear");



let size = 5;
let color = "black";
let isPressed = false;
let x;
let y;

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

increaseSize.addEventListener("click", () => {
  if (size < 20) {
    getSize.textContent = size + 1;
    size = Number(getSize.textContent);

  }
});

decreaseSize.addEventListener("click", () => {
  if (size > 1) {
    getSize.textContent = size - 1;
    size = Number(getSize.textContent);

  }
});

document.addEventListener("click", () => {
  color = getColor.value;
});

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {

  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

// mobile/touch devices
canvas.addEventListener("touchstart", (e) => {
  isPressed = true;

  // Adjustments for touch events
  x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  y = e.touches[0].clientY - canvas.getBoundingClientRect().top;


});

canvas.addEventListener("touchend", () => {
  isPressed = false;

  x = undefined;
  y = undefined;

});

canvas.addEventListener("touchmove", (e) => {
  if (isPressed) {
    const x2 = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const y2 = e.touches[0].clientY - canvas.getBoundingClientRect().top;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;

    // Prevent scrolling on touch devices
    e.preventDefault();
  }
});

function drawCircle(x, y) {

  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}
