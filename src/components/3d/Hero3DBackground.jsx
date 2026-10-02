import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useRpg } from '../../context/RpgContext';

export default function Hero3DBackground() {
  const mountRef = useRef(null);
  const location = useLocation();
  const { 
    stance, 
    stanceData, 
    isSlashing, 
    combatPopups, 
    handleAttack, 
    activeModel,
  } = useRpg();

  // Model loading state
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // References for Three.js animation and state
  const sceneRef = useRef(null);
  const characterHolderRef = useRef(null);
  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  const activeAnimRef = useRef('idle');
  const targetTransformRef = useRef({ x: 1.35, y: -0.15, z: 0.1, rotY: -0.32, scale: 1.0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const lightsRef = useRef({ stancePointLight: null, runeRing: null });
  const isSlashingRef = useRef(false);

  // Keep isSlashingRef synced
  useEffect(() => {
    isSlashingRef.current = isSlashing;
  }, [isSlashing]);

  // Determine target transform based on route and screen width
  useEffect(() => {
    const updateTargetTransform = () => {
      const isMobile = window.innerWidth < 1024;
      const path = location.pathname;

      switch (path) {
        case '/':
          targetTransformRef.current = {
            x: isMobile ? 0.2 : 1.35,
            y: isMobile ? -0.35 : -0.15,
            z: isMobile ? -0.7 : 0.1,
            rotY: isMobile ? -0.15 : -0.32,
            scale: isMobile ? 0.85 : 1.05,
          };
          break;
        case '/projects':
          targetTransformRef.current = {
            x: isMobile ? 1.0 : 2.2,
            y: -0.15,
            z: -1.5,
            rotY: -0.65,
            scale: 0.78,
          };
          break;
        case '/skills':
          targetTransformRef.current = {
            x: isMobile ? 0.8 : 1.7,
            y: -0.05,
            z: -0.85,
            rotY: -0.25,
            scale: 0.85,
          };
          break;
        case '/about':
          targetTransformRef.current = {
            x: isMobile ? 0.5 : 1.4,
            y: -0.15,
            z: 0.05,
            rotY: -0.15,
            scale: 0.95,
          };
          break;
        case '/contact':
          targetTransformRef.current = {
            x: isMobile ? 0.8 : 1.55,
            y: -0.2,
            z: -0.6,
            rotY: -0.4,
            scale: 0.85,
          };
          break;
        default:
          targetTransformRef.current = {
            x: 1.2,
            y: -0.2,
            z: 0.0,
            rotY: -0.3,
            scale: 0.9,
          };
      }
    };

    updateTargetTransform();
    window.addEventListener('resize', updateTargetTransform);
    return () => window.removeEventListener('resize', updateTargetTransform);
  }, [location.pathname]);

  // Play gesture when route changes
  useEffect(() => {
    if (!actionsRef.current) return;

    if (location.pathname === '/contact' && actionsRef.current['Wave']) {
      const waveAction = actionsRef.current['Wave'];
      const idleAction = actionsRef.current[activeAnimRef.current];
      if (waveAction) {
        waveAction.reset().fadeIn(0.3).play();
        if (idleAction) idleAction.fadeOut(0.3);
        setTimeout(() => {
          if (waveAction) waveAction.fadeOut(0.4);
          if (idleAction) idleAction.reset().fadeIn(0.4).play();
        }, 2200);
      }
    }
  }, [location.pathname]);

  // Play attack animation when isSlashing triggers
  useEffect(() => {
    if (!isSlashing) return;

    // Check available attack animations: 'Punch', 'Run', 'agree', 'Jump'
    const attackClipName = ['Punch', 'Run', 'run', 'agree', 'Jump'].find(
      (name) => actionsRef.current && actionsRef.current[name]
    );

    if (attackClipName && actionsRef.current[attackClipName]) {
      const attackAction = actionsRef.current[attackClipName];
      const currentIdle = actionsRef.current[activeAnimRef.current];

      if (attackAction) {
        attackAction.reset();
        attackAction.setLoop(THREE.LoopOnce, 1);
        attackAction.clampWhenFinished = false;
        attackAction.fadeIn(0.12).play();
        if (currentIdle) currentIdle.fadeOut(0.12);

        setTimeout(() => {
          attackAction.fadeOut(0.2);
          if (currentIdle) currentIdle.reset().fadeIn(0.2).play();
        }, 550);
      }
    }
  }, [isSlashing]);

  // Update dynamic stance lighting
  useEffect(() => {
    const currentHex = stanceData[stance]?.hex || '#00FF88';
    const hexNum = parseInt(currentHex.replace('#', '0x'), 16);

    if (lightsRef.current.stancePointLight) {
      lightsRef.current.stancePointLight.color.setHex(hexNum);
    }
    if (lightsRef.current.runeRing) {
      lightsRef.current.runeRing.material.color.setHex(hexNum);
    }
  }, [stance, stanceData]);

  // Main Three.js Scene Setup & Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera & WebGL Renderer (Transparent alpha, clean obsidian depth)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.35, 5.0);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Rig for High-Fidelity 3D Shaders
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00ff88, 2.2);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x66ccff, 1.2);
    fillLight.position.set(-2, -1, 3);
    scene.add(fillLight);

    const stancePointLight = new THREE.PointLight(0x00ff88, 3.5, 12);
    stancePointLight.position.set(0, 1.8, 2);
    scene.add(stancePointLight);
    lightsRef.current.stancePointLight = stancePointLight;

    // 3. Floating Holographic Cyber Pedestal
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(1.35, -0.75, 0.1);
    scene.add(pedestalGroup);

    const pedestalGeo = new THREE.CylinderGeometry(1.2, 1.35, 0.05, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e17,
      roughness: 0.3,
      metalness: 0.85,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -0.025;
    pedestalGroup.add(pedestalMesh);

    const ringGeo = new THREE.RingGeometry(1.15, 1.25, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const runeRing = new THREE.Mesh(ringGeo, ringMat);
    runeRing.rotation.x = Math.PI / 2;
    runeRing.position.y = 0.03;
    pedestalGroup.add(runeRing);
    lightsRef.current.runeRing = runeRing;

    // 4. Character Parent Group
    const characterHolder = new THREE.Group();
    characterHolder.position.set(1.35, -0.72, 0.1);
    characterHolder.rotation.y = -0.32;
    scene.add(characterHolder);
    characterHolderRef.current = characterHolder;

    // 5. GLTF Loader
    const loader = new GLTFLoader();
    let currentLoadedModel = null;

    const modelMap = {
      soldier: '/models/soldier.glb',
      hero: '/models/hero.glb',
      xbot: '/models/xbot.glb',
      anime: '/models/scene.gltf',
    };
    const modelUrl = modelMap[activeModel] || '/models/soldier.glb';

    setLoading(true);
    setLoadError(false);

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        currentLoadedModel = model;

        // DoubleSide & Shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.side = THREE.DoubleSide;
              child.material.needsUpdate = true;
            }
          }
        });

        // Normalize Scale to 1.75m height for optimal framing
        const bbox = new THREE.Box3().setFromObject(model);
        const size = bbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const scale = 1.75 / maxDim;
          model.scale.set(scale, scale, scale);
        }

        // Center on top of Pedestal
        const bboxAdj = new THREE.Box3().setFromObject(model);
        const center = bboxAdj.getCenter(new THREE.Vector3());
        model.position.x = -center.x;
        model.position.z = -center.z;
        model.position.y = -bboxAdj.min.y + 0.02;

        characterHolder.add(model);

        // Setup Skeletal Animations
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          gltf.animations.forEach((clip) => {
            actionsRef.current[clip.name] = mixer.clipAction(clip);
          });

          // Find default idle animation
          const idleClip = gltf.animations.find((a) =>
            /idle|standing|wait/i.test(a.name)
          ) || gltf.animations[0];

          if (idleClip && actionsRef.current[idleClip.name]) {
            actionsRef.current[idleClip.name].play();
            activeAnimRef.current = idleClip.name;
          }
        }

        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Error cargando modelo 3D:', err);
        setLoading(false);
        setLoadError(true);
      }
    );

    // 6. Raycasting for Direct Character Taps
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerClick = (e) => {
      // Don't intercept clicks on buttons or links
      if (e.target.closest('button, a, input, select, textarea, [role="button"]')) {
        return;
      }

      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      if (characterHolder) {
        const intersects = raycaster.intersectObjects(characterHolder.children, true);
        if (intersects.length > 0) {
          handleAttack();
        }
      }
    };

    window.addEventListener('click', handlePointerClick);

    // 7. Mouse Movement for Parallax
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 9. Render Loop
    let animId;
    const clock = new THREE.Clock();
    let lungeTimer = 0;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Mixer update
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Rotate Rune Ring
      runeRing.rotation.z -= 0.008;

      // Smoothly interpolate Character Position & Rotation
      if (characterHolder) {
        const target = targetTransformRef.current;
        const mouse = mouseRef.current;

        // Base lerping
        characterHolder.position.x += (target.x - characterHolder.position.x) * 0.05;
        characterHolder.position.y += (target.y - 0.55 - characterHolder.position.y) * 0.05;
        characterHolder.position.z += (target.z - characterHolder.position.z) * 0.05;

        // Pedestal follows character base
        pedestalGroup.position.x = characterHolder.position.x;
        pedestalGroup.position.z = characterHolder.position.z;
        pedestalGroup.position.y = characterHolder.position.y - 0.02;
        pedestalGroup.scale.set(target.scale, target.scale, target.scale);

        // Procedural attack lunge for static/special models
        if (isSlashingRef.current) {
          lungeTimer = 0.35;
        }
        let lungeOffsetZ = 0;
        let lungeRotY = 0;
        if (lungeTimer > 0) {
          lungeTimer -= delta;
          lungeOffsetZ = Math.sin(lungeTimer * Math.PI / 0.35) * 0.35;
          lungeRotY = Math.sin(lungeTimer * Math.PI / 0.35) * 0.25;
        }

        // Breathing float
        const breathFloat = Math.sin(elapsed * 2.0) * 0.015;

        // Rotation with mouse parallax
        const targetRotY = target.rotY + (mouse.x * 0.32) + lungeRotY;
        const targetRotX = (mouse.y * 0.12);

        characterHolder.rotation.y += (targetRotY - characterHolder.rotation.y) * 0.05;
        characterHolder.rotation.x += (targetRotX - characterHolder.rotation.x) * 0.05;

        const currentScale = target.scale;
        characterHolder.scale.set(currentScale, currentScale, currentScale);
        characterHolder.position.y += breathFloat * 0.04;
        characterHolder.position.z += lungeOffsetZ * 0.05;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('click', handlePointerClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeModel]);

  return (
    <aside 
      aria-label="Fondo 3D Render WebGL"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Clean, Subtle Atmospheric Radial Aura (Soft Cyber Glow without Harsh Grids) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 75% 55%, ${stanceData[stance]?.aura || 'rgba(0,255,136,0.22)'} 0%, transparent 68%)`
        }}
      />

      {/* Three.js WebGL Canvas Mount Container (Pointer events enabled for character clicks) */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-pointer"
        title="¡Haz clic sobre el personaje 3D para atacar y ganar XP!"
      />

      {/* Floating Combat Popups */}
      {combatPopups.map((popup) => (
        <div
          key={popup.id}
          className="absolute z-50 font-retro text-base sm:text-lg text-[#FFD700] text-glow-mana pointer-events-none animate-bounce"
          style={{ 
            top: '28%', 
            right: '25%',
            textShadow: '0 0 10px #FFD700, 0 0 20px #FF5E00'
          }}
        >
          {popup.text}
        </div>
      ))}
    </aside>
  );
}
