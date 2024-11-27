import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGL2Available()) {
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById('container').appendChild(warning);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
camera.position.y = 0
cube.rotation.x = (1.5708/4)
cube.rotation.y =(1.5708/2);


function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);