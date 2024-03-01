import type { Viewport } from "$lib/radu/viewport";
import type { World } from "$lib/radu/world";
import { getNearestSegment } from "../math/utils";
import type { Point } from "../primitives/point";
import type { Polygon } from "../primitives/polygon";
import type { Segment } from "../primitives/segment";

type Marking = {
  poly: Polygon;
  draw: (c: CanvasRenderingContext2D | null) => void;
};

export abstract class MarkingEditor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  mouse: Point | null;
  intent: Marking | null;
  markings: Marking[];
  boundMouseDown?: (evt: any) => void;
  boundMouseMove?: (evt: any) => void;
  boundContextMenu?: (evt: any) => any;
  constructor(
    public readonly viewport: Viewport,
    public readonly world: World,
    public readonly targetSegments: Segment[]
  ) {
    // this.viewport = viewport;
    this.world = world;

    this.canvas = viewport.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.mouse = null;
    this.intent = null;

    // this.targetSegments = targetSegments;

    this.markings = world.markings as Marking[];
  }

  // to be overwritten
  abstract createMarking(center: Point, directionVector: Point): Marking;

  enable() {
    this.#addEventListeners();
  }

  disable() {
    this.#removeEventListeners();
  }

  #addEventListeners() {
    this.boundMouseDown = this.#handleMouseDown.bind(this);
    this.boundMouseMove = this.#handleMouseMove.bind(this);
    this.boundContextMenu = (evt) => evt.preventDefault();
    this.canvas.addEventListener("mousedown", this.boundMouseDown);
    this.canvas.addEventListener("mousemove", this.boundMouseMove);
    this.canvas.addEventListener("contextmenu", this.boundContextMenu);
  }

  #removeEventListeners() {
    this.canvas.removeEventListener("mousedown", this.boundMouseDown!);
    this.canvas.removeEventListener("mousemove", this.boundMouseMove!);
    this.canvas.removeEventListener("contextmenu", this.boundContextMenu!);
  }

  #handleMouseMove(evt: MouseEvent) {
    this.mouse = this.viewport.getMouse(evt, true);
    const seg = getNearestSegment(
      this.mouse,
      this.targetSegments,
      10 * this.viewport.zoom
    );
    if (seg) {
      const proj = seg.projectPoint(this.mouse);
      if (proj.offset >= 0 && proj.offset <= 1) {
        this.intent = this.createMarking(proj.point, seg.directionVector());
      } else {
        this.intent = null;
      }
    } else {
      this.intent = null;
    }
  }

  #handleMouseDown(evt: MouseEvent) {
    if (evt.button == 0) {
      // left click
      if (this.intent) {
        this.markings.push(this.intent);
        this.intent = null;
      }
    }
    if (evt.button == 2) {
      // right click
      for (let i = 0; i < this.markings.length; i++) {
        const poly = this.markings[i].poly;
        if (poly.containsPoint(this.mouse!)) {
          this.markings.splice(i, 1);
          return;
        }
      }
    }
  }

  display() {
    if (this.intent) {
      this.intent.draw(this.ctx);
    }
  }
}
