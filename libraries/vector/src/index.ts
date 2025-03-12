export class Vector {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  distanceTo(other: Vector): number {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  multiply(v: Vector): Vector {
    return new Vector(this.x * v.x, this.y * v.y);
  }

  sub(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  scale(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  normalize(): Vector {
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    if (magnitude === 0) {
      return new Vector(0, 0);
    }
    return new Vector(this.x / magnitude, this.y / magnitude);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  static fromPoints(p1: Vector, p2: Vector): Vector {
    return new Vector(p2.x - p1.x, p2.y - p1.y);
  }
}
