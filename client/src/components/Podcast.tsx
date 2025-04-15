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
    <section className="py-20 px-4 bg-[#425F70] bg-opacity-5" id="podcast">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold mb-4 text-[#425F70]">
            <span className="relative">
              Podcast <span className="absolute -top-3 right-[-60px] bg-[#731C13] text-white text-xs px-2 py-1 rounded-md transform rotate-12">Em breve</span>
            </span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-8">
            Aguarde o lançamento do nosso podcast. Enquanto isso, siga no Instagram para ficar por dentro de todas as novidades e não perder nada! Nos nossos encontros vamos encontrar conteúdos sobre:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
          {podcastTopics.map((topic, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-[#731C13] text-2xl mb-4">{topic.icon}</div>
              <h3 className="text-lg font-bold text-[#425F70] mb-2">{topic.title}</h3>
              <p className="text-gray-700">{topic.description}</p>
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
