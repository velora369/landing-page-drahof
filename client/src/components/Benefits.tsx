import { motion } from "framer-motion";
import { useRef } from "react";

// 3D icon component for procedures
interface Icon3DProps {
  icon: string;
  color: string;
  delay?: number;
}

const ProcedureIcon3D: React.FC<Icon3DProps> = ({ icon, color, delay = 0 }) => {
  return (
    <motion.div
      className="w-16 h-16 relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 10
      }}
    >
      {/* Inner 3D layers */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#ECE0C4]/80 to-[#ECE0C4]/30 blur-[2px] transform scale-90" />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-[#731C13]/10 to-transparent blur-sm transform scale-95" />
      
      {/* Main icon container */}
      <motion.div 
        className="w-14 h-14 rounded-lg bg-gradient-to-br from-white to-[#F9F5EB] shadow-lg flex items-center justify-center z-10"
        whileHover={{ 
          scale: 1.1, 
          rotate: 5,
          boxShadow: "0 20px 25px -5px rgba(115, 28, 19, 0.3), 0 10px 10px -5px rgba(115, 28, 19, 0.2)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div 
          className="text-[#731C13] flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon === 'botox' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M7 15h10v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4z" />
              <path d="M12 4c-2.5 0-4 2-4 5v6h8V9c0-3-1.5-5-4-5z" />
              <path d="M9 5V3" />
              <path d="M15 5V3" />
            </svg>
          )}
          {icon === 'rinoplastia' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M12 3c1 0 2.1.4 2.4 2l2.6 7.5c.1.5-.2 1-.6 1H8.6c-.5 0-.9-.3-.8-.9l1.8-7C9.9 3.2 11 3 12 3z" />
              <path d="M10 13v6c0 1.1.9 2 2 2s2-.9 2-2v-6" />
            </svg>
          )}
          {icon === 'preenchimento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M8 14c-1.5 0-2.1-1-2.5-2.5c-.4-1.6-.8-1.5-1.5-3C3.4 7.1 4 5 6 5c3.5 0 5 5 8.1 5s5.1-2 5.9-2c2 0 3 1.5 2 3c-.7 1-1.3 1.5-2 3c-.7 1.5-1 2-2 2" />
              <path d="M7 15c-1.5 0-2.7-1.2-3-3" />
              <path d="M16 15c1.5 0 2.7-1.2 3-3" />
            </svg>
          )}
          {icon === 'bioestimulador' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12" />
              <path d="M8 12h8" />
              <path d="M8 8h8" />
              <path d="M8 16h8" />
            </svg>
          )}
          {icon === 'fiosPDO' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
              <path d="M4 17l4-4" />
              <path d="M16 17l4-4" />
              <path d="M8 7l4 4" />
              <path d="M12 11l4-4" />
            </svg>
          )}
          {icon === 'microagulhamento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" />
              <path d="M6 12c2 0 3-1 3-3s1-3 3-3 3 1 3 3 1 3 3 3" />
              <path d="M6 12c2 0 3 1 3 3s1 3 3 3 3-1 3-3 1-3 3-3" />
            </svg>
          )}
          {icon === 'peeling' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M17 5c-2 1-4 2-6 2s-4-1-6-2a1 1 0 0 0-1.5 1C5 10 7 14 12 16s7-6 8.5-10A1 1 0 0 0 19 5" />
              <circle cx="12" cy="12" r="3" />
              <path d="M3 8a12.5 12.5 0 0 0 7.5-4.5" />
              <path d="M13.5 3.5A12.5 12.5 0 0 0 21 8" />
            </svg>
          )}
          {icon === 'default' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          )}
        </motion.div>
      </motion.div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#731C13]/10 to-[#ECE0C4]/20 blur-xl rounded-full opacity-60" />
    </motion.div>
  );
};

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Lista completa de procedimentos com seus ícones e descrições
  const procedures = [
    {
      title: "Botox (Toxina Botulínica)",
      description: "Prevenção e suavização de rugas dinâmicas com naturalidade",
      icon: "botox"
    },
    {
      title: "Rinomodelação",
      description: "Realce do nariz sem cirurgia, em minutos",
      icon: "rinoplastia"
    },
    {
      title: "Preenchimento Labial",
      description: "Volume e definição respeitando sua harmonia facial",
      icon: "preenchimento"
    },
    {
      title: "Bioestimuladores de Colágeno",
      description: "Estimula produção natural de colágeno para rejuvenescimento",
      icon: "bioestimulador"
    },
    {
      title: "Fios de PDO",
      description: "Lifting não-cirúrgico com efeito imediato e natural",
      icon: "fiosPDO"
    },
    {
      title: "Microagulhamento",
      description: "Regeneração da pele e estímulo aos fatores de crescimento",
      icon: "microagulhamento"
    },
    {
      title: "Peelings Químicos",
      description: "Renovação celular e melhora da textura da pele",
      icon: "peeling"
    },
    {
      title: "Skinbooster",
      description: "Hidratação profunda para uma pele radiante",
      icon: "default"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-gradient-to-b from-white to-[#F9F5EB]/30 relative overflow-hidden" 
      id="procedimentos"
    >
      {/* Fundo sutil */}
      <div className="absolute inset-0 bg-[url('/images/noise-texture.svg')] opacity-5 pointer-events-none"></div>
      
      {/* Elementos decorativos sutis */}
      <div className="absolute top-20 left-[5%] w-32 h-32 rounded-full bg-[#ECE0C4]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 right-[8%] w-40 h-40 rounded-full bg-[#731C13]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-[15%] w-24 h-24 rounded-full bg-[#425F70]/5 blur-xl pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        {/* Título da seção com animação sutil */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#425F70] inline-block relative">
            Principais Procedimentos
            <motion.span 
              className="absolute -bottom-3 left-0 h-[3px] bg-[#731C13]/60 rounded-full" 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg">
            Procedimentos personalizados para realçar sua beleza natural e proporcionar resultados harmônicos
          </p>
        </motion.div>

        {/* Grid de cards de procedimentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {procedures.map((procedure, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-[#ECE0C4]/20 group transition-all duration-300"
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
              
              <div className="p-6">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <ProcedureIcon3D icon={procedure.icon} color="#731C13" delay={index * 0.05} />
                </div>
                
                {/* Title with hover effect */}
                <h3 className="text-xl font-bold text-[#425F70] text-center mb-3 group-hover:text-[#731C13] transition-colors duration-300">
                  {procedure.title}
                </h3>
                
                {/* Description with hover effect */}
                <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                  {procedure.description}
                </p>
                
                {/* Call-to-action link with animation */}
                <motion.div 
                  className="mt-5 flex justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <a 
                    href="#" 
                    className="text-[#731C13] font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span>Saiba mais</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </motion.svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="#contato" 
            className="inline-flex items-center px-6 py-3 bg-[#731C13] text-white rounded-full transition-all shadow-md hover:shadow-lg hover:bg-[#731C13]/90 hover:scale-105 active:scale-[0.98]"
          >
            <span className="font-medium">Agende sua consulta</span>
            <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
