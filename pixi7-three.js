import * as THREE from "three";
import * as PIXI from "pixi";

const width = window.innerWidth;
const height = window.innerHeight;

// three.js

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);

  texture.update();
}

// pixi.js

const app = new PIXI.Application({
  width,
  height,
  backgroundAlpha: 0,
});
document.body.appendChild(app.view);

const texture = new PIXI.BaseTexture(renderer.domElement);
const threeSprite = new PIXI.Sprite(new PIXI.Texture(texture));
threeSprite.anchor.set(0.5);
threeSprite.x = app.screen.width / 2;
threeSprite.y = app.screen.height / 2;
app.stage.addChild(threeSprite);

const sprite = PIXI.Sprite.from("three-pixi.png");
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
app.stage.addChild(sprite);

let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = app.screen.width / 2 + Math.cos(elapsed / 50.0) * 100.0;
});
