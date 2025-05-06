import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { WHATSAPP_URL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SimplifiedHeroAnimation from "./SimplifiedHeroAnimation";

// Nota: Aqui anteriormente estava o componente de animação 3D que foi removido
// O novo componente será implementado na Etapa 2, após validação da Etapa 1

export default function Hero() {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const images = [
    "/images/foto-2-headline.jpg",
    "/images/foto-3-headline.jpg",
    "/images/foto-4-headline.jpg"
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
  
  // Animação automática em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      const autoMoveInterval = setInterval(() => {
        const time = Date.now() / 3000;
        setMousePosition({
          x: Math.sin(time) * 0.2,
          y: Math.cos(time * 0.7) * 0.2
        });
      }, 50);
      
      return () => clearInterval(autoMoveInterval);
    }
  }, [isMobile]);

  return (
    <section 
      ref={heroRef}
      className="relative pt-36 pb-24 px-4 md:pt-44 bg-gradient-to-b from-white via-[#fcfbf9] to-[#f8f7f2] overflow-hidden" 
      id="hero"
      onMouseMove={handleMouseMove}
    >
      {/* Animação 3D de fundo com rede neural e elementos interativos */}
      <SimplifiedHeroAnimation />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Título com animação estilo cascata */}
            <div className="overflow-hidden">
              <motion.h2 
                className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <GradientText>Beleza é ciência,</GradientText>
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 
                className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <GradientText>mas autoestima é arte.</GradientText>
              </motion.h2>
            </div>
  
            {/* Descrição com efeito fade e slide */}
            <motion.p 
              className="mt-8 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              A Dra. HOF transforma rostos — e vidas — com harmonização orofacial personalizada. 
              Com técnica, sensibilidade e mais de 100 formações na área, Dra. Jana Guimarães
              oferece procedimentos que respeitam a beleza única de cada mulher — realçando traços, 
              suavizando o tempo e devolvendo aquilo que nenhuma cirurgia entrega: a autoconfiança.
            </motion.p>
            
            {/* Card de informação com micro-animação */}
            <motion.div
              className="mt-6 bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#425F70]/20 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-1 bg-gradient-to-b from-[#425F70] to-[#731C13] rounded-full" />
                <p className="text-lg font-medium text-[#425F70]">
                  Cirurgiã-dentista, educadora e referência nacional em HOF, com atendimentos humanizados e resultados naturais.
                </p>
              </div>
              
              {/* Decoração sutil do card */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#ECE0C4]/5 rounded-full blur-xl" />
            </motion.div>
            
            {/* Botões de CTA com microinterações avançadas */}
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {/* Botão primário WhatsApp */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  asChild
                  className="relative overflow-hidden group bg-gradient-to-r from-[#425F70] to-[#731C13] hover:from-[#731C13] hover:to-[#425F70] text-white py-6 px-8 rounded-xl font-bold shadow-lg transition-all duration-500 hover:translate-y-[-3px] hover:shadow-xl"
                >
                  <a href={WHATSAPP_URL} className="flex items-center gap-3">
                    {/* Efeito de luz deslizante */}
                    <div className="absolute inset-0 w-1/2 bg-white/10 skew-x-[45deg] group-hover:skew-x-0 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                    
                    {/* Efeito de borda brilhante */}
                    <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />
                    
                    <i className="fab fa-whatsapp text-xl"></i>
                    <span className="relative z-10">Agendar Consulta</span>
                  </a>
                </Button>
              </motion.div>
              
              {/* Botão secundário Cursos */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="relative overflow-hidden bg-white/80 text-[#731C13] py-6 px-8 rounded-xl font-bold transition-all duration-300 shadow-md border border-[#731C13]/40 hover:shadow-lg hover:translate-y-[-2px] hover:border-[#731C13]"
                >
                  <a href="#cursos" className="flex items-center gap-3">
                    {/* Efeito de preenchimento suave */}
                    <div className="absolute inset-0 bg-[#ECE0C4]/40 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                    
                    <i className="fas fa-graduation-cap text-xl"></i>
                    <span className="relative z-10">Conhecer Cursos</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Carrossel moderno de fotos 2D com animações avançadas */}
          <motion.div 
            className="md:w-1/2 overflow-hidden rounded-2xl shadow-xl relative h-[400px] sm:h-[450px] md:h-[520px] transition-all duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ 
              transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
              transition: 'transform 0.5s ease-out'
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Brilho ambiente ao redor do carrossel */}
            <div className="absolute -inset-4 bg-gradient-radial from-[#ECE0C4]/10 via-transparent to-transparent opacity-70 blur-xl" />
            
            {/* Carrossel de imagens com efeitos avançados */}
            <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
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
              
              {/* Overlay de gradiente elegante com múltiplas camadas */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none rounded-2xl"></div>
              
              {/* Setas de navegação estilizadas com microinterações */}
              <motion.button 
                onClick={goToPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all z-20 border border-white/30 shadow-lg opacity-70 hover:opacity-100"
                aria-label="Imagem anterior"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </motion.button>
              
              <motion.button 
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all z-20 border border-white/30 shadow-lg opacity-70 hover:opacity-100"
                aria-label="Próxima imagem"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </motion.button>
              
              {/* Indicadores de imagem modernizados e interativos */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                      index === currentImageIndex 
                        ? "bg-white shadow-md" 
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={index === currentImageIndex ? { scale: 1.25 } : { scale: 1 }}
                    aria-label={`Ver imagem ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Moldura sofisticada */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl border border-white/10 scale-[1.01] pointer-events-none"></div>
              
              {/* Decorações de cantos elegantes */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-4 left-4 w-8 h-[1px] bg-white/50"></div>
                <div className="absolute top-4 left-4 w-[1px] h-8 bg-white/50"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-4 right-4 w-8 h-[1px] bg-white/50"></div>
                <div className="absolute top-4 right-4 w-[1px] h-8 bg-white/50"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-4 left-4 w-8 h-[1px] bg-white/50"></div>
                <div className="absolute bottom-4 left-4 w-[1px] h-8 bg-white/50"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <div className="absolute bottom-4 right-4 w-8 h-[1px] bg-white/50"></div>
                <div className="absolute bottom-4 right-4 w-[1px] h-8 bg-white/50"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
