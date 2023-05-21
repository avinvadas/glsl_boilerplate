import * as THREE from 'three';
import frgmt from './shaders/shader01_frgmt.glsl';
import vrtx from './shaders/shader01_vrtx.glsl';



var container;
var camera, scene, renderer;
var uniforms;

init();
animate();

function init(){
    container = document.getElementById('container');
    camera = new THREE.Camera();
    camera.position.z = 1.0;
    scene = new THREE.Scene();
    var geometry = new THREE.PlaneBufferGeometry(2.0,2.0);
    uniforms = {
        u_time:{type:"f", value: 1.0},
        u_resolution:{type:"v2", value: new THREE.Vector2()}
    }
    var material = new THREE.ShaderMaterial({
        uniforms:uniforms ,
        vertexShader: vrtx,
        fragmentShader: frgmt
    });
    var mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(event){
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;

}
function animate(){
    requestAnimationFrame(animate);
    render();

}
function render(){
    uniforms.u_time.value +=0.05;
    renderer.render(scene,camera);
}