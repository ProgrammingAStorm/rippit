import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.142.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#three') });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 12500);

const controls = new OrbitControls(camera, renderer.domElement);

const data = {};

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhysicalMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.set(5, 5, 5);

animate();

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render( scene, camera );
}

$('button[id*=ambient]').click(function(event) {
    event.preventDefault();

    const target = $(this);

    if(target.attr('id') === 'ambient-on') {
        if(!data.ambient) {
            data.ambient = new THREE.AmbientLight();

            scene.add(data.ambient);
        }
    } else {
        if(data.ambient) {
            data.ambient.removeFromParent();
            data.ambient.dispose();
            data.ambient = null;
        }
    }
});

$('button[id*=grid]').click(function(event) {
    event.preventDefault();

    const target = $(this);

    if(target.attr('id') === 'grid-on') {
        if(!data.gridHelper) {
            const size = 10;
            const divisions = 10;

            data.gridHelper = new THREE.GridHelper( size, divisions );

            scene.add( data.gridHelper );
        }
    } else {
        if(data.gridHelper) {
            data.gridHelper.removeFromParent();
            data.gridHelper = null;
        }
    }
});

$('.dropdown-trigger').click(function(event) {
    event.preventDefault();

    const target = $(this).parent()

    

    if(target.hasClass('is-active')) {
        $('.is-active').removeClass('is-active');
        
        target.removeClass('is-active');
    } else {
        $('.is-active').removeClass('is-active');
        
        target.addClass('is-active');
    }
});

/*$('.dropdown-trigger').blur(function(event) {
    event.preventDefault();

    const target = $(this)

    if(target.hasClass('.dropdown-trigger')) {
        return;
    }

    if(target.hasClass('is-active')) {
        target.removeClass('is-active');
    }
});*/