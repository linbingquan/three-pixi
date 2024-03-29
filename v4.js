import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;

//-------------------------------------------------------------------------------------
// 3D Scene canvas
//-------------------------------------------------------------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color("#eee");
const camera = new THREE.PerspectiveCamera(50, width / height);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  transparent: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometry, material);
box.position.z = -1;
scene.add(box);

//-------------------------------------------------------------------------------------
// 2D UI canvas
//-------------------------------------------------------------------------------------

const container = new PIXI.Container();

const app = PIXI.autoDetectRenderer(1024, 1024, {
  transparent: true,
});

const sprite = PIXI.Sprite.from("three-pixi.png");
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
container.addChild(sprite);

//-------------------------------------------------------------------------------------
// Map 2D UI canvas on 3D Plane
//-------------------------------------------------------------------------------------

const texture = new THREE.Texture(app.view);
texture.colorSpace = THREE.SRGBColorSpace;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  }),
);

scene.add(plane);

//-------------------------------------------------------------------------------------
// Render Animation
//-------------------------------------------------------------------------------------

function animate() {
  app.render(container);
  texture.needsUpdate = true;
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}
