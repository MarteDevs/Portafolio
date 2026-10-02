import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Hero3DModelViewer({ 
  modelPath = '/anime_illustration_low_poly_character/scene.gltf',
  onAttack,
  stance = 'assault',
  className = ''
}) {
  const mountRef = useRef(null);
  const [currentModel, setCurrentModel] = useState(modelPath);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [animationsList, setAnimationsList] = useState([]);
  const [activeAnim, setActiveAnim] = useState('');
  const mixerRef = useRef(null);
  const actionsRef = useRef({});

  useEffect(() => {
    setCurrentModel(modelPath);
  }, [modelPath]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 380;

    // Scene, Camera & Controls
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.2;
    controls.minDistance = 0.8;
    controls.maxDistance = 12;
    controls.target.set(0, 0.8, 0);

    // Stance Lights
    const stanceLights = {
      assault: 0x00ff88,
      defense: 0x00d4ff,
      alchemy: 0xff007f,
    };
    const accentColor = stanceLights[stance] || 0x00ff88;

    // 360-degree Studio Lighting for Anime textures
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(3, 8, 4);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(-3, 4, -4);
    scene.add(backLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.9);
    frontLight.position.set(0, 2, 4);
    scene.add(frontLight);

    const stancePointLight = new THREE.PointLight(accentColor, 3, 10);
    stancePointLight.position.set(0, 1.8, 2);
    scene.add(stancePointLight);

    // Pedestal Platform
    const pedestalGeo = new THREE.CylinderGeometry(1.3, 1.4, 0.08, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x12141e,
      roughness: 0.2,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = 0;
    scene.add(pedestal);

    const ringGeo = new THREE.RingGeometry(1.25, 1.35, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const runeRing = new THREE.Mesh(ringGeo, ringMat);
    runeRing.rotation.x = Math.PI / 2;
    runeRing.position.y = 0.045;
    scene.add(runeRing);

    // GLTF Loading
    const loader = new GLTFLoader();
    let loadedObject = null;

    const loadModel = (url) => {
      setLoading(true);
      setLoadError(false);

      if (loadedObject) {
        scene.remove(loadedObject);
        loadedObject = null;
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
      setAnimationsList([]);
      setActiveAnim('');

      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          loadedObject = model;

          // DoubleSided materials to avoid any transparent/invisible polygons
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

          // Auto-Fit Bounding Box & Center
          const bbox = new THREE.Box3().setFromObject(model);
          const size = bbox.getSize(new THREE.Vector3());
          const maxAxis = Math.max(size.x, size.y, size.z);
          if (maxAxis > 0) {
            const targetHeight = 1.8;
            const scale = targetHeight / maxAxis;
            model.scale.set(scale, scale, scale);
          }

          const bboxAdjusted = new THREE.Box3().setFromObject(model);
          const centerAdjusted = bboxAdjusted.getCenter(new THREE.Vector3());
          model.position.x = -centerAdjusted.x;
          model.position.z = -centerAdjusted.z;
          model.position.y = -bboxAdjusted.min.y + 0.04;

          // Set camera focus to chest/center of character
          const finalHeight = bboxAdjusted.max.y - bboxAdjusted.min.y;
          controls.target.set(0, finalHeight * 0.5, 0);
          camera.position.set(0, finalHeight * 0.6, 3.2);
          controls.update();

          scene.add(model);

          // Skeletal animations if present
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;
            actionsRef.current = {};

            const names = gltf.animations.map((a) => a.name);
            setAnimationsList(names);

            gltf.animations.forEach((clip) => {
              const action = mixer.clipAction(clip);
              actionsRef.current[clip.name] = action;
            });

            const defaultClip = gltf.animations.find((a) =>
              /idle|standing|wait/i.test(a.name)
            ) || gltf.animations[0];

            if (defaultClip) {
              actionsRef.current[defaultClip.name].play();
              setActiveAnim(defaultClip.name);
            }
          }

          setLoading(false);
        },
        undefined,
        (err) => {
          console.warn('Error al cargar modelo 3D:', err);
          setLoading(false);
          setLoadError(true);
        }
      );
    };

    loadModel(currentModel);

    // Drag and Drop custom .glb or .gltf
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
          const blobUrl = URL.createObjectURL(file);
          loadModel(blobUrl);
        }
      }
    };

    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);

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

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      runeRing.rotation.z -= 0.008;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('dragover', handleDragOver);
      container.removeEventListener('drop', handleDrop);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentModel, stance]);

  const switchAnimation = (animName) => {
    if (!mixerRef.current || !actionsRef.current[animName]) return;
    Object.values(actionsRef.current).forEach((action) => action.fadeOut(0.2));
    actionsRef.current[animName].reset().fadeIn(0.2).play();
    setActiveAnim(animName);
  };

  return (
    <div className={`relative select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full min-h-[380px]" />

      {/* Model Switcher Pill */}
      <div className="absolute top-2 left-2 flex gap-1 z-20 font-mono text-[10px]">
        <button
          onClick={() => setCurrentModel('/anime_illustration_low_poly_character/scene.gltf')}
          className={`px-2.5 py-1 border transition-all ${
            currentModel.includes('scene.gltf')
              ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/20 font-bold shadow-[0_0_10px_rgba(0,255,136,0.4)]'
              : 'border-[#272938] text-[#8B949E] bg-[#12121A]/85 hover:text-[#E6EDF3]'
          }`}
        >
          🌸 ANIME (scene.gltf)
        </button>
        <button
          onClick={() => setCurrentModel('/models/hero.glb')}
          className={`px-2.5 py-1 border transition-all ${
            currentModel.includes('hero.glb')
              ? 'border-[#00D4FF] text-[#00D4FF] bg-[#00D4FF]/20 font-bold shadow-[0_0_10px_rgba(0,212,255,0.4)]'
              : 'border-[#272938] text-[#8B949E] bg-[#12121A]/85 hover:text-[#E6EDF3]'
          }`}
        >
          🤖 ROBOT (hero.glb)
        </button>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#0A0A0F]/80 flex flex-col items-center justify-center font-mono text-xs text-[#00FF88] space-y-2 pointer-events-none z-30">
          <div className="w-6 h-6 border-2 border-[#00FF88] border-t-transparent rounded-full animate-spin" />
          <span>CARGANDO MODELO 3D...</span>
        </div>
      )}

      {/* Error Message */}
      {loadError && (
        <div className="absolute inset-0 bg-[#0A0A0F]/90 p-6 flex flex-col items-center justify-center text-center font-mono text-xs text-[#FF2A4D] space-y-2 z-30">
          <p className="font-bold">MODELO NO ENCONTRADO EN {currentModel}</p>
          <p className="text-[11px] text-[#8B949E]">
            Arrastra tu archivo <strong>.glb</strong> o <strong>.gltf</strong> aquí directamente.
          </p>
        </div>
      )}

      {/* Animation Selector Bar */}
      {animationsList.length > 1 && (
        <div className="absolute top-10 left-2 right-2 flex flex-wrap gap-1 bg-[#12121A]/85 p-1 border border-[#272938] z-20">
          <span className="text-[9px] font-mono text-[#8B949E] px-1 py-0.5">ANIM:</span>
          {animationsList.slice(0, 5).map((name) => (
            <button
              key={name}
              onClick={() => switchAnimation(name)}
              className={`px-1.5 py-0.5 text-[9px] font-mono border transition-all ${
                activeAnim === name
                  ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/20'
                  : 'border-[#272938] text-[#8B949E] hover:text-[#E6EDF3]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#12121A]/85 border border-[#00FF88]/40 text-[#00FF88] text-[9px] sm:text-[10px] font-mono tracking-wider opacity-80 hover:opacity-100 transition-opacity pointer-events-none text-center whitespace-nowrap">
        🖱️ ROTACIÓN 360° // ARRASTRA CUALQUIER .GLB AQUÍ
      </div>
    </div>
  );
}
