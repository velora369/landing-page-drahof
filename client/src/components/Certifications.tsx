import { motion } from "framer-motion";
import { useRef } from "react";

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const certifications = [
    {
      title: "+100 certificados",
      description: "na área de Harmonização Orofacial"
    },
    {
      title: "6 cursos de anatomia",
      description: "em cadáver"
    },
    {
      title: "Formação internacional",
      description: "no MARC Institute (Miami Anatomical Research Center)"
    },
    {
      title: "+30 cursos ministrados",
      description: "como professora de HOF no Brasil"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 bg-[#ECE0C4]" 
      id="certificacoes"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#425F70] inline-block relative">
            Conhecimento que transforma
            <motion.span 
              className="absolute -bottom-3 left-0 h-[3px] bg-[#731C13]/60 rounded-full" 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg">
            Currículo que impressiona. A Dra. Jana não apenas executa com excelência — ela ensina. E para isso, investiu pesado em sua formação:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-[#ECE0C4]/20 group transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
              whileHover={{ 
                y: -8,
                backgroundColor: "#FFFCF5",
                borderColor: "rgba(115, 28, 19, 0.1)",
                boxShadow: "0 20px 25px -5px rgba(115, 28, 19, 0.1), 0 10px 10px -5px rgba(115, 28, 19, 0.05)"
              }}
            >
              {/* Decorative top border */}
              <div className="h-1 w-full bg-gradient-to-r from-[#731C13] to-[#425F70] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div className="p-8">
                {/* Title with elegant typography */}
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#731C13] mb-4 group-hover:text-[#731C13] transition-colors duration-300">
                  {cert.title}
                </h3>
                
                {/* Subtle divider */}
                <div className="w-12 h-[1px] bg-[#731C13]/30 mb-4 transition-all duration-300 group-hover:w-16 group-hover:bg-[#731C13]/50"></div>
                
                {/* Description with high-quality typography */}
                <p className="text-gray-600 font-light leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
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
