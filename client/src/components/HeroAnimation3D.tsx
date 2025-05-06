import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';

// Partículas principais da rede neural
const ParticleNetwork = ({ 
  count = 500, 
  mousePosition, 
  isMobile,
  accentColor = new THREE.Color('#731C13'),
  baseColor = new THREE.Color('#425F70'),
  highLightColor = new THREE.Color('#ECE0C4')
}) => {
  const mesh = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const [activationWave, setActivationWave] = useState(0);
  
  // Gerar posições aleatórias para partículas, com mais concentração no centro
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const activationValues = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Distribuição gaussiana para concentrar pontos no centro
      const theta = 2 * Math.PI * Math.random();
      const rho = 0.5 + Math.random() * 1.8 * (0.5 - Math.random());
      
      // Posições 3D com distribuição mais natural
      const x = rho * Math.sin(theta) * 1.5;
      const y = (Math.random() - 0.5) * 2.5;
      const z = rho * Math.cos(theta) * 1.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Variação aleatória de tamanho para algumas partículas
      scales[i] = Math.random() * 0.5 + 0.5;
      
      // Valores de ativação para efeito de onda
      activationValues[i] = Math.random();
    }
    
    return { positions, scales, activationValues };
  }, [count]);
  
  // Material com shader customizado para partículas dinâmicas
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: baseColor },
        uHighlightColor: { value: highLightColor },
        uAccentColor: { value: accentColor },
        uActivationWave: { value: 0 },
        uMousePosition: { value: new THREE.Vector2(0, 0) },
        uHovered: { value: 0 },
        uPointSize: { value: isMobile ? 3.0 : 5.0 },
      },
      vertexShader: `
        attribute float scale;
        attribute float activation;
        
        uniform float uTime;
        uniform float uActivationWave;
        uniform float uPointSize;
        uniform vec2 uMousePosition;
        uniform float uHovered;
        
        varying vec3 vPosition;
        varying float vActivation;
        varying float vDistance;
        
        void main() {
          vPosition = position;
          
          // Movimento suave baseado no tempo
          vec3 pos = position;
          pos.y += sin(uTime * 0.2 + position.x * 2.0) * 0.02;
          pos.x += cos(uTime * 0.15 + position.z) * 0.02;
          pos.z += sin(uTime * 0.1 + position.y * 3.0) * 0.02;
          
          // Calcular distância do mouse para efeito de proximidade
          vec2 mousePos = uMousePosition;
          float dist = length(vec2(pos.x, pos.y) - mousePos);
          vDistance = smoothstep(0.5, 0.0, dist);
          
          // Valor de ativação com efeito de onda
          vActivation = activation + sin(uTime * 0.5 + dist * 5.0) * 0.5 + 0.5;
          vActivation += uActivationWave * (1.0 - dist) * 2.0;
          
          // Aplicar escala
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Ajustar tamanho com base na ativação e proximidade do mouse
          float size = uPointSize * scale * (1.0 + vActivation * 0.2);
          size *= 1.0 + vDistance * uHovered * 2.0;
          
          gl_PointSize = size * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uHighlightColor;
        uniform vec3 uAccentColor;
        
        varying vec3 vPosition;
        varying float vActivation;
        varying float vDistance;
        
        void main() {
          // Criar partícula circular com borda suave
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Efeito de brilho na borda
          float edge = smoothstep(0.45, 0.5, dist);
          float alpha = 1.0 - edge;
          
          // Misturar cores com base na ativação
          vec3 color = mix(uColor, uHighlightColor, vActivation * 0.7);
          
          // Adicionar cor de destaque baseada na distância do mouse
          color = mix(color, uAccentColor, vDistance * 0.7);
          
          // Brilho central
          float innerGlow = smoothstep(0.5, 0.0, dist) * 0.5;
          color = mix(color, uHighlightColor, innerGlow * vActivation);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, [baseColor, accentColor, highLightColor, isMobile]);
  
  // Atualização por frame para animação
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    
    mesh.current.material.uniforms.uTime.value = time;
    mesh.current.material.uniforms.uMousePosition.value.set(
      mousePosition.x * 0.5, 
      mousePosition.y * 0.5
    );
    mesh.current.material.uniforms.uHovered.value = hovered ? 1.0 : 0.0;
    
    // Rotação suave do sistema
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.z = Math.sin(time * 0.025) * 0.1;
    
    // Efeito de pulso nas partículas
    mesh.current.material.uniforms.uActivationWave.value = 
      0.2 + Math.sin(time * 0.5) * 0.1 + activationWave * 0.7;
    
    // Atenuar o efeito de onda de ativação ao longo do tempo
    if (activationWave > 0) {
      setActivationWave(activationWave * 0.95);
    }
  });
  
  // Interação do usuário para iniciar uma onda de ativação
  const triggerActivationWave = () => {
    setActivationWave(1.0);
  };
  
  // Criar a geometria das partículas
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition.positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(particlesPosition.scales, 1));
    geometry.setAttribute('activation', new THREE.BufferAttribute(particlesPosition.activationValues, 1));
    return geometry;
  }, [particlesPosition]);
  
  return (
    <points 
      ref={mesh} 
      geometry={particlesGeometry}
      material={particleMaterial}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={triggerActivationWave}
    />
  );
};

// Linhas de conexão entre partículas próximas
const ConnectionLines = ({ 
  mousePosition,
  accentColor = new THREE.Color('#731C13'),
  baseColor = new THREE.Color('#425F70')
}) => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Material para as linhas com shader customizado
  const linesMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: baseColor },
        uAccentColor: { value: accentColor },
        uMousePosition: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMousePosition;
        
        varying float vDistance;
        varying float vOpacity;
        
        void main() {
          // Animação baseada no tempo
          vec3 pos = position;
          float offset = float(gl_VertexID % 2) * 0.2;
          pos.y += sin(uTime * 0.2 + position.x * 2.0 + offset) * 0.02;
          pos.x += cos(uTime * 0.15 + position.z + offset) * 0.02;
          pos.z += sin(uTime * 0.1 + position.y * 3.0 + offset) * 0.02;
          
          // Efeito de proximidade do mouse
          vec2 mousePos = uMousePosition;
          float dist = length(vec2(pos.x, pos.y) - mousePos);
          vDistance = smoothstep(0.7, 0.0, dist);
          
          // Opacidade baseada na posição para dar efeito de profundidade
          vOpacity = smoothstep(3.0, 0.5, length(pos)) * 0.6;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uAccentColor;
        
        varying float vDistance;
        varying float vOpacity;
        
        void main() {
          // Misturar cores com base na distância do mouse
          vec3 color = mix(uColor, uAccentColor, vDistance * 0.3);
          
          // Aplicar opacidade variável
          float opacity = vOpacity + vDistance * 0.3;
          
          gl_FragColor = vec4(color, opacity * 0.25);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [baseColor, accentColor]);
  
  // Gerar linhas de conexão
  const linesGeometry = useMemo(() => {
    const lineSegments = [];
    
    // Criar uma grade esparsa de pontos para linhas de conexão
    const gridSize = 8;
    const stepSize = 0.6;
    
    for (let x = -gridSize/2; x < gridSize/2; x++) {
      for (let y = -gridSize/2; y < gridSize/2; y++) {
        for (let z = -gridSize/2; z < gridSize/2; z++) {
          const p1 = new THREE.Vector3(
            x * stepSize + (Math.random() - 0.5) * 0.3,
            y * stepSize + (Math.random() - 0.5) * 0.3,
            z * stepSize + (Math.random() - 0.5) * 0.3
          );
          
          // Conectar apenas alguns pontos aleatoriamente
          if (Math.random() > 0.85) {
            const p2 = new THREE.Vector3(
              p1.x + (Math.random() - 0.5) * 0.3, 
              p1.y + (Math.random() - 0.5) * 0.3,
              p1.z + (Math.random() - 0.5) * 0.3
            );
            
            lineSegments.push(p1.x, p1.y, p1.z);
            lineSegments.push(p2.x, p2.y, p2.z);
          }
        }
      }
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(lineSegments, 3));
    return geometry;
  }, []);
  
  // Animação das linhas
  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    linesRef.current.material.uniforms.uTime.value = time;
    linesRef.current.material.uniforms.uMousePosition.value.set(
      mousePosition.x * 0.5, 
      mousePosition.y * 0.5
    );
    
    // Rotação lenta das conexões
    linesRef.current.rotation.y = time * 0.03;
  });
  
  return (
    <lineSegments
      ref={linesRef}
      geometry={linesGeometry}
      material={linesMaterial}
    />
  );
};

// Efeito de neblina/atmosfera para dar profundidade
const AtmosphereEffect = ({ color = new THREE.Color('#ECE0C4'), mousePosition }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  // Textura de ruído para efeito mais orgânico
  const noiseTexture = useTexture('/images/noise-texture.svg');
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Movimento sutil com base na posição do mouse
    mesh.current.rotation.x = mousePosition.y * 0.05;
    mesh.current.rotation.y = mousePosition.x * 0.05 + time * 0.02;
    
    // Pulsar suavemente
    mesh.current.scale.setScalar(2.8 + Math.sin(time * 0.3) * 0.05);
  });
  
  return (
    <mesh ref={mesh} scale={[2.8, 2.8, 2.8]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.03} 
        side={THREE.BackSide}
        map={noiseTexture}
        depthWrite={false}
      />
    </mesh>
  );
};

// Componente de iluminação dinâmica
const DynamicLighting = ({ mousePosition }) => {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (!light1.current || !light2.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Luz principal que segue o mouse
    light1.current.position.x = mousePosition.x * 3;
    light1.current.position.y = mousePosition.y * 3;
    light1.current.intensity = 0.7 + Math.sin(time) * 0.1;
    
    // Luz secundária com movimento orbital
    light2.current.position.x = Math.sin(time * 0.3) * 5;
    light2.current.position.y = Math.cos(time * 0.2) * 2;
    light2.current.position.z = Math.sin(time * 0.5) * 5;
  });
  
  return (
    <>
      <pointLight ref={light1} color="#ECE0C4" intensity={0.7} distance={10} />
      <pointLight ref={light2} color="#731C13" intensity={0.5} distance={15} />
      <ambientLight intensity={0.1} />
    </>
  );
};

// A cena completa que combina todos os elementos
const Scene = ({ mousePosition, isMobile }) => {
  // Cores do tema da identidade visual
  const primaryColor = new THREE.Color('#425F70');
  const accentColor = new THREE.Color('#731C13');
  const highlightColor = new THREE.Color('#ECE0C4');
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={isMobile ? 70 : 60} />
      
      {/* Sistema de partículas principal */}
      <ParticleNetwork 
        count={isMobile ? 250 : 500} 
        mousePosition={mousePosition} 
        isMobile={isMobile}
        baseColor={primaryColor}
        accentColor={accentColor}
        highLightColor={highlightColor}
      />
      
      {/* Linhas de conexão entre pontos */}
      <ConnectionLines 
        mousePosition={mousePosition} 
        baseColor={primaryColor}
        accentColor={accentColor}
      />
      
      {/* Efeito de atmosfera/neblina para profundidade */}
      <AtmosphereEffect 
        color={highlightColor} 
        mousePosition={mousePosition} 
      />
      
      {/* Iluminação dinâmica */}
      <DynamicLighting mousePosition={mousePosition} />

      {/* Controles de câmera suaves e limitados */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        rotateSpeed={0.1} 
        autoRotate 
        autoRotateSpeed={0.1}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
      
      {/* Efeitos de pós-processamento para melhorar a qualidade visual */}
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.MEDIUM}
        />
        <Vignette offset={0.5} darkness={0.45} />
      </EffectComposer>
    </>
  );
};

// Componente principal exportado
export default function HeroAnimation3D() {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Animação automática (especialmente útil para dispositivos móveis)
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRotate) {
        const time = Date.now() / 1000;
        setMousePosition({
          x: Math.sin(time * 0.3) * 2,
          y: Math.cos(time * 0.2) * 1
        });
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Manipular movimento do mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setAutoRotate(false);
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Normalizar coordenadas do mouse (-1 a 1)
      const x = ((clientX - left) / width) * 2 - 1;
      const y = -((clientY - top) / height) * 2 + 1;
      
      setMousePosition({ x, y });
    }
  };

  // Reativar rotação automática quando mouse sai da área
  const handleMouseLeave = () => {
    setAutoRotate(true);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 -z-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas 
        dpr={[1, isMobile ? 1.5 : 2]} 
        camera={{ position: [0, 0, 5] }}
        className="bg-transparent"
      >
        <Scene mousePosition={mousePosition} isMobile={isMobile} />
      </Canvas>
      
      {/* Overlay gradiente na parte inferior para misturar com o conteúdo */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f7f2] to-transparent pointer-events-none"></div>
    </div>
  );
}