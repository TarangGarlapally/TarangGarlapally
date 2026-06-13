/* ============================================================
   UNIVERSE.JS — Complete Three.js 3D Space Scene
   All cosmic objects: starfield, spiral galaxy, ringed planet,
   earth-like planet with atmosphere, supernova, wormhole tunnel
   ============================================================ */
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initUniverse() {
  /* ──────────── Renderer ──────────── */
  const canvas = document.getElementById('universe-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  /* ──────────── Scene & Camera ──────────── */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020014);
  scene.fog = new THREE.FogExp2(0x020014, 0.0008);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(0, 0, 5);

  /* ──────────── Lights ──────────── */
  const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
  dirLight.position.set(5, 3, 5);
  scene.add(dirLight);

  const pointLight1 = new THREE.PointLight(0x6c63ff, 2, 200);
  pointLight1.position.set(-30, 10, -100);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xa78bfa, 1.5, 200);
  pointLight2.position.set(30, -10, -250);
  scene.add(pointLight2);

  /* ──────────────────────────────────────────────────
     UTILITY: Create a circle texture on canvas
     ────────────────────────────────────────────────── */
  function createCircleTexture(size, color, falloff) {
    const cnv = document.createElement('canvas');
    cnv.width = size;
    cnv.height = size;
    const ctx = cnv.getContext('2d');
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, color);
    gradient.addColorStop(falloff || 0.4, color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(cnv);
    return tex;
  }

  /* ──────────────────────────────────────────────────
     1. STARFIELD — 12000 twinkling stars
     ────────────────────────────────────────────────── */
  const STAR_COUNT = 12000;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(STAR_COUNT * 3);
  const starSizes = new Float32Array(STAR_COUNT);
  const starBasePositions = new Float32Array(STAR_COUNT * 3);

  for (let i = 0; i < STAR_COUNT; i++) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 400;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 400;
    starPositions[i3 + 2] = -Math.random() * 600;
    starSizes[i] = Math.random() * 3 + 0.5;
    starBasePositions[i3] = starPositions[i3];
    starBasePositions[i3 + 1] = starPositions[i3 + 1];
    starBasePositions[i3 + 2] = starPositions[i3 + 2];
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  const starTexture = createCircleTexture(64, '#ffffff', 0.2);
  const starMat = new THREE.PointsMaterial({
    map: starTexture,
    size: 1.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    color: 0xffffff,
  });

  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ──────────────────────────────────────────────────
     2. SPIRAL GALAXY — at z = -60
     ────────────────────────────────────────────────── */
  function createSpiralGalaxy(positionOffset) {
    const group = new THREE.Group();
    const GALAXY_STARS = 5000;
    const gGeo = new THREE.BufferGeometry();
    const gPositions = new Float32Array(GALAXY_STARS * 3);
    const gColors = new Float32Array(GALAXY_STARS * 3);

    const arms = 3;
    const armSpread = 0.5;

    for (let i = 0; i < GALAXY_STARS; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 25;
      const armAngle = ((i % arms) / arms) * Math.PI * 2;
      const spinAngle = radius * 0.6;
      const randomX = (Math.random() - 0.5) * armSpread * radius * 0.3;
      const randomY = (Math.random() - 0.5) * armSpread * 2;
      const randomZ = (Math.random() - 0.5) * armSpread * radius * 0.3;

      gPositions[i3] = Math.cos(armAngle + spinAngle) * radius + randomX;
      gPositions[i3 + 1] = randomY;
      gPositions[i3 + 2] = Math.sin(armAngle + spinAngle) * radius + randomZ;

      // Color gradient from center (warm) to edge (cool)
      const t = radius / 25;
      const innerColor = new THREE.Color(0xffa040);
      const outerColor = new THREE.Color(0x6c63ff);
      const c = innerColor.clone().lerp(outerColor, t);
      gColors[i3] = c.r;
      gColors[i3 + 1] = c.g;
      gColors[i3 + 2] = c.b;
    }

    gGeo.setAttribute('position', new THREE.BufferAttribute(gPositions, 3));
    gGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));

    const gTex = createCircleTexture(32, '#ffffff', 0.3);
    const gMat = new THREE.PointsMaterial({
      map: gTex,
      size: 0.6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const galaxyPoints = new THREE.Points(gGeo, gMat);
    group.add(galaxyPoints);

    // Galaxy core glow
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffcc66,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const coreGeo = new THREE.SphereGeometry(2, 16, 16);
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    group.position.copy(positionOffset);
    group.rotation.x = Math.PI * 0.3;
    scene.add(group);
    return group;
  }

  const galaxy = createSpiralGalaxy(new THREE.Vector3(30, 10, -60));

  /* ──────────────────────────────────────────────────
     3. RINGED PLANET — at z = -150
     ────────────────────────────────────────────────── */
  function createRingedPlanet(position) {
    const group = new THREE.Group();

    // Planet body
    const planetGeo = new THREE.SphereGeometry(5, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x8b5e3c,
      roughness: 0.7,
      metalness: 0.1,
      emissive: 0x221100,
      emissiveIntensity: 0.2,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    group.add(planet);

    // Planet surface bands (using a second slightly larger sphere with different color)
    const bandGeo = new THREE.SphereGeometry(5.05, 32, 32);
    const bandMat = new THREE.MeshBasicMaterial({
      color: 0xcc9966,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const bands = new THREE.Mesh(bandGeo, bandMat);
    group.add(bands);

    // Ring
    const ringGeo = new THREE.RingGeometry(7, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xddbb88,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.5;
    group.add(ring);

    // Inner ring
    const innerRingGeo = new THREE.RingGeometry(7.5, 9, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xffcc88,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI * 0.5;
    group.add(innerRing);

    group.position.copy(position);
    group.rotation.z = 0.2;
    scene.add(group);
    return group;
  }

  const ringedPlanet = createRingedPlanet(new THREE.Vector3(-25, -5, -150));

  /* ──────────────────────────────────────────────────
     4. EARTH-LIKE PLANET with atmosphere — at z = -250
     ────────────────────────────────────────────────── */
  function createEarthPlanet(position) {
    const group = new THREE.Group();

    // Planet surface
    const earthGeo = new THREE.SphereGeometry(6, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x2244aa,
      roughness: 0.8,
      metalness: 0.1,
      emissive: 0x112244,
      emissiveIntensity: 0.15,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);

    // Simulated continent patches using small spheres
    const landColor = 0x33aa55;
    for (let i = 0; i < 20; i++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const patchGeo = new THREE.SphereGeometry(
        0.5 + Math.random() * 1.2,
        8,
        8
      );
      const patchMat = new THREE.MeshStandardMaterial({
        color: landColor,
        roughness: 0.9,
        metalness: 0,
      });
      const patch = new THREE.Mesh(patchGeo, patchMat);
      const r = 5.9;
      patch.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      patch.lookAt(0, 0, 0);
      patch.scale.z = 0.1;
      earth.add(patch);
    }

    group.add(earth);

    // Atmosphere glow — slightly larger sphere, BackSide, additive
    const atmosGeo = new THREE.SphereGeometry(7, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    group.add(atmosphere);

    // Outer atmosphere haze
    const outerAtmosGeo = new THREE.SphereGeometry(8, 32, 32);
    const outerAtmosMat = new THREE.MeshBasicMaterial({
      color: 0x6699ff,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const outerAtmosphere = new THREE.Mesh(outerAtmosGeo, outerAtmosMat);
    group.add(outerAtmosphere);

    // Light facing the planet
    const pLight = new THREE.PointLight(0x4488ff, 1, 50);
    pLight.position.set(10, 5, 10);
    group.add(pLight);

    group.position.copy(position);
    scene.add(group);
    return { group, earth };
  }

  const earthPlanet = createEarthPlanet(new THREE.Vector3(20, 5, -250));

  /* ──────────────────────────────────────────────────
     5. SUPERNOVA — at z = -400
     ────────────────────────────────────────────────── */
  function createSupernova(position) {
    const group = new THREE.Group();

    // Core
    const coreGeo = new THREE.SphereGeometry(2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Inner glow
    const glowGeo = new THREE.SphereGeometry(5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff6633,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    // Outer shockwave ring
    const shockGeo = new THREE.RingGeometry(6, 14, 64);
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0xff4422,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const shock = new THREE.Mesh(shockGeo, shockMat);
    group.add(shock);

    // Particle burst
    const burstCount = 2000;
    const burstGeo = new THREE.BufferGeometry();
    const burstPos = new Float32Array(burstCount * 3);
    const burstColors = new Float32Array(burstCount * 3);
    for (let i = 0; i < burstCount; i++) {
      const i3 = i * 3;
      const dir = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).normalize();
      const dist = 3 + Math.random() * 18;
      burstPos[i3] = dir.x * dist;
      burstPos[i3 + 1] = dir.y * dist;
      burstPos[i3 + 2] = dir.z * dist;

      const t = dist / 21;
      const c = new THREE.Color().lerpColors(
        new THREE.Color(0xffffff),
        new THREE.Color(0xff3300),
        t
      );
      burstColors[i3] = c.r;
      burstColors[i3 + 1] = c.g;
      burstColors[i3 + 2] = c.b;
    }
    burstGeo.setAttribute('position', new THREE.BufferAttribute(burstPos, 3));
    burstGeo.setAttribute('color', new THREE.BufferAttribute(burstColors, 3));

    const burstTex = createCircleTexture(32, '#ffffff', 0.3);
    const burstMat = new THREE.PointsMaterial({
      map: burstTex,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });
    const burst = new THREE.Points(burstGeo, burstMat);
    group.add(burst);

    group.position.copy(position);
    scene.add(group);
    return { group, shock, core, glow };
  }

  const supernova = createSupernova(new THREE.Vector3(-15, -3, -400));

  /* ──────────────────────────────────────────────────
     6. WORMHOLE TUNNEL — at z = -310 (between projects and skills)
     ────────────────────────────────────────────────── */
  function createWormholeTunnel(position) {
    const group = new THREE.Group();

    // Tunnel rings
    const RING_COUNT = 30;
    for (let i = 0; i < RING_COUNT; i++) {
      const radius = 8 + Math.sin(i * 0.3) * 3;
      const ringGeo = new THREE.TorusGeometry(radius, 0.08, 8, 64);
      const hue = (i / RING_COUNT) * 0.3 + 0.6; // purple-blue range
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 0.8, 0.5),
        transparent: true,
        opacity: 0.3 + (i / RING_COUNT) * 0.3,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 2;
      ring.rotation.z = i * 0.15;
      group.add(ring);
    }

    // Wormhole center glow
    const whCoreGeo = new THREE.SphereGeometry(3, 16, 16);
    const whCoreMat = new THREE.MeshBasicMaterial({
      color: 0xaa88ff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const whCore = new THREE.Mesh(whCoreGeo, whCoreMat);
    whCore.position.z = -RING_COUNT;
    group.add(whCore);

    group.position.copy(position);
    scene.add(group);
    return group;
  }

  const wormhole = createWormholeTunnel(new THREE.Vector3(0, 0, -310));

  /* ──────────────────────────────────────────────────
     7. Ambient Nebula Clouds
     ────────────────────────────────────────────────── */
  function createNebula(position, color, scale) {
    const geo = new THREE.SphereGeometry(1, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(position);
    mesh.scale.set(scale, scale * 0.6, scale);
    scene.add(mesh);
    return mesh;
  }

  createNebula(new THREE.Vector3(-40, 20, -100), 0x6633cc, 40);
  createNebula(new THREE.Vector3(50, -15, -200), 0x3366ff, 35);
  createNebula(new THREE.Vector3(-30, 10, -350), 0xff3366, 30);
  createNebula(new THREE.Vector3(20, -20, -450), 0x6c63ff, 45);

  /* ──────────────────────────────────────────────────
     SCROLL-DRIVEN CAMERA ANIMATION
     ────────────────────────────────────────────────── */
  const cameraStartZ = 5;
  const cameraEndZ = -500;

  let scrollProgress = 0;
  let targetFOV = 60;
  let currentFOV = 60;

  ScrollTrigger.create({
    trigger: '#scroll-container',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      scrollProgress = self.progress;

      // Camera Z linear interpolation
      const z = THREE.MathUtils.lerp(cameraStartZ, cameraEndZ, scrollProgress);
      camera.position.z = z;
      camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 5;
      camera.position.y = Math.cos(scrollProgress * Math.PI * 1.5) * 3;

      // Look slightly ahead
      camera.lookAt(
        camera.position.x * 0.5,
        camera.position.y * 0.3,
        z - 30
      );

      // Wormhole FOV effect
      if (scrollProgress >= 0.45 && scrollProgress <= 0.65) {
        const wp = (scrollProgress - 0.45) / 0.2;
        const intensity = Math.sin(wp * Math.PI);
        targetFOV = 60 + intensity * 40;
      } else {
        targetFOV = 60;
      }
    },
  });

  /* ──────────────────────────────────────────────────
     ANIMATION LOOP
     ────────────────────────────────────────────────── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Smooth FOV transition
    currentFOV += (targetFOV - currentFOV) * 0.05;
    camera.fov = currentFOV;
    camera.updateProjectionMatrix();

    // --- Star twinkling ---
    const sizes = starGeo.attributes.size;
    for (let i = 0; i < STAR_COUNT; i++) {
      sizes.array[i] =
        (Math.sin(elapsed * 2 + i * 0.1) * 0.5 + 0.5) *
          (starSizes[i] * 0.5) +
        starSizes[i] * 0.5;
    }
    sizes.needsUpdate = true;

    // --- Star stretching during wormhole ---
    if (scrollProgress >= 0.45 && scrollProgress <= 0.65) {
      const wp = (scrollProgress - 0.45) / 0.2;
      const stretchIntensity = Math.sin(wp * Math.PI);
      const posAttr = starGeo.attributes.position;
      for (let i = 0; i < STAR_COUNT; i++) {
        const i3 = i * 3;
        // Stretch along Z
        posAttr.array[i3] = starBasePositions[i3];
        posAttr.array[i3 + 1] = starBasePositions[i3 + 1];
        posAttr.array[i3 + 2] =
          starBasePositions[i3 + 2] - stretchIntensity * 5 * Math.random();
      }
      posAttr.needsUpdate = true;
    }

    // --- Galaxy rotation ---
    galaxy.rotation.y = elapsed * 0.05;

    // --- Ringed planet rotation ---
    ringedPlanet.rotation.y = elapsed * 0.1;

    // --- Earth rotation ---
    earthPlanet.earth.rotation.y = elapsed * 0.15;

    // --- Supernova pulsing ---
    const pulseFactor = Math.sin(elapsed * 1.5) * 0.2 + 1;
    supernova.core.scale.setScalar(pulseFactor);
    supernova.glow.scale.setScalar(pulseFactor * 1.2);
    supernova.shock.rotation.x = elapsed * 0.3;
    supernova.shock.rotation.y = elapsed * 0.2;
    const shockScale = 1 + Math.sin(elapsed * 0.5) * 0.15;
    supernova.shock.scale.setScalar(shockScale);

    // --- Wormhole ring rotation ---
    wormhole.children.forEach((child, i) => {
      child.rotation.z = elapsed * 0.3 + i * 0.15;
    });

    renderer.render(scene, camera);
  }

  animate();

  /* ──────────── Resize ──────────── */
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  window.addEventListener('resize', onResize);

  /* ──────────── Cleanup ──────────── */
  return function cleanup() {
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  };
}
