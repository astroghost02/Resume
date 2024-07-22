// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create a galaxy effect
const geometry = new THREE.SphereGeometry(500, 60, 40);
const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('space-background.jpg'),
    side: THREE.BackSide
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set camera position
camera.position.z = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Smooth scrolling
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
