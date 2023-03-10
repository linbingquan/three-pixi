import * as THREE from 'three';

const width = window.innerWidth;
const height = window.innerHeight;

//-------------------------------------------------------------------------------------
// 3D Scene canvas
//-------------------------------------------------------------------------------------

const scene = new THREE.Scene();
scene.fog = new THREE.Fog( '#eeeeee', 2000, 4000 );

const camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
camera.position.set( 0, 0, 700 );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.setClearColor( scene.fog.color, 1 );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 500, 500, 500 );
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh( geometry, material );
cube.position.z = - 500;
cube.rotation.z = - 45;
scene.add( cube );

//-------------------------------------------------------------------------------------
// 2D UI canvas
//-------------------------------------------------------------------------------------

const container = new PIXI.Container();

const app = PIXI.autoDetectRenderer( width, height, {
    transparent: true
} );

const graphics = new PIXI.Graphics();
graphics.beginFill( 0xe60630 );
graphics.moveTo( width / 2 - 200, height / 2 + 100 );
graphics.lineTo( width / 2 - 200, height / 2 - 100 );
graphics.lineTo( width / 2 + 200, height / 2 - 100 );
graphics.lineTo( width / 2 + 200, height / 2 + 100 );
graphics.endFill();

container.addChild( graphics );

//-------------------------------------------------------------------------------------
// Map 2D UI canvas on 3D Plane
//-------------------------------------------------------------------------------------

const texture = new THREE.Texture( app.view );
texture.needsUpdate = true;

const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry( width + 100, height + 100 ),
    new THREE.MeshBasicMaterial( {
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
    } )
);

scene.add( mesh );

//-------------------------------------------------------------------------------------
// Render Animation
//-------------------------------------------------------------------------------------

app.render( container );

function animate() {

    requestAnimationFrame( animate );
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );

}

animate();