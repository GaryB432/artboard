// import * as THREE from "three";

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000,
// );
// camera.position.z = 5;

// const geometry = new THREE.BoxGeometry();

// const material = new THREE.MeshStandardMaterial({
//   color: 0x00ff00,
//   metalness: 0.13,
// });

// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// const directionalLight = new THREE.DirectionalLight(0x9090aa);
// directionalLight.position.set(-10, 10, -10).normalize();
// scene.add(directionalLight);

// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// hemisphereLight.position.set(1, 1, 1);
// scene.add(hemisphereLight);

// let renderer: THREE.Renderer;

// const animate = () => {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// };

// const resize = () => {
//   const w = window.innerWidth;
//   const h = window.innerHeight - 100;
//   renderer.setSize(w, h);
//   camera.aspect = w / h;
//   camera.updateProjectionMatrix();
// };

import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup

let renderer: THREE.WebGLRenderer;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

// const renderer = new THREE.WebGLRenderer({
//   canvas,
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
// camera.position.setX(-3);

// renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(undefined)
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill(undefined).forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("../fireship/space.jpg");
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load("../fireship/jeff.png");

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture }),
);

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load("../fireship/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("../fireship/normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  }),
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

// Animation Loop

function animate(): void {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

function resize(): void {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// animate();

export function createScene(canvas: HTMLCanvasElement): void {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);
  camera.position.setX(-3);

  renderer.render(scene, camera);
  // renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  resize();
  document.body.onscroll = moveCamera;
  moveCamera();
  animate();
}

window.addEventListener("resize", resize);
