import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// SVG baseado em pontos de harmonização facial
const FacialSvg = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  // Pontos que representam áreas de harmonização facial
  const points = [
    { x: 120, y: 80, label: "Testa" },
    { x: 90, y: 110, label: "Glabela" },
    { x: 90, y: 130, label: "Nariz" },
    { x: 90, y: 160, label: "Lábio" },
    { x: 90, y: 180, label: "Queixo" },
    { x: 60, y: 120, label: "Olho E" },
    { x: 120, y: 120, label: "Olho D" },
    { x: 40, y: 150, label: "Bochecha E" },
    { x: 140, y: 150, label: "Bochecha D" },
    { x: 30, y: 170, label: "Mandíbula E" },
    { x: 150, y: 170, label: "Mandíbula D" },
    { x: 50, y: 100, label: "Têmpora E" },
    { x: 130, y: 100, label: "Têmpora D" },
  ];

  // Cria linhas entre pontos próximos
  const createLines = () => {
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = Math.sqrt(
          Math.pow(points[i].x - points[j].x, 2) + 
          Math.pow(points[i].y - points[j].y, 2)
        );
        
        // Só conectar pontos relativamente próximos
        if (dist < 60) {
          const opacity = 0.4 - (dist / 150);
          lines.push(
            <line
              key={`line-${i}-${j}`}
              x1={points[i].x + mouseX * 2}
              y1={points[i].y + mouseY * 2}
              x2={points[j].x + mouseX * 2}
              y2={points[j].y + mouseY * 2}
              stroke="#425F70"
              strokeWidth="0.5"
              strokeOpacity={opacity}
            />
          );
        }
      }
    }
    return lines;
  };

  return (
    <svg
      viewBox="0 0 180 240"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 10px rgba(115, 28, 19, 0.3))' }}
    >
      {/* Face outline */}
      <ellipse 
        cx="90" 
        cy="140" 
        rx="70" 
        ry="90" 
        fill="rgba(115, 28, 19, 0.1)" 
        stroke="#425F70" 
        strokeWidth="0.5" 
        strokeOpacity="0.3"
        style={{ 
          transform: `translate(${mouseX * 5}px, ${mouseY * 5}px)` 
        }}
      />
      
      {/* Connection lines */}
      <g>{createLines()}</g>
      
      {/* Points */}
      {points.map((point, i) => (
        <g key={i}>
          <circle
            cx={point.x + mouseX * 2}
            cy={point.y + mouseY * 2}
            r="4"
            fill="#ECE0C4"
            stroke="#731C13"
            strokeWidth="1"
            style={{ 
              animation: `pulse-${i} 2s infinite ease-in-out`,
              animationDelay: `${i * 0.1}s` 
            }}
          />
          <style>
            {`
              @keyframes pulse-${i} {
                0% { r: 3; }
                50% { r: 5; }
                100% { r: 3; }
              }
            `}
          </style>
        </g>
      ))}
      
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

// Componente principal da animação
export default function FacialAnimation3D() {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Ativar e desativar autorotate
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRotate) {
        const time = Date.now() / 1000;
        setMousePosition({
          x: Math.sin(time * 0.5) * 5,
          y: Math.cos(time * 0.3) * 5
        });
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setAutoRotate(false);
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calcular posição relativa
      const x = (clientX - left - width / 2) / 10;
      const y = (clientY - top - height / 2) / 10;
      
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setAutoRotate(true);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-white/30 to-[#ECE0C4]/10 rounded-xl overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ 
        perspective: "1000px",
        transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
        transition: 'transform 0.5s ease-out'
      }}
    >
      <div className="absolute inset-0 z-10">
        <FacialSvg mouseX={mousePosition.x} mouseY={mousePosition.y} />
      </div>
      
      {/* Fundo de gradiente animado */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#731C13]/5 to-[#425F70]/10 opacity-50"
        style={{
          transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      
      {/* Círculos decorativos */}
      <div 
        className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-[#ECE0C4]/10 blur-md"
        style={{
          transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-[#731C13]/10 blur-md"
        style={{
          transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`,
          transition: 'transform 0.4s ease-out'
        }}
      />
    </motion.div>
  );
}