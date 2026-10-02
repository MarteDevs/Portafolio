import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CrystalScene({ onInteract, className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff88, 3, 20);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff007f, 3, 20);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00d4ff, 2, 15);
    pointLight3.position.set(0, 4, -2);
    scene.add(pointLight3);

    // Group for easy rotation
    const group = new THREE.Group();
    scene.add(group);

    // Outer Crystal: Octahedron
    const geometry = new THREE.OctahedronGeometry(1.4, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      emissive: 0x00ff88,
      emissiveIntensity: 0.25,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
    });
    const crystal = new THREE.Mesh(geometry, material);
    group.add(crystal);

    // Wireframe overlay for retro neon arcade vibe
    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.7,
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    group.add(wireframe);

    // Inner Core: Floating Pulsing Icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerCore);

    // Orbiting Mana Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // Orbiting Particles
    const particlesCount = 80;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    group.add(particles);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let spinVelocity = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    const handleClick = () => {
      spinVelocity = 0.35;
      if (onInteract) onInteract();
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous floating & self-rotation
      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.8;

      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05 + 0.008 + spinVelocity;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05 + 0.004;

      // Decay click spin
      spinVelocity *= 0.94;

      // Floating oscillation
      group.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Inner Core counter-rotation
      innerCore.rotation.x -= 0.02;
      innerCore.rotation.y -= 0.03;

      // Ring rotations
      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.012;

      // Particle pulse
      particles.rotation.y += 0.003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onInteract]);

  return (
    <div className={`relative cursor-pointer select-none group ${className}`}>
      <div ref={mountRef} className="w-full h-full min-h-[300px]" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#12121A]/80 border border-[#00FF88]/40 text-[#00FF88] text-[10px] font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
        ⚔️ TOCA EL CRISTAL PARA OBTENER XP
      </div>
    </div>
  );
}
