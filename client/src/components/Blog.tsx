import { motion } from "framer-motion";

export default function Blog() {
  const blogTopics = [
    {
      icon: "🔹",
      title: "Cuidados com a pele",
      description: "Dicas de cuidados diários e prevenção do envelhecimento precoce"
    },
    {
      icon: "🔹",
      title: "Procedimentos minimamente invasivos",
      description: "Conheça as opções modernas e seus benefícios"
    },
    {
      icon: "🔹",
      title: "Diferenças entre tratamentos",
      description: "Preenchimento, botox e bioestimuladores explicados"
    },
    {
      icon: "🔹",
      title: "Histórias de pacientes reais",
      description: "Casos reais e transformações que inspiram"
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#425F70] bg-opacity-5" id="blog">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold mb-4 text-[#425F70]">
            Informação também é cuidado
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            No blog e Instagram <a href="https://instagram.com/drahof" className="text-[#731C13] font-bold hover:underline">@drahof</a>, você encontra conteúdos sobre:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogTopics.map((topic, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
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
          <p className="text-lg font-['Montserrat'] text-[#425F70]">
            Saber mais é se empoderar antes de qualquer procedimento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
