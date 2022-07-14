import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.142.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

let renderer;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 12500);
camera.position.set(5, 5, 5)

let data;

const objects = [];

function integrate(content, element) {
    data = content;

    renderer = new THREE.WebGLRenderer({ canvas: element });

    data.objects.forEach(value => {
        const geometry = getGeo( value.geo );
        const material = getMat( value.mat, value.color );

        const obj = new THREE.Mesh(geometry, material);

        const position = value.pos;
        const rotation = value.rot;

        obj.position.set(
            position.x,
            position.y,
            position.z
        );
        
        objects.push({
            obj: obj,
            rotation: rotation
        });

        scene.add(obj);
    });

    data.lights.forEach(value => {
        const light = new THREE.PointLight(
            new THREE.Color(`rgb(
                ${ parseInt( value.color.red ) },
                ${ parseInt( value.color.green ) },
                ${ parseInt( value.color.blue ) })`
            ),
            6,
            100
        );

        light.position.set(
            value.pos.x,
            value.pos.y,
            value.pos.z
        );

        scene.add(light);
    })

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if(objects.length > 0) {
        objects.forEach((value, index) => {
            rotate(value.obj, objects[index].rotation)
        });
    }

    controls.update();

    renderer.render( scene, camera );
}

function rotate(obj, rot) {
    obj.rotation.x += parseFloat(rot.x); 
    obj.rotation.y += parseFloat(rot.y);
    obj.rotation.z += parseFloat(rot.z);
}

function getGeo(geometry, details) {
    switch(geometry) {
        case 'box':
            geometry = new THREE.BoxGeometry(
                details.width,
                details.height,
                details.depth
            )
        break;

        case 'cone':
            geometry = new THREE.ConeGeometry(
                details.radius,
                details.height
            )
        break;

        case 'sphere':
            geometry = new THREE.SphereGeometry(
                details.radius
            );
        break;
        
        case 'torus':
            geometry = new THREE.TorusGeometry(
                details.radius,
                details.tube
            );
        break;

        case 'torus-knot':
            geometry = new THREE.TorusKnotGeometry(
                details.radius,
                details.tube,
                null,
                null,
                details.p,
                details.q
            );
        break;
    }

    return geometry;
}

function getMat(material, color) {
    switch(material) {
        case 'basic':
            material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( color.red ) },
                ${ parseInt( color.green ) },
                ${ parseInt( color.blue ) })`
            )});
        break;

        case 'normal':
            material = new THREE.MeshNormalMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( color.red ) },
                ${ parseInt( color.green ) },
                ${ parseInt( color.blue ) })`
            )});
        break;

        case 'physical':
            material = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( color.red ) },
                ${ parseInt( color.green ) },
                ${ parseInt( color.blue ) })`
            )});
        break;

        case 'toon':
            material = new THREE.MeshToonMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( color.red ) },
                ${ parseInt( color.green ) },
                ${ parseInt( color.blue ) })`
            )});
        break;
    }

    return material;
}

module.exports = integrate;