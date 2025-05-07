import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Componente do slider antes e depois simplificado
interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  title: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImg, afterImg, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
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
    
    // Limitar a posição entre 5 e 95 para sempre mostrar um pouco de ambas as imagens
    newPosition = Math.max(5, Math.min(95, newPosition));
    
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
      className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl shadow-xl overflow-hidden group"
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Container da imagem "depois" - fica embaixo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img 
          src={afterImg} 
          alt="Depois" 
          className="w-full h-full object-contain md:object-cover"
          style={{ maxHeight: "100%" }}
        />
      </div>
      
      {/* Container da imagem "antes" - fica por cima mas restrita ao clipPath */}
      <div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ 
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` 
        }}
      >
        <img 
          src={beforeImg} 
          alt="Antes" 
          className="w-full h-full object-contain md:object-cover"
          style={{ maxHeight: "100%" }}
        />
      </div>
      
      {/* Linha divisória do slider com alças */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-md"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        {/* Alça do slider */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10 border-2 border-[#731C13] group-hover:scale-110 transition-transform duration-300"
          style={{ left: '50%' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#731C13]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Labels "Antes" e "Depois" */}
      <div className="absolute top-4 left-4 bg-[#425F70]/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm font-medium">
        Antes
      </div>
      <div className="absolute top-4 right-4 bg-[#731C13]/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm font-medium">
        Depois
      </div>
      
      {/* Título do caso */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-4 px-6">
        <h4 className="text-white text-lg font-semibold">{title}</h4>
      </div>
    </motion.div>
  );
};

// Componente Card de Thumbnail
interface ThumbnailCardProps {
  caseItem: BeforeAfterCase;
  onClick: () => void;
  index: number;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ caseItem, onClick, index }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -5 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
    >
      <div className="h-48 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${caseItem.after})` }}>
        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Tipo de procedimento */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded text-xs font-medium text-[#425F70]">
          {caseItem.procedure}
        </div>
        
        {/* Título do caso como overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg drop-shadow-md">
            {caseItem.title}
          </h3>
        </div>
        
        {/* Botão "Ver detalhes" que aparece no hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm text-white rounded-lg py-2 px-4 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Ver comparação</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Interface para casos de antes e depois
interface BeforeAfterCase {
  id: number;
  title: string;
  procedure: string;
  before: string;
  after: string;
  description: string;
}

export default function BeforeAfterSimplified() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Paralaxe sutil para elementos decorativos
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  
  // Casos de antes e depois - com imagens alinhadas
  // Casos clínicos: Harmonização Facial, Contorno Facial e o novo caso com vídeo
  const cases: BeforeAfterCase[] = [
    {
      id: 1,
      title: "Harmonização Facial",
      procedure: "Harmonização Completa",
      before: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/antes-paciente--7.webp",
      after: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/pos-paciente.webp",
      description: "Procedimento combinado que incluiu preenchimento labial, rinomodelação e definição do contorno mandibular. Os resultados são naturais e equilibrados, preservando as características únicas da paciente."
    },
    {
      id: 2,
      title: "Contorno Facial",
      procedure: "Definição Mandibular",
      before: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/antes-paciente--7.webp",
      after: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/paciente-durante-.webp",
      description: "Definição do ângulo e contorno mandibular para uma expressão facial mais harmônica. O procedimento realça as características naturais da face e proporciona um equilíbrio estético personalizado."
    },
    {
      id: 3,
      title: "Preenchimento Labial",
      procedure: "Volume e Contorno",
      before: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/antes-paciente--7.webp", // Reusando imagem por enquanto
      after: "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/pos-paciente.webp", // Reusando imagem por enquanto
      description: "Preenchimento labial realizado com técnica especializada para garantir naturalidade e equilíbrio. O procedimento proporciona volume adequado e definição do contorno, respeitando a anatomia original dos lábios."
    }
  ];
  
  // Estados para controle de modal e visualização
  const [selectedCase, setSelectedCase] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Referência ao caso atualmente selecionado
  const currentCase = cases.find(c => c.id === selectedCase) || cases[0];
  
  // Abrir modal com caso específico
  const openModal = (caseId: number) => {
    setSelectedCase(caseId);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  };
  
  // Fechar modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Restaurar scroll
  };
  
  // Navegar para o próximo ou anterior caso
  const navigateCase = (direction: 'next' | 'prev') => {
    const currentIndex = cases.findIndex(c => c.id === selectedCase);
    const totalCases = cases.length;
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % totalCases;
      setSelectedCase(cases[nextIndex].id);
    } else {
      const prevIndex = (currentIndex - 1 + totalCases) % totalCases;
      setSelectedCase(cases[prevIndex].id);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden" 
      id="antes-depois"
    >
      {/* Elementos decorativos com efeito de paralaxe */}
      <motion.div 
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full border border-[#731C13]/10 opacity-30"
        style={{ y: parallaxY1 }}
      />
      <motion.div 
        className="absolute bottom-40 left-[5%] w-40 h-40 rounded-full border border-[#425F70]/10 opacity-30"
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
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#425F70] relative inline-block">
            Resultados Reais
            <motion.span 
              className="absolute -bottom-3 left-0 h-[3px] bg-[#731C13]/60 rounded-full" 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </h2>
          <p className="text-gray-700 text-lg mt-6">
            Cada transformação conta uma história de confiança e autoestima renovada. 
            Conheça os resultados individualizados e naturais realizados pela Dra. Jana Hof.
          </p>
        </motion.div>
        
        {/* Slider principal interativo */}
        <div className="max-w-3xl mx-auto mb-16">
          <BeforeAfterSlider 
            beforeImg={currentCase.before}
            afterImg={currentCase.after}
            title={currentCase.title}
          />
          <motion.div 
            className="flex items-center justify-center mt-4 text-[#425F70]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#731C13]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              Arraste o divisor para visualizar o antes e depois
            </span>
          </motion.div>
          
          {/* Descrição do caso atual */}
          <motion.div
            className="bg-white mt-6 p-5 rounded-xl shadow-sm border border-[#ECE0C4]/20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-2">
              <div className="bg-[#731C13]/10 text-[#731C13] px-3 py-1 rounded-full text-xs font-medium">
                {currentCase.procedure}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#425F70] mb-2">{currentCase.title}</h3>
            <p className="text-gray-600">{currentCase.description}</p>
          </motion.div>
        </div>
        
        {/* Título da galeria de casos */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-bold text-[#425F70]">
            Mais Casos Clínicos
          </h3>
        </motion.div>
        
        {/* Galeria de thumbnails em grid - agora com 3 cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Renderizando os primeiros 2 casos como cards normais */}
          {cases.slice(0, 2).map((caseItem, index) => (
            <ThumbnailCard
              key={caseItem.id}
              caseItem={caseItem}
              onClick={() => openModal(caseItem.id)}
              index={index}
            />
          ))}
          
          {/* Card de vídeo especial para o terceiro caso */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="h-[300px] relative overflow-hidden">
              {/* Vídeo de fundo */}
              <video 
                className="absolute inset-0 object-cover w-full h-full"
                src="/videos/preenchimento.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                onError={(e) => console.error("Erro ao carregar o vídeo:", e)}
              >
                Seu navegador não suporta vídeos HTML5.
              </video>
              
              {/* Gradiente overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Tipo de procedimento */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded text-xs font-medium text-[#425F70] z-10">
                Volume e Contorno
              </div>
              
              {/* Ícone de vídeo no centro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="h-16 w-16 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className="h-12 w-12 bg-[#731C13] rounded-full flex items-center justify-center"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Título do caso como overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="text-white font-semibold text-lg drop-shadow-md">
                  Preenchimento Labial
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Assista ao procedimento e resultado
                </p>
              </div>
            </div>
          </motion.div>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#731C13]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Todos os casos são reais, com autorização para divulgação. Resultados personalizados conforme a anatomia de cada paciente.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Modal/Lightbox para visualização ampliada */}
      {modalOpen && (
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
            <div className="p-4 md:p-5 bg-gradient-to-r from-[#425F70] to-[#731C13] text-white flex items-center justify-between">
              <div>
                <span className="text-xs md:text-sm bg-white/20 px-2 py-1 rounded-full">
                  {currentCase.procedure}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-1">
                  {currentCase.title}
                </h3>
              </div>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Slider dentro do modal */}
            <div className="p-6">
              <BeforeAfterSlider 
                beforeImg={currentCase.before}
                afterImg={currentCase.after}
                title=""
              />
              
              <div className="mt-6 bg-gray-50 p-5 rounded-xl">
                <h4 className="font-semibold text-[#425F70] mb-2">Detalhes do procedimento:</h4>
                <p className="text-gray-700">
                  {currentCase.description}
                </p>
              </div>
            </div>
            
            {/* Navegação entre casos */}
            <div className="flex justify-between border-t border-gray-100 p-4">
              <button 
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-[#425F70] flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateCase('prev');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Anterior</span>
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-[#425F70] flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateCase('next');
                }}
              >
                <span>Próximo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}