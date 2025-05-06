import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Componente para o slider interativo antes/depois
const BeforeAfterSlider = ({ beforeImg, afterImg, title }: { beforeImg: string; afterImg: string; title: string }) => {
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
      className="relative w-full h-[400px] md:h-[450px] rounded-2xl shadow-xl overflow-hidden group"
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Imagem do resultado (depois) */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${afterImg})` }}
      />
      
      {/* Imagem inicial (antes) - visível apenas até a posição do slider */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${beforeImg})`,
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` 
        }}
      />
      
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
          <div className="flex items-center justify-center text-[#731C13]">
            <i className="fas fa-arrows-alt-h"></i>
          </div>
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
        
        {/* Slider principal interativo */}
        <div className="max-w-3xl mx-auto mb-16">
          <BeforeAfterSlider 
            beforeImg={cases[0].before}
            afterImg={cases[0].after}
            title={cases[0].title}
          />
          <motion.p 
            className="text-center mt-4 text-[#425F70] italic"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ➡️ Arraste o divisor para comparar o antes e depois
          </motion.p>
        </div>
        
        {/* Galeria de thumbnails */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -5 }}
              onClick={() => openModal(caseItem.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <div className="h-48 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${caseItem.after})` }}>
                {/* Gradiente overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Label "Ver detalhes" que aparece no hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm text-white rounded-lg py-2 space-x-2">
                    <i className="fas fa-search-plus"></i>
                    <span>Ver detalhes</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#425F70] group-hover:text-[#731C13] transition-colors duration-300">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{caseItem.description}</p>
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
            <div className="p-4 bg-gradient-to-r from-[#425F70] to-[#731C13] text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {cases.find(c => c.id === activeCase)?.title}
              </h3>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                onClick={closeModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Slider dentro do modal */}
            <div className="p-6">
              <BeforeAfterSlider 
                beforeImg={cases.find(c => c.id === activeCase)?.before || ""}
                afterImg={cases.find(c => c.id === activeCase)?.after || ""}
                title=""
              />
              
              <div className="mt-6 bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-[#425F70] mb-2">Detalhes do procedimento:</h4>
                <p className="text-gray-700">
                  {cases.find(c => c.id === activeCase)?.description}
                </p>
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
