import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";

interface MousePosition {
  x: number;
  y: number;
}

// Alternativa leve para a animação de partículas com CSS/SVG em vez de Three.js
export default function HeroBackground3D({ mousePosition = { x: 0, y: 0 } }: { mousePosition?: MousePosition }) {
  const isMobile = useIsMobile();
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
    duration: number;
  }>>([]);

  // Cores da paleta do site para as partículas
  const colors = [
    'rgba(255, 255, 255, 0.7)',  // Branco
    'rgba(236, 224, 196, 0.6)',  // Dourado claro
    'rgba(209, 186, 161, 0.5)',  // Dourado médio
    'rgba(115, 28, 19, 0.3)',    // Marsala (vinho)
  ];

  // Gerar partículas uma vez no carregamento do componente
  useEffect(() => {
    const particleCount = isMobile ? 30 : 50;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.random() < 0.5 ? 0 : 
                        Math.random() < 0.8 ? 1 : 
                        Math.random() < 0.95 ? 2 : 3;
      
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 5, // Entre 5 e 20px
        color: colors[colorIndex],
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15, // Entre 15 e 25 segundos
      });
    }
    
    setParticles(newParticles);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-50 pointer-events-none">
      {/* Gradiente de fundo para sutilmente intensificar o efeito */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#ECE0C4]/5 to-transparent opacity-80"></div>
      
      {/* Efeito de glare/iluminação central */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-gradient-radial from-white via-[#ECE0C4]/30 to-transparent blur-2xl opacity-20"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 20}px), calc(-50% + ${mousePosition.y * 20}px))`,
        }}
      />
      
      {/* Partículas flutuantes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
          }}
          animate={{
            x: [
              Math.sin(particle.id) * 100,
              Math.sin(particle.id + 2) * 100,
              Math.sin(particle.id + 1) * 100,
            ],
            y: [
              Math.cos(particle.id) * 50,
              Math.cos(particle.id + 1) * 50,
              Math.cos(particle.id + 3) * 50,
            ],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Estruturas moleculares estilizadas (linhas conectoras) */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <g
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          {/* Linhas decorativas que simulam estruturas moleculares */}
          <motion.path
            d="M200,100 Q300,50 400,150 T600,200"
            stroke="rgba(236, 224, 196, 0.15)"
            strokeWidth="1"
            fill="none"
            animate={{
              d: [
                "M200,100 Q300,50 400,150 T600,200",
                "M200,120 Q320,70 410,160 T610,220",
                "M200,100 Q300,50 400,150 T600,200",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M100,300 Q200,200 300,250 T500,300"
            stroke="rgba(115, 28, 19, 0.1)"
            strokeWidth="1"
            fill="none"
            animate={{
              d: [
                "M100,300 Q200,200 300,250 T500,300",
                "M120,320 Q220,220 320,270 T520,320", 
                "M100,300 Q200,200 300,250 T500,300",
              ],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M400,400 Q500,300 600,350 T800,400"
            stroke="rgba(66, 95, 112, 0.12)"
            strokeWidth="1"
            fill="none"
            animate={{
              d: [
                "M400,400 Q500,300 600,350 T800,400",
                "M380,380 Q480,290 580,340 T780,390",
                "M400,400 Q500,300 600,350 T800,400",
              ],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
}