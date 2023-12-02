import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';

// Create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.autoRotateSpeed = 5;
controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
}

controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
}

controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
}

// Camera
camera.position.set(0, 25, 75);

// Create a Skybox
var create_skybox = function () {
    // create a box geometry
    var geometry = new THREE.BoxGeometry(1000, 1000, 1000);

    var front_texture = new THREE.TextureLoader().load("NiagaraFalls3/posx.jpg");
    var back_texture = new THREE.TextureLoader().load("NiagaraFalls3/negx.jpg");
    var up_texture = new THREE.TextureLoader().load("NiagaraFalls3/posy.jpg");
    var down_texture = new THREE.TextureLoader().load("NiagaraFalls3/negy.jpg");
    var right_texture = new THREE.TextureLoader().load("NiagaraFalls3/posz.jpg");
    var left_texture = new THREE.TextureLoader().load("NiagaraFalls3/negz.jpg");

    // add textures to a material array in the correct order (front-back-up-down-right-left)
    var materials = [
        new THREE.MeshBasicMaterial({ map: front_texture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: back_texture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: up_texture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: down_texture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: right_texture, side: THREE.BackSide }),
        new THREE.MeshBasicMaterial({ map: left_texture, side: THREE.BackSide })
    ];

    // create skybox
    var skybox = new THREE.Mesh(geometry, materials);
    // skybox.position.y = 1000;
    scene.add(skybox);
}

// Call the function to create the skybox
create_skybox();

// Create a ground
var create_ground = function () {
    var geometry = new THREE.PlaneGeometry(50, 50, 50);
    var grass_texture = new THREE.TextureLoader().load("grass/Green-Grass-Ground-Texture-DIFFUSE.jpg");
    var normal_texture = new THREE.TextureLoader().load("grass/Green-Grass-Ground-Texture-NORMAL.jpg");
    var disp_texture = new THREE.TextureLoader().load("grass/Green-Grass-Ground-Texture-DISP.jpg");
    var specular_texture = new THREE.TextureLoader().load("grass/Green-Grass-Ground-Texture-SPECULAR.jpg");
    var material = new THREE.MeshPhongMaterial({ map: grass_texture, normalMap: normal_texture, displacementMap: disp_texture, specularMap: specular_texture, specular: 0xffffff, shininess: 20 });
    var ground = new THREE.Mesh(geometry, material);
    ground.rotation.x -= Math.PI / 2;
    scene.add(ground);
}

// Call the function to create the ground
create_ground();

// Add ambient light to illuminate the scene
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

// Function to make a Hexagonal Pedestal
function createHexagon(radius, height, texturePath, color, roughness, metalness) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 6);

    if (texturePath) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: roughness,
            metalness: metalness,
        });
        const circle = new THREE.Mesh(geometry, material);
        return circle;

    } else if (color) {
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.0,
            metalness: 0.2
        });
        const circle = new THREE.Mesh(geometry, material);
        return circle;
    }
}

// Function to make a Collar
function createCollar(radiusTop, radiusBottom, height, radialSegment, texturePath, color, roughness, metalness) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegment);

    if (texturePath) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: roughness,
            metalness: metalness,
        });
        const circle = new THREE.Mesh(geometry, material);
        return circle;

    } else if (color) {
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.0,
            metalness: 0.2
        });
        const circle = new THREE.Mesh(geometry, material);
        return circle;
    }
}

// Function to make a Circle
function createCircle(radius, segment, texturePath, color, roughness, metalness) {
    const geometry = new THREE.CircleGeometry(radius, segment);

    if (texturePath) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: roughness,
            metalness: metalness,
        });
        const circle = new THREE.Mesh(geometry, material);
        return circle;

    } else if (color) {
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.0,
            metalness: 0.2,

        });
        const circle = new THREE.Mesh(geometry, material);
        return circle;
    }
}

