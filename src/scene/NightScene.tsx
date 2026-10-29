import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import {
  Color,
  ExtrudeGeometry,
  Group,
  MeshStandardMaterial,
  Shape,
  TextureLoader,
} from 'three'
import skySrc from '../photos/night-horizon.jpg'
import { poseAt, sceneState } from './path'

const INK = '#232323'
const MINT = '#a1ffcb'

function Roof() {
  const geo = useMemo(() => {
    const s = new Shape()
    s.moveTo(-2.9, 0)
    s.lineTo(0, 1.85)
    s.lineTo(2.9, 0)
    s.closePath()
    return new ExtrudeGeometry(s, { depth: 4.6, bevelEnabled: false })
  }, [])
  return (
    <mesh
      geometry={geo}
      position={[0, 3.15, -2.3]}
      rotation={[0, 0, 0]}
      castShadow
    >
      <meshStandardMaterial color="#141414" roughness={0.86} metalness={0.08} />
    </mesh>
  )
}

function WindowLite() {
  const mat = useRef<MeshStandardMaterial>(null)
  useFrame(() => {
    if (!mat.current) return
    const c =
      sceneState.call === 'ac' ? '#7fffc0' : sceneState.call === 'leak' ? '#d7ffe8' : MINT
    mat.current.color.set(c)
    mat.current.emissive.set(c)
    mat.current.emissiveIntensity = sceneState.call === 'heat' ? 2.4 : 1.7
  })
  return (
    <mesh position={[1.15, 1.7, 2.12]}>
      <boxGeometry args={[1.35, 1.55, 0.08]} />
      <meshStandardMaterial
        ref={mat}
        color={MINT}
        emissive={MINT}
        emissiveIntensity={2.4}
        toneMapped={false}
      />
    </mesh>
  )
}

function House() {
  return (
    <group>
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[5.4, 3.1, 4.2]} />
        <meshStandardMaterial color="#3c3c3c" roughness={0.9} />
      </mesh>
      <Roof />
      <mesh position={[1.7, 3.95, -0.4]} castShadow>
        <boxGeometry args={[0.55, 0.9, 0.55]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <WindowLite />
      <mesh position={[-1.2, 1.55, 2.12]}>
        <boxGeometry args={[1.1, 1.2, 0.06]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.5} />
      </mesh>
      <mesh position={[2.05, 0.42, 2.55]} castShadow>
        <boxGeometry args={[1.15, 0.85, 0.9]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.35} roughness={0.4} />
      </mesh>
      <mesh position={[2.05, 0.9, 2.55]}>
        <cylinderGeometry args={[0.28, 0.28, 0.12, 16]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  )
}

function Van() {
  return (
    <group position={[5.6, 0.55, 3.35]} rotation={[0, -0.35, 0]}>
      <mesh castShadow>
        <boxGeometry args={[2.5, 1.15, 1.25]} />
        <meshStandardMaterial color="#303030" roughness={0.7} />
      </mesh>
      <mesh position={[1.05, 0.05, 0]} castShadow>
        <boxGeometry args={[0.85, 0.85, 1.2]} />
        <meshStandardMaterial color="#262626" />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[1.7, 0.07, 1.28]} />
        <meshStandardMaterial
          color={MINT}
          emissive={MINT}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-0.7, -0.48, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.18, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.85, -0.48, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.18, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-0.7, -0.48, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.18, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.85, -0.48, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.18, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  )
}

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#1b1b1b" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.5, 0.01, 3.4]} receiveShadow>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial color="#141414" roughness={0.95} />
      </mesh>
    </>
  )
}

function Sky() {
  const tex = useLoader(TextureLoader, skySrc)
  return (
    <mesh position={[0, 8, -18]}>
      <planeGeometry args={[70, 28]} />
      <meshBasicMaterial map={tex} />
    </mesh>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const look = useRef({ x: 0, y: 1.7, z: 0 })
  useFrame((_, dt) => {
    const pose = sceneState.reduced
      ? poseAt(0.12, sceneState.call)
      : poseAt(sceneState.progress, sceneState.call)
    const k = 1 - Math.exp(-dt * 3.2)
    camera.position.x += (pose.x - camera.position.x) * k
    camera.position.y += (pose.y - camera.position.y) * k
    camera.position.z += (pose.z - camera.position.z) * k
    look.current.x += (pose.tx - look.current.x) * k
    look.current.y += (pose.ty - look.current.y) * k
    look.current.z += (pose.tz - look.current.z) * k
    camera.lookAt(look.current.x, look.current.y, look.current.z)
  })
  return null
}

function World() {
  const group = useRef<Group>(null)
  const mint = useMemo(() => new Color(MINT), [])
  useFrame((state) => {
    if (group.current && !sceneState.reduced) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.012
    }
  })
  return (
    <group ref={group}>
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 16, 38]} />
      <ambientLight intensity={0.42} />
      <directionalLight
        position={[-8, 14, 6]}
        intensity={1.15}
        color="#d7d7d7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[1.15, 1.7, 2.4]} intensity={6} distance={8} color={mint} />
      <pointLight position={[5.6, 1.4, 3.35]} intensity={2.2} distance={7} color={mint} />
      <Suspense fallback={null}>
        <Sky />
      </Suspense>
      <Ground />
      <House />
      <Van />
    </group>
  )
}

export function NightScene() {
  return (
    <div className="night-canvas" aria-hidden="true">
      <Canvas
        camera={{ fov: 40, position: [6.6, 2.8, 9.2], near: 0.1, far: 90 }}
        dpr={[1, 1.6]}
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <CameraRig />
        <World />
      </Canvas>
    </div>
  )
}

