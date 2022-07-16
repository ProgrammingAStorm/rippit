import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.142.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 12500);
camera.position.set(5, 5, 5);

let controls;

let renderer;

let data;

const objects = [];

const get =  await fetch('http://localhost:3001/api/posts/8', {
    method: 'GET'
});

const content = await get.json()

integrate(content, document.querySelector('#edit'));

function integrate(content, element) {
    content = content.content;

    data = parse(content)

    if(typeof data === 'string') {
        console.log('regular content')
        return;
    }

    renderer = new THREE.WebGLRenderer({ canvas: element });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio);

    data.objects.forEach(value => {
        const geometry = getGeo( value.geo, value );
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
            value.position.x,
            value.position.y,
            value.position.z
        );

        scene.add(light);
    })

    controls = new OrbitControls(camera, renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if(objects.length > 0) {
        objects.forEach((value, index) => {
            rotate(value.obj, objects[index].rotation)
        });
    }

    controls.update()

    renderer.render( scene, camera );
}

function rotate(obj, rot) {
    obj.rotation.x += parseFloat(rot.x); 
    obj.rotation.y += parseFloat(rot.y);
    obj.rotation.z += parseFloat(rot.z);
}

function getGeo(geometry, value) {

    switch(geometry) {
        case 'box':
            geometry = new THREE.BoxGeometry(
                value.width,
                value.height,
                value.depth
            )
        break;

        case 'cone':
            geometry = new THREE.ConeGeometry(
                value.radius,
                value.height
            )
        break;

        case 'sphere':
            geometry = new THREE.SphereGeometry(
                value.radius
            );
        break;
        
        case 'torus':
            geometry = new THREE.TorusGeometry(
                value.radius,
                value.tube
            );
        break;

        case 'torus-knot':
            geometry = new THREE.TorusKnotGeometry(
                value.radius,
                value.tube,
                null,
                null,
                value.p,
                value.q
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

function parse(content) {
    try {
        const parsed = JSON.parse(content);

        return parsed;
    } catch (error) {
        return content;
    }
}