import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Componente de placeholder de plataforma de podcast (estilo Velora Members)
const PodcastPlayer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  
  // Episódios de podcast fictícios
  const episodes = [
    {
      number: "01",
      title: "Revelando Segredos da Harmonização",
      description: "Descubra os principais aspectos da harmonização facial e como ela pode transformar sua autoestima.",
      duration: "28:45",
      thumbnail: "bg-gradient-to-br from-[#731C13]/80 to-[#731C13]/60",
    },
    {
      number: "02",
      title: "Mitos e Verdades sobre HOF",
      description: "Desmistificamos os principais conceitos e crenças sobre a harmonização orofacial.",
      duration: "32:12",
      thumbnail: "bg-gradient-to-br from-[#425F70]/80 to-[#425F70]/60",
    },
    {
      number: "03",
      title: "Harmonização Natural: O Segredo",
      description: "Como obter resultados naturais e valorizar características únicas em cada rosto.",
      duration: "25:38",
      thumbnail: "bg-gradient-to-br from-[#9c8051]/80 to-[#9c8051]/60",
    }
  ];
  
  // Função para alternar entre os cards a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % episodes.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [episodes.length]);
  
  return (
    <div 
      className="max-w-4xl mx-auto relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Janela de aplicativo simulada */}
      <motion.div
        className="rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200"
        whileHover={{ 
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(115, 28, 19, 0.25)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Barra de navegação do player de podcast simulado */}
        <div className="bg-gradient-to-r from-[#731C13] to-[#5d1812] p-3 flex items-center justify-between">
          {/* Botões de janela */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-3 h-3 bg-[#28c940] rounded-full"></div>
          </div>
          
          {/* Nome do aplicativo simulado */}
          <div className="flex items-center text-white font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Dra. HOF Play</span>
          </div>
          
          {/* Menu de navegação */}
          <div className="flex items-center space-x-3 text-white/80">
            <span className="text-xs hover:text-white cursor-pointer">Início</span>
            <span className="text-xs hover:text-white cursor-pointer">Explorar</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white cursor-pointer">Episódios</span>
          </div>
        </div>
        
        {/* Área de conteúdo principal */}
        <div className="p-6 bg-gradient-to-b from-[#f9f6f2] to-white">
          {/* Apresentação do podcast */}
          <div className="flex flex-col md:flex-row items-center mb-8">
            {/* Arte do podcast */}
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-[#731C13] to-[#ECE0C4] rounded-xl shadow-lg flex items-center justify-center mb-5 md:mb-0 md:mr-6 relative">
              <div className="absolute inset-[2px] bg-gradient-to-br from-[#731C13]/90 to-[#731C13]/70 rounded-[10px] flex items-center justify-center">
                <span className="text-[#ECE0C4] font-bold text-3xl">HOF</span>
              </div>
              
              {/* Ícone de reprodução sobreposto */}
              <motion.div 
                className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#731C13]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Detalhes do podcast */}
            <div className="text-center md:text-left">
              <h3 className="text-[#425F70] text-xs font-semibold uppercase tracking-wide mb-1">Podcast exclusivo</h3>
              <h2 className="text-2xl md:text-3xl font-bold text-[#731C13] mb-2">Bate Papo com Dra. HOF</h2>
              <p className="text-gray-600 mb-4 max-w-md">Conversas exclusivas sobre harmonização facial, autoestima e os segredos para resultados naturais e personalizados.</p>
              
              {/* Estatísticas */}
              <div className="flex items-center justify-center md:justify-start space-x-5 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>3.2K visualizações</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>42 comentários</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Separador */}
          <div className="w-full h-[1px] bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 my-6"></div>
          
          {/* Lista de episódios */}
          <div>
            <h3 className="text-lg font-bold text-[#425F70] mb-4">Episódios Recentes</h3>
            
            <div className="space-y-3">
              {episodes.map((episode, index) => (
                <motion.div 
                  key={index}
                  className={`p-4 rounded-lg border ${index === activeCard ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'} hover:shadow-md transition-all cursor-pointer`}
                  animate={{ 
                    scale: index === activeCard ? 1.02 : 1,
                    borderColor: index === activeCard ? '#731C13' : 'rgb(229 231 235)'
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveCard(index)}
                >
                  <div className="flex items-center">
                    {/* Thumbnail */}
                    <div className={`w-16 h-16 rounded-lg shadow-md flex-shrink-0 ${episode.thumbnail} flex items-center justify-center mr-4 relative`}>
                      <span className="text-white font-bold">{episode.number}</span>
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#731C13]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Informações do episódio */}
                    <div className="flex-grow">
                      <h4 className="font-semibold text-[#425F70]">{episode.title}</h4>
                      <p className="text-gray-600 text-sm line-clamp-1">{episode.description}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {episode.duration}
                        </span>
                      </div>
                    </div>
                    
                    {/* Botão de download */}
                    <button className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Botão CTA principal */}
          <div className="mt-8 text-center">
            <a 
              href="https://www.youtube.com/janadrahof" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#731C13] to-[#a33a31] text-white rounded-full shadow-lg transition-all hover:shadow-xl hover:from-[#731C13] hover:to-[#731C13] transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span className="font-medium">Assistir no YouTube</span>
            </a>
          </div>
        </div>
      </motion.div>
      
      {/* Reflexo/sombra debaixo do player */}
      <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-black/10 to-transparent blur-xl rounded-full"></div>
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
            
            {/* Título principal */}
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
              </motion.span>
            </h2>
          </div>
          
          {/* Subtítulo atualizado */}
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto mt-8 text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Assista nossos últimos episódios e fique por dentro das novidades e conteúdos exclusivos.
          </motion.p>
        </motion.div>
        
        {/* Interface de podcast interativa simulada, inspirada na referência da Velora Members */}
        <motion.div
          style={{ scale: parallaxScale }}
          className="relative mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <PodcastPlayer />
        </motion.div>
      </div>
    </section>
  );
}