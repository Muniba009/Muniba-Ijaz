import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NeuralCanvasProps {
  interactive?: boolean;
  className?: string;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({
  interactive = true,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPaused(true);
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.0018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1500);
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050816, 0);
    container.appendChild(renderer.domElement);

    // Neural nodes generation
    const particleCount = 110;
    const maxDistance = 140;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const bounds = { x: 380, y: 260, z: 260 };

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      velocities.push({
        x: (Math.random() - 0.5) * 0.45,
        y: (Math.random() - 0.5) * 0.45,
        z: (Math.random() - 0.5) * 0.45,
      });
    }

    // Particle Points geometry
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom circular sprite texture for smooth glowing nodes
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(0, 166, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(37, 99, 235, 0.8)');
      gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.2)');
      gradient.addColorStop(1, 'rgba(5, 8, 22, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00a6ff,
      size: 9,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Neural Connections (Synapses) Lines
    const maxLineSegments = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      mouseX = (clientX - rect.width / 2) * 0.4;
      mouseY = (clientY - rect.height / 2) * 0.4;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPausedRef.current) {
        // Smooth camera tilt towards mouse
        targetX += (mouseX - targetX) * 0.035;
        targetY += (mouseY - targetY) * 0.035;
        camera.position.x = targetX;
        camera.position.y = -targetY;
        camera.lookAt(scene.position);

        // Slow rotation of entire neural cluster
        particles.rotation.y += 0.0009;
        linesMesh.rotation.y += 0.0009;
        particles.rotation.x += 0.0004;
        linesMesh.rotation.x += 0.0004;

        // Update node positions
        const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const currentPos = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          currentPos[idx] += velocities[i].x;
          currentPos[idx + 1] += velocities[i].y;
          currentPos[idx + 2] += velocities[i].z;

          // Bounce off boundaries
          if (Math.abs(currentPos[idx]) > bounds.x) velocities[i].x *= -1;
          if (Math.abs(currentPos[idx + 1]) > bounds.y) velocities[i].y *= -1;
          if (Math.abs(currentPos[idx + 2]) > bounds.z) velocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        // Update dynamic synaptic lines
        let lineVertexCount = 0;
        let colorCount = 0;

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = currentPos[i * 3] - currentPos[j * 3];
            const dy = currentPos[i * 3 + 1] - currentPos[j * 3 + 1];
            const dz = currentPos[i * 3 + 2] - currentPos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * 0.65;

              // Vertex 1
              linePositions[lineVertexCount++] = currentPos[i * 3];
              linePositions[lineVertexCount++] = currentPos[i * 3 + 1];
              linePositions[lineVertexCount++] = currentPos[i * 3 + 2];

              // Vertex 2
              linePositions[lineVertexCount++] = currentPos[j * 3];
              linePositions[lineVertexCount++] = currentPos[j * 3 + 1];
              linePositions[lineVertexCount++] = currentPos[j * 3 + 2];

              // Electric Blue to Accent Blue Gradient Line
              const r = 0.0;
              const g = 0.65 * alpha;
              const b = 1.0 * alpha;

              lineColors[colorCount++] = r;
              lineColors[colorCount++] = g;
              lineColors[colorCount++] = b;

              lineColors[colorCount++] = r * 0.8;
              lineColors[colorCount++] = g * 0.9;
              lineColors[colorCount++] = b * 0.9;
            }
          }
        }

        lineGeometry.setDrawRange(0, lineVertexCount / 3);
        (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {/* Subtle radial ambient vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(5,8,22,0.85)_100%] pointer-events-none" />
    </div>
  );
};
