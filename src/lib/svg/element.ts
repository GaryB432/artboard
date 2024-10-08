export function greet(name: string): string {
  return `element says hello to ${name}`;
}
export function add(a: number, b: number): number {
  return a + b;
}
export const meaning: { life: number } = {
  life: 42,
};

export function createElement<K extends keyof SVGElementTagNameMap>(
  qualifiedName: K,
  attributes: Record<string, string> = {},
): SVGElementTagNameMap[K] {
  const ele = document.createElementNS(
    "http://www.w3.org/2000/svg",
    qualifiedName,
  );
  Object.entries(attributes).forEach(([k, v]) => ele.setAttribute(k, v));
  return ele;
}
