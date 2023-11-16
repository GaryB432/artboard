import { HourHand, MilliSecondHand, MinuteHand, SecondHand } from "./hand";
import { Point } from "./point";

export interface TickEvent {
  hour: number;
  milli: number;
  minute: number;
  second: number;
}

export class Clock {
  public hourHand!: HourHand;
  public minuteHand!: MinuteHand;
  public msHand!: MilliSecondHand;
  public onTick?: ((e: TickEvent) => void) | null = null;
  public secondHand!: SecondHand;
  public soundMuted = true;

  private center!: Point;
  private context: CanvasRenderingContext2D | null = null;
  private lastMilli = 0;
  private radius!: number;
  private running = false;
  private timeStart = 0;

  public init(container: HTMLElement | null, size = 200): void {
    if (!container) {
      return;
    }

    let canvas = container.querySelector<HTMLCanvasElement>("canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      container.appendChild(canvas);
    }
    this.setSize(size);
    canvas.setAttribute("width", size.toString());
    canvas.setAttribute("height", size.toString());
    this.context = canvas.getContext("2d");
    if (this.context) {
      container.classList.add("clock");
      this.context.translate(this.center.x, this.center.y);
      this.context.rotate(-Math.PI / 2);
      this.stop();
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
    this.timeStart = 0;
    this.running = true;
    requestAnimationFrame((timer) => {
      this.timeStart = timer;
      this.step(timer);
    });
  }
  public stop(): void {
    this.running = false;
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

  private setHands(timeInfo: TickEvent): void {
    const date = new Date();
    // const millis = date.getMilliseconds();
    const sweep = true;
    const seconds = timeInfo.second;
    const ms = seconds + timeInfo.milli / 1000;
    this.msHand.value = (timeInfo.milli / 1000) * 360;
    this.secondHand.value = sweep ? ms : seconds;
    this.minuteHand.value = timeInfo.minute + ms / 60;
    this.hourHand.value =
      ((timeInfo.hour + 24) % 12 || 12) + this.minuteHand.value / 60;
  }

  private step = (timestamp: number): void => {
    if (!this.context) {
      throw new Error("try a context");
    }
    // const delta = (timestamp - this.lastCalledTime) / 1000;
    const now = new Date();
    const nowInfo: TickEvent = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
      milli: now.getMilliseconds(),
    };

    const elapsed = timestamp - this.timeStart;

    const fel = Math.floor(elapsed / 1000);

    if (nowInfo.milli < this.lastMilli && this.onTick) {
      // 0-59 so 0 will be less than 59
      this.onTick(nowInfo);
    }

    this.clearFace();
    this.initFace();
    this.setHands(nowInfo);

    this.msHand.draw(this.context);
    this.secondHand.draw(this.context);
    this.minuteHand.draw(this.context);
    this.hourHand.draw(this.context);
    this.lastMilli = nowInfo.milli;
    if (this.running) {
      requestAnimationFrame(this.step);
    }
  };
}
