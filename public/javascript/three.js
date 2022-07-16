import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.142.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#three') });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 12500);
camera.position.set(5, 5, 5)

const controls = new OrbitControls(camera, renderer.domElement);

const data = {
    objects: {
        real: [],
        partial: []
    },
    lights: {
        real: [],
        partial: []
    }
};

updateInScene();

animate();

function animate() {
    requestAnimationFrame(animate);

    if(data.objects.real.length > 0) {
        data.objects.real.forEach((value, index) => {
            rotate(value, data.objects.partial[index].rot)
        });
    }

    controls.update();

    renderer.render( scene, camera );
}

function clearObj() {
    $('#obj-name').val('');

    $('div[id*=obj-]').each(function() {
        $(this).find('.input').each(function() {
            $(this).val('');
        })
    });
}

function clearLight() {
    $('#obj-name').val('');
    
    $('input[id*=light-]').each(function() {
        $(this).val('');
    });
}

function updateDetails(geometry) {
    $('#obj-details input').each(function() {
        $(this).attr('disabled', true);
    });

    switch(geometry) {
        case 'box':
            $('#width').attr('disabled', false);
            $('#height').attr('disabled', false);
            $('#depth').attr('disabled', false);
        break;

        case 'cone':
            $('#height').attr('disabled', false);
            $('#radius').attr('disabled', false);
        break;
        
        case 'sphere':
            $('#radius').attr('disabled', false);
        break;
        
        case 'torus':
            $('#radius').attr('disabled', false);
            $('#tube').attr('disabled', false);
        break;

        case 'torus-knot':
            $('#radius').attr('disabled', false);
            $('#tube').attr('disabled', false);
            $('#p').attr('disabled', false);
            $('#q').attr('disabled', false);
        break;

        default:
        return;
    }
}

function updateInScene() {
    $('#in-scene')
    .empty()
    .parents('.dropdown')
    .removeClass('is-active');

    if(data.objects.partial) {
        data.objects.partial.forEach((value, index) => {
            $('#in-scene')
            .append(
                $('<div></div>')
                .addClass('dropdown-item is-flex is-align-items-center is-justify-content-space-between')
                .attr('data-index', index)
                .append(
                    $('<p></p>')
                    .addClass('is-size-6')
                    .text(value.name)
                )
                .append(
                    $('<button></button>')
                    .addClass('button is-danger')
                    .text('Del')
                    .attr('id', 'del')
                )
            );
        });
    }
    if(data.lights.partial) {
        data.lights.partial.forEach((value, index) => {
            $('#in-scene')
            .append(
                $('<div></div>')
                .addClass('dropdown-item is-flex is-align-items-center is-justify-content-space-between')
                .attr('data-index', index)
                .append(
                    $('<p></p>')
                    .addClass('is-size-6')
                    .text(value.name)
                )
                .append(
                    $('<button></button>')
                    .addClass('button is-danger')
                    .text('Del')
                    .attr('id', 'del')
                )
            );
        });
    }
}

function validateObj() {
    const name = $('#obj-name') 
    const details = $('#obj-details').find('input:not(:disabled)');
    const rot = $('input[id*=obj-rot-]');
    const pos = $('input[id*=obj-pos-]');
    const color = $('obj-color input');

    if(!$(name).val() || $(name).val() === '') {
        return false;
    }
    for(let x = 0; x < details.length; x++){
        if(!$(details[x]).val() || $(details[x]).val() === '') {
            return false;
        }
    }
    for(let x = 0; x < rot.length; x++){
        if(!$(rot[x]).val() || $(rot[x]).val() === '') {
            return false;
        }
    }
    for(let x = 0; x < pos.length; x++){
        if(!$(pos[x]).val() || $(pos[x]).val() === '') {
            return false;
        }
    }
    for(let x = 0; x < color.length; x++){
        if(!$(color[x]).val() || $(color[x]).val() === '') {
            return false;
        }
    }
    
    return true;
}

function validateLight() {
    const name = $('#light-name') 
    const pos = $('input[id*=light-pos-]');
    const color = $('light-color input');

    if(!$(name).val() || $(name).val() === '') {
        return false;
    }
    for(let x = 0; x < pos.length; x++){
        if(!$(pos[x]).val() || $(pos[x]).val() === '') {
            return false;
        }
    }
    for(let x = 0; x < color.length; x++){
        if(!$(color[x]).val() || $(color[x]).val() === '') {
            return false;
        }
    }
}

function getGeo(geometry) {
    switch(geometry) {
        case 'box':
            geometry = new THREE.BoxGeometry(
                $('#width').val(),
                $('#height').val(),
                $('#depth').val()
            )
        break;

        case 'cone':
            geometry = new THREE.ConeGeometry(
                $('#radius').val(),
                $('#height').val()
            )
        break;

        case 'sphere':
            geometry = new THREE.SphereGeometry(
                $('#radius').val()
            );
        break;
        
        case 'torus':
            geometry = new THREE.TorusGeometry(
                $('#radius').val(),
                $('#tube').val()
            );
        break;

        case 'torus-knot':
            geometry = new THREE.TorusKnotGeometry(
                $('#radius').val(),
                $('#tube').val(),
                null,
                null,
                $('#p').val(),
                $('#q').val()
            );
        break;
    }

    return geometry;
}

