export class Foot {
  public constructor(private counter: number) {}
  public add(a: number): number {
    this.counter += a;
    return this.counter;
  }
  public greet(name: string): string {
    return `Foot says: hello to ${name}`;
  }
}