// Function to make a Dome
function createColorfulDome(radius, widthSegments, heightSegments, texturePath, colors, roughness, metalness) {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, Math.PI * 2, Math.PI * 2, 0, Math.PI / 2); // radius, widthSegments, heightSegments,phiStart, phiLength, thetaStart, thetaLength

    if (texturePath) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: roughness,
            metalness: metalness,
        });
        const dome = new THREE.Mesh(geometry, material);
        return dome;

    } else {
        const material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: roughness,
            metalness: metalness
        });

        const positionAttribute = geometry.getAttribute('position');
        const vertexColors = [];

        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const z = positionAttribute.getZ(i);

            let color;
            if (x >= 0 && z >= 0) {
                color = new THREE.Color(colors[0]); // First quarter
            } else if (x < 0 && z >= 0) {
                color = new THREE.Color(colors[1]); // Second quarter
            } else if (x < 0 && z < 0) {
                color = new THREE.Color(colors[2]); // Third quarter
            } else {
                color = new THREE.Color(colors[3]); // Fourth quarter
            }

            vertexColors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(vertexColors, 3));

        const dome = new THREE.Mesh(geometry, material);
        return dome;
    }
}

// Function to create a random cube with a glowing effect
function createRandomGlowingCube() {
    const size = Math.random() * 7 + 3; // Random size between 3 and 10
    const cubeGeometry = new THREE.BoxGeometry(size, size, size);

    // Create a mesh with the glowing material
    const glowingMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        blending: THREE.AdditiveBlending, // Additive blending for the glowing effect
    });

    // Create a cube using the geometry and glowing material
    const cube = new THREE.Mesh(cubeGeometry, glowingMaterial);

    // Set initial position above the ground
    cube.position.set(Math.random() * 200 - 100, size / 2, Math.random() * 200 - 100);

    // Set random rotation
    cube.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);

    // Set transparent and opacity
    cube.material.transparent = true;
    cube.material.opacity = 0.5;

    cube.material.side = THREE.DoubleSide;

    // Add the cube to the array
    flyingCubes.push(cube);

    // Add the cube to the scene
    scene.add(cube);
}

// Function to create a bubbles
function createBubble() {
    const geometry = new THREE.SphereGeometry(Math.random() * 3 + 1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: bubbleFlare,
        roughness: 0.0,
        metalness: 0.0,
        emissive: 0x545454,
        color: 0x7CC4EE
    });

    const bubble = new THREE.Mesh(geometry, material);

    // Randomly position the bubble within the scene
    bubble.position.set(Math.random() < 0.5 ? Math.random() * 20 - 50 : Math.random() * 20 + 30, 0, Math.random() < 0.5 ? Math.random() * 20 - 50 : Math.random() * 20 + 30);

    // Set transparent and opacity
    bubble.material.transparent = true;
    bubble.material.opacity = 0.9;
    bubble.material.depthTest = false;

    bubble.material.side = THREE.DoubleSide;

    bubbles.push(bubble);

    scene.add(bubble);
}

// Make a base pedestal
const bPedestal = createHexagon(10, 1, '', 0x1D1D1D, 0.5, 0.5);
bPedestal.position.set(0, 0.5, 0);
scene.add(bPedestal);

// Make a collar
const collar = createCollar(1, 1, 25, 32, '', 0x666666, 0.0, 0.6);
collar.position.set(0, 12.5, 0);
scene.add(collar);

// Make a top pedestal
const tPedestal = createCircle(25, 32, '', 0x444444, 0.2, 0.4);
tPedestal.position.set(0, 25, 0);
tPedestal.rotation.x = Math.PI / 2;
tPedestal.material.side = THREE.DoubleSide;
scene.add(tPedestal);

const ballColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];

// Make a dome
const dome = createColorfulDome(25, 32, 32, '', ballColors, 0.0, 0.0,);
dome.position.set(0, 25, 0);
dome.material.transparent = true;
dome.material.opacity = 0.5;
dome.material.side = THREE.DoubleSide;
scene.add(dome);

// Arrays to store the cubes
const flyingCubes = [];
const sinkingCubes = [];

// Create a glare texture
const loader = new THREE.TextureLoader();
const bubbleFlare = loader.load('bubble-glare.png');

// Arrays to store the bubbles
const bubbles = [];

// Create a cube every 0.1 seconds
setInterval(() => {
    createRandomGlowingCube();
}, 500);

setInterval(() => {
    createBubble();
}, 250);

// // Create axes helper
// const axesHelper = new THREE.AxesHelper(100); // The parameter specifies the size of the axes
// scene.add(axesHelper);

