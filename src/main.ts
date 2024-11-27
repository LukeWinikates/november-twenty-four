import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// TODO: create an approximate data structure
// for each square, draw the box
// for the children of the box, recursively draw their boxes

camera.position.z = 5;
camera.position.y = 0


const clipPlanes = [
  new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
  new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0 ),
  new THREE.Plane( new THREE.Vector3( 0, 0, - 1 ), 0 )
];

init();
render();

function init() {
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.localClippingEnabled = true;
  document.body.appendChild( renderer.domElement );

  // camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );

  camera.position.set( - 1.5, 2.5, 3.0 );

  const controls = new OrbitControls( camera, renderer.domElement );
  // controls.addEventListener( 'change', render ); // use only if there is no animation loop
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.enablePan = false;

  const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 4.5 );
  light.position.set( - 1.25, 1, 1.25 );
  scene.add( light );

  //

  const group = new THREE.Group();

  for ( let i = 1; i <= 30; i += 2 ) {

    // const geometry = new THREE.SphereGeometry( i / 30, 48, 24 );
    const geometry = new THREE.BoxGeometry(i/30, i/30, i/30);

    const material = new THREE.MeshPhongMaterial( {

      color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5, THREE.SRGBColorSpace ),
      side: THREE.DoubleSide,
      clippingPlanes: clipPlanes,
      clipIntersection: true,
      alphaToCoverage: true,

    } );

    group.add( new THREE.Mesh( geometry, material ) );

  }

  scene.add( group );

  // helpers

  const helpers = new THREE.Group();
  helpers.add( new THREE.PlaneHelper( clipPlanes[ 0 ], 2, 0xff0000 ) );
  helpers.add( new THREE.PlaneHelper( clipPlanes[ 1 ], 2, 0x00ff00 ) );
  helpers.add( new THREE.PlaneHelper( clipPlanes[ 2 ], 2, 0x0000ff ) );
  helpers.visible = false;
  scene.add( helpers );

  window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  render();
}

function render() {
  renderer.render( scene, camera );
}

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);