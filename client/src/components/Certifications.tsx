import { motion } from "framer-motion";

export default function Certifications() {
  const certifications = [
    {
      icon: "🎓",
      title: "+100 certificados",
      description: "na área de Harmonização Orofacial"
    },
    {
      icon: "🧬",
      title: "6 cursos de anatomia",
      description: "em cadáver"
    },
    {
      icon: "🌎",
      title: "Formação internacional",
      description: "no MARC Institute (Miami Anatomical Research Center)"
    },
    {
      icon: "📚",
      title: "+30 cursos ministrados",
      description: "como professora de HOF no Brasil"
    }
  ];

  return (
    <section className="relative py-24 px-4 bg-[#ECE0C4]" id="certificacoes">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold mb-4 text-[#425F70]">
            Conhecimento que transforma
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Currículo que impressiona. A Dra. Jana não apenas executa com excelência — ela ensina. E para isso, investiu pesado em sua formação:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl text-[#731C13] mb-4">{cert.icon}</div>
              <h3 className="text-xl font-bold text-[#425F70] mb-2">{cert.title}</h3>
              <p className="text-gray-700">{cert.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg text-gray-700 italic max-w-3xl mx-auto">
            Quando você escolhe a Dra. Jana, escolhe estar nas mãos de quem ensina o que pratica — com amor e ética.
          </p>
        </motion.div>
      </div>
      
      {/* Curved bottom effect */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-[#ECE0C4] rounded-b-[50%]" />
    </section>
  );
}
