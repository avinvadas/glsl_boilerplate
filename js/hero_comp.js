import * as THREE from 'three';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import frgmt from './shaders/shader01_frgmt.glsl';
import vrtx from './shaders/shader01_vrtx.glsl';
var container = document.getElementById("container");
export default class Sketch{
  constructor(){
    this.time=0;
    this.scene = new THREE.Scene();
    this.width = container.innerWidth;
    this.height = container.innerHeight;
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10);
    this.camera.position.z =1;

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true,} );
    this.renderer.setSize(this.width, this.height);
    container.appendChild( this.renderer.domElement );
    //this.controls = new OrbitControls(this.camera, this.renderer.domElement);


    this.resize();
    this.setupResize();
    this.addObjects();
    this.render();
  }


  setupResize(){
    window.addEventListener('resize', this.resize.bind(this));
  }
  resize(){
    this.container = container;
    this.width = this.container.innerWidth;
    this.height = this.container.innerHeight;
    this.renderer.setSize(this.width,this.height);
    this.camera.aspect = this.width/this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects(){
    this.geometry = new THREE.PlaneBufferGeometry(1.25, 1.25,25,25 );
    this.material = new THREE.ShaderMaterial(
      {
        uniforms:{
          time:{value:0},
        },
        fragmentShader: frgmt,
        vertexShader: vrtx,
        side:THREE.DoubleSide,
        wireframe: false,
        opacity:100,
      }
    );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );

  }
  render(){
    this.time+=0.5;
    this.material.uniforms.time.value = this.time;
    this.mesh.rotation.x = 1.57;

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch(
  {
    dom: document.getElementById('container'),
  }
);
