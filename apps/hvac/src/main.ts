import { setupCounter } from "./counter.ts";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

const svgns = "http://www.w3.org/2000/svg";

function createRectElement(rect: Required<DOMRectInit>): SVGRectElement {
  const rectElement = document.createElementNS(svgns, "rect");
  rectElement.setAttributeNS(null, "x", rect.x.toString());
  rectElement.setAttributeNS(null, "y", rect.y.toString());
  rectElement.setAttributeNS(null, "width", rect.width.toString());
  rectElement.setAttributeNS(null, "height", rect.height.toString());
  rectElement.setAttributeNS(null, "fill", "#ccc");
  return rectElement;
}

class Point {
  public constructor(
    public x: number,
    public y: number,
  ) {}
  public scale(scalar: number): this {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    return this;
  }
}

class Scene {
  private mouse = {
    down: false,
    button: 1,
    x: 0,
    y: 0,
    px: 0,
    py: 0,
  };
  private svgSize: Point;
  private worldSize = new Point(4000, 3000);
  private zoom = 1;

  public constructor(private svg: SVGSVGElement) {
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
      const spot = new Point(
        evt.clientX - bcr.left - 2,
        evt.clientY - bcr.top - 2,
      ).scale(this.zoom);
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
  public reset() {
    for (let r = 0; r < 30; r++) {
      for (let c = 0; c < 40; c++) {
        const rg: Required<DOMRectInit> = {
          x: c * 42,
          y: r * 32,
          width: 40,
          height: 30,
        };
        const rectElement = createRectElement(rg);

        this.svg.appendChild(rectElement);

        const textElement = document.createElementNS(svgns, "text");
        textElement.textContent = `(${r},${c})`;
        textElement.setAttributeNS(null, "x", (rg.x + 0).toString());
        textElement.setAttributeNS(null, "y", (rg.y + 10).toString());
        textElement.setAttributeNS(null, "font-size", "10");
        textElement.setAttributeNS(null, "fill", "black");
        // console.log (tt)
        this.svg.appendChild(textElement);
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
const scene = new Scene(document.querySelector<SVGSVGElement>("#scene")!);
scene.reset();
console.log(scene);
setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
