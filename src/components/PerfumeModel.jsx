import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";

function Bottle() {
  const { scene } = useGLTF("/models/perfume.glb"); // sahi path: public/models/perfume.glb
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

function PerfumeModel() {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Canvas ko sirf tab render/rotate karo jab wo actually viewport mein ho.
  // Isse scroll ke waqt off-screen 3D rendering CPU/GPU nahi khaati aur
  // scroll smooth rehta hai.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "150px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="model-container" ref={wrapperRef}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#f3e6c8" />
        <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#c9a961" />

        <Suspense fallback={null}>
          <Bottle />
          <Environment preset="studio" />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={6} blur={2.5} far={2} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={isVisible}
          autoRotateSpeed={3.8}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/perfume.glb");

export default PerfumeModel;
