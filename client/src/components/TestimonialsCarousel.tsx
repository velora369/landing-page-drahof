import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      text: "Profissional excepcional! A Dra. Jana tem um olhar técnico único e conseguiu captar exatamente o que eu queria. Me emocionei quando vi o resultado - pela primeira vez me reconheci no espelho. Um trabalho que respeita a identidade e a história de cada paciente.",
      name: "Débora Silva",
      time: "2 meses atrás",
      initial: "D",
      stars: 5
    },
    {
      text: "Descobri a Dra. Jana depois de muitas decepções com outros profissionais. A diferença é nítida: ela não te vende procedimentos, ela escuta suas necessidades e propõe soluções personalizadas. Senti que era mais que estética, era cura emocional. Resultado natural e acolhimento impecável!",
      name: "Vanessa Torres",
      time: "3 meses atrás",
      initial: "V",
      stars: 5
    },
    {
      text: "Recomendo de olhos fechados! A Dra. Jana tem um dom único de ver além do rosto, ela enxerga a pessoa. Fiz preenchimento labial e harmonização do olhar, e o resultado superou todas as expectativas. Procedimentos delicados, indolores e com recuperação rápida. Mudou minha relação com o espelho para sempre.",
      name: "Carla Mendonça",
      time: "1 mês atrás",
      initial: "C",
      stars: 5
    },
    {
      text: "Finalmente encontrei uma profissional que entendeu minhas necessidades. A Dra. Jana tem um olhar técnico apurado e uma sensibilidade única para entender o que cada paciente busca. Os resultados ficaram discretos e naturais, exatamente o que eu queria! Toda mulher merece esse cuidado.",
      name: "Mariana Alves",
      time: "2 semanas atrás",
      initial: "M",
      stars: 5
    },
    {
      text: "Aos 50 anos, estava insegura sobre fazer procedimentos estéticos. A Dra. Jana foi extremamente paciente ao esclarecer todas as minhas dúvidas e me mostrou como poderia realçar minha beleza natural sem parecer artificial. O resultado foi tão incrível que meu marido notou a diferença e disse que eu parecia mais feliz, não apenas mais jovem!",
      name: "Luciana Campos",
      time: "1 semana atrás",
      initial: "L",
      stars: 5
    },
    {
      text: "Como jornalista, minha imagem é importante, mas sempre tive medo daquele resultado artificial. A Dra. Jana entendeu perfeitamente meus receios e realizou um trabalho sutil e harmonioso. Meus colegas perceberam algo diferente, mas não conseguiram identificar o que mudou - esse é o melhor elogio para quem procura naturalidade!",
      name: "Patricia Rocha",
      time: "3 semanas atrás",
      initial: "P",
      stars: 5
    }
  ];

  const googleReview = {
    text: "Profissional extremamente competente e atenciosa. Me senti segura durante todo o procedimento. A Dra. Jana tem um olhar técnico único e conseguiu entender exatamente o que eu precisava. O resultado ficou natural e harmonioso. Super recomendo!",
    name: "Roberta Mendes",
    time: "3 meses atrás",
    initial: "R",
    stars: 5
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Determina quantos cards são visíveis por vez
  const getVisibleItems = () => {
    if (isMobile) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  
  const visibleItems = getVisibleItems();
  const totalSlides = Math.ceil(testimonials.length / visibleItems);
  
  useEffect(() => {
    // Atualiza o carrossel a cada 5 segundos se não estiver pausado
    const interval = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  };
  
  // Calcula quais itens mostrar com base no índice atual
  const getVisibleTestimonials = () => {
    const startIdx = currentIndex * visibleItems;
    return testimonials.slice(startIdx, startIdx + visibleItems);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-[#ECE0C4]/20 relative overflow-hidden" id="depoimentos">
      {/* Elementos decorativos sutis de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[15%] w-64 h-64 bg-[#731C13]/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-40 right-[10%] w-80 h-80 bg-[#425F70]/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/3 right-[20%] w-40 h-40 bg-[#ECE0C4]/10 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative">
        {/* Cabeçalho da seção */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#425F70] inline-block relative">
            O que dizem nossos pacientes
            <motion.span 
              className="absolute -bottom-3 left-0 h-[3px] bg-[#731C13]/60 rounded-full" 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg mt-6">
            Histórias reais de transformação e confiança de pacientes que compartilham suas experiências com a Dra. Jana Hof.
          </p>
        </motion.div>
        
        {/* Carrossel de Depoimentos */}
        <div 
          className="relative mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={carouselRef}
        >
          {/* Container do carrossel */}
          <div className="overflow-hidden px-4">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div 
                key={currentIndex}
                custom={direction}
                initial={{ 
                  opacity: 0,
                  x: direction === 1 ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0,
                  x: direction === 1 ? -100 : 100,
                  transition: { duration: 0.3, ease: "easeIn" }
                }}
                className={`grid grid-cols-1 ${
                  isMobile 
                    ? 'grid-cols-1' 
                    : (visibleItems === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3')
                } gap-6 md:gap-8`}
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Botões de navegação */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 md:translate-x-0 bg-white bg-opacity-90 hover:bg-opacity-100 text-[#731C13] hover:text-[#731C13] p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10"
            aria-label="Depoimento anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 md:translate-x-0 bg-white bg-opacity-90 hover:bg-opacity-100 text-[#731C13] hover:text-[#731C13] p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10"
            aria-label="Próximo depoimento"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicadores de página */}
        <div className="flex justify-center gap-2 mt-4 mb-10">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'bg-[#731C13] w-6' 
                  : 'bg-[#731C13]/30 hover:bg-[#731C13]/50'
              }`}
              aria-label={`Ir para o slide ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Avaliação do Google */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-center font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-10 text-[#425F70] relative inline-block mx-auto">
            Avaliação no Google
            <motion.span 
              className="absolute -bottom-3 left-0 h-[2px] bg-[#731C13]/60 rounded-full" 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
          </h3>
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <div className="h-2 bg-gradient-to-r from-[#4285F4] to-[#34A853]"></div>
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/google-avaliacao.webp" 
                  alt="Avaliação Google" 
                  className="w-24 h-auto"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[#4285F4] font-bold">Avaliação Google</span>
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-sm mr-0.5"></i>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm font-medium">5.0 (138 avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Baseado nas experiências de pacientes reais</p>
                </div>
              </div>
              
              <motion.div 
                className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Aspas decorativas */}
                <div className="absolute -left-2 -top-4 text-[80px] font-serif text-[#ECE0C4]/30">
                  "
                </div>
                <div className="absolute -right-2 -bottom-10 text-[80px] font-serif text-[#ECE0C4]/30 transform rotate-180">
                  "
                </div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#425F70] to-[#731C13] text-white flex items-center justify-center mr-4 shadow-md">
                    <span className="font-bold text-lg">{googleReview.initial}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{googleReview.name}</h4>
                    <div className="flex items-center">
                      <div className="text-yellow-400 flex">
                        {[...Array(googleReview.stars)].map((_, i) => (
                          <i key={i} className="fas fa-star text-xs mr-0.5"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">{googleReview.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed relative z-10">
                  "{googleReview.text}"
                </p>
              </motion.div>
              
              <div className="text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="https://www.google.com/maps" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#4285F4] font-medium bg-blue-50 rounded-full py-2 px-6 inline-flex items-center hover:bg-blue-100 transition-colors duration-300"
                  >
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>138 avaliações verificadas</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Componente de Card de Depoimento
interface TestimonialCardProps {
  testimonial: {
    text: string;
    name: string;
    time: string;
    initial: string;
    stars: number;
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  // Verifica se o texto excede certo tamanho
  const isLongText = testimonial.text.length > 220;
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Textos truncado e completo
  const truncatedText = isLongText 
    ? `${testimonial.text.substring(0, 220)}...` 
    : testimonial.text;
  
  return (
    <motion.div 
      className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#ECE0C4]/30 h-full flex flex-col relative overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Elementos decorativos - aspas estilizadas */}
      <div className="absolute -left-2 -top-4 text-[80px] font-serif text-[#ECE0C4]/30 group-hover:text-[#ECE0C4]/40 transition-colors duration-300">
        "
      </div>
      <div className="absolute -right-2 -bottom-10 text-[80px] font-serif text-[#ECE0C4]/30 transform rotate-180 group-hover:text-[#ECE0C4]/40 transition-colors duration-300">
        "
      </div>
      
      {/* Avaliação em estrelas */}
      <div className="flex items-center mb-4 relative z-10">
        <div className="text-yellow-400 flex">
          {[...Array(testimonial.stars)].map((_, i) => (
            <i key={i} className="fas fa-star text-sm mr-0.5"></i>
          ))}
        </div>
      </div>
      
      {/* Texto do depoimento */}
      <div className="flex-grow mb-6 relative z-10">
        <p className="text-gray-700 leading-relaxed">
          "{isExpanded ? testimonial.text : truncatedText}"
        </p>
        
        {/* Botão "Ler mais" para textos longos */}
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#731C13] text-sm font-medium mt-2 hover:underline focus:outline-none"
          >
            {isExpanded ? "Ler menos" : "Ler mais"}
          </button>
        )}
      </div>
      
      {/* Informações do paciente */}
      <div className="flex items-center mt-auto relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#425F70] to-[#731C13] text-white flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-all duration-300">
          <span className="font-bold text-lg">{testimonial.initial}</span>
        </div>
        <div>
          <h4 className="font-bold text-[#425F70] text-lg group-hover:text-[#731C13] transition-colors duration-300">{testimonial.name}</h4>
          <span className="text-gray-500 text-xs">{testimonial.time}</span>
        </div>
      </div>
    </motion.div>
  );
};