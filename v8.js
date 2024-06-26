import * as THREE from "three";
import * as PIXI from "pixi";

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
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometry, material);
box.position.z = -1;
scene.add(box);

//-------------------------------------------------------------------------------------
// 2D UI canvas
//-------------------------------------------------------------------------------------

const app = new PIXI.Application();
await app.init({
  width: 1024,
  height: 1024,
  backgroundAlpha: 0,
});

const png = await PIXI.Assets.load('./three-pixi.png');
const sprite = new PIXI.Sprite(png);
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
app.stage.addChild(sprite);

let elapsed = 0.0;
app.ticker.add((time) => {
  elapsed += time.deltaTime;
  sprite.x = app.screen.width / 2 + Math.cos(elapsed / 50.0) * 100.0;
});

//-------------------------------------------------------------------------------------
// Map 2D UI canvas on 3D Plane
//-------------------------------------------------------------------------------------

const texture = new THREE.Texture(app.canvas);
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
  texture.needsUpdate = true;
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
