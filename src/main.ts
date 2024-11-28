import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {data, UnitOfInvocation} from "./data";
import {Object3D} from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;
camera.position.y = 0

// TODO: get the clipping interaction working
// TODO: get them lined up on the right axis
// TODO: figure out how to size the depth

init();
animate();

function createBox(value: UnitOfInvocation): Object3D {
  const scale = value.invocationCount
  const geometry = new THREE.BoxGeometry(scale / 10, scale / 10, scale / 10);

  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5, THREE.SRGBColorSpace),
    side: THREE.DoubleSide,
    clippingPlanes: [
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
    ],
    clipIntersection: true,
    alphaToCoverage: true,
  });

  return new THREE.Mesh(geometry, material);
}

function init() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.localClippingEnabled = true;
  document.body.appendChild(renderer.domElement);
  camera.position.set(-5.5, 2.5, 3.0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.enablePan = false;

  const light = new THREE.HemisphereLight(0xffffff, 0x080808, 4.5);
  light.position.set(-1.25, 1, 1.25);
  scene.add(light);
  const group = new THREE.Group();
  for (let [index, entryPoint] of data.entries()) {
    // your code goes here
    const box = createBox(entryPoint);
    box.position.z = index + (entryPoint.invocationCount / 10);
    console.log(box.position);
    scene.add(box);
  }
  scene.add(group);
  const helpers = new THREE.Group();
  helpers.visible = false;
  scene.add(helpers);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  animate();
}

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
