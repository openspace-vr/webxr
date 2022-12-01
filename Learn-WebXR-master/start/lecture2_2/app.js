import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );

        //initial position of the camera 
        //first parameter - field of view,
		//second parameter - aspect ratio,
	    //third parameter - near plane (Anything closer than this will be hidden)
		//fourt parameter - far plane (Anything further will be hidden)
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
		this.camera.position.set(0, 0, 4); //EUS East x-axis, up y-axis camera points up , South z-axis which means the camera points south )

		//Scene is for objects and lights
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xaaaaaa);
        
		//adding light to scene

		//hemisphere light
        const ambient = new THREE.Scene();
		this.scene.add (ambient)

		//adding directional light
        const light = new THREE.DirectionalLight();
		light.position.set(0.2, 1, 1);
		this.scene.add (light);

		this.renderer = new THREE.WebGLRenderer({ antialias: true});
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight);
		container.appendChild ( this.renderer.domElement );

		this.renderer.setAnimationLoop(this.render.bind(this));

		const geometry = new THREE.BoxBufferGeometry();
		const material = new THREE.MeshStandardMaterial({ color: 0xff0000});

		this.mesh = new THREE.Mesh (geometry, material);

		this.scene.add (this.mesh);
		
		//orbitControls allows you to manipulate objects in the scene
		const controls = new OrbitControls( this.camera, this.renderer.domElement)

		window.addEventListener('resize', this.resize.bind(this));	
	}	
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectMatrix();
		this.renderer.setSize (window.innerWidth, window.innerHeight ); 
    }
    
	render( ) {  
		this.mesh.rotateY(0.01);
        this.renderer.render(this.scene, this.camera)
    }
}

export { App };