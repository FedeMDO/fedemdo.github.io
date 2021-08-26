import * as THREE from 'https://cdn.skypack.dev/three';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-5, -5, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color: Math.floor(Math.random() * 16777215)
    });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = [
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100)
    ];

    star.position.set(x, y, z);
    scene.add(star);
}

for (let i = 0; i < 600; i++) {
    addStar();
}

// Background

// const spaceTexture = new THREE.TextureLoader().load('../assets/space.jpg');
// scene.background = spaceTexture;

// Avatar

const fedeTexture = new THREE.TextureLoader().load('../assets/yo-porto.jpg');

const fede = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: fedeTexture })
);

scene.add(fede);

// Moon

const moonTexture = new THREE.TextureLoader().load('../assets/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('../assets/normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
);

scene.add(moon);

moon.position.x = -10;
moon.position.z = 30;

fede.position.x = 2;
fede.position.z = -5;

// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    fede.rotation.y += 0.01;
    fede.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
    requestAnimationFrame(animate);

    moon.rotation.x += 0.005;

    renderer.render(scene, camera);
}

animate();
