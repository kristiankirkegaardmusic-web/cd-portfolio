// Initialize scene
initScene();

// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    cds.forEach(cd => cd.setHovered(false));

    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.userData.cdInstance) {
            object.userData.cdInstance.setHovered(true);
            document.body.style.cursor = 'pointer';
            break;
        }
    }
    if (intersects.length === 0) {
        document.body.style.cursor = 'default';
    }
});

document.addEventListener('click', (event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.userData.cdInstance) {
            openModal(object.userData.cdInstance.data);
            break;
        }
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    cds.forEach(cd => cd.update());

    renderer.render(scene, camera);
}

animate();
