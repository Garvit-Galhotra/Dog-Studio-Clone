# Learning about what is Three.js

1. Scene
2. Camera
3. Materials
4. Lights

# Understanding the Code

import * as THREE from "three";

const scene = new THREE.Scene();

// How to Create a Camera
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
// three.js Does not have any unit Important

// Adding camera into the scene
scene.add(camera);

// Position of Camera

camera.position.z = 5;
console.log(camera.position);

// Making a cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Material of our cube
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

// Creating a cube
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Adding cube into the scene
scene.add(cube);

// Position of Cube
console.log(cube.position);

// creating a light
const light = new THREE.DirectionalLight(0xffffff, 3);

// Adding light into the scene
scene.add(light);

light.position.y = 4;
light.position.z = 4;

// Position of Light
console.log(light.position);

// Creating a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

// Adding the renderer into the HTML code
document.body.appendChild(renderer.domElement);

// Make a function so that renderer will render it every second

let animate = () => {
  // Adding a bit of animation into the scene 
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.z += 0.01;

  renderer.render(scene, camera);
}; // funFact it will render every second 16 times

// This is make the animate function to run again and again 
renderer.setAnimationLoop(animate);
