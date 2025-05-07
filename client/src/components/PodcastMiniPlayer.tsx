import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Componente de mini-player de podcast estilo Velora Members
export default function PodcastMiniPlayer() {
  const [activeCard, setActiveCard] = useState(0);
  
  // Episódios de podcast fictícios
  const episodes = [
    {
      number: "01",
      title: "Harmonização",
      thumbnail: "bg-gradient-to-br from-[#731C13]/80 to-[#731C13]/60",
    },
    {
      number: "02",
      title: "Mitos e Verdades",
      thumbnail: "bg-gradient-to-br from-[#425F70]/80 to-[#425F70]/60",
    },
    {
      number: "03",
      title: "Autoestima",
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
    <a 
      href="https://www.youtube.com/janadrahof" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block"
    >
      <motion.div 
        className="w-32 h-32 relative bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
        whileHover={{ 
          y: -5,
          boxShadow: "0 15px 30px -10px rgba(115, 28, 19, 0.25)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Barra de título */}
        <div className="bg-gradient-to-r from-[#731C13] to-[#5d1812] p-1 flex items-center justify-between">
          {/* Botões de janela */}
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-[#ff5f57] rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-[#28c940] rounded-full"></div>
          </div>
          
          {/* Nome do aplicativo simulado */}
          <div className="flex items-center text-white text-[7px] font-medium">
            <span>HOF Play</span>
          </div>
          
          {/* Mini menu */}
          <div className="w-6"></div>
        </div>
        
        {/* Área de conteúdo */}
        <div className="p-2 bg-gradient-to-b from-[#f9f6f2] to-white h-full">
          {/* Arte do podcast */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#731C13] to-[#ECE0C4] rounded-md shadow-sm flex items-center justify-center mx-auto mb-2">
            <div className="absolute inset-[1px] bg-gradient-to-br from-[#731C13]/90 to-[#731C13]/70 rounded-[2px] flex items-center justify-center">
              <span className="text-[#ECE0C4] font-bold text-xs">HOF</span>
            </div>
          </div>
          
          {/* Lista de episódios - versão mini */}
          <div className="space-y-1">
            {episodes.map((episode, index) => (
              <motion.div 
                key={index}
                className={`p-1 rounded border text-[7px] flex items-center ${index === activeCard ? 'bg-gray-50 border-[#731C13]/30' : 'bg-white border-gray-100'}`}
                animate={{ 
                  scale: index === activeCard ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-3 h-3 rounded ${episode.thumbnail} flex items-center justify-center mr-1 text-white text-[6px] font-bold`}>
                  {episode.number}
                </div>
                <span className="font-medium text-[#425F70] truncate">{episode.title}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Botão play sobreposto */}
          <motion.div 
            className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            whileHover={{ opacity: 1 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#731C13]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Reflexo/sombra debaixo do player */}
      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-b from-black/10 to-transparent blur-xl rounded-full"></div>
    </a>
  );
}