function getMat(material) {
    switch(material) {
        case 'basic':
            material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( $('#red').val() ) },
                ${ parseInt( $('#green').val() ) },
                ${ parseInt( $('#blue').val() ) })`
            )});
        break;

        case 'normal':
            material = new THREE.MeshNormalMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( $('#red').val() ) },
                ${ parseInt( $('#green').val() ) },
                ${ parseInt( $('#blue').val() ) })`
            )});
        break;

        case 'physical':
            material = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( $('#red').val() ) },
                ${ parseInt( $('#green').val() ) },
                ${ parseInt( $('#blue').val() ) })`
            )});
        break;

        case 'toon':
            material = new THREE.MeshToonMaterial({ color: new THREE.Color(`rgb(
                ${ parseInt( $('#red').val() ) },
                ${ parseInt( $('#green').val() ) },
                ${ parseInt( $('#blue').val() ) })`
            )});
        break;
    }

    return material;
}

function rotate(obj, rot) {
    obj.rotation.x += parseFloat(rot.x); 
    obj.rotation.y += parseFloat(rot.y);
    obj.rotation.z += parseFloat(rot.z);
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

/*$('.dropdown-trigger').click(function(event) {
    event.preventDefault();

    const target = $(this).parent()    

    if(target.hasClass('is-active')) {
        $('.is-active').removeClass('is-active');
        
        target.removeClass('is-active');
    } else {
        $('.is-active').removeClass('is-active');

        if(target.find('.dropdown-item').length === 0) {
            return;
        }

        target.addClass('is-active');
    }

    clearObj();
    clearLight();
    updateDetails( $('#shape option:selected').val());
});*/

$('#obj-clear').click(function(event) {
    event.preventDefault();

    clearObj();
});

$('#obj-add').click(function(event) {
    event.preventDefault();

    if(!validateObj()) {
        return;
    }

    const name = `${$('#material option:selected').val()} ${$('#shape option:selected').val()} ${$('#obj-name').val()}`;

    const geometry = getGeo( $('#shape option:selected').val() );
    const material = getMat( $('#material option:selected').val() );
    const obj = new THREE.Mesh(geometry, material);

    const position = {
        x: $('#obj-pos-x').val(),
        y: $('#obj-pos-y').val(),
        z: $('#obj-pos-z').val()
    };
    const rotation = {
        x: $('#obj-rot-x').val(),
        y: $('#obj-rot-y').val(),
        z: $('#obj-rot-z').val()
    };

    obj.position.set(
        position.x,
        position.y,
        position.z
    );

    const details = {
        name: name,
        color: {
            red: $('#red').val(),
            green: $('#green').val(),
            blue: $('#blue').val()
        },
        geo: $('#shape option:selected').val(),
        mat: $('#material option:selected').val(),
        pos: position,
        rot: rotation
    };

    $('#obj-details').find('input:not(:disabled)').each(function(index) {   
        details[`${ $(this).attr('id') }`] = $(this).val();
    });

    data.objects.real.push(obj);
    data.objects.partial.push(details);    

    scene.add(obj);

    clearObj();
    updateInScene();
});

$('#shape').change(function() {
    updateDetails( $('#shape option:selected').val());
    clearObj()
});

$('#light-add').click(function(event) {
    event.preventDefault();

    validateLight();

    const name = `Light ${ $('#light-name').val() }`
    const light = new THREE.PointLight(
        new THREE.Color(`rgb(
            ${ parseInt( $('#light-red').val() ) },
            ${ parseInt( $('#light-green').val() ) },
            ${ parseInt( $('#light-blue').val() ) })`
        ),
        6,
        100
    );
    const position = {
        x: parseInt( $('#light-pos-x').val() ),
        y: parseInt( $('#light-pos-y').val() ),
        z: parseInt( $('#light-pos-z').val() )
    };

    light.position.set(
        position.x,
        position.y,
        position.z
    );

    data.lights.partial.push({
        name: name,
        color: {
            red: $('#light-red').val(),
            green: $('#light-green').val(),
            blue: $('#light-blue').val()
        },
        position: position
    });
    data.lights.real.push(light);

    scene.add(light)

    clearLight();
    updateInScene();
});

$('#light-clear').click(function(event) {
    event.preventDefault();

    clearLight();
});

$('#in-scene').on('click', 'button', function(event) {
    event.preventDefault()

    const name = $(this).siblings('p').text();
    const index = $(this).parent().attr('data-index');

    if(name.includes('Light')) {
        data.lights.real[index].remove();
    
        data.lights.real.splice(index);
        data.lights.partial.splice(index);

    } else {
        data.objects.real[index].remove();
        data.objects.real[index].material.dispose();
    
        data.objects.real.splice(index);
        data.objects.partial.splice(index);
    }   

    updateInScene();
});

$('#save').click(async function(event) {
    event.preventDefault();

    const description = JSON.stringify(
        {
            objects: data.objects.partial,
            lights: data.lights.partial
        }
    );
    const title = $('#title').val().trim();
    const forum_id = 1;

    if(!title || title === '') {
        return;
    }

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            forum_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
});