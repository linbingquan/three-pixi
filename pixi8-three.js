import * as THREE from "three";
import * as PIXI from "pixi";

const width = window.innerWidth;
const height = window.innerHeight;

//-------------------------------------------------------------------------------------
// 3D Scene canvas
//-------------------------------------------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//-------------------------------------------------------------------------------------
// 2D UI canvas
//-------------------------------------------------------------------------------------

const app = new PIXI.Application();
await app.init({
  width,
  height,
  backgroundAlpha: 0,
});
document.body.appendChild(app.canvas);

const png = await PIXI.Assets.load('./three-pixi.png');
const sprite = new PIXI.Sprite(png);
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
sprite.zIndex = 1;
app.stage.addChild(sprite);

let elapsed = 0.0;
app.ticker.add((time) => {
  elapsed += time.deltaTime;
  sprite.x = app.screen.width / 2 + Math.cos(elapsed / 50.0) * 100.0;
});

//-------------------------------------------------------------------------------------
// Map 3D UI canvas on 2D Plane
//-------------------------------------------------------------------------------------

const source = new PIXI.CanvasSource({ resource: renderer.domElement });
const texture = new PIXI.Texture(source);
const threeSprite = new PIXI.Sprite(texture);
threeSprite.anchor.set(0.5);
threeSprite.x = app.screen.width / 2;
threeSprite.y = app.screen.height / 2;
app.stage.addChild(threeSprite);

//-------------------------------------------------------------------------------------
// Render Animation
//-------------------------------------------------------------------------------------

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  source.update();
}

renderer.setAnimationLoop(animate);
