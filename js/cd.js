class CD {
    constructor(data, scene) {
        this.data = data;
        this.scene = scene;
        this.group = new THREE.Group();
        this.isHovered = false;
        this.targetPullDistance = 0;
        this.currentPullDistance = 0;
        this.rotationVelocity = 0;

        this.createCDGeometry();
        this.group.position.set(data.position.x, data.position.y, data.position.z);
        scene.add(this.group);
    }

    createCDGeometry() {
        // Main CD disc
        const cdGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 64);
        const cdMaterial = new THREE.MeshStandardMaterial({
            color: this.data.color,
            metalness: 0.6,
            roughness: 0.3,
            side: THREE.DoubleSide
        });
        const cdMesh = new THREE.Mesh(cdGeometry, cdMaterial);
        cdMesh.castShadow = true;
        cdMesh.receiveShadow = true;
        this.group.add(cdMesh);

        // Center hole
        const holeGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.12, 32);
        const holeMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000,
            metalness: 0.8,
            roughness: 0.2
        });
        const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
        holeMesh.position.z = 0.06;
        holeMesh.castShadow = true;
        this.group.add(holeMesh);

        // CD label/texture
        this.createCDLabel();

        // CD Case (glass-like)
        this.createCDCase();
    }

    createCDLabel() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Subtle background
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 512, 512);

        // Minimal circle design
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(256, 256, 180, 0, Math.PI * 2);
        ctx.stroke();

        // Title text
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.data.title.substring(0, 8), 256, 256);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.5,
            roughness: 0.4
        });

        const geometry = new THREE.CylinderGeometry(1.18, 1.18, 0.05, 64);
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.z = 0.06;
        textMesh.castShadow = true;
        this.group.add(textMesh);
    }

    createCDCase() {
        // Glass-like case
        const caseGeometry = new THREE.BoxGeometry(1.35, 2.0, 0.12);
        const caseMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.2,
            roughness: 0.6,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        const caseMesh = new THREE.Mesh(caseGeometry, caseMaterial);
        caseMesh.position.z = -0.4;
        caseMesh.castShadow = true;
        caseMesh.receiveShadow = true;
        this.group.add(caseMesh);

        // Case edge highlight
        const edgeGeometry = new THREE.EdgesGeometry(caseGeometry);
        const line = new THREE.LineSegments(
            edgeGeometry,
            new THREE.LineBasicMaterial({ color: 0x00a890, linewidth: 1, transparent: true, opacity: 0.3 })
        );
        line.position.copy(caseMesh.position);
        this.group.add(line);
    }

    setHovered(hovered) {
        this.isHovered = hovered;
        this.targetPullDistance = hovered ? 2.2 : 0;
    }

    update() {
        // Smooth pull animation
        this.currentPullDistance += (this.targetPullDistance - this.currentPullDistance) * 0.08;
        this.group.position.z = this.data.position.z + this.currentPullDistance;

        // Rotation
        if (this.isHovered) {
            this.rotationVelocity = Math.min(this.rotationVelocity + 0.04, 0.15);
        } else {
            this.rotationVelocity *= 0.92;
        }
        this.group.rotation.y += this.rotationVelocity;
    }
}
