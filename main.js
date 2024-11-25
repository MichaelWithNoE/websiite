import * as THREE from 'three';
let scene, camera, renderer, cd, pivot, clock;
let isRising = false;

// Scene setup
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = null;

// Light setup
const light = new THREE.AmbientLight(0x404040);  // Ambient light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);


// Load the 3D model and texture
const loader = new THREE.OBJLoader();
const textureLoader = new THREE.TextureLoader();

loader.load('img/lowpoly_cd/LowpolyCD.obj', function (object) {
  textureLoader.load('img/lowpoly_cd/texture.png', function (texture) {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = texture;
      }
    });
    object.scale.set(1.4, 1.4, 1.4);
    
    // Create a pivot object for rotation
    pivot = new THREE.Object3D();
    scene.add(pivot);

    // Position the CD relative to the pivot
    object.position.set(5, -50, 18);  // Initial position (below the camera)
    
    pivot.add(object);  // Add the CD to the pivot, so it rotates around it
    
    cd = object; // Save the model for further manipulation
  });
});

// Set up the camera position
camera.position.z = 60;
camera.position.y = 13;

// Button click event
document.getElementById('button').addEventListener('click', () => {
  isRising = true;
  const overlay = document.getElementById('overlay');
  overlay.style.opacity = 0.6;
  overlay.style.pointerEvents = "all";      
  
});

// Animation loop
clock = new THREE.Clock();

let rotationspeed = 5;
let risingSpeed = 10;  // Speed at which the CD rises
let bool1 = false;

function animate() {
  requestAnimationFrame(animate);
  const deltaTime = clock.getDelta() * 4;

  if (cd && isRising) {
    // Rise up until the CD reaches the camera's view
    if (cd.position.y < 0 && risingSpeed>=0) {
      
      cd.position.y += risingSpeed * deltaTime;

      risingSpeed = risingSpeed - 1.01 * deltaTime;
      rotationspeed += -0.44 * deltaTime;
      cd.position.z += -0.1 * deltaTime;
    }
    
    
    

    // Rotate the pivot (which rotates the model around the pivot point)
    pivot.rotation.y += rotationspeed * deltaTime; // Continuous rotation around the pivot
  renderer.render(scene, camera);
}
}

animate();

// Add event listener to toggle the overlay







//document.getElementById('instrument1').addEventListener('click', () => {;}
