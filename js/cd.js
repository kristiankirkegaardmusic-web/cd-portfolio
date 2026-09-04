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
        
        console.log(`CD created: ${data.title} at position`, data.position);
    }

    createCDGeometry() {
        // Main CD disc - larger and more visible
        const cdGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.12, 64);
        const cdMaterial = new THREE.MeshStandardMaterial({
            color: this.data.color,
            metalness: 0.7,
            roughness: 0.25,
            side: THREE.DoubleSide,
            emissive: this.data.color,
            emissiveIntensity: 0.15
        });
        const cdMesh = new THREE.Mesh(cdGeometry, cdMaterial);
        cdMesh.castShadow = true;
        cdMesh.receiveShadow = true;
        cdMesh.userData.cdInstance = this;
        this.group.add(cdMesh);

        // Center hole
        const holeGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.16, 32);
        const holeMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.9,
            roughness: 0.15,
            emissive: 0x000000
        });
        const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
        holeMesh.position.z = 0.08;
        holeMesh.castShadow = true;
        holeMesh.userData.cdInstance = this;
        this.group.add(holeMesh);

        // CD label/texture
        this.createCDLabel();

        // CD Case (glass-like)
        this.createCDCase();

        // Add edge ring for visual separation
        this.createEdgeRing();
    }

    createCDLabel() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#2a2a2a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        // Concentric circles
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(256, 256, 50 + i * 40, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Center circle
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(256, 256, 180, 0, Math.PI * 2);
        ctx.stroke();

        // Title text
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const titleShort = this.data.title.substring(0, 12);
        ctx.fillText(titleShort, 256, 240);

        // Artist subtitle
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText(this.data.artist, 256, 290);

        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = 16;
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.4,
            roughness: 0.5,
            emissive: 0x333333,
            emissiveIntensity: 0.2
        });

        const geometry = new THREE.CylinderGeometry(1.75, 1.75, 0.08, 64);
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.z = 0.08;
        textMesh.castShadow = true;
        textMesh.userData.cdInstance = this;
        this.group.add(textMesh);
    }

    createEdgeRing() {
        const ringGeometry = new THREE.TorusGeometry(1.8, 0.05, 8, 64);
        const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0x00a890,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x00a890,
            emissiveIntensity: 0.3
        });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.z = 0.12;
        ringMesh.castShadow = true;
        this.group.add(ringMesh);
    }

    createCDCase() {
        // Glass-like case
        const caseGeometry = new THREE.BoxGeometry(2.0, 3.0, 0.18);
        const caseMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.15,
            roughness: 0.7,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const caseMesh = new THREE.Mesh(caseGeometry, caseMaterial);
        caseMesh.position.z = -0.6;
        caseMesh.castShadow = true;
        caseMesh.receiveShadow = true;
        caseMesh.userData.cdInstance = this;
        this.group.add(caseMesh);

        // Case edge lines
        const edgeGeometry = new THREE.EdgesGeometry(caseGeometry);
        const line = new THREE.LineSegments(
            edgeGeometry,
            new THREE.LineBasicMaterial({ 
                color: 0x00a890, 
                linewidth: 2, 
                transparent: true, 
                opacity: 0.4 
            })
        );
        line.position.copy(caseMesh.position);
        this.group.add(line);
    }

    setHovered(hovered) {
        this.isHovered = hovered;
        this.targetPullDistance = hovered ? 2.5 : 0;
    }

    update() {
        // Smooth pull animation
        this.currentPullDistance += (this.targetPullDistance - this.currentPullDistance) * 0.08;
        this.group.position.z = this.data.position.z + this.currentPullDistance;

        // Rotation
        if (this.isHovered) {
            this.rotationVelocity = Math.min(this.rotationVelocity + 0.045, 0.18);
        } else {
            this.rotationVelocity *= 0.90;
        }
        this.group.rotation.y += this.rotationVelocity;
    }
}
