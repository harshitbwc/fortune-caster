'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { fortunes } from '@/data/fortunes';
import * as THREE from 'three';

interface FortuneCookie3DProps {
  onShare: (message: string) => void;
}

function FortuneCookieGeometry({ 
  onClick, 
  isOpen,
  position = [0, 0, 0] 
}: { 
  onClick: () => void; 
  isOpen: boolean;
  position?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Floating animation
  useFrame((state) => {
    if (groupRef.current && !isOpen) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Create proper fortune cookie shape
  const cookieGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const normals = [];

    // Create fortune cookie shape - like a folded taco/semicircle
    const segments = 24;
    const radius = 1.2;

    // Top and bottom vertices for the folded shape
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI; // Half circle
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.8;
      
      // Create the fold by bending the cookie
      const foldAmount = Math.sin(angle) * 0.4;
      const z1 = foldAmount; // Top surface
      const z2 = -foldAmount; // Bottom surface

      // Add vertices for top and bottom
      vertices.push(x, y, z1);
      vertices.push(x, y, z2);

      // Calculate normals
      normals.push(0, 0, 1);
      normals.push(0, 0, -1);
    }

    // Create faces
    for (let i = 0; i < segments; i++) {
      const current = i * 2;
      const next = (i + 1) * 2;

      // Top face triangles
      indices.push(current, next, current + 1);
      indices.push(next, next + 1, current + 1);

      // Connect top and bottom (sides)
      if (i === 0 || i === segments - 1) {
        indices.push(current, current + 1, next);
        indices.push(current + 1, next + 1, next);
      }
    }

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  const cookieMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#E6B800',
      roughness: 0.7,
      metalness: 0.05,
    }), []
  );

  return (
    <group ref={groupRef} position={position}>
      {!isOpen ? (
        // Whole cookie
        <group onClick={onClick}>
          <mesh 
            geometry={cookieGeometry} 
            material={cookieMaterial}
            scale={[1, 1, 1]}
            rotation={[0.3, 0, 0]}
          />
          {/* Cookie texture spots */}
          <mesh position={[0.4, 0.3, 0.2]} scale={[0.08, 0.08, 0.08]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#B8860B" />
          </mesh>
          <mesh position={[-0.3, 0.2, 0.15]} scale={[0.06, 0.06, 0.06]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#CD853F" />
          </mesh>
          <mesh position={[0.1, -0.2, 0.1]} scale={[0.05, 0.05, 0.05]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#B8860B" />
          </mesh>
        </group>
      ) : (
        // Broken cookie halves
        <>
          <group position={[-1.2, 0.2, 0]} rotation={[0.3, 0.3, -0.2]}>
            <mesh 
              geometry={cookieGeometry} 
              material={cookieMaterial}
              scale={[0.5, 1, 1]}
            />
            <mesh position={[0.2, 0.1, 0.1]} scale={[0.06, 0.06, 0.06]}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial color="#B8860B" />
            </mesh>
          </group>
          
          <group position={[1.2, 0.2, 0]} rotation={[0.3, -0.3, 0.2]}>
            <mesh 
              geometry={cookieGeometry} 
              material={cookieMaterial}
              scale={[0.5, 1, 1]}
            />
            <mesh position={[-0.1, -0.1, 0.08]} scale={[0.05, 0.05, 0.05]}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial color="#CD853F" />
            </mesh>
          </group>
        </>
      )}
    </group>
  );
}

function Scene({ 
  onCookieClick, 
  isOpen
}: { 
  onCookieClick: () => void;
  isOpen: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#FFE4B5" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#FFA500" />
      <directionalLight position={[0, 10, 5]} intensity={0.6} color="#FFFFFF" />
      
      <FortuneCookieGeometry 
        onClick={onCookieClick}
        isOpen={isOpen}
        position={[0, 1, 0]}
      />
    </>
  );
}

export default function FortuneCookie3D({ onShare }: FortuneCookie3DProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFortune, setCurrentFortune] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleCookieClick = () => {
    if (!isOpen) {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setCurrentFortune(randomFortune);
      setIsOpen(true);
      
      // Show message scaling up after cookie breaks
      setTimeout(() => {
        setShowMessage(true);
        // Show buttons 1 second after message appears
        setTimeout(() => {
          setShowButtons(true);
        }, 1000);
      }, 800);
    }
  };

  const handleNewCookie = () => {
    setIsOpen(false);
    setShowMessage(false);
    setShowButtons(false);
    setCurrentFortune('');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
      {/* 3D Canvas - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-2/3">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <Scene 
              onCookieClick={handleCookieClick}
              isOpen={isOpen}
            />
          </Canvas>
        </div>
      </div>

      {/* Fortune message - appears under cookie with scaling */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              rotate: [0, 1, -1, 0]
            }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="text-center px-6 py-4 max-w-sm mx-auto">
              <p className="text-yellow-200 text-xl font-bold leading-relaxed text-center drop-shadow-2xl">
                &ldquo;{currentFortune}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions when cookie is not clicked */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-center text-yellow-200/90 z-20"
        >
          <p className="text-xl mb-2 font-semibold drop-shadow-lg">Tap the fortune cookie</p>
          <p className="text-sm opacity-80">✨ Your destiny awaits ✨</p>
        </motion.div>
      )}

      {/* Bottom buttons - highly visible */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4 z-30"
          >
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onShare(currentFortune)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-4 rounded-full font-bold shadow-2xl border-2 border-white/20 transition-all duration-300"
              >
                <Share2 size={20} />
                Share
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleNewCookie}
                className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-6 py-4 rounded-full font-bold shadow-2xl border-2 border-white/20 transition-all duration-300"
              >
                New Fortune
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-orange-900/30 pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-6 h-6 bg-yellow-400 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute top-20 right-16 w-4 h-4 bg-orange-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-32 left-16 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-30"></div>
      <div className="absolute bottom-24 right-12 w-5 h-5 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
    </div>
  );
}