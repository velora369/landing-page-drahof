import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { WHATSAPP_URL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Importação lazy do componente de animação 3D para otimizar performance
const HeroBackground3D = lazy(() => import("@/components/HeroBackground3D"));

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section 
        ref={heroRef}
        className="relative pt-36 pb-24 px-4 md:pt-44 bg-gradient-to-b from-white via-[#fcfbf9] to-[#f8f7f2] overflow-hidden" 
        id="hero"
        onMouseMove={handleMouseMove}
      >
      {/* Fundo neutro com elementos gráficos sutis */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradiente de fundo suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfbf9] to-[#f8f7f2]"></div>
        
        {/* Animação 3D temática - Partículas de Luz e Estruturas Moleculares */}
        <Suspense fallback={null}>
          <HeroBackground3D mousePosition={mousePosition} />
        </Suspense>
        
        {/* Elementos gráficos sutis - mantidos para transição suave */}
        <motion.div 
          className="absolute top-[10%] right-[5%] w-16 h-16 border-t border-r border-[#425F70]/10 rounded-tr-3xl opacity-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            transform: `translate3d(${mousePosition.x * 5}px, ${mousePosition.y * 5}px, 0)`,
            transition: 'transform 0.8s ease-out'
          }}
        />
        
        <motion.div 
          className="absolute bottom-[15%] left-[10%] w-20 h-20 border-b border-l border-[#731C13]/10 rounded-bl-3xl opacity-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          style={{ 
            transform: `translate3d(${mousePosition.x * -5}px, ${mousePosition.y * -5}px, 0)`,
            transition: 'transform 0.8s ease-out'
          }}
        />
        
        {/* Transição suave para a próxima seção */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f7f2] to-transparent z-10"></div>
      </div>
      
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
              {/* Botão primário WhatsApp - Aprimorado com microinterações */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(115, 28, 19, 0.1)",
                  y: -3
                }}
                whileTap={{ 
                  scale: 0.97,
                  boxShadow: "0 10px 20px -8px rgba(0, 0, 0, 0.1)",
                  y: 0
                }}
                transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                className="relative"
              >
                <Button
                  asChild
                  className="relative overflow-hidden group bg-gradient-to-r from-[#425F70] to-[#731C13] hover:from-[#731C13] hover:to-[#425F70] text-white py-6 px-8 rounded-xl font-bold shadow-lg transition-all duration-500"
                >
                  <a href={WHATSAPP_URL} className="flex items-center gap-3">
                    {/* Efeito de luz pulsante */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/0"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255, 255, 255, 0)",
                          "0 0 0 3px rgba(255, 255, 255, 0.1)",
                          "0 0 0 0 rgba(255, 255, 255, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Efeito de luz deslizante aprimorado - ajustado para respeitar o border-radius */}
                    <div className="absolute inset-0 w-1/3 bg-white/10 skew-x-[35deg] group-hover:skew-x-0 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out rounded-xl overflow-hidden" />
                    
                    {/* Efeito de borda brilhante evoluído - ajustado para não ultrapassar o border-radius */}
                    <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/30 overflow-hidden transition-all duration-500" />
                    
                    {/* Efeito de partícula de brilho */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [0, -10, 0],
                        x: [0, 5, 0],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                    
                    <i className="fab fa-whatsapp text-xl group-hover:animate-pulse"></i>
                    <span className="relative z-10 group-hover:tracking-wide transition-all duration-300">Agendar Consulta</span>
                  </a>
                </Button>
                
                {/* Efeito de reflexo abaixo do botão */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#731C13]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
              
              {/* Botão secundário Cursos - Aprimorado com microinterações */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 25px -10px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(236, 224, 196, 0.2)",
                  y: -2
                }}
                whileTap={{ 
                  scale: 0.97,
                  boxShadow: "0 5px 15px -8px rgba(0, 0, 0, 0.05)",
                  y: 0
                }}
                transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                className="relative"
              >
                <Button
                  asChild
                  variant="outline"
                  className="relative overflow-hidden bg-white/80 text-[#731C13] py-6 px-8 rounded-xl font-bold transition-all duration-300 shadow-md border border-[#731C13]/40 hover:border-[#731C13]"
                >
                  <a href="#cursos" className="flex items-center gap-3 group">
                    {/* Efeito de brilho sutil */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/0"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(236, 224, 196, 0)",
                          "0 0 0 5px rgba(236, 224, 196, 0.1)",
                          "0 0 0 0 rgba(236, 224, 196, 0)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Efeito de preenchimento suave aprimorado - ajustado para respeitar o border-radius */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ECE0C4]/30 to-[#ECE0C4]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out rounded-xl overflow-hidden" />
                    
                    {/* Linhas decorativas animadas */}
                    <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#731C13]/60 group-hover:w-full transition-all duration-500 delay-100"></div>
                    <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-[#731C13]/60 group-hover:w-full transition-all duration-500 delay-100"></div>
                    
                    <motion.i 
                      className="fas fa-graduation-cap text-xl text-[#731C13]"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    ></motion.i>
                    <span className="relative z-10 group-hover:tracking-wide transition-all duration-300">Conhecer Cursos</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Carrossel moderno de fotos 2D com animações avançadas */}
          <motion.div 
            className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl relative h-[400px] sm:h-[450px] md:h-[520px] transition-all duration-300"
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
              
              {/* Setas de navegação estilizadas com microinterações avançadas */}
              <motion.button 
                onClick={goToPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white group transition-all z-20 border border-white/30 shadow-lg"
                initial={{ opacity: 0.7, x: 5 }}
                animate={{ opacity: 0.9, x: 0 }}
                whileHover={{ 
                  scale: 1.15, 
                  boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Imagem anterior"
              >
                {/* Efeito de brilho na borda ao passar o mouse */}
                <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Ícone com animação */}
                <motion.i 
                  className="fas fa-chevron-left text-sm relative z-10 group-hover:text-white transition-colors duration-300"
                  initial={{ x: 1 }}
                  whileHover={{ x: -1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
              </motion.button>
              
              <motion.button 
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white group transition-all z-20 border border-white/30 shadow-lg"
                initial={{ opacity: 0.7, x: -5 }}
                animate={{ opacity: 0.9, x: 0 }}
                whileHover={{ 
                  scale: 1.15, 
                  boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Próxima imagem"
              >
                {/* Efeito de brilho na borda ao passar o mouse */}
                <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Ícone com animação */}
                <motion.i 
                  className="fas fa-chevron-right text-sm relative z-10 group-hover:text-white transition-colors duration-300"
                  initial={{ x: -1 }}
                  whileHover={{ x: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
              </motion.button>
              
              {/* Indicadores de imagem modernizados e com microinterações avançadas */}
              <div className="absolute bottom-6 left-0 right-0">
                <div className="flex justify-center space-x-4 items-center">
                  {images.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="group relative"
                      aria-label={`Ver imagem ${index + 1}`}
                    >
                      {/* Indicador principal com efeito de pulsação para o ativo */}
                      <motion.div
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? "bg-white shadow-lg" 
                            : "bg-white/30"
                        }`}
                        whileHover={{ 
                          scale: 1.3,
                          backgroundColor: "rgba(255, 255, 255, 0.9)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        animate={
                          index === currentImageIndex 
                            ? { 
                                scale: [1, 1.2, 1], 
                                boxShadow: [
                                  "0 0 0 0 rgba(255, 255, 255, 0)",
                                  "0 0 0 4px rgba(255, 255, 255, 0.2)",
                                  "0 0 0 0 rgba(255, 255, 255, 0)"
                                ]
                              } 
                            : { scale: 1 }
                        }
                        transition={
                          index === currentImageIndex 
                            ? { 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut" 
                              } 
                            : { duration: 0.2 }
                        }
                      />
                      
                      {/* Tooltip com número da imagem */}
                      <motion.div
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200"
                        initial={{ y: 5, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                      >
                        Foto {index + 1}
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
                
                {/* Linha decorativa abaixo dos indicadores */}
                <motion.div 
                  className="mt-2 h-[1px] mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent w-16"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "4rem" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
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
    </motion.div>
  );
}
