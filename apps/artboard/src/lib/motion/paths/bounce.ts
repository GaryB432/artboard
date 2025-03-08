export class Bounce {
  public constructor(private counter: number) {}
  public add(a: number): number {
    this.counter += a;
    return this.counter;
  }
  public greet(name: string): string {
    return `Bounce says: hello to ${name}`;
  }
}
