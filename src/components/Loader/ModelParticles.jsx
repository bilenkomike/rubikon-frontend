import { forwardRef, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringToSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const ModelParticles = forwardRef(function ModelParticles(
  { scene, progressRef, fadeRef, strength = 12, maxPoints = 25000 },
  forwardedRef,
) {
  const pointsRef = useRef(null);

  const { geometry, directions } = useMemo(() => {
    const positions = [];

    scene.traverse((obj) => {
      if (obj.isMesh && obj.geometry?.attributes?.position) {
        const arr = obj.geometry.attributes.position.array;
        for (let i = 0; i < arr.length; i += 3) {
          positions.push(arr[i], arr[i + 1], arr[i + 2]);
        }
      }
    });

    const count = positions.length / 3;
    let sampled = positions;

    if (count > maxPoints) {
      const step = Math.ceil(count / maxPoints);
      const tmp = [];
      for (let i = 0; i < positions.length; i += 3 * step) {
        tmp.push(positions[i], positions[i + 1], positions[i + 2]);
      }
      sampled = tmp;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(sampled, 3));

    const rand = mulberry32(hashStringToSeed(scene.uuid));
    const dir = new Float32Array((sampled.length / 3) * 3);

    for (let i = 0; i < dir.length; i += 3) {
      const v = new THREE.Vector3(
        (rand() - 0.5) * 2,
        (rand() - 0.5) * 2,
        (rand() - 0.5) * 2,
      ).normalize();
      dir[i] = v.x;
      dir[i + 1] = v.y;
      dir[i + 2] = v.z;
    }

    return { geometry: geo, directions: dir };
  }, [scene, maxPoints]);

  const basePositions = useMemo(
    () => new Float32Array(geometry.attributes.position.array),
    [geometry],
  );

  const setRefs = (node) => {
    pointsRef.current = node;
    if (forwardedRef) {
      if (typeof forwardedRef === "function") forwardedRef(node);
      else forwardedRef.current = node;
    }
  };

  useFrame(() => {
    if (!pointsRef.current) return;

    const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1);
    const f = THREE.MathUtils.clamp(fadeRef.current ?? 0, 0, 1);

    const posAttr = pointsRef.current.geometry.attributes.position;
    const explode = strength * p;

    for (let i = 0; i < posAttr.array.length; i += 3) {
      posAttr.array[i] = basePositions[i] + directions[i] * explode;
      posAttr.array[i + 1] = basePositions[i + 1] + directions[i + 1] * explode;
      posAttr.array[i + 2] = basePositions[i + 2] + directions[i + 2] * explode;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.material.opacity = 1 - f;
  });

  return (
    <points ref={setRefs} geometry={geometry} visible={false}>
      <pointsMaterial
        size={0.03}
        transparent
        opacity={1}
        depthWrite={false}
        color="#111111"
      />
    </points>
  );
});

export default ModelParticles;
