export function curveToPath(curve: number[]) {
  if (curve.length !== 6) {
    throw new Error("curve must have 6 elements");
  }
  const [x1, y1, x2, y2, x, y] = curve;
  return `c ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
}

export function setupHousing(svg: SVGSVGElement) {
  const aspectRatio = 3 / 4;
  const width = 400;
  const gapper = 15;

  const height = width * aspectRatio;

  const s1 = [
    [width / 2 - gapper / 2, -gapper],
    [width / 2 + gapper / 2, -gapper],
    [width, 0],
  ];

  const s2 = [
    [gapper, height * (1 / 3)],
    [gapper, height * (2 / 3)],
    [0, height],
  ];

  function negate(a: number[][]): number[][] {
    return a.map((v) => v.map((n) => -n));
  }

  const housingSides = [s1, s2, negate(s1), negate(s2)];

  const softLines = housingSides.map((l) => curveToPath(l.flat()));

  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "black");
  svg.setAttribute("stroke-width", "2");
  const pathd = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathd.setAttribute("d", ["M 0 20", ...softLines, "z"].join(" "));
  svg.appendChild(pathd);
}

export function greet(name: string): string {
  return `housing says: hello to ${name}`;
}
export function add(a: number, b: number): number {
  return a + b;
}
export const meaning: { life: number } = {
  life: 42,
};
