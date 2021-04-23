import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App {
	constructor() {
		const container = document.createElement('div');
		document.body.appendChild(container);

		// at minimum, any THREE.js app requires a scene, camera, and renderer
		// - scene: contains all the objects and lights
		// - camera: acts as the viewer's position & orientation
		// - renderer: usually WebGLRenderer

		// PerspectiveCamera: further objects appear smaller
		// params: Field of View (fov) in degrees,  aspect ratio of renderered view, near plane, far plane
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
		this.camera.position.set(0, 0, 4);

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xaaaaaa); // default background color is white

		// add ambient light to scene
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
		this.scene.add(ambient);

		// add a directional light to scene
		const light = new THREE.DirectionalLight(); // by default points to origin
		light.position.set(0.2, 1, 1);
		this.scene.add(light);

		this.renderer = new THREE.WebGL1Renderer({ antialias: true }); // antialias is particularly important for VR!
		this.renderer.setPixelRatio(window.devicePixelRatio); // need to set pixel ratio to prevent blurring!
		this.renderer.setSize(window.innerWidth, window.innerHeight); // set size of the renderer!

		container.appendChild(this.renderer.domElement); // add renderer dom element to the DOM 

		this.renderer.setAnimationLoop(this.render.bind(this)); // this.render will be called up to 60 times a second

		const geometry = new THREE.BoxBufferGeometry();
		const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

		this.mesh = new THREE.Mesh(geometry, material);
		this.scene.add(this.mesh);

		const controls = new OrbitControls(this.camera, this.renderer.domElement);

		window.addEventListener('resize', this.resize.bind(this));
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	render() {
		this.mesh.rotateY(0.01);
		this.renderer.render(this.scene, this.camera);
	}
}

export { App };