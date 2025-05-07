import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Mini placeholder de YouTube para o canal da Dra. Hof
const YoutubeChannelPlaceholder = () => {
  // Estado para animação de hover
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative w-64 h-64 mx-auto my-10">
      <motion.div
        className="relative max-w-xs mx-auto"
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Container principal - Card de YouTube */}
        <a 
          href="https://www.youtube.com/janadrahof" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#ECE0C4]/30"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              boxShadow: isHovered ? "0 10px 25px -5px rgba(115, 28, 19, 0.25)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Área de thumbnail */}
            <div className="h-36 bg-gradient-to-r from-[#731C13] to-[#a33a31] relative flex items-center justify-center">
              {/* Logo grande no centro do thumbnail */}
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                <span className="font-['Cormorant_Garamond'] text-[#731C13] text-3xl font-bold">HOF</span>
              </div>
              
              {/* Ícone de play sobreposto */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
              >
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#731C13" className="w-6 h-6">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            </div>
            
            {/* Informações do canal */}
            <div className="p-4">
              <div className="flex items-center">
                {/* Ícone do canal/avatar */}
                <div className="w-10 h-10 rounded-full bg-[#731C13] flex items-center justify-center text-white text-xs font-bold mr-3 shadow-sm">
                  HOF
                </div>
                
                {/* Detalhes do canal */}
                <div className="flex-1">
                  <h3 className="font-medium text-[#425F70] truncate">Podcast Dra. HOF</h3>
                  <p className="text-xs text-gray-500">Canal Oficial</p>
                </div>
              </div>
              
              {/* Botão de inscrever-se */}
              <motion.button 
                className="mt-3 w-full bg-[#731C13] text-white py-2 rounded-md text-sm font-medium"
                whileHover={{ backgroundColor: "#5d1812" }}
                transition={{ duration: 0.2 }}
              >
                Ver no YouTube
              </motion.button>
            </div>
          </motion.div>
        </a>
        
        {/* Ondas de áudio estilizadas ao redor do card */}
        <div className="absolute -inset-4 -z-10">
          <motion.div
            className="w-full h-full rounded-full border-2 border-[#ECE0C4]/15"
            animate={{ 
              scale: [0.9, 1, 0.9],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 w-full h-full rounded-full border-2 border-[#731C13]/10"
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function Podcast() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Efeitos de paralaxe para os elementos decorativos
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Tópicos do podcast com ícones modernos
  const podcastTopics = [
    {
      icon: "podcast",
      title: "Mitos e verdades em HOF",
      description: "Conversas esclarecedoras sobre harmonização facial",
      color: "#425F70"
    },
    {
      icon: "user-md",
      title: "Entrevistas com especialistas",
      description: "Convidados compartilham o melhor da estética avançada",
      color: "#731C13"
    },
    {
      icon: "comments",
      title: "Bate papo delas",
      description: "Um espaço para explorar temas relevantes do cotidiano feminino com leveza e profundidade.",
      color: "#5D4037"
    },
    {
      icon: "heart",
      title: "Autoestima além da estética",
      description: "Como cuidar da beleza interior e projetar confiança além do visual",
      color: "#D81B60"
    },
    {
      icon: "chart-line",
      title: "Tendências em procedimentos",
      description: "O que há de mais moderno na medicina estética",
      color: "#1E88E5"
    },
    {
      icon: "rocket",
      title: "E muito mais...",
      description: "Conteúdos exclusivos para expandir seu conhecimento e autoestima",
      color: "#7B1FA2"
    }
  ];
  
  // Estado para animação das ondas sonoras
  const [waveActive, setWaveActive] = useState(false);
  
  // Efeito para ativar as ondas sonoras periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveActive(true);
      
      // Desativar após 5 segundos
      setTimeout(() => {
        setWaveActive(false);
      }, 5000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-4 bg-gradient-to-b from-white to-[#F8F5EF] overflow-hidden" 
      id="podcast"
    >
      {/* Elementos decorativos com efeito de paralaxe */}
      <motion.div 
        className="absolute top-40 right-10 w-80 h-80 rounded-full border-2 border-[#425F70]/5 opacity-30"
        style={{ y: parallaxY1 }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-2 border-[#731C13]/5 opacity-30"
        style={{ y: parallaxY2 }}
      />
      
      {/* Linhas decorativas flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-[#425F70]/5 via-[#731C13]/10 to-[#425F70]/5"
            style={{
              top: `${10 + i * 20}%`,
              left: 0,
              right: 0,
              opacity: 0.4,
              y: useTransform(scrollYProgress, [0, 1], [i * 10, i * -10])
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Cabeçalho da seção com animação sofisticada */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block relative mb-4">
            {/* Círculos decorativos ao redor do título */}
            <motion.span 
              className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-[#425F70]/10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.span 
              className="absolute -right-6 -bottom-6 w-12 h-12 rounded-full bg-[#731C13]/10"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Título principal com badge "Em breve" */}
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-bold text-[#425F70] relative z-10">
              <motion.span 
                className="relative inline-block"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Podcast 
                {/* Badge "Em breve" com efeito de pulsação */}
                <motion.span 
                  className="absolute -top-4 right-[-80px] bg-gradient-to-r from-[#731C13] to-[#a33a31] text-white text-sm px-4 py-1.5 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [5, 8, 5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Em breve
                </motion.span>
              </motion.span>
            </h2>
          </div>
          
          {/* Subtítulo com animação de entrada */}
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto mt-8 text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Aguarde o lançamento do nosso podcast. Enquanto isso, siga no Instagram para ficar por dentro de todas as novidades!
          </motion.p>
        </motion.div>
        
        {/* Mini YouTube Channel Placeholder como elemento visual central */}
        <motion.div
          style={{ scale: parallaxScale }}
          className="relative mb-20"
        >
          <YoutubeChannelPlaceholder />
          
          {/* Ondas sonoras animadas */}
          <AnimatePresence>
            {waveActive && (
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Ondas sonoras como divs animados ao invés de SVG */}
                <div className="relative w-full h-full">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={`wave-${i}`}
                      className="absolute left-1/2 top-1/2 h-0.5 bg-[#731C13]/20 rounded-full"
                      style={{ 
                        width: `${(i+1) * 20}%`,
                        translateX: '-50%',
                        translateY: '-50%'
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: 2,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={`wave2-${i}`}
                      className="absolute left-1/2 top-1/2 h-0.5 bg-[#425F70]/20 rounded-full"
                      style={{ 
                        width: `${(i+1) * 15}%`,
                        translateX: '-50%',
                        translateY: '-50%'
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: 3,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Grid de tópicos do podcast */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#425F70] mb-6">Conteúdos que virão por aí:</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcastTopics.map((topic, index) => (
            <motion.div 
              key={index}
              className="glass-card bg-white p-8 rounded-2xl transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              {/* Gradiente de fundo decorativo */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -translate-y-16 translate-x-16 group-hover:-translate-y-10 group-hover:translate-x-10 transition-transform duration-700 opacity-10"
                style={{ background: `linear-gradient(135deg, ${topic.color}, transparent)` }}
              />
              
              {/* Ícone do tópico com animação no hover */}
              <div className="flex flex-col items-center">
                <motion.div 
                  className="text-white text-2xl mb-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg z-10"
                  style={{ background: `linear-gradient(135deg, ${topic.color}, ${topic.color}bb)` }}
                  whileHover={{ 
                    rotate: 5,
                    scale: 1.1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <i className={`fas fa-${topic.icon}`}></i>
                </motion.div>
                
                {/* Título e descrição */}
                <h3 className="text-xl font-bold text-[#425F70] mb-3 group-hover:text-[#731C13] transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-gray-600">
                  {topic.description}
                </p>
              </div>
              
              {/* Linha decorativa inferior que aparece no hover */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${topic.color}50, transparent)`,
                  scaleX: 0, 
                  transformOrigin: "left" 
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* CTA final */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div 
            className="inline-block bg-white py-4 px-8 rounded-xl shadow-lg border border-gray-100"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-[#425F70] to-[#731C13] w-12 h-12 rounded-full flex items-center justify-center shadow-md mr-4">
                <i className="fas fa-headphones-alt text-white text-xl"></i>
              </div>
              <div className="text-left">
                <h4 className="text-[#425F70] font-bold text-xl">Fique ligado!</h4>
                <p className="text-gray-600">
                  Em breve, conhecimento e cuidado em seu melhor formato.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
