import { motion } from "framer-motion";
import { useRef } from "react";

// 2D icon component for procedures
interface IconProps {
  icon: string;
  delay?: number;
}

const ProcedureIcon: React.FC<IconProps> = ({ icon, delay = 0 }) => {
  return (
    <motion.div
      className="w-16 h-16 relative flex items-center justify-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: "easeOut"
      }}
    >
      <motion.div 
        className="w-14 h-14 rounded-full bg-[#F9F5F5] shadow-md flex items-center justify-center"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 15px -5px rgba(115, 28, 19, 0.1), 0 4px 6px -2px rgba(115, 28, 19, 0.05)"
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="text-[#731C13] flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Botox - seringa médica estilizada */}
          {icon === 'botox' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <rect x="7" y="10" width="10" height="3" rx="0.5" />
              <path d="M17 11.5h3" />
              <path d="M4 11.5h3" />
              <path d="M4 10.5v2" />
              <circle cx="5.5" cy="9" r="1" />
            </svg>
          )}
          
          {/* Rinomodelação - contorno de perfil de nariz */}
          {icon === 'rinoplastia' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M9 7c0 0 1.5-3 3-3s3 1 4 3c1 2 0 5-1 7s-2 3-3 3" />
              <path d="M13 10c0.5-0.5 1.5-0.5 2-0.5" strokeWidth="1" />
              <path d="M10 14c0.5 0.5 1.5 0.5 2 0.5" strokeWidth="1" />
            </svg>
          )}
          
          {/* Preenchimento Labial - lábios estilizados */}
          {icon === 'preenchimento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M7 10c1.5-1 4-1.3 5-1.3s3.5 0.3 5 1.3" />
              <path d="M7 14c1.5 1 4 1.3 5 1.3s3.5-0.3 5-1.3" />
              <path d="M7 12h10" />
              <path d="M11.5 10.2C11.5 10 12 9.5 12.5 9.5s1 0.5 1 0.7" strokeWidth="1" />
            </svg>
          )}
          
          {/* Bioestimuladores - molécula de colágeno simplificada */}
          {icon === 'bioestimulador' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="12" r="3" />
              <circle cx="7" cy="9" r="1.5" />
              <circle cx="17" cy="9" r="1.5" />
              <circle cx="7" cy="15" r="1.5" />
              <circle cx="17" cy="15" r="1.5" />
              <path d="M9 10.5l1.5 1" />
              <path d="M13.5 10.5l1.5-1" />
              <path d="M9 13.5l1.5-1" />
              <path d="M13.5 13.5l1.5 1" />
            </svg>
          )}
          
          {/* Fios de PDO - linhas curvas com efeito lifting */}
          {icon === 'fiosPDO' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M7 18c0 0 0.5-5 0.5-10S9 6 9 6" />
              <path d="M11 18c0 0 0.5-6 0.5-10S13 6 13 6" />
              <path d="M15 18c0 0 0.5-5 0.5-10S17 6 17 6" />
              <path d="M9 6l-0.5-0.5" />
              <path d="M9 6l0.5-0.5" />
              <path d="M13 6l-0.5-0.5" />
              <path d="M13 6l0.5-0.5" />
              <path d="M17 6l-0.5-0.5" />
              <path d="M17 6l0.5-0.5" />
            </svg>
          )}
          
          {/* Microagulhamento - dermaroller estilizado */}
          {icon === 'microagulhamento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M6 12h12" />
              <path d="M18 10v4" />
              <path d="M6 10v4" />
              <path d="M4 11v2" />
              <path d="M20 11v2" />
              <path d="M8 8v4" strokeWidth="1" />
              <path d="M10 8v4" strokeWidth="1" />
              <path d="M12 8v4" strokeWidth="1" />
              <path d="M14 8v4" strokeWidth="1" />
              <path d="M16 8v4" strokeWidth="1" />
            </svg>
          )}
          
          {/* Peelings Químicos - gota sobre camada de pele */}
          {icon === 'peeling' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M12 14c0-2.5 1.5-4 1.5-4s1.5 1.5 1.5 4-1.5 3-1.5 3-1.5-0.5-1.5-3z" />
              <path d="M5 18c2-1 5-2 8-2s6 1 8 2" />
              <path d="M5 16c2-1 5-2 8-2s6 1 8 2" />
            </svg>
          )}
          
          {/* Skinbooster - rosto com gotas de hidratação */}
          {icon === 'default' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#731C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M8 5c2-1 3-1 4-1s2 0 4 1" />
              <path d="M6 8c2-1 4-2 6-2s4 1 6 2" />
              <path d="M5 12c2-1 4-2 7-2s5 1 7 2" />
              <path d="M6 16c2-1 4-2 6-2s4 1 6 2" />
              <path d="M8 19c2-1 3-1 4-1s2 0 4 1" />
              <path d="M10 9c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
              <path d="M13 13c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
              <path d="M9 15c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
            </svg>
          )}
        </motion.div>
      </motion.div>
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
                  <ProcedureIcon icon={procedure.icon} delay={index * 0.05} />
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