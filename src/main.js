import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
const scene = new THREE.Scene();

/*** Sizes   ***/

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;


/*** canvas ***/

const canvas = document.querySelector("#webGL");

/*** controls ***/

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*** texture ***/

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("./matcaps/10.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
/*** FontLoader  ***/

const fontLoader = new FontLoader();
fontLoader.load("./fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hatef Sanati", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curvieSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  material.wireframe = true;
  textGeometry.center();
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  for (let i = 0; i < 400; i++) {
    const donat = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.2, 20, 45),
      material
    );

    donat.position.x = (Math.random() - 0.5) * 20;
    donat.position.y = (Math.random() - 0.5) * 20;
    donat.position.z = (Math.random() - 0.5) * 20;

    donat.rotation.x = Math.random() * Math.PI;
    donat.rotation.y = Math.random() * Math.PI;
    donat.rotation.z = Math.random() * Math.PI; 

    const scale = Math.random();
    donat.scale.set(scale, scale, scale);

    scene.add(donat);
  }
});
/*** renderer ***/

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/*** animation ***/

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
