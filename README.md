# artboard

svelte-kit playground

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Build](https://github.com/GaryB432/artboard/actions/workflows/ci.yml/badge.svg)](https://github.com/GaryB432/artboard/actions/workflows/ci.yml)

On line at https://artboard-nu.vercel.app and at https://artboard.nabors-place.com

## Run locally

```bash
npm install
npm run build
npm run test
npm run lint
```

or

```bash
nx build
nx test
nx lint
nx dev
```

## Features

- [@gb-nx/svelte - svelte-kit NX plugin](https://www.npmjs.com/package/@gb-nx/svelte)
- [SvelteKit • Web development, streamlined](https://kit.svelte.dev/)
- [Nx: Smart, Fast and Extensible Build System](https://nx.dev/)
- Request animation frame
- [ai/easings.net: Easing Functions Cheat Sheet](https://github.com/ai/easings.net)

## Roadmap

- ~~move to nx~~

- fix buzzing sound

## Related

### Scalable Vector Graphics

[DOM Interfaces](https://www.w3.org/TR/SVG11/animate.html#DOMInterfaces)

[w3c animate](https://www.w3.org/TR/SVG11/animate.html)

[SVG Attribute reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)

### elements

[shadow parts](https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/)

### tplant

[tplant/test/Playground/RayTracer at 67ceef69e2f9027270a022b985b24cee636dab25 · bafolts/tplant](https://github.com/bafolts/tplant/tree/67ceef69e2f9027270a022b985b24cee636dab25/test/Playground/RayTracer)

[tplant/test/Playground/RayTracer at 67ceef69e2f9027270a022b985b24cee636dab25 · bafolts/tplant](https://github.com/bafolts/tplant/tree/67ceef69e2f9027270a022b985b24cee636dab25/test/Playground/RayTracer)

[tplant/test/mermaid/results/playground_raytracer at 67ceef69e2f9027270a022b985b24cee636dab25 · bafolts/tplant](https://github.com/bafolts/tplant/blob/67ceef69e2f9027270a022b985b24cee636dab25/test/mermaid/results/playground_raytracer)

```mermaid
classDiagram
class Vector {
    +x: number
    +y: number
    +z: number
    +times(k: number, v: Vector)$: Vector
    +minus(v1: Vector, v2: Vector)$: Vector
    +plus(v1: Vector, v2: Vector)$: Vector
    +dot(v1: Vector, v2: Vector)$: number
    +mag(v: Vector)$: number
    +norm(v: Vector)$: Vector
    +cross(v1: Vector, v2: Vector)$: Vector
}
class Ray {
    +start: Vector
    +dir: Vector
}
<<Interface>> Ray
class Intersection {
    +thing: Thing
    +ray: Ray
    +dist: number
}
<<Interface>> Intersection
class Color {
    +r: number
    +g: number
    +b: number
    +scale(k: number, v: Color)$: Color
    +plus(v1: Color, v2: Color)$: Color
    +times(v1: Color, v2: Color)$: Color
    +white$: Color
    +grey$: Color
    +black$: Color
    +background$: Color
    +defaultColor$: Color
    +toDrawingColor(c: Color)$: Inline
}
class Surface {
    +diffuse: (pos: Vector) => Color
    +specular: (pos: Vector) => Color
    +reflect: (pos: Vector) => number
    +roughness: number
}
<<Interface>> Surface
class Thing {
    +intersect: (ray: Ray) => Intersection
    +normal: (pos: Vector) => Vector
    +surface: Surface
    +destroy(): void
    +destroy(name: string): void
}
<<Interface>> Thing
class Light {
    +pos: Vector
    +color: Color
}
<<Interface>> Light
class Camera {
    +forward: Vector
    +right: Vector
    +up: Vector
    +pos: Vector
}
class Scene {
    +things: Thing[]
    +lights: Light[]
    +camera: Camera
}
<<Interface>> Scene
Thing <|.. Plane
class Plane {
    +normal: (pos: Vector) => Vector
    +intersect: (ray: Ray) => Intersection
    +surface: Surface
}
Thing <|.. Sphere
class Sphere {
    +radius2: number
    +center: Vector
    +surface: Surface
    +normal(pos: Vector): Vector
    +intersect(ray: Ray): Inline
}
class RayTracer {
    -maxDepth: number
    -intersections(ray: Ray, scene: Scene): Intersection
    -testRay(ray: Ray, scene: Scene): number
    -traceRay(ray: Ray, scene: Scene, depth: number): Color
    -shade(isect: Intersection, scene: Scene, depth: number): Color
    -getReflectionColor(thing: Thing, pos: Vector, normal: Vector, rd: Vector, scene: Scene, depth: number): Color
    -getNaturalColor(thing: Thing, pos: Vector, norm: Vector, rd: Vector, scene: Scene): any
    +render(scene: any, ctx: any, screenWidth: any, screenHeight: any): void
}
Ray ..> "1" Vector
Intersection ..> "1" Thing
Intersection ..> "1" Ray
Surface ..> "1" Vector
Surface ..> "1" Color
Thing ..> "1" Ray
Thing ..> "1" Intersection
Thing ..> "1" Vector
Thing ..> "1" Surface
Light ..> "1" Vector
Light ..> "1" Color
Camera ..> "1" Vector
Scene ..> "*" Thing
Scene ..> "*" Light
Scene ..> "1" Camera
Plane ..> "1" Vector
Plane ..> "1" Ray
Plane ..> "1" Intersection
Plane ..> "1" Surface
Sphere ..> "1" Vector
Sphere ..> "1" Surface
Sphere ..> "1" Ray
RayTracer ..> "1" Ray
RayTracer ..> "1" Scene
RayTracer ..> "1" Intersection
RayTracer ..> "1" Color
RayTracer ..> "1" Thing
RayTracer ..> "1" Vector

```
