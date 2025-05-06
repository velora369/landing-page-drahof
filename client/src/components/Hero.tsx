import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { WHATSAPP_URL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import FacialAnimation3D from "./FacialAnimation3D";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Hero() {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  
  const images = [
    "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/foto-dra-hof-.webp",
    "/images/foto-2-headline.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

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

  // Toggle entre visualização da foto ou da animação 3D
  const toggleView = () => {
    setShowAnimation(!showAnimation);
  };

  return (
    <section 
      ref={heroRef}
      className="relative pt-36 pb-24 px-4 md:pt-44 bg-gradient-to-b from-white to-gray-50 overflow-hidden" 
      id="hero"
      onMouseMove={handleMouseMove}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ECE0C4]/10 rounded-full blur-3xl" 
        style={{ 
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#731C13]/5 rounded-full blur-3xl animate-pulse"
        style={{ 
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#425F70]/10 rounded-full blur-3xl" />
      
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
          
          {/* Alternância entre animação 3D e imagem */}
          <motion.div 
            className="md:w-1/2 overflow-hidden rounded-2xl shadow-2xl relative h-[400px] sm:h-[450px] md:h-[520px] transition-all duration-300 backdrop-blur-sm bg-white/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            style={{ 
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              transition: 'transform 0.5s ease-out'
            }}
          >
            {showAnimation ? (
              // Visualização 3D interativa
              <motion.div 
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <FacialAnimation3D />
                
                {/* Overlay com texto da visualização 3D */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/30 to-transparent">
                  <h3 className="text-xl font-semibold text-white mb-2">Harmonia Facial em 3D</h3>
                  <p className="text-white/80 text-sm">Visualização das áreas de trabalho preciso da harmonização orofacial</p>
                </div>
                
                {/* Botão para trocar para imagem real */}
                <button 
                  onClick={toggleView}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs hover:bg-white/30 transition-all z-20 border border-white/30"
                >
                  Ver foto real <i className="fas fa-image ml-1"></i>
                </button>
              </motion.div>
            ) : (
              // Visualização de imagem real
              <motion.div 
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={images[currentImageIndex]} 
                    alt={`Dra. Jana Guimarães - Imagem ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover" 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                  />
                </AnimatePresence>
                
                {/* Overlay de gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                
                {/* Botão para trocar para visualização 3D */}
                <button 
                  onClick={toggleView}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs hover:bg-white/30 transition-all z-20 border border-white/30"
                >
                  Ver em 3D <i className="fas fa-cube ml-1"></i>
                </button>
                
                {/* Indicadores de imagem */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex 
                          ? "bg-[#731C13] shadow-md scale-125" 
                          : "bg-white bg-opacity-70 hover:bg-opacity-100"
                      } transition-all duration-300`}
                      aria-label={`Ver imagem ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Decoração de borda avançada */}
            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
            <div className="absolute inset-0 border-2 border-white/5 rounded-2xl scale-[1.01] pointer-events-none"></div>
            <div className="absolute inset-0 border border-[#731C13]/10 rounded-2xl scale-[1.02] pointer-events-none"></div>
            
            {/* Cantos decorativos */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#ECE0C4]/50 rounded-tl-2xl pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#ECE0C4]/50 rounded-tr-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#ECE0C4]/50 rounded-bl-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#ECE0C4]/50 rounded-br-2xl pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#425F70]/70"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-sm mb-2 font-medium">Saiba mais</p>
        <div className="w-5 h-10 border-2 border-[#425F70]/30 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-2 h-2 bg-[#425F70]/50 rounded-full"
            animate={{ 
              y: [0, 15, 0],
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
