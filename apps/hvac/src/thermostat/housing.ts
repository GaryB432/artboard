const aspectRatio = 3 / 4;
const width = 400;
const gapper = 15;

function negate(a: number[][]): number[][] {
  return a.map((v) => v.map((n) => -n));
}

export function setupHousing(svg: SVGSVGElement) {
  const height = width * aspectRatio;

  svg.width.baseVal.value = width;
  svg.height.baseVal.value = height;

  const topSide = [
    [width / 2 - gapper / 2, -gapper],
    [width / 2 + gapper / 2, -gapper],
    [width, 0],
  ];

  const rightSide = [
    [gapper, height * (1 / 3)],
    [gapper, height * (2 / 3)],
    [0, height],
  ];

  const housingSides = [topSide, rightSide, negate(topSide), negate(rightSide)];

  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "black");
  svg.setAttribute("stroke-width", "2");
  const pathd = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathd.setAttribute(
    "d",
    ["M 0 20", ...housingSides.map((l) => curveToPath(l.flat())), "z"].join(
      " ",
    ),
  );
  svg.appendChild(pathd);
}

export function curveToPath(curve: number[]) {
  if (curve.length !== 6) {
    throw new Error("curve must have 6 elements");
  }
  const [x1, y1, x2, y2, x, y] = curve;
  return `c ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
}
