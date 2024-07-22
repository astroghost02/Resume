// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add space background
const geometry = new THREE.SphereGeometry(500, 60, 40);
const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('space-background.jpg'),
    side: THREE.BackSide
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add planets or galaxies
const planets = [];
const planetData = [
    { name: "JWST Data", info: "Details about JWST Data and its significance in astronomy." },
    { name: "HST Data", info: "Details about HST Data and its contributions to space research." }
    // Add more planets or galaxies as needed
];

const planetRadius = 10;
const planetGeometry = new THREE.SphereGeometry(planetRadius, 32, 32);
planetData.forEach((data, index) => {
    const planetMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100);
    planet.userData = data; // Attach data to the planet
    scene.add(planet);
    planets.push(planet);
});

// Set camera position
camera.position.z = 300;

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Handle mouse click
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        const planet = intersects[0].object;
        const infoBox = document.getElementById('info-box');
        const title = document.getElementById('info-title');
        const description = document.getElementById('info-description');

        title.textContent = planet.userData.name;
        description.textContent = planet.userData.info;
        infoBox.classList.remove('hidden');
    }
}

// Close info box
document.getElementById('close-info').addEventListener('click', () => {
    document.getElementById('info-box').classList.add('hidden');
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Event listener for mouse click
window.addEventListener('click', onMouseClick);

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
