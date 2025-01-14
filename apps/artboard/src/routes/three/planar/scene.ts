import * as THREE from "three";

let renderer: THREE.WebGLRenderer;

const canvasSize: Readonly<THREE.Vec2> = { x: 800, y: 600 };

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  canvasSize.y / canvasSize.y,
  0.1,
  1000,
);

//   const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(10, 15, -22);

//   orbit.update();
const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  metalness: 0.13,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const directionalLight = new THREE.DirectionalLight(0x9090aa);
directionalLight.position.set(-10, 10, -10).normalize();
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemisphereLight.position.set(1, 1, 1);
scene.add(hemisphereLight);

// const animate = () => {
//   requestAnimationFrame(animate);

//   renderer.render(scene, camera);
// };

const resize = () => {
  //   bcr = renderer.domElement.getBoundingClientRect();
  //   console.log(bcr);

  //   const w = bcr.width;
  //   const h = bcr.height;
  //   renderer.setSize(w, h);
  //   camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

function animate(time: number): void {
  // highlightMesh.material.opacity = 1 + Math.sin(time / 120);
  // objects.forEach(function (object) {
  //   object.rotation.x = time / 1000;
  //   object.rotation.z = time / 1000;
  //   object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1000));
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// let bcr: DOMRect;

export function createScene(el: HTMLCanvasElement): void {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  el.width = canvasSize.x;
  el.height = canvasSize.y;
  resize();
  renderer.setAnimationLoop(animate);
  //   animate();
}

// window.addEventListener("resize", resize);

/*

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(10, 15, -22);

orbit.update();

const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    visible: false,
  }),
);
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);

const grid = new THREE.GridHelper(20, 20);
scene.add(grid);

const highlightMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
  }),
);
highlightMesh.rotateX(-Math.PI / 2);
highlightMesh.position.set(0.5, 0, 0.5);
scene.add(highlightMesh);

const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let intersects;

window.addEventListener("mousemove", function (e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);
  intersects = raycaster.intersectObject(planeMesh);
  if (intersects.length > 0) {
    const intersect = intersects[0];
    const highlightPos = new THREE.Vector3()
      .copy(intersect.point)
      .floor()
      .addScalar(0.5);
    highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);

    const objectExist = objects.find(function (object) {
      return (
        object.position.x === highlightMesh.position.x &&
        object.position.z === highlightMesh.position.z
      );
    });

    if (!objectExist) highlightMesh.material.color.setHex(0xffffff);
    else highlightMesh.material.color.setHex(0xff0000);
  }
});

const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 4, 2),
  new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xffea00,
  }),
);

const objects: THREE.Mesh<THREE.BufferGeometry, THREE.Material>[] = [];

window.addEventListener("mousedown", function () {
  const objectExist = objects.find(function (object) {
    return (
      object.position.x === highlightMesh.position.x &&
      object.position.z === highlightMesh.position.z
    );
  });

  if (!objectExist) {
    if (intersects.length > 0) {
      const sphereClone = sphereMesh.clone();
      sphereClone.position.copy(highlightMesh.position);
      scene.add(sphereClone);
      objects.push(sphereClone);
      highlightMesh.material.color.setHex(0xff0000);
    }
  }
  console.log(scene.children.length);
});

function animate(time: number): void {
  highlightMesh.material.opacity = 1 + Math.sin(time / 120);
  objects.forEach(function (object) {
    object.rotation.x = time / 1000;
    object.rotation.z = time / 1000;
    object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1000));
  });
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


*/
