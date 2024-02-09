import * as THREE from 'three';
import frgmt from './shaders/shader01_frgmt.glsl';
import vrtx from './shaders/shader01_vrtx.glsl';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


var container;
var camera, scene, renderer;
var keyLight, fillLight, backLight;
var uniforms;
var controls;

init();
animate();

//HEXDECIMAL TO RGB CONVERSION
function convertHexToGLSLRGB(hex){
    var r = parseInt(hex.substring(1,3),16)/255.0;
    var g = parseInt(hex.substring(3,5),16)/255.0;
    var b = parseInt(hex.substring(5,7),16)/255.0;
    return new THREE.Vector3(r,g,b);
}
function extractNumbersFromString(string){
    var numbers = string.match(/\d+/g).map(Number);
    console.log("numbers:"+ numbers);
    return numbers;   
}
function getCSSValue(cssVar){
var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var propertyValue = rootStyles.getPropertyValue(cssVar);
return propertyValue;
 
}

function init(){
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera();
    camera.position.z = 3.0;
    scene = new THREE.Scene();
    
    var primColor = '#ffff00';
    var geometry = new THREE.TorusGeometry(0.5,0.15,1000,1000);
    uniforms = {
        u_time:{type:"f", value: 1.0},
        u_resolution:{type:"v2", value: new THREE.Vector2(),
        color_primary: {type:"v3", value: convertHexToGLSLRGB(primColor)}
    }
    }
    var material = new THREE.ShaderMaterial({
        uniforms:uniforms ,
        vertexShader: vrtx,
        fragmentShader: frgmt,
        lights:true,
        side: THREE.DoubleSide,
        wireframe:false,
        u_time:{value:0},
     
    });
    var mesh = new THREE.Mesh(geometry,material);
    
    scene.add(mesh);
    
    /* set key light */
    keyLight = new THREE.RectAreaLight(0xffffff, 1,  10, 10 );
    keyLight.position.set( 10, 10, 10 );
    keyLight.lookAt(0, 0, 0);
    scene.add(keyLight);
  
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    controls = new OrbitControls( camera, renderer.domElement );

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();
    

}



function onWindowResize(event){
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();

}
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    render();

}
function render(){
    uniforms.u_time.value +=0.05;
    renderer.render(scene,camera);
}