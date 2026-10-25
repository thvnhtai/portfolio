import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Rope, type Vec3 } from '../../lib/verlet';
import { createDoubleTap } from './doubleTap';
import { backTexture, frontTexture, loadPhoto, strapTexture } from './textures';

const CW = 1.7, CH = 2.4, CR = 0.12, CT = 0.035;
const CAM_Z = 8; // closer camera => card fills ~40% of the (now tall) hero
const N = 12, SEG = 0.24, L = CH / 2 + 0.32;

export function createBadgeScene(host: HTMLElement, opts: { photoUrl: string }) {
  const coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  const dpr = Math.min(coarse ? 1.5 : 2, window.devicePixelRatio || 1);
  let W = host.clientWidth || 1, H = host.clientHeight || 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(dpr);
  renderer.setSize(W, H);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const el = renderer.domElement;
  el.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y';
  host.appendChild(el);

  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment(renderer);
  const envRT = pm.fromScene(room, 0.04);
  scene.environment = envRT.texture;
  const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100);
  camera.position.set(0, 0, CAM_Z);

  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-4, 6, 8); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 8; sun.shadow.blurSamples = 16;
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 6, bottom: -6, near: 1, far: 30 });
  scene.add(sun, new THREE.AmbientLight(0xffffff, 0.35));
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), new THREE.ShadowMaterial({ opacity: 0.16 }));
  wall.position.z = -1.2; wall.receiveShadow = true; scene.add(wall);

  // textures: photo loads async, front texture swaps in when ready
  const disposables: { dispose(): void }[] = [pm, envRT, room, wall.geometry, wall.material as THREE.Material, renderer];
  let dead = false;
  const back = backTexture(), strapTex = strapTexture();
  let front = frontTexture(null);
  const glossy = { roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.12, iridescence: 0.35, iridescenceIOR: 1.4, iridescenceThicknessRange: [200, 500] as [number, number] };
  const frontMat = new THREE.MeshPhysicalMaterial({ map: front, ...glossy });
  const backMat = new THREE.MeshPhysicalMaterial({ map: back, ...glossy });
  void loadPhoto(opts.photoUrl).then((img) => {
    if (dead || !img) return;
    front.dispose(); front = frontTexture(img); frontMat.map = front; frontMat.needsUpdate = true;
  });

  // card
  const shape = new THREE.Shape();
  shape.moveTo(-CW / 2 + CR, -CH / 2); shape.lineTo(CW / 2 - CR, -CH / 2); shape.quadraticCurveTo(CW / 2, -CH / 2, CW / 2, -CH / 2 + CR);
  shape.lineTo(CW / 2, CH / 2 - CR); shape.quadraticCurveTo(CW / 2, CH / 2, CW / 2 - CR, CH / 2); shape.lineTo(-CW / 2 + CR, CH / 2);
  shape.quadraticCurveTo(-CW / 2, CH / 2, -CW / 2, CH / 2 - CR); shape.lineTo(-CW / 2, -CH / 2 + CR); shape.quadraticCurveTo(-CW / 2, -CH / 2, -CW / 2 + CR, -CH / 2);
  const hole = new THREE.Path(); hole.absellipse(0, CH / 2 - 0.17, 0.2, 0.05, 0, Math.PI * 2, true); shape.holes.push(hole);
  const faceGeo = () => {
    const g = new THREE.ShapeGeometry(shape, 24), uv = g.attributes.uv!, p = g.attributes.position!;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (p.getX(i) + CW / 2) / CW, (p.getY(i) + CH / 2) / CH);
    return g;
  };
  const card = new THREE.Group();
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xf2efe8, roughness: 0.4, clearcoat: 0.6 });
  const body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: CT, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 3, curveSegments: 24 }), bodyMat);
  body.position.z = -CT / 2;
  const f = new THREE.Mesh(faceGeo(), frontMat); f.position.z = CT / 2 + 0.009;
  const bk = new THREE.Mesh(faceGeo(), backMat); bk.rotation.y = Math.PI; bk.position.z = -CT / 2 - 0.009;
  const bkUv = bk.geometry.attributes.uv!; for (let i = 0; i < bkUv.count; i++) bkUv.setX(i, 1 - bkUv.getX(i));
  card.add(body, f, bk);
  const metal = new THREE.MeshStandardMaterial({ color: 0xc9c9c9, metalness: 1, roughness: 0.22 });
  const clip = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 16, 40), metal); ring.position.y = 0.1;
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.07), metal); plate.position.y = -0.08;
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.42, 16), metal); pin.rotation.z = Math.PI / 2; pin.position.y = -0.18;
  clip.add(ring, plate, pin); clip.position.y = CH / 2 + 0.02;
  card.add(clip);
  card.traverse((m) => { if ((m as THREE.Mesh).isMesh) m.castShadow = true; });
  scene.add(card);

  // strap
  const anchor: Vec3 = { x: 0, y: 0, z: 0 };
  const setAnchor = () => {
    const halfV = Math.tan(THREE.MathUtils.degToRad(15)) * CAM_Z, halfH = halfV * W / H;
    anchor.x = halfH * 0.5; anchor.y = halfV + 1.7; // strap cropped at the top so the card fills ~45% of the tall hero
  };
  setAnchor();
  const rope = new Rope(anchor, N, SEG, L);
  const sGeo = new THREE.BufferGeometry();
  const sPos = new Float32Array((N + 1) * 2 * 3), sUv = new Float32Array((N + 1) * 2 * 2), idx: number[] = [];
  for (let i = 0; i <= N; i++) { sUv.set([i / N * 3, 0, i / N * 3, 1], i * 4); if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } }
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3)); sGeo.setAttribute('uv', new THREE.BufferAttribute(sUv, 2)); sGeo.setIndex(idx);
  const strapMat = new THREE.MeshStandardMaterial({ map: strapTex, side: THREE.DoubleSide, roughness: 0.75 });
  const strap = new THREE.Mesh(sGeo, strapMat);
  strap.castShadow = true; strap.frustumCulled = false; scene.add(strap);

  // interaction
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  let drag: THREE.Vector3 | null = null;
  const grabOff = new THREE.Vector3();
  const setNdc = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
  };
  const target = new THREE.Vector3();
  let downX = 0, downY = 0, moved = false;
  const doubleTap = createDoubleTap();
  const noScroll = (e: TouchEvent) => { if (e.cancelable) e.preventDefault(); };
  const down = (e: PointerEvent) => {
    setNdc(e);
    if (!ray.intersectObject(card, true)[0]) return;
    const t = rope.tail;
    drag = new THREE.Vector3(); ray.ray.intersectPlane(dragPlane, drag);
    grabOff.set(t.x, t.y, t.z).sub(drag); grabOff.z = 0;
    el.setPointerCapture(e.pointerId); el.style.cursor = 'grabbing';
    downX = e.clientX; downY = e.clientY; moved = false;
    el.addEventListener('touchmove', noScroll, { passive: false });
  };
  const move = (e: PointerEvent) => {
    setNdc(e);
    if (drag) { ray.ray.intersectPlane(dragPlane, drag); if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) moved = true; }
    else el.style.cursor = ray.intersectObject(card, true).length ? 'grab' : '';
  };
  const up = (e: PointerEvent) => {
    if (!drag) return;
    drag = null; el.style.cursor = '';
    el.removeEventListener('touchmove', noScroll);
    if (e.type !== 'pointerup' || moved) return;
    if (doubleTap({ t: performance.now(), x: e.clientX, y: e.clientY, moved })) rope.flip();
  };
  el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move);
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);

  // resize
  const resize = () => {
    W = host.clientWidth || 1; H = host.clientHeight || 1;
    renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix(); setAnchor();
  };
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  ro?.observe(host);
  if (!ro) window.addEventListener('resize', resize);

  // render
  const tmp = new THREE.Vector3(), up3 = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0);
  const q1 = new THREE.Quaternion(), q2 = new THREE.Quaternion(), side = new THREE.Vector3(), Z = new THREE.Vector3(0, 0, 1);
  const render = () => {
    const pts = rope.points, A = pts[N]!, B = rope.tail;
    up3.set(A.x - B.x, A.y - B.y, A.z - B.z).normalize();
    q1.setFromUnitVectors(Y, up3); q2.setFromAxisAngle(up3, rope.yaw);
    card.quaternion.copy(q2).multiply(q1);
    card.position.set(A.x, A.y, A.z).addScaledVector(up3, -(CH / 2 + 0.2));
    for (let i = 0; i <= N; i++) {
      const p = pts[i]!, nx = pts[Math.min(N, i + 1)]!, pv = pts[Math.max(0, i - 1)]!;
      tmp.set(nx.x - pv.x, nx.y - pv.y, nx.z - pv.z).normalize();
      side.crossVectors(tmp, Z).normalize().applyAxisAngle(tmp, rope.yaw * Math.pow(i / N, 2.2)).multiplyScalar(0.11);
      sPos.set([p.x + side.x, p.y + side.y, p.z + side.z, p.x - side.x, p.y - side.y, p.z - side.z], i * 6);
    }
    sGeo.attributes.position!.needsUpdate = true; sGeo.computeVertexNormals();
    renderer.render(scene, camera);
  };

  let raf = 0, last = 0;
  const tick = (t: number) => {
    raf = requestAnimationFrame(tick);
    rope.step(Math.min(50, t - last) / 1000, drag && target.copy(drag).add(grabOff));
    last = t;
    render();
  };
  render();

  return {
    start() { if (!raf && !dead) { last = performance.now(); raf = requestAnimationFrame(tick); } },
    stop() { cancelAnimationFrame(raf); raf = 0; },
    dispose() {
      dead = true; cancelAnimationFrame(raf); raf = 0;
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
      el.removeEventListener('touchmove', noScroll); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
      ro?.disconnect(); window.removeEventListener('resize', resize);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) { m.geometry.dispose(); }
      });
      [bodyMat, frontMat, backMat, metal, strapMat].forEach((m) => m.dispose());
      [front, back, strapTex].forEach((t) => t.dispose());
      disposables.forEach((d) => d.dispose());
      renderer.forceContextLoss();
      el.remove();
    },
  };
}
