import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// Setting up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setting up rendering
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

renderer.render(scene,camera);
// Possible built in geometries: https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry




//Geometry
const geometry = new THREE.TorusKnotGeometry( 9.5, 3.5541, 300, 18, 3, 10); 
//const particlesGeometry = new THREE.BufferGeometry;
const Planegeometry = new THREE.PlaneGeometry( 500, 500,128,128 );
Planegeometry.rotateX(-Math.PI/2)

/*
function addStars(){
    const stargeometry= new THREE.SphereGeometry(0.25,24,24);
    const starmaterial =new THREE.MeshStandardMaterial({color:0xFF9527})
    const star = new THREE.Mesh(stargeometry, starmaterial);
    const [x,y,z]=Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x,y,z);
    scene.add(star)

}

Array(200).fill().forEach(addStars)
*/


//Texture
const grassTexture = new THREE.TextureLoader().load('images/grass.png');



//Background
scene.background=new THREE.Color(0x35052F)

//Material
const material = new THREE.PointsMaterial( { color: 0xFFFFFF,size:0.05 } ); 
const Planematerial = new THREE.MeshStandardMaterial( {color: 0x556833,roughness:1} );
const grassMaterial = new THREE.SpriteMaterial({ map: grassTexture, color: 0xffffff });



for (let i = 0; i < 1000; i++) {
    const grass = new THREE.Sprite(grassMaterial);
    grass.position.set(Math.random() * 500 - 250, 0, Math.random() * 500 - 250);
    grass.scale.set(10, 10, 1);
    scene.add(grass);
  }
  


//Objects and constants
const torusKnot = new THREE.Points(geometry, material);
const plane = new THREE.Mesh( Planegeometry, Planematerial );




/*const particlesMesh = new THREE.Points(particlesGeometry,material)

const particlesCount = 2000;
const posArray= new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount*3; i++) {
    posArray[i]= Math.random()
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray,3))
*/

//Scene adding
scene.add(torusKnot,plane);



camera.position.z = 15;

//Adding ligthing
const pointlight= new THREE.PointLight(0xffffff)
pointlight.position.set(0,0,0)
const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight);


//Lighting & Grid Helper
const LightHelper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(LightHelper,gridHelper);


//Orbit Control
const controls = new OrbitControls( camera, renderer.domElement );


// Set up animation
function animate () {
    requestAnimationFrame(animate);



    torusKnot.rotation.x += 0.001;
    torusKnot.rotation.y += 0.002;
    torusKnot.rotation.z += 0.003;

    controls.update()

    renderer.render(scene, camera);
};

// Handle window resizing
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Start the animation loop
animate();


