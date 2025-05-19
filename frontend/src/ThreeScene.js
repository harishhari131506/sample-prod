import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import './ThreeScene.css'
const ThreeScene = () => {
  const mountRef = useRef(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.01);
  const [sphereColor, setSphereColor] = useState(0x0088ff);
  const [wireframe, setWireframe] = useState(true);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Sphere
    const geometry = new THREE.SphereGeometry(1, 1, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: sphereColor,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: wireframe,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight("red", 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const backLight = new THREE.PointLight(0x6688ff, 2);
    backLight.position.set(-5, 3, -5);
    scene.add(backLight);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      sphere.rotation.x += rotationSpeed;
      sphere.rotation.y += rotationSpeed * 1.3;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, [rotationSpeed, sphereColor, wireframe]);

  return (
    <div className="container">
      <div ref={mountRef} className="scene-container" />
      <div className="controls">
        <div>
          <label>Rotation Speed:</label>
          <input
            type="range"
            min="0"
            max="0.05"
            step="0.001"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Wireframe:</label>
          <input
            type="checkbox"
            checked={wireframe}
            onChange={(e) => setWireframe(e.target.checked)}
          />
        </div>
        <div>
          <button onClick={() => setSphereColor(0x0088ff)}>Blue</button>
          <button onClick={() => setSphereColor(0xff5500)}>Orange</button>
          <button onClick={() => setSphereColor(0x22ff88)}>Green</button>
        </div>
      </div>
  
    </div>
  );
};

export default ThreeScene;
