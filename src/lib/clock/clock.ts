import { HourHand, MilliSecondHand, MinuteHand, SecondHand } from "./hand";
import { Point } from "./point";

export class Clock {
  public hourHand!: HourHand;
  public minuteHand!: MinuteHand;
  public msHand!: MilliSecondHand;
  public secondHand!: SecondHand;
  private center!: Point;
  private context: CanvasRenderingContext2D | null = null;
  private radius!: number;
  private running = false;
  public init(container: HTMLElement | null, size = 200): void {
    this.setSize(size);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", size.toString());
    canvas.setAttribute("height", size.toString());
    if (container) {
      this.context = canvas.getContext("2d");
      if (this.context) {
        container.classList.add("clock");
        this.context.translate(this.center.x, this.center.y);
        this.context.rotate(-Math.PI / 2);
        container.appendChild(canvas);
        this.stop();
      }
    }
  }

  public setSize(newSize: number): void {
    this.clearFace();
    // this.size = newSize;
    this.radius = newSize / 2;
    this.center = new Point(this.radius, this.radius);
    this.msHand = new MilliSecondHand(this.radius);
    this.secondHand = new SecondHand(this.radius);
    this.minuteHand = new MinuteHand(this.radius);
    this.hourHand = new HourHand(this.radius);
    this.clearFace();
    this.initFace();
  }

  public start(): void {
    if (!this.context) {
      return;
    }
    this.running = true;
    this.draw(new Date(0, 0, 0, 0, 0, 0, 0));
  }
  public stop(): void {
    this.running = false;
    window.requestAnimationFrame(() =>
      this.draw(new Date(0, 0, 0, 0, 0, 0, 0))
    );
  }

  private clearFace(): void {
    if (this.context) {
      this.context.clearRect(
        -this.center.x,
        -this.center.y,
        this.radius * 2,
        this.radius * 2
      );
    }
  }

  private draw(now: Date): void {
    if (!this.context) {
      return;
    }
    this.clearFace();
    this.initFace();
    this.setHands(now);
    this.msHand.draw(this.context);
    this.secondHand.draw(this.context);
    this.minuteHand.draw(this.context);
    this.hourHand.draw(this.context);
    if (this.running) {
      window.requestAnimationFrame(() => this.draw(new Date()));
    }
  }

  private initFace(): void {
    if (!this.context) {
      return;
    }
    this.context.lineWidth = 1;
    const markerSize = 6;
    const r = this.radius - markerSize / 2;
    this.context.beginPath();
    for (let p = 0; p < 12; p++) {
      const theta = (p * 30 * Math.PI) / 180;
      const pos = new Point(r * Math.cos(theta), r * Math.sin(theta));
      this.context.fillRect(
        pos.x - markerSize / 2,
        pos.y - markerSize / 2,
        markerSize,
        markerSize
      );
    }
  }

  private setHands(date: Date): void {
    const sweep = true;
    const seconds = date.getSeconds();
    const ms = seconds + date.getMilliseconds() / 1000;
    this.msHand.value = (date.getMilliseconds() / 1000) * 360;
    this.secondHand.value = sweep ? ms : seconds;
    this.minuteHand.value = date.getMinutes() + ms / 60;
    this.hourHand.value =
      ((date.getHours() + 24) % 12 || 12) + this.minuteHand.value / 60;
  }
}