// Animation
function animateFlyingCubes() {
    flyingCubes.forEach(cube => {
        if (cube.position.y < Math.floor(Math.random() * 11) + 15) {
            cube.position.y += 0.1; // Move the cube up until it reaches a certain height
        } else {
            // Add the cube to the sinkingCubes array
            sinkingCubes.push(cube);

            // Remove the cube from the flyingCubes array
            const index = flyingCubes.indexOf(cube);
            if (index !== -1) {
                flyingCubes.splice(index, 1);
            }

        }
    })
};

function animateSinkingCubes() {
    for (let i = sinkingCubes.length - 1; i >= 0; i--) {
        const cube = sinkingCubes[i];
        cube.position.y -= 0.1; // Move the sinking cube down

        // Check if the cube is below the ground
        if (cube.position.y < -0.5) {
            // Remove the cube from the scene
            scene.remove(cube);

            // Remove the cube from the sinkingCubes array
            sinkingCubes.splice(i, 1);
        }
    }
}

// function animateSpinningCube() {

//     for (let i = flyingCubes.length - 1; i >= 0; i--) {
//         const cube = flyingCubes[i];
//         // Random possibility 
//         var randomFactor = Math.random();
//         // Determining whether to add or subtract based on the random number
//         var rotationChange = randomFactor < 0.5 ? 0.1 : -0.1;
//         cube.rotation.x += rotationChange;
//         cube.rotation.y += rotationChange;
//         cube.rotation.z += rotationChange;
//     }

//     for (let i = sinkingCubes.length - 1; i >= 0; i--) {
//         const cube = sinkingCubes[i];
//         // Random possibility 
//         var randomFactor = Math.random();
//         // Determining whether to add or subtract based on the random number
//         var rotationChange = randomFactor < 0.5 ? 0.1 : -0.1;
//         cube.rotation.x += rotationChange;
//         cube.rotation.y += rotationChange;
//         cube.rotation.z += rotationChange;
//     }
// }

function animateBubble() {
    bubbles.forEach(bubble => {
        if (bubble.position.y < Math.floor(Math.random() * 11) + 50) {
            bubble.position.y += 0.1; // Move the cube up until it reaches a certain height
        } else {
            // Remove the bubble from the scene
            scene.remove(bubble);

            // Remove the bubble from the sinkingCubes array
            const index = bubbles.indexOf(bubble);
            bubbles.splice(index, 1);
        }
    })
};

// Load 3d model
const objLoader = new OBJLoader();

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Load the texture
const texture = textureLoader.load('Tree1/BarkDecidious0143_5_S.jpg');
// Create a basic material with the loaded texture
const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05,
});
// Load the object
objLoader.load(
    'Tree1/TreeA.obj',
    (object) => {
        // Set the material of the loaded object to the one with texture
        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        object.position.set(0, -0.5, 25);
        object.scale.set(1.5, 1.5, 1.5);

        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);

// Load the texture
const texture2 = textureLoader.load('Tree1/Leaves0120_35_S.png');
// Create a basic material with the loaded texture
const material2 = new THREE.MeshPhongMaterial({
    map: texture2,
    bumpMap: texture2,
    bumpScale: 0.05, // Adjust the bumpiness
});
// Load the object
objLoader.load(
    'Tree1/LeafAobj.obj',
    (object) => {
        // Set the material of the loaded object to the one with texture
        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material2;
            }
        });

        object.position.set(0, -0.5, 25);
        object.scale.set(1.5, 1.5, 1.5);

        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);

var create_crate = function() {
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var crate_texture = new THREE.TextureLoader().load("crate/crate0_diffuse.png");
    var bump_map_texture = new THREE.TextureLoader().load("crate/crate0_bump.png");
    var normal_map_texture = new THREE.TextureLoader().load("crate/crate0_normal.png");
    var material = new THREE.MeshPhongMaterial({
        // map: crate_texture,
        bumpMap: bump_map_texture,
        normalMap: normal_map_texture,
    });    
    
    var crate = new THREE.Mesh(geometry, material);
    crate.position.set(10, 10, 10);
    scene.add(crate);
}

create_crate();

function animate() {
    requestAnimationFrame(animate);

    // Spin the ball
    dome.rotation.y += 0.01;

    // Move flying cubes up and sinking cubes down
    animateFlyingCubes();
    animateSinkingCubes();
    // animateSpinningCube();
    // Animation of Bubbles
    animateBubble();

    renderer.render(scene, camera);

    controls.update();

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});


