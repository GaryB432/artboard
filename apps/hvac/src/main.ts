import { setupCounter } from "./counter.ts";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

const svgns = "http://www.w3.org/2000/svg";

function createRectElement(rect: Required<DOMRectInit>) {
  const rectElement = document.createElementNS(svgns, "rect");
  rectElement.setAttributeNS(null, "x", rect.x.toString());
  rectElement.setAttributeNS(null, "y", rect.y.toString());
  rectElement.setAttributeNS(null, "width", rect.width.toString());
  rectElement.setAttributeNS(null, "height", rect.height.toString());
  rectElement.setAttributeNS(null, "fill", "#ccc");
  return rectElement;
}

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

class Scene {
  private zoom = 1;
  private svgSize: Point;
  private worldSize = new Point(4000, 3000);
  private mouse = {
    down: false,
    button: 1,
    x: 0,
    y: 0,
    px: 0,
    py: 0,
  };

  constructor(private svg: SVGSVGElement) {
    this.svgSize = new Point(
      this.svg.width.baseVal.value,
      this.svg.height.baseVal.value,
    );
    svg.addEventListener("wheel", (evt) => {
      const dir = Math.sign(evt.deltaY);
      const step = 0.2;
      this.zoom += dir * step;
      this.zoom = Math.max(1, Math.min(5, this.zoom));
      this.svg.setAttributeNS(
        null,
        "viewBox",
        `0 0 ${400 * this.zoom} ${300 * this.zoom}`,
      );
      evt.preventDefault();
    });
    svg.addEventListener("click", (evt) => {
      const bcr = svg.getBoundingClientRect();
      const dot = document.createElementNS(svgns, "circle");
      const cx = evt.clientX - bcr.left - 2;
      const cy = evt.clientY - bcr.top - 2;
      const spot = new Point(cx,cy)
      dot.setAttributeNS(null, "cx", spot.x.toString());
      dot.setAttributeNS(null, "cy", spot.y.toString());
      dot.setAttributeNS(null, "r", "4");
      dot.setAttributeNS(null, "fill", "blue");
      svg.append(dot);
      console.log(spot);
      // const dir = Math.sign(evt.deltaY);
      // const step = 0.2;
      // this.zoom += dir * step;
      // this.zoom = Math.max(1, Math.min(5, this.zoom));
      // this.svg.setAttributeNS(
      //   null,
      //   "viewBox",
      //   `0 0 ${400 * this.zoom} ${300 * this.zoom}`,
      // );
      // evt.preventDefault();
    });
  }
  reset() {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 70; j++) {
        const rg = {
          x: i * 42,
          y: j * 32,
          width: 40,
          height: 30,
        };
        const rectElement = createRectElement(rg);

        this.svg.appendChild(rectElement);
        const tt = document.createElementNS(svgns, "text");
        tt.textContent = `(${i},${j})`;
        tt.setAttributeNS(null, "x", (rg.x + 0).toString());
        tt.setAttributeNS(null, "y", (rg.y + 10).toString());
        tt.setAttributeNS(null, "font-size", "10");
        tt.setAttributeNS(null, "fill", "black");
        this.svg.appendChild(tt);
      }
    }
  }
  // zoom() {
  //   ;
  // }
}

// const svg = document.getElementById('mySvg'); // Get the parent SVG element

// const rectObj = svg.createSVGRect();
// rectObj.x = 50;
// rectObj.y = 50;
// rectObj.width = 100;
// rectObj.height = 50;

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
// setupHousing(document.querySelector<SVGSVGElement>("#housing")!);
const svgg = document.querySelector<SVGSVGElement>("#scene");
const scene = new Scene(svgg!);
scene.reset();
console.log(scene);
setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
