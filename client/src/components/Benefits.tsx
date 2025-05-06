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
          {/* Botox - seringa com gota para toxina botulínica */}
          {icon === 'botox' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Corpo da seringa */}
              <rect x="5" y="10" width="12" height="4" rx="1" />
              {/* Êmbolo */}
              <path d="M17 12h4" />
              {/* Agulha */}
              <path d="M3 12h2" />
              <path d="M2 12l-1 1" />
              <path d="M2 12l-1-1" />
              {/* Gota da toxina */}
              <path d="M3.5 8.5C3.5 7.5 4 6 5 6s1.5 1.5 1.5 2.5S6 11 5 11 3.5 9.5 3.5 8.5z" />
              {/* Linhas suavizadas - efeito do botox */}
              <path d="M7.5 16.5s2 1.5 4.5 1.5 4.5-1.5 4.5-1.5" strokeDasharray="1 1" />
              <path d="M7.5 18.5s2 1.5 4.5 1.5 4.5-1.5 4.5-1.5" strokeDasharray="1 1" />
            </svg>
          )}
          
          {/* Rinomodelação - perfil com nariz sendo modelado */}
          {icon === 'rinoplastia' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Perfil facial estilizado */}
              <path d="M14 4c0 0-1-1-2-1s-2 1-3 1c-1 0-2 0-3 1s-1 2-1 2v5c0 1 0 2 1 3s2 1 3 1h4c1 0 2 0 3-1s1-2 1-3v-4" />
              {/* Nariz antes da modelagem (pontilhado) */}
              <path d="M9 7c0 0 1-2 3-2s2 2 2 2" strokeDasharray="1 1" />
              {/* Nariz após modelagem (linha sólida) */}
              <path d="M9 7c0 0 1-1 3-1s2 1 2 1" />
              {/* Seta indicando a transformação */}
              <path d="M11 12l2-3" />
              <path d="M13 9l1 1" />
              <path d="M13 9l0 2" />
            </svg>
          )}
          
          {/* Preenchimento Labial - lábios com efeito de volume */}
          {icon === 'preenchimento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Lábio superior */}
              <path d="M8 11c1.5-1 3-1.5 4-1.5s2.5 0.5 4 1.5" />
              {/* Lábio inferior */}
              <path d="M8 13c1.5 1 3 1.5 4 1.5s2.5-0.5 4-1.5" />
              {/* Linha central dos lábios */}
              <path d="M8 12h8" />
              {/* Indicação de preenchimento/volume */}
              <path d="M7 8l2 2" />
              <path d="M7 8l0 2" />
              <path d="M17 8l-2 2" />
              <path d="M17 8l0 2" />
              <path d="M7 16l2-2" />
              <path d="M7 16l0-2" />
              <path d="M17 16l-2-2" />
              <path d="M17 16l0-2" />
              {/* Gota simbolizando o preenchimento */}
              <path d="M12 6.5c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
            </svg>
          )}
          
          {/* Bioestimuladores - moléculas de colágeno regenerando */}
          {icon === 'bioestimulador' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Moléculas/células se regenerando */}
              <circle cx="12" cy="12" r="3" />
              <circle cx="7" cy="9" r="1.5" />
              <circle cx="17" cy="9" r="1.5" />
              <circle cx="7" cy="15" r="1.5" />
              <circle cx="17" cy="15" r="1.5" />
              {/* Conexões entre moléculas - estrutura do colágeno */}
              <path d="M9 10.5l1.5 1" />
              <path d="M13.5 10.5l1.5-1" />
              <path d="M9 13.5l1.5-1" />
              <path d="M13.5 13.5l1.5 1" />
              {/* Setas simbolizando crescimento e regeneração */}
              <path d="M12 5v1" />
              <path d="M11 5.5l1 0.5" />
              <path d="M13 5.5l-1 0.5" />
              <path d="M12 19v-1" />
              <path d="M11 18.5l1-0.5" />
              <path d="M13 18.5l-1-0.5" />
            </svg>
          )}
          
          {/* Fios de PDO - linhas entrelaçadas criando efeito lifting */}
          {icon === 'fiosPDO' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Contorno facial estilizado */}
              <path d="M7 6c0 0 2-2 5-2s5 2 5 2" />
              <path d="M6 8c0 0 3-1 6-1s6 1 6 1" />
              <path d="M5 12c0 0 3.5 0 7 0s7 0 7 0" />
              <path d="M6 16c0 0 2.5 1 6 1s6-1 6-1" />
              <path d="M7 18c0 0 2 2 5 2s5-2 5-2" />
              
              {/* Fios de PDO - linhas tensoras */}
              <path d="M9 8l0 8" strokeDasharray="1 1" />
              <path d="M12 7l0 10" strokeDasharray="1 1" />
              <path d="M15 8l0 8" strokeDasharray="1 1" />
              
              {/* Setas indicando o efeito lifting */}
              <path d="M7 11l1-1" />
              <path d="M8 10l0 1" />
              <path d="M17 11l-1-1" />
              <path d="M16 10l0 1" />
            </svg>
          )}
          
          {/* Microagulhamento - representação de dermaroller */}
          {icon === 'microagulhamento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Dermaroller */}
              <path d="M6 12h12" />
              <path d="M7 10v4" />
              <path d="M17 10v4" />
              <path d="M5 9v6" />
              <path d="M19 9v6" />
              
              {/* Microagulhas */}
              <path d="M8 8v3" strokeWidth="0.75" />
              <path d="M10 8v3" strokeWidth="0.75" />
              <path d="M12 8v3" strokeWidth="0.75" />
              <path d="M14 8v3" strokeWidth="0.75" />
              <path d="M16 8v3" strokeWidth="0.75" />
              
              <path d="M8 16v-3" strokeWidth="0.75" />
              <path d="M10 16v-3" strokeWidth="0.75" />
              <path d="M12 16v-3" strokeWidth="0.75" />
              <path d="M14 16v-3" strokeWidth="0.75" />
              <path d="M16 16v-3" strokeWidth="0.75" />
              
              {/* Pele simbolizada */}
              <path d="M3 18c2 0 4 0 9 0s9 0 9 0" strokeDasharray="1 1" />
            </svg>
          )}
          
          {/* Peelings Químicos - camadas da pele se renovando */}
          {icon === 'peeling' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Camadas da pele */}
              <path d="M4 18c2-1 5-2 8-2s6 1 8 2" />
              <path d="M4 14c2-1 5-2 8-2s6 1 8 2" />
              <path d="M4 10c2-1 5-2 8-2s6 1 8 2" />
              <path d="M4 6c2-1 5-2 8-2s6 1 8 2" />
              
              {/* Gotas de peeling/ácido */}
              <path d="M8 4.5c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
              <path d="M15 6.5c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
              
              {/* Renovação celular */}
              <path d="M12 15v2" />
              <path d="M11 16h2" />
              <path d="M10 6l2 2 2-2" strokeDasharray="0.75 0.75" />
            </svg>
          )}
          
          {/* Skinbooster - hidratação profunda */}
          {icon === 'default' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Contorno facial estilizado */}
              <path d="M8 5c2-1 3-1 4-1s2 0 4 1" />
              <path d="M6 8c2-1 4-2 6-2s4 1 6 2" />
              <path d="M5 12c2-1 4-2 7-2s5 1 7 2" />
              <path d="M6 16c2-1 4-2 6-2s4 1 6 2" />
              <path d="M8 19c2-1 3-1 4-1s2 0 4 1" />
              
              {/* Gotas de hidratação */}
              <path d="M10 9c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
              <path d="M13 13c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
              <path d="M9 15c0-0.5 0.2-1 0.5-1s0.5 0.5 0.5 1-0.2 1-0.5 1-0.5-0.5-0.5-1z" />
              
              {/* Efeito de brilho/hidratação */}
              <path d="M14 7l1-1" />
              <path d="M16 9l1-1" />
              <path d="M16 15l1 1" />
              <path d="M7 9l-1-1" />
              <path d="M7 15l-1 1" />
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
