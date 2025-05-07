import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PodcastMiniPlayer from "./PodcastMiniPlayer";

export default function Podcast() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Efeitos de paralaxe para os elementos decorativos
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  
  const podcastTopics = [
    {
      title: "Mitos e verdades em HOF",
      description: "Conversas esclarecedoras sobre harmonização facial"
    },
    {
      title: "Entrevistas com especialistas",
      description: "Convidados compartilham o melhor da estética avançada"
    },
    {
      title: "Bate papo delas",
      description: "Vamos abordar tópicos e temas dos mais variados e comentar sobre junto com vocês (esse é especial pra mulherada)"
    },
    {
      title: "Autoestima além da estética",
      description: "Como cuidar da beleza interior e projetar confiança além do visual"
    },
    {
      title: "Tendências em procedimentos",
      description: "O que há de mais moderno na medicina estética"
    },
    {
      title: "E muito mais...",
      description: "Conteúdos exclusivos para expandir seu conhecimento e autoestima"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 bg-gradient-to-b from-white to-[#F8F5EF] overflow-hidden" 
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
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            
            {/* Título principal com tag "Em breve" */}
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-bold text-[#425F70] relative z-10">
              <span className="relative">
                Podcast <span className="absolute -top-3 right-[-60px] bg-[#731C13] text-white text-xs px-2 py-1 rounded-md transform rotate-12">Em breve</span>
              </span>
            </h2>
          </div>
          
          {/* Subtítulo - mantido da versão original */}
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto mt-8 text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Aguarde o lançamento do nosso podcast. Enquanto isso, siga no Instagram para ficar por dentro de todas as novidades e não perder nada! Nos nossos encontros vamos encontrar conteúdos sobre:
          </motion.p>
        </motion.div>
        
        {/* Grade de tópicos do podcast com mini-player substituindo o ícone de microfone */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90">
          {podcastTopics.map((topic, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md transition-all flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Aqui substituímos o ícone de microfone pelo mini-player apenas no primeiro card */}
              {index === 0 ? (
                <div className="mb-4 relative w-32 h-32">
                  <PodcastMiniPlayer />
                </div>
              ) : (
                <div className="text-[#731C13] text-2xl mb-4">🎙️</div>
              )}
              <h3 className="text-lg font-bold text-[#425F70] mb-2 text-center">{topic.title}</h3>
              <p className="text-gray-700 text-center">{topic.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-lg font-['Montserrat'] text-gray-500">
            Em breve, conhecimento e cuidado em seu melhor formato.
          </p>
        </motion.div>
      </div>
    </section>
  );
}