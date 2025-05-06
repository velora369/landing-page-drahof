import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// Background Neural Network 
const NetworkBackground = ({ 
  count = 60, 
  mousePosition, 
  colorPrimary = '#425F70', 
  colorAccent = '#731C13',
  colorHighlight = '#ECE0C4'
}: {
  count?: number;
  mousePosition: { x: number; y: number };
  colorPrimary?: string;
  colorAccent?: string;
  colorHighlight?: string;
}) => {
  const points = [];
  
  // Generate random points
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 5 + 2;
    const delay = Math.random() * 2;
    const duration = Math.random() * 3 + 2;
    
    points.push({ x, y, size, delay, duration });
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {points.map((point, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: point.size,
            height: point.size,
            backgroundColor: index % 5 === 0 ? colorAccent : index % 3 === 0 ? colorHighlight : colorPrimary,
            boxShadow: `0 0 ${point.size * 2}px ${index % 5 === 0 ? colorAccent : index % 3 === 0 ? colorHighlight : colorPrimary}`,
            opacity: 0.7,
            transform: `translate3d(
              ${mousePosition.x * (index % 4 - 2) * 2}px, 
              ${mousePosition.y * (index % 3 - 1) * 2}px, 
              0
            )`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: point.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: point.delay
          }}
        />
      ))}
      
      {/* Criando algumas conexões entre pontos */}
      {Array.from({ length: count / 2 }).map((_, index) => {
        const startPoint = points[index];
        const endPoint = points[(index + 5 + Math.floor(Math.random() * 10)) % count];
        
        return (
          <motion.div 
            key={`line-${index}`}
            className="absolute"
            style={{
              left: `${startPoint.x}%`,
              top: `${startPoint.y}%`,
              width: `${Math.hypot(
                endPoint.x - startPoint.x, 
                endPoint.y - startPoint.y
              ) / 1.5}%`,
              height: '1px',
              backgroundColor: index % 3 === 0 ? colorAccent : colorPrimary,
              opacity: 0.2,
              transformOrigin: 'left center',
              transform: `rotate(${Math.atan2(
                endPoint.y - startPoint.y, 
                endPoint.x - startPoint.x
              ) * 180 / Math.PI}deg) translate3d(
                ${mousePosition.x * (index % 3 - 1)}px,
                ${mousePosition.y * (index % 2 - 0.5)}px,
                0
              )`
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + index % 2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: index * 0.1
            }}
          />
        );
      })}
    </div>
  );
};

// Layers component to create depth
const BackgroundLayers = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <>
      {/* Colorful gradient layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-[#ECE0C4]/5 via-transparent to-transparent opacity-70"
        style={{
          transform: `translate3d(${mousePosition.x * -5}px, ${mousePosition.y * -5}px, 0)`
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/5 via-[#425F70]/5 to-transparent"
        style={{
          transform: `translate3d(${mousePosition.x * 2}px, ${mousePosition.y * 2}px, 0)`
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      
      <motion.div
        className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#731C13]/5 blur-3xl"
        style={{
          transform: `translate3d(${mousePosition.x * 3}px, ${mousePosition.y * 3}px, 0)`
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      
      <motion.div
        className="absolute left-1/4 bottom-1/4 w-64 h-64 rounded-full bg-[#425F70]/5 blur-3xl"
        style={{
          transform: `translate3d(${mousePosition.x * -3}px, ${mousePosition.y * -3}px, 0)`
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
    </>
  );
};

// Light particles floating around
const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    const xMovement = (Math.random() - 0.5) * 50; 
    const yMovement = (Math.random() - 0.5) * 30;
    
    particles.push({ x, y, size, duration, delay, xMovement, yMovement });
  }
  
  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.4,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.8)`
          }}
          animate={{
            x: particle.xMovement,
            y: particle.yMovement,
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: particle.duration,
            ease: "linear",
            repeat: Infinity,
            delay: particle.delay,
            repeatType: "reverse"
          }}
        />
      ))}
    </>
  );
};

// Main component export
export default function SimplifiedHeroAnimation() {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoAnimate, setAutoAnimate] = useState(true);

  // Auto-animation effect
  useEffect(() => {
    if (autoAnimate) {
      const interval = setInterval(() => {
        const time = Date.now() / 1000;
        setMousePosition({
          x: Math.sin(time * 0.3) * 10,
          y: Math.cos(time * 0.2) * 5
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [autoAnimate]);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setAutoAnimate(false);
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate relative position
      const x = clientX - left - width / 2;
      const y = clientY - top - height / 2;
      
      setMousePosition({ x, y });
    }
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    setAutoAnimate(true);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layers with parallax effect */}
      <BackgroundLayers mousePosition={mousePosition} />
      
      {/* Neural network background */}
      <NetworkBackground 
        count={isMobile ? 30 : 60} 
        mousePosition={mousePosition} 
      />
      
      {/* Floating particles */}
      <FloatingParticles count={isMobile ? 10 : 20} />
      
      {/* Bottom gradient to blend with content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f7f2] to-transparent pointer-events-none"></div>
    </div>
  );
}