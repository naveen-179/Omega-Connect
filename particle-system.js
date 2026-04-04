/**
 * Neural Connection Particle System
 * Cinematic Three.js particle constellation for StrangerTalk
 */

// Check if THREE.js is available, gracefully degrade if not
if (typeof THREE === 'undefined') {
    console.warn('THREE.js not loaded, particle system disabled');
    // Create a stub NeuralParticleSystem that does nothing
    window.NeuralParticleSystem = class {
        constructor(containerId) { }
        init() { }
        animate() { }
        destroy() { }
        pulseEffect() { }
        randomBurst() { }
        checkWebGLSupport() { return false; }
    };
} else {
    class NeuralParticleSystem {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.particles = null;
            this.mouse = new THREE.Vector2();
            this.animationId = null;

            this.init();
        }

        init() {
            if (!this.checkWebGLSupport()) {
                console.log('WebGL not supported, particle system disabled');
                return;
            }

            // Scene setup
            this.scene = new THREE.Scene();
            this.scene.background = null; // Transparent

            // Camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                1,
                2000
            );
            this.camera.position.z = 500;

            // Renderer
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.container.appendChild(this.renderer.domElement);

            // Create particles
            this.createParticles();

            // Event listeners
            window.addEventListener('resize', this.onWindowResize.bind(this));
            this.container.addEventListener('mousemove', this.onMouseMove.bind(this));

            // Start animation
            this.animate();
        }

        createParticles() {
            const particleCount = 200;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 1500;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 1500;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 1500;

                // Purple gradient theme
                colors[i * 3] = 0.6 + Math.random() * 0.4;     // R
                colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // G
                colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // B
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 4,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            this.particles = new THREE.Points(geometry, material);
            this.scene.add(this.particles);
        }

        animate() {
            this.animationId = requestAnimationFrame(this.animate.bind(this));

            if (this.particles) {
                this.particles.rotation.x += 0.0002;
                this.particles.rotation.y += 0.0003;

                // Pulse effect
                const positions = this.particles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 2] += Math.sin(Date.now() * 0.001 + i) * 0.1;
                }
                this.particles.geometry.attributes.position.needsUpdate = true;
            }

            if (this.renderer) {
                this.renderer.render(this.scene, this.camera);
            }
        }

        onWindowResize() {
            if (!this.camera || !this.renderer) return;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        onMouseMove(event) {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.renderer) {
                this.renderer.dispose();
                if (this.container && this.renderer.domElement) {
                    this.container.removeChild(this.renderer.domElement);
                }
            }
            window.removeEventListener('resize', this.onWindowResize.bind(this));
        }

        checkWebGLSupport() {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext &&
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        }
    }

    // Export to global scope
    window.NeuralParticleSystem = NeuralParticleSystem;
}
