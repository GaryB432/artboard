import type { Viewport } from "$lib/radu/viewport";
import type { Graph } from "../math/graph";
import { getNearestPoint } from "../math/utils";
import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

export class GraphEditor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  selected: Point | null = null;
  hovered: Point | null = null;
  dragging = false;
  mouse: Point | null = null;
  constructor(public viewport: Viewport, public graph: Graph) {
    this.canvas = viewport.canvas;

    this.ctx = this.canvas.getContext("2d");

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }

  #handleMouseMove(evt: MouseEvent) {
    this.mouse = this.viewport.getMouse(evt, true);
    this.hovered = getNearestPoint(
      this.mouse,
      this.graph.points,
      10 * this.viewport.zoom
    );
    if (this.dragging == true) {
      if (!this.selected) {
        this.selected = new Point(0, 0);
      }
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  #handleMouseDown(evt: MouseEvent) {
    if (evt.button == 2) {
      // right click
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }
    if (evt.button == 0) {
      // left click
      if (this.hovered) {
        this.#select(this.hovered);
        this.dragging = true;
        return;
      }
      if (this.mouse) {
        this.graph.addPoint(this.mouse);
      }
      this.#select(this.mouse);
      this.hovered = this.mouse;
    }
  }

  #select(point: Point | null) {
    if (this.selected && point) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point: Point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }

  dispose(): void {
    this.graph.dispose();
    this.selected = null;
    this.hovered = null;
  }

  display(): void {
    if (!this.ctx) return;
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      if (intent)
        new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
