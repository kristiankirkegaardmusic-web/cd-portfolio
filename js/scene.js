let scene, camera, renderer, cds;

function initScene() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);
    scene.fog = new THREE.Fog(0xfafafa, 20, 50);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const canvas = document.getElementById('canvas');
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    canvas.parentElement.appendChild(renderer.domElement);

    // Lighting - minimalist, soft
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(8, 6, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    // Subtle fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 3, 3);
    scene.add(fillLight);

    // Create CDs
    cds = cdData.map(data => new CD(data, scene));

    // Mark CD meshes for raycasting
    cds.forEach(cd => {
        cd.group.traverse(child => {
            if (child.isMesh && child.geometry.type === 'CylinderGeometry') {
                child.userData.cdInstance = cd;
            }
        });
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
