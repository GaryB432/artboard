import { Vector } from "@artboard/vector";
import { createRay } from "../../../libraries/graphics/src/boundary/claude";
import {
  getBoundaryPoint,
  type Segment,
} from "../../../libraries/graphics/src/boundary/core";
import { setupCounter } from "./counter.ts";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

const canvas = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = 800;
canvas.height = 600;

const rectSize = new Vector(400, 300);

const rectOrigin = new Vector(200, 150);

const rect = new DOMRect(rectOrigin.x, rectOrigin.y, rectSize.x, rectSize.y);

let subject: Vector | null = null;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw canvas border
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Draw rectangle
  ctx.fillStyle = "antiquewhite";
  ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(rect.left, rect.top, rect.width, rect.height);

  if (subject) {
    // Draw subject
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(subject.x, subject.y, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Draw rays

    // const angles = Array(500)
    //   .fill(undefined)
    //   .map((_a, i) => Math.random() * Math.PI * i);

    const angles = [240, 97];
    angles.forEach((angle) => {
      // console.log(subject, angle);
      const ray = createRay(subject!, angle, 300);
      // console.log(JSON.stringify({ ray, subject, angle }, undefined, 2));
      drawRay(ray);

      // const boundary: Segment | null = getBoundarySegment(ray, rect);
      // if (boundary) {
      //   // shouldProbablyBeNamedDrawRay(boundary, "red");
      //   // console.log(boundary);
      // }

      const adjustedBoundaryPoint = getBoundaryPoint(ray, rect)!.point;

      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(
        adjustedBoundaryPoint.x,
        adjustedBoundaryPoint.y,
        3,
        0,
        2 * Math.PI,
      );
      ctx.fill();
    });
  }
}

function drawRay(ray: Segment, strokeStyle = "black"): void {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(ray.from.x, ray.from.y);
  ctx.lineTo(ray.to.x, ray.to.y);
  ctx.stroke();
  drawArrow(ray);
}

function drawArrow(ray: Segment) {
  const { from, to } = ray;
  const direction = to.clone().sub(from);
  const angle = Math.atan2(direction.y, direction.x);

  const arrowHeadSize = 10;
  const arrowAngle = Math.PI / 4; // Pointier arrow (45 degrees)

  const leftWingX = to.x - arrowHeadSize * Math.cos(angle - arrowAngle);
  const leftWingY = to.y - arrowHeadSize * Math.sin(angle - arrowAngle);

  const rightWingX = to.x - arrowHeadSize * Math.cos(angle + arrowAngle);
  const rightWingY = to.y - arrowHeadSize * Math.sin(angle + arrowAngle);

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(leftWingX, leftWingY);
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(rightWingX, rightWingY);
  ctx.stroke();
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  subject = new Vector(x, y);

  draw();
});

draw();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
