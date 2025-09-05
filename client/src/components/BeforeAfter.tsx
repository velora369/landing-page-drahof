import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Componente principal com overlay e CTA
const BeforeAfterPreview = ({ beforeImg, afterImg, title, onOpenModal }: { 
  beforeImg: string; 
  afterImg: string; 
  title: string; 
  onOpenModal: () => void; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative w-full aspect-[16/10] max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenModal}
    >
      {/* Imagem de fundo borrada */}
      <div className="absolute inset-0">
        <img 
          src={afterImg} 
          alt="Preview da transformação"
          className="w-full h-full object-cover filter blur-[3px] grayscale-[30%]"
          loading="lazy"
        />
        
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Gradient overlay para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      </div>
      
      {/* Call-to-Action Card Central */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center p-8"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 text-center shadow-2xl border border-white/20 max-w-md">
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-[#731C13] to-[#425F70] rounded-full mx-auto mb-4 flex items-center justify-center"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M15 12L9 8V16L15 12Z" fill="currentColor" />
            </svg>
          </motion.div>
          
          <h3 className="text-2xl font-bold text-[#425F70] mb-2">Clique aqui e veja</h3>
          <h4 className="text-xl font-semibold text-[#731C13] mb-4">a transformação completa!</h4>
          
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Descubra o resultado incrível desta {title.toLowerCase()} com nossa ferramenta interativa de comparação
          </p>
          
          <div className="inline-flex items-center text-[#731C13] font-semibold text-sm">
            <span>Visualizar antes e depois</span>
            <motion.svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="ml-2"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
        </div>
      </motion.div>
      
      {/* Labels discretas nos cantos */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
        Preview
      </div>
      
      {/* Título no rodapé */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent pt-12 pb-6 px-6">
        <h4 className="text-white text-lg font-bold text-center opacity-80">{title}</h4>
      </div>
    </motion.div>
  );
};

// Componente do slider interativo (para uso no modal)
const BeforeAfterSlider = ({ beforeImg, afterImg, title }: { beforeImg: string; afterImg: string; title: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Função para lidar com o movimento do mouse
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    let clientX: number;
    
    // Checar se é touch ou mouse event
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerLeft = containerRect.left;
    
    // Calcular a posição relativa do mouse dentro do container (0-100%)
    let newPosition = ((clientX - containerLeft) / containerWidth) * 100;
    
    // Limitar a posição entre 0 e 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    
    setSliderPosition(newPosition);
  };
  
  // Funções para iniciar e parar o arrastar
  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);
  
  // Adicionar listeners para o documento inteiro quando estiver arrastando
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("touchmove", handleMouseMove as any);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchend", stopDragging);
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("touchmove", handleMouseMove as any);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);
  
  return (
    <motion.div 
      className="relative w-full aspect-[16/10] max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden group bg-gray-100"
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.3)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem de fundo (depois) */}
      <div className="absolute inset-0">
        <img 
          src={afterImg} 
          alt="Resultado após procedimento"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Imagem sobreposta (antes) - cortada pela posição do slider */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={beforeImg} 
          alt="Antes do procedimento"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Linha divisória interativa */}
      <motion.div 
        className="absolute inset-y-0 w-0.5 bg-white shadow-2xl cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
        animate={{ opacity: isDragging || isHovered ? 1 : 0.8 }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        {/* Handle do slider */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize border-4 border-white"
          style={{ left: '50%' }}
          animate={{ 
            scale: isDragging ? 1.1 : isHovered ? 1.05 : 1,
            boxShadow: isDragging 
              ? "0 20px 40px -8px rgba(0, 0, 0, 0.4)" 
              : "0 10px 30px -8px rgba(0, 0, 0, 0.3)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gradient-to-r from-[#731C13] to-[#425F70] p-3 rounded-full">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white"
            >
              <path 
                d="M8 12L12 8L16 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                transform="rotate(90 12 12)"
              />
              <path 
                d="M8 12L12 16L16 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                transform="rotate(90 12 12)"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Labels animadas "Antes" e "Depois" */}
      <motion.div 
        className="absolute top-6 left-6 bg-[#425F70] text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        key="antes-label"
      >
        <span className="text-sm font-semibold flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Antes
        </span>
      </motion.div>
      
      <motion.div 
        className="absolute top-6 right-6 bg-[#731C13] text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        key="depois-label"
      >
        <span className="text-sm font-semibold flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Depois
        </span>
      </motion.div>
      
      {/* Indicador de interação */}
      {isHovered && (
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          key="interaction-hint"
        >
          <span className="text-sm flex items-center">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="mr-2"
            >
              <path 
                d="M8 12L12 8L16 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                transform="rotate(90 12 12)"
              />
              <path 
                d="M8 12L12 16L16 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                transform="rotate(90 12 12)"
              />
            </svg>
            Arraste para comparar
          </span>
        </motion.div>
      )}
      
      {/* Título do caso */}
      {title && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-6 px-6">
          <h4 className="text-white text-xl font-bold text-center">{title}</h4>
        </div>
      )}
    </motion.div>
  );
};

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Paralaxe sutil para elementos decorativos
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  
  // Casos de antes e depois
  const cases = [
    {
      id: 1,
      title: "Harmonização Facial Completa",
      before: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/antes-paciente--7.webp",
      after: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/pos-paciente.webp",
      description: "Procedimento incluiu preenchimento labial e rinomodelação"
    },
    {
      id: 2,
      title: "Rejuvenescimento Periorbitário",
      before: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/paciente-durante-.webp",
      after: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/pos-paciente.webp",
      description: "Foco na área dos olhos para um olhar mais descansado"
    },
    {
      id: 3,
      title: "Contorno Facial",
      before: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/antes-paciente--7.webp",
      after: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/paciente-durante-.webp",
      description: "Definição do contorno mandibular e região zigomática"
    }
  ];
  
  // Estado para controlar o caso ativo no modal
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Abrir modal com caso específico
  const openModal = (caseId: number) => {
    setActiveCase(caseId);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  };
  
  // Fechar modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Restaurar scroll
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden" 
      id="antes-depois"
    >
      {/* Elementos decorativos com efeito de paralaxe */}
      <motion.div 
        className="absolute top-20 right-40 w-64 h-64 rounded-full border border-[#731C13]/10 opacity-30"
        style={{ y: parallaxY1 }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-40 h-40 rounded-full border border-[#425F70]/10 opacity-30"
        style={{ y: parallaxY2 }}
      />
      <motion.div 
        className="absolute -top-10 left-1/4 w-1 h-40 bg-gradient-to-b from-[#731C13]/0 via-[#731C13]/10 to-[#731C13]/0"
        style={{ opacity: parallaxOpacity }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Cabeçalho da seção */}
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold mb-6 text-[#425F70] relative inline-block">
            Transformações com alma
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#731C13] to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <p className="text-gray-700 text-lg">
            Antes e depois que contam histórias. Cada paciente tem sua jornada. A Dra. Jana entende isso como ninguém. Visualize os resultados reais e naturais através do nosso comparador interativo.
          </p>
        </motion.div>
        
        {/* Preview principal com CTA */}
        <div className="max-w-4xl mx-auto mb-16">
          <BeforeAfterPreview 
            beforeImg={cases[0].before}
            afterImg={cases[0].after}
            title={cases[0].title}
            onOpenModal={() => openModal(cases[0].id)}
          />
          
          <motion.div 
            className="text-center mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-[#425F70]/5 to-[#731C13]/5 rounded-2xl p-6 border border-gray-200">
              <p className="text-gray-700 font-medium mb-2">
                🎯 Resultados reais e personalizados
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cada transformação é única. Clique na imagem acima para explorar interativamente os resultados antes e depois desta {cases[0].title.toLowerCase()}.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Galeria de casos moderna */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group relative"
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => openModal(caseItem.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            >
              {/* Container da imagem com aspect ratio fixo */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={caseItem.after} 
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Indicador de antes/depois */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-[#425F70] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Antes & Depois
                </div>
                
                {/* Botão de visualização */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/20 backdrop-blur-md text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 border border-white/30">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M15 12L9 8V16L15 12Z" fill="currentColor" />
                    </svg>
                    <span className="font-medium">Ver Comparação</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#425F70] group-hover:text-[#731C13] transition-colors duration-300 mb-2">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{caseItem.description}</p>
                
                {/* Indicador visual */}
                <div className="mt-4 flex items-center text-[#731C13] text-sm font-medium">
                  <div className="w-1 h-1 bg-[#731C13] rounded-full mr-2"></div>
                  Clique para comparar
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Nota de rodapé */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-block bg-white py-3 px-6 rounded-full shadow-md border border-gray-100">
            <p className="text-[#425F70] flex items-center justify-center">
              <i className="fas fa-info-circle mr-2 text-[#731C13]"></i>
              Todos os casos são reais, com autorização para divulgação. Resultados personalizados conforme a anatomia e objetivos da paciente.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Modal/Lightbox para visualização ampliada */}
      {modalOpen && activeCase && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          {/* Conteúdo do modal que não fecha ao clicar dentro */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho do modal */}
            <div className="p-6 bg-gradient-to-r from-[#425F70] to-[#731C13] text-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  {cases.find(c => c.id === activeCase)?.title}
                </h3>
                <p className="text-white/80 text-sm">Arraste o controle para comparar</p>
              </div>
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors group"
                onClick={closeModal}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white group-hover:scale-110 transition-transform">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Slider otimizado dentro do modal */}
            <div className="p-6 space-y-6">
              <div className="max-w-4xl mx-auto">
                <BeforeAfterSlider 
                  beforeImg={cases.find(c => c.id === activeCase)?.before || ""}
                  afterImg={cases.find(c => c.id === activeCase)?.after || ""}
                  title=""
                />
              </div>
              
              {/* Informações do procedimento */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#731C13] p-2 rounded-xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#425F70] text-lg mb-3">Detalhes do Procedimento</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {cases.find(c => c.id === activeCase)?.description}
                    </p>
                    <div className="mt-4 text-sm text-gray-600">
                      <p className="italic">Resultado individual. Consulte a Dra. Jana para uma avaliação personalizada.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navegação entre casos */}
            <div className="flex justify-between border-t border-gray-100 p-4">
              <button 
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-[#425F70] flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const prevCase = activeCase > 1 ? activeCase - 1 : cases.length;
                  setActiveCase(prevCase);
                }}
              >
                <i className="fas fa-chevron-left"></i>
                <span>Anterior</span>
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-[#425F70] flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextCase = activeCase < cases.length ? activeCase + 1 : 1;
                  setActiveCase(nextCase);
                }}
              >
                <span>Próximo</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
