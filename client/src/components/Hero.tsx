import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { WHATSAPP_URL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Componente da animação de fundo 3D abstrata
const BackgroundAnimation = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grade de pontos conectados que reagem ao mouse */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Partículas animadas */}
        {Array.from({ length: 15 }).map((_, index) => {
          const x = 10 + (index % 5) * 20 + (mousePosition.x * 5);
          const y = 10 + Math.floor(index / 5) * 20 + (mousePosition.y * 5);
          const radius = 0.8 + Math.sin(Date.now() * 0.001 + index) * 0.2;
          
          return (
            <circle
              key={`particle-${index}`}
              cx={x}
              cy={y}
              r={radius}
              fill={index % 3 === 0 ? "#731C13" : index % 3 === 1 ? "#425F70" : "#ECE0C4"}
              opacity={0.3 + Math.sin(Date.now() * 0.002 + index) * 0.2}
              style={{
                animation: `pulse-${index % 4} 4s infinite ease-in-out`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          );
        })}

        {/* Linhas de conexão */}
        {Array.from({ length: 20 }).map((_, index) => {
          const startPoint = {
            x: 5 + Math.sin(index * 0.5) * 40 + (mousePosition.x * 3),
            y: 10 + Math.cos(index * 0.8) * 40 + (mousePosition.y * 3)
          };
          
          const endPoint = {
            x: 50 + Math.cos(index * 0.7) * 45 + (mousePosition.x * -4),
            y: 50 + Math.sin(index * 0.9) * 45 + (mousePosition.y * -4)
          };
          
          const controlPoint1 = {
            x: startPoint.x + (endPoint.x - startPoint.x) * 0.3 + Math.sin(index) * 15,
            y: startPoint.y + (endPoint.y - startPoint.y) * 0.4 + Math.cos(index) * 15
          };
          
          const controlPoint2 = {
            x: startPoint.x + (endPoint.x - startPoint.x) * 0.7 + Math.cos(index) * 15,
            y: startPoint.y + (endPoint.y - startPoint.y) * 0.6 + Math.sin(index) * 15
          };
          
          return (
            <path
              key={`connection-${index}`}
              d={`M ${startPoint.x} ${startPoint.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${endPoint.x} ${endPoint.y}`}
              fill="none"
              stroke={index % 3 === 0 ? "#731C13" : index % 3 === 1 ? "#425F70" : "#ECE0C4"}
              strokeWidth="0.2"
              opacity={0.15 + Math.sin(Date.now() * 0.001 + index) * 0.05}
              strokeDasharray={index % 2 === 0 ? "0.5 2" : "0"}
              style={{
                animation: `flow-${index % 5} 8s infinite ease-in-out`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          );
        })}
      </svg>

      {/* Blocos de gradiente fluidos */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ECE0C4]/10 rounded-full blur-3xl" 
        style={{ 
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-20 left-20 w-64 h-64 bg-[#731C13]/5 rounded-full blur-3xl animate-pulse"
        style={{ 
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#425F70]/10 rounded-full blur-3xl" 
      />
      
      {/* Estilos de animação */}
      <style jsx>{`
        @keyframes pulse-0 {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }
        @keyframes pulse-1 {
          0%, 100% { transform: scale(1.2); }
          50% { transform: scale(0.8); }
        }
        @keyframes pulse-2 {
          0%, 100% { transform: scale(0.9); }
          50% { transform: scale(1.4); }
        }
        @keyframes pulse-3 {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(0.7); }
        }
        @keyframes flow-0 {
          0%, 100% { stroke-dashoffset: 0; }
          50% { stroke-dashoffset: 10; }
        }
        @keyframes flow-1 {
          0%, 100% { stroke-dashoffset: 10; }
          50% { stroke-dashoffset: 0; }
        }
        @keyframes flow-2 {
          0%, 100% { stroke-dashoffset: 5; }
          50% { stroke-dashoffset: 15; }
        }
        @keyframes flow-3 {
          0%, 100% { stroke-dashoffset: 15; }
          50% { stroke-dashoffset: 5; }
        }
        @keyframes flow-4 {
          0%, 100% { stroke-dashoffset: 20; }
          50% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default function Hero() {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const images = [
    "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/foto-dra-hof-.webp",
    "/images/foto-2-headline.jpg"
  ];

  // Lidar com a troca automática de imagens do carrossel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);
  
  // Avançar para a próxima imagem
  const goToNextImage = () => {
    // Resetar o temporizador ao mudar manualmente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    // Reiniciar o temporizador
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };
  
  // Voltar para a imagem anterior
  const goToPrevImage = () => {
    // Resetar o temporizador ao mudar manualmente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    
    // Reiniciar o temporizador
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };

  // Efeito de mousemove para interatividade sutil de parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      // Normalizar coordenadas do mouse (-1 a 1)
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    }
  };

  // Animação automática em dispositivos móveis ou sem mouse
  useEffect(() => {
    if (isMobile) {
      const autoAnimate = setInterval(() => {
        const time = Date.now() / 3000;
        setMousePosition({
          x: Math.sin(time) * 0.2,
          y: Math.cos(time) * 0.2
        });
      }, 50);
      
      return () => clearInterval(autoAnimate);
    }
  }, [isMobile]);

  return (
    <section 
      ref={heroRef}
      className="relative pt-36 pb-24 px-4 md:pt-44 bg-gradient-to-b from-white to-gray-50 overflow-hidden" 
      id="hero"
      onMouseMove={handleMouseMove}
    >
      {/* Animação de fundo 3D interativa */}
      <BackgroundAnimation mousePosition={mousePosition} />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2 
              className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              animate={{ 
                x: mousePosition.x * 10,
                y: mousePosition.y * 10
              }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            >
              <GradientText>Beleza é ciência, mas autoestima é arte.</GradientText>
            </motion.h2>
            <motion.p 
              className="mt-8 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              A Dra. HOF transforma rostos — e vidas — com harmonização orofacial personalizada. 
              Com técnica, sensibilidade e mais de 100 formações na área, Dra. Jana Guimarães
              oferece procedimentos que respeitam a beleza única de cada mulher — realçando traços, 
              suavizando o tempo e devolvendo aquilo que nenhuma cirurgia entrega: a autoconfiança.
            </motion.p>
            
            <motion.div
              className="mt-6 bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#425F70]/20 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 bg-gradient-to-b from-[#425F70] to-[#731C13] rounded-full" />
                <p className="text-lg font-medium text-[#425F70]">
                  Cirurgiã-dentista, educadora e referência nacional em HOF, com atendimentos humanizados e resultados naturais.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button
                asChild
                className="relative overflow-hidden group bg-gradient-to-r from-[#425F70] to-[#731C13] hover:from-[#731C13] hover:to-[#425F70] text-white py-6 px-8 rounded-xl font-bold shadow-lg transition-all duration-500 hover:translate-y-[-3px] hover:shadow-xl"
              >
                <a href={WHATSAPP_URL} className="flex items-center gap-3">
                  <div className="absolute inset-0 w-1/2 bg-white/10 skew-x-[45deg] group-hover:skew-x-0 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                  <i className="fab fa-whatsapp text-xl"></i>
                  <span className="relative z-10">Agendar Consulta</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="relative overflow-hidden bg-white/80 text-[#731C13] py-6 px-8 rounded-xl font-bold transition-all duration-300 shadow-md border border-[#731C13]/40 hover:shadow-lg hover:translate-y-[-2px] hover:border-[#731C13]"
              >
                <a href="#cursos" className="flex items-center gap-3">
                  <div className="absolute inset-0 bg-[#ECE0C4]/40 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                  <i className="fas fa-graduation-cap text-xl"></i>
                  <span className="relative z-10">Conhecer Cursos</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Carrossel moderno de fotos 2D */}
          <motion.div 
            className="md:w-1/2 overflow-hidden rounded-[28px] shadow-2xl relative h-[400px] sm:h-[450px] md:h-[520px] transition-all duration-300 bg-white/80"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ 
              // Efeito sutil de profundidade que reage ao mouse
              transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
              transition: 'transform 0.5s ease-out'
            }}
          >
            {/* Carrossel de imagens */}
            <div className="absolute inset-0 z-10 overflow-hidden rounded-[28px]">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  alt={`Dra. Jana Guimarães - Imagem ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover" 
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
              
              {/* Overlay de gradiente elegante */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none rounded-[28px]"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent pointer-events-none rounded-[28px]"></div>
              
              {/* Setas de navegação estilizadas */}
              <button 
                onClick={goToPrevImage}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all z-20 border border-white/30 shadow-lg opacity-70 hover:opacity-100"
                aria-label="Imagem anterior"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <button 
                onClick={goToNextImage}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all z-20 border border-white/30 shadow-lg opacity-70 hover:opacity-100"
                aria-label="Próxima imagem"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              
              {/* Indicadores de imagem modernizados e reposicionados */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform ${
                      index === currentImageIndex 
                        ? "bg-white shadow-md scale-125" 
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Ver imagem ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Decoração de cantos e bordas */}
              <div className="absolute inset-0 border border-white/30 rounded-[28px] pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/50 rounded-tl-[28px] pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/50 rounded-tr-[28px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/50 rounded-bl-[28px] pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/50 rounded-br-[28px] pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#425F70]/80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-sm mb-2 font-medium">Conheça mais</p>
        <div className="w-6 h-12 border-2 border-[#425F70]/30 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-2.5 h-2.5 bg-[#425F70]/70 rounded-full"
            animate={{ 
              y: [0, 20, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
