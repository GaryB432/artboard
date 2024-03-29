import * as THREE from "three";
import { CinematicCamera } from "three/examples/jsm/cameras/CinematicCamera";
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
// import type Stats from "three/examples/jsm/libs/stats.module";

let camera: CinematicCamera;
let scene: THREE.Scene;
let raycaster: THREE.Raycaster;
let renderer: THREE.WebGLRenderer;
// let stats: Stats;

const mouse = new THREE.Vector2();
// let INTERSECTED: THREE.Object3D<THREE.Event> | null;
const radius = 100;
let theta = 0;

// init();
// animate();

function init() {
  camera = new CinematicCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.setLens(5);
  camera.position.set(2, 1, 500);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  const light = new THREE.DirectionalLight(0xffffff, 0.35);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  const geometry = new THREE.BoxGeometry(20, 20, 20);

  for (let i = 0; i < 1500; i++) {
    const object = new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    );

    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;

    scene.add(object);
  }

  raycaster = new THREE.Raycaster();

  // renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // stats = new Stats();
  // document.body.appendChild(stats.dom);

  // document.addEventListener("mousemove", onDocumentMouseMove);

  // window.addEventListener("resize", onWindowResize);

  const effectController = {
    focalLength: 15,
    // jsDepthCalculation: true,
    // shaderFocus: false,
    //
    fstop: 2.8,
    // maxblur: 1.0,
    //
    showFocus: false,
    focalDepth: 3,
    // manualdof: false,
    // vignetting: false,
    // depthblur: false,
    //
    // threshold: 0.5,
    // gain: 2.0,
    // bias: 0.5,
    // fringe: 0.7,
    //
    // focalLength: 35,
    // noise: true,
    // pentagon: false,
    //
    // dithering: 0.0001
  };

  const matChanger = function () {
    // for (const e in effectController) {
    //   if (e in camera.postprocessing.bokeh_uniforms) {
    //     camera.postprocessing.bokeh_uniforms[e].value = effectController[e];
    //   }
    // }

    camera.postprocessing.bokeh_uniforms["znear"].value = camera.near;
    camera.postprocessing.bokeh_uniforms["zfar"].value = camera.far;
    camera.setLens(
      effectController.focalLength,
      undefined, // camera.frameHeight,
      effectController.fstop,
      camera.coc
    );
    effectController["focalDepth"] =
      camera.postprocessing.bokeh_uniforms["focalDepth"].value;
  };

  //

  // const gui = new GUI();

  // gui.add(effectController, "focalLength", 1, 135, 0.01).onChange(matChanger);
  // gui.add(effectController, "fstop", 1.8, 22, 0.01).onChange(matChanger);
  // gui
  //   .add(effectController, "focalDepth", 0.1, 100, 0.001)
  //   .onChange(matChanger);
  // gui.add(effectController, "showFocus", true).onChange(matChanger);

  matChanger();
}

function animate() {
  requestAnimationFrame(animate);
  render();
  // stats.update();
}

function render() {
  theta += 0.1;

  camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
  camera.lookAt(scene.position);

  camera.updateMatrixWorld();

  // find intersections

  raycaster.setFromCamera(mouse, camera);

  // const intersects = raycaster.intersectObjects(scene.children, false);

  // if (intersects.length > 0) {
  //   const targetDistance = intersects[0].distance;

  //   camera.focusAt(targetDistance); // using Cinematic camera focusAt method

  //   if (INTERSECTED != intersects[0].object) {
  //     if (INTERSECTED)
  //       INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

  //     INTERSECTED = intersects[0].object;
  //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
  //     INTERSECTED.material.emissive.setHex(0xff0000);
  //   }
  // } else {
  //   if (INTERSECTED)
  //     INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

  //   INTERSECTED = null;
  // }

  //

  if (camera.postprocessing.enabled) {
    camera.renderCinematic(scene, renderer);
  } else {
    scene.overrideMaterial = null;

    renderer.clear();
    renderer.render(scene, camera);
  }
}
// import * as THREE from "three";

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
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

const resize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight - 100;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

export function createScene(el: HTMLCanvasElement): void {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  init();
  resize();
  animate();
}

window.addEventListener("resize", resize);
