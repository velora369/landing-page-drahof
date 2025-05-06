import { motion } from "framer-motion";

export default function Podcast() {
  const podcastTopics = [
    {
      icon: "🎙️",
      title: "Mitos e verdades em HOF",
      description: "Conversas esclarecedoras sobre harmonização facial"
    },
    {
      icon: "🎙️",
      title: "Entrevistas com especialistas",
      description: "Convidados compartilham o melhor da estética avançada"
    },
    {
      icon: "🎙️",
      title: "Bate papo delas",
      description: "Vamos abordar tópicos e temas dos mais variados e comentar sobre junto com vocês (esse é especial pra mulherada)"
    },
    {
      icon: "🎙️",
      title: "Autoestima além da estética",
      description: "Como cuidar da beleza interior e projetar confiança além do visual"
    },
    {
      icon: "🎙️",
      title: "Tendências em procedimentos",
      description: "O que há de mais moderno na medicina estética"
    },
    {
      icon: "🎙️",
      title: "E muito mais...",
      description: "Conteúdos exclusivos para expandir seu conhecimento e autoestima"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-[#F8F5EF]" id="podcast">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block relative mb-4">
            <span className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-[#425F70]/10 animate-pulse"></span>
            <span className="absolute -right-4 -bottom-4 w-8 h-8 rounded-full bg-[#731C13]/10 animate-pulse delay-300"></span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#425F70] relative z-10">
              <span className="relative inline-block">
                Podcast 
                <span className="absolute -top-4 right-[-65px] bg-gradient-to-r from-[#731C13] to-[#a33a31] text-white text-xs px-3 py-1 rounded-full transform rotate-12 shadow-md">
                  Em breve
                </span>
              </span>
            </h2>
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto mt-8 text-lg">
            Aguarde o lançamento do nosso podcast. Enquanto isso, siga no Instagram para ficar por dentro de todas as novidades e não perder nada! Nos nossos encontros vamos encontrar conteúdos sobre:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcastTopics.map((topic, index) => (
            <motion.div 
              key={index}
              className="bg-white p-7 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-gray-100 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#425F70]/5 to-[#731C13]/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500"></div>
              
              <div className="text-white text-2xl mb-5 bg-gradient-to-br from-[#425F70] to-[#731C13] w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-microphone-alt"></i>
              </div>
              <h3 className="text-xl font-bold text-[#425F70] mb-3">{topic.title}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg font-medium text-gray-500 bg-white inline-block py-3 px-6 rounded-full shadow-md">
            <i className="fas fa-headphones-alt mr-2 text-[#731C13]"></i>
            Em breve, conhecimento e cuidado em seu melhor formato.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
