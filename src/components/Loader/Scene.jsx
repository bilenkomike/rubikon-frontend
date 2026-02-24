import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import ModelParticles from "./ModelParticles";

function AnimatedContent({ onRevealUI }) {
  const { camera, size } = useThree();
  const { scene } = useGLTF("/models/model.glb");

  const isMobile = size.width < 768;

  const modelRef = useRef(null);
  const particlesRef = useRef(null);

  // StrictMode dev: effects run twice. We guard, but reset in cleanup.
  const startedRef = useRef(false);

  // Keep handles so we can kill them on cleanup (StrictMode-safe)
  const tlRef = useRef(null);
  const hideCallRef = useRef(null);

  const rotationSpeed = useRef(0);
  const particlesProgress = useRef(0);
  const particlesFade = useRef(0);

  // camera presets (responsive)
  const normalCam = useMemo(
    () => new THREE.Vector3(0, 0.3, isMobile ? 7.8 : 6),
    [isMobile],
  );
  const startCam = useMemo(
    () => new THREE.Vector3(0, 0.3, isMobile ? 4.3 : 3.2),
    [isMobile],
  );
  const maxCam = useMemo(
    () => new THREE.Vector3(0, 0.15, isMobile ? 1.8 : 1.35),
    [isMobile],
  );

  useFrame((_, delta) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += rotationSpeed.current * delta;
    modelRef.current.rotation.x += rotationSpeed.current * 0.12 * delta;
  });

  useEffect(() => {
    // Wait until refs exist (important in StrictMode + suspense timing)
    if (!modelRef.current || !particlesRef.current) return;

    // Guard double-run
    if (startedRef.current) return;
    startedRef.current = true;

    // Kill anything leftover (safety)
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (hideCallRef.current) {
      hideCallRef.current.kill();
      hideCallRef.current = null;
    }

    // reset visibility + values
    modelRef.current.visible = true;
    particlesRef.current.visible = false;

    rotationSpeed.current = 0;
    particlesProgress.current = 0;
    particlesFade.current = 0;

    // responsive FOV
    camera.fov = isMobile ? 55 : 50;
    camera.updateProjectionMatrix();

    // initial camera
    camera.position.copy(startCam);
    camera.lookAt(0, 0, 0);

    const tl = gsap.timeline();
    tlRef.current = tl;

    // settle to normal
    tl.to(camera.position, {
      x: normalCam.x,
      y: normalCam.y,
      z: normalCam.z,
      duration: 0.9,
      ease: "power3.out",
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

    // 1) spin-up for 8 seconds
    tl.to(rotationSpeed, {
      current: 25.0,
      duration: 8.0,
      ease: "power2.in",
    });

    // 2) AFTER spin: start zoom + shatter together
    tl.add(() => {
      if (!particlesRef.current || !modelRef.current) return;

      particlesRef.current.visible = true;

      // schedule hide (store handle so we can kill it in cleanup)
      hideCallRef.current = gsap.delayedCall(0.05, () => {
        if (modelRef.current) modelRef.current.visible = false;
      });
    });

    // Zoom to max (camera + fov)
    tl.to(
      camera.position,
      {
        x: maxCam.x,
        y: maxCam.y,
        z: maxCam.z,
        duration: 1.1,
        ease: "power3.inOut",
        onUpdate: () => camera.lookAt(0, 0, 0),
      },
      "<",
    );

    tl.to(
      camera,
      {
        fov: isMobile ? 64 : 62,
        duration: 1.1,
        ease: "power3.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      "<",
    );

    // Shatter during zoom (particles progress)
    tl.to(
      particlesProgress,
      {
        current: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "<",
    );

    // Fade pixels out
    tl.to(particlesFade, {
      current: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Reveal UI after fade
    tl.add(() => onRevealUI?.());

    return () => {
      // StrictMode fake unmount -> cleanup runs -> kill everything
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (hideCallRef.current) {
        hideCallRef.current.kill();
        hideCallRef.current = null;
      }

      // allow next mount (StrictMode dev) to run again
      startedRef.current = false;
    };
  }, [camera, normalCam, startCam, maxCam, onRevealUI, isMobile]);

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 5, 5]} intensity={1.25} />

      <group ref={modelRef}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>

      <ModelParticles
        ref={particlesRef}
        scene={scene}
        progressRef={particlesProgress}
        fadeRef={particlesFade}
        strength={14}
      />

      <OrbitControls enabled={false} />
      <Environment preset="city" background={false} />
    </>
  );
}

export default function Scene({ onRevealUI }) {
  return (
    <Canvas
      // initial camera; AnimatedContent will set the real values
      camera={{ position: [0, 0.3, 6], fov: 50 }}
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <AnimatedContent onRevealUI={onRevealUI} />
      </Suspense>
    </Canvas>
  );
}
