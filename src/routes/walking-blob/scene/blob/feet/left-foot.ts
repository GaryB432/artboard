export class LeftFoot {
  public constructor(private counter: number) {}
  public add(a: number): number {
    this.counter += a;
    return this.counter;
  }
  public greet(name: string): string {
    return `LeftFoot says: hello to ${name}`;
  }
}
