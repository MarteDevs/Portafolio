import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCharacter3D({ 
  onAttack, 
  stance = 'assault', // assault | defense | alchemy
  className = '' 
}) {
  const mountRef = useRef(null);
  const attackTriggerRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 360;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 4.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Stance Color
    const stanceColors = {
      assault: 0x00ff88,  // Neon Emerald
      defense: 0x00d4ff,  // Cyan Shield
      alchemy: 0xff007f,  // Magenta Magic
    };
    const activeColor = stanceColors[stance] || 0x00ff88;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const glowLight = new THREE.PointLight(activeColor, 4, 8);
    glowLight.position.set(0, 1, 2);
    scene.add(glowLight);

    // Root Character Group
    const character = new THREE.Group();
    scene.add(character);
    character.position.y = -0.4;

    // Materials
    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: 0x12141e,
      roughness: 0.3,
      metalness: 0.85,
      flatShading: true,
    });

    const trimArmorMat = new THREE.MeshStandardMaterial({
      color: 0x272a38,
      roughness: 0.2,
      metalness: 0.9,
      flatShading: true,
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: activeColor,
    });

    const wireMat = new THREE.LineBasicMaterial({
      color: activeColor,
      transparent: true,
      opacity: 0.4,
    });

    // 1. Torso & Chestplate
    const torsoGroup = new THREE.Group();
    character.add(torsoGroup);

    const chestGeo = new THREE.BoxGeometry(0.9, 1.0, 0.6);
    const chestMesh = new THREE.Mesh(chestGeo, darkArmorMat);
    chestMesh.position.y = 0.5;
    torsoGroup.add(chestMesh);

    // Reactor Core on Chest
    const coreGeo = new THREE.OctahedronGeometry(0.18, 0);
    const coreMesh = new THREE.Mesh(coreGeo, glowMat);
    coreMesh.position.set(0, 0.65, 0.32);
    torsoGroup.add(coreMesh);

    // Pauldrons (Shoulder Armor)
    const pauldronGeo = new THREE.BoxGeometry(0.35, 0.3, 0.45);
    const leftPauldron = new THREE.Mesh(pauldronGeo, trimArmorMat);
    leftPauldron.position.set(-0.6, 0.95, 0);
    leftPauldron.rotation.z = 0.2;
    torsoGroup.add(leftPauldron);

    const rightPauldron = new THREE.Mesh(pauldronGeo, trimArmorMat);
    rightPauldron.position.set(0.6, 0.95, 0);
    rightPauldron.rotation.z = -0.2;
    torsoGroup.add(rightPauldron);

    // 2. Head Group (Tracks mouse)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);
    torsoGroup.add(headGroup);

    const helmetGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const helmetMesh = new THREE.Mesh(helmetGeo, darkArmorMat);
    headGroup.add(helmetMesh);

    // Helmet Crest / Antenna
    const crestGeo = new THREE.BoxGeometry(0.1, 0.25, 0.45);
    const crestMesh = new THREE.Mesh(crestGeo, trimArmorMat);
    crestMesh.position.set(0, 0.35, 0);
    headGroup.add(crestMesh);

    // Visor Eyes
    const visorGeo = new THREE.BoxGeometry(0.42, 0.12, 0.1);
    const visorMesh = new THREE.Mesh(visorGeo, glowMat);
    visorMesh.position.set(0, 0.05, 0.26);
    headGroup.add(visorMesh);

    // 3. Right Arm + Plasma Sword
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.65, 0.9, 0);
    torsoGroup.add(rightArmGroup);

    const armGeo = new THREE.BoxGeometry(0.2, 0.6, 0.22);
    const rightArmMesh = new THREE.Mesh(armGeo, trimArmorMat);
    rightArmMesh.position.y = -0.3;
    rightArmGroup.add(rightArmMesh);

    // Sword Group
    const swordGroup = new THREE.Group();
    swordGroup.position.set(0, -0.6, 0.1);
    swordGroup.rotation.x = Math.PI / 4;
    rightArmGroup.add(swordGroup);

    // Sword Hilt & Guard
    const hiltGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8);
    const hiltMesh = new THREE.Mesh(hiltGeo, darkArmorMat);
    hiltMesh.rotation.x = Math.PI / 2;
    swordGroup.add(hiltMesh);

    const guardGeo = new THREE.BoxGeometry(0.35, 0.06, 0.1);
    const guardMesh = new THREE.Mesh(guardGeo, trimArmorMat);
    guardMesh.position.z = 0.2;
    swordGroup.add(guardMesh);

    // Plasma Blade (Glowing Neon beam)
    const bladeGeo = new THREE.BoxGeometry(0.12, 0.04, 1.4);
    const bladeMesh = new THREE.Mesh(bladeGeo, glowMat);
    bladeMesh.position.z = 0.95;
    swordGroup.add(bladeMesh);

    // Blade Wireframe
    const bladeWire = new THREE.LineSegments(new THREE.WireframeGeometry(bladeGeo), wireMat);
    bladeWire.position.z = 0.95;
    swordGroup.add(bladeWire);

    // 4. Left Arm + Energy Shield
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.65, 0.9, 0);
    torsoGroup.add(leftArmGroup);

    const leftArmMesh = new THREE.Mesh(armGeo, trimArmorMat);
    leftArmMesh.position.y = -0.3;
    leftArmGroup.add(leftArmMesh);

    // Shield (Hexagonal / Diamond)
    const shieldGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.06, 6);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      emissive: activeColor,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85,
      metalness: 0.9,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(-0.15, -0.3, 0.25);
    shieldMesh.rotation.x = Math.PI / 2;
    shieldMesh.rotation.z = Math.PI / 6;
    leftArmGroup.add(shieldMesh);

    const shieldWire = new THREE.LineSegments(new THREE.WireframeGeometry(shieldGeo), wireMat);
    shieldWire.position.copy(shieldMesh.position);
    shieldWire.rotation.copy(shieldMesh.rotation);
    leftArmGroup.add(shieldWire);

    // 5. Waist & Legs
    const waistGeo = new THREE.BoxGeometry(0.7, 0.25, 0.5);
    const waistMesh = new THREE.Mesh(waistGeo, trimArmorMat);
    waistMesh.position.y = -0.1;
    character.add(waistMesh);

    const legGeo = new THREE.BoxGeometry(0.28, 0.8, 0.32);
    const leftLeg = new THREE.Mesh(legGeo, darkArmorMat);
    leftLeg.position.set(-0.25, -0.6, 0);
    character.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, darkArmorMat);
    rightLeg.position.set(0.25, -0.6, 0);
    character.add(rightLeg);

    // Floating Halo / Ground Rune ring
    const groundRuneGeo = new THREE.RingGeometry(1.2, 1.35, 32);
    const groundRuneMat = new THREE.MeshBasicMaterial({
      color: activeColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const groundRune = new THREE.Mesh(groundRuneGeo, groundRuneMat);
    groundRune.position.y = -1.1;
    groundRune.rotation.x = Math.PI / 2;
    character.add(groundRune);

    // Orbiting Particles
    const particleCount = 45;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 3;
      pPos[i + 1] = (Math.random() - 0.5) * 3;
      pPos[i + 2] = (Math.random() - 0.5) * 3;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: activeColor,
      transparent: true,
      opacity: 0.8,
    });
    const particleField = new THREE.Points(pGeo, pMat);
    character.add(particleField);

    // Interaction & Animation States
    let mouseX = 0;
    let mouseY = 0;
    let isAttacking = false;
    let attackProgress = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const triggerAttack = () => {
      if (isAttacking) return;
      isAttacking = true;
      attackProgress = 0;
      if (onAttack) onAttack();
    };

    attackTriggerRef.current = triggerAttack;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', triggerAttack);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Main Render Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Idle Floating Bob
      character.position.y = -0.4 + Math.sin(time * 2) * 0.08;
      groundRune.rotation.z -= 0.01;
      particleField.rotation.y += 0.005;

      // Mouse Aim (Head & Torso track cursor)
      const targetRotY = mouseX * 0.5;
      const targetRotX = -mouseY * 0.3;

      headGroup.rotation.y += (targetRotY - headGroup.rotation.y) * 0.1;
      headGroup.rotation.x += (targetRotX - headGroup.rotation.x) * 0.1;
      torsoGroup.rotation.y += (targetRotY * 0.4 - torsoGroup.rotation.y) * 0.05;

      // Core pulsation
      const coreScale = 1 + Math.sin(time * 6) * 0.15;
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      // Attack Animation (Slash)
      if (isAttacking) {
        attackProgress += 0.08;
        if (attackProgress < 0.4) {
          // Windup: arm raises up
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -Math.PI / 1.5, 0.3);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.4, 0.3);
        } else if (attackProgress < 0.8) {
          // Fast Slash downward
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, Math.PI / 2.5, 0.5);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.6, 0.5);
          character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, 0.3, 0.3);
        } else if (attackProgress >= 1.0) {
          // Return to idle
          isAttacking = false;
          attackProgress = 0;
        }
      } else {
        // Idle arm stance
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.15 + Math.sin(time * 2) * 0.05, 0.1);
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.1, 0.1);
        character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, 0, 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', triggerAttack);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onAttack, stance]);

  return (
    <div className={`relative cursor-pointer select-none group ${className}`}>
      <div ref={mountRef} className="w-full h-full min-h-[340px]" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#12121A]/85 border border-[#00FF88]/40 text-[#00FF88] text-[10px] font-mono tracking-wider opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
        ⚔️ TOCA AL HÉROE PARA ATACAR
      </div>
    </div>
  );
}
