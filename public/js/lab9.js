(function(){
    //SCENE
    var scene = new THREE.Scene();
    
    //CAMERA
    var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.set( 50, 20, 0 );

    //RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#055021');
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    //CONTROLLER
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    //PYRAMID
    var geometry = new THREE.CylinderGeometry( 0, 2, 3, 4 );
    var material = new THREE.MeshStandardMaterial( { color: "#123456"} );
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    scene.add( cube );

    //GROUND PLANE
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshStandardMaterial({color: '#00ffff'});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -5;
    plane.position.z = 0;
    scene.add(plane);

    //AMBIENT LIGHT
    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);


    //SPOTLIGHT /W SHADOWS
    var spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 5, 10, 9 );
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.431;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 800;
    scene.add( spotLight );

    //Rotate pyramid on keypress (Q,W - X-akse, A,S - Y-akse, Z,X - Z-akse)
    var rotXspeed = 0;
    var rotYspeed = 0;
    var rotZspeed = 0;
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 81:
                rotXspeed -= 0.01;
                break;
            case 87:
                rotXspeed += 0.01;
                break;
            case 65:
                rotYspeed += 0.01;
                break;
            case 83:
                rotYspeed -= 0.01;
                break;
            case 90:
                rotZspeed += 0.01;
                break;
            case 88:
                rotZspeed -= 0.01;
                break;
            case 32:
                rotXspeed = 0;
                rotYspeed = 0;
                rotZspeed = 0;
        }
    };

    //ANIMATION
    var animate = function () {
        requestAnimationFrame( animate );

        controls.update(); 
        cube.rotation.x += rotXspeed;
        cube.rotation.y += rotYspeed;
        cube.rotation.z += rotZspeed;

        renderer.render( scene, camera );
    };

    animate();

    document.querySelector('#output').appendChild( renderer.domElement );
})();
