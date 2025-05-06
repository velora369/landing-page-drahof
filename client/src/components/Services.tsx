import { motion } from "framer-motion";
import { useRef } from "react";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Lista completa de procedimentos com suas descrições
  const procedures = [
    {
      title: "Botox (Toxina Botulínica)",
      description: "Prevenção e suavização de rugas dinâmicas com naturalidade",
    },
    {
      title: "Rinomodelação",
      description: "Realce do nariz sem cirurgia, em minutos",
    },
    {
      title: "Preenchimento Labial",
      description: "Volume e definição respeitando sua harmonia facial",
    },
    {
      title: "Bioestimuladores de Colágeno",
      description: "Estimula produção natural de colágeno para rejuvenescimento",
    },
    {
      title: "Fios de PDO",
      description: "Lifting não-cirúrgico com efeito imediato e natural",
    },
    {
      title: "Microagulhamento",
      description: "Regeneração da pele e estímulo aos fatores de crescimento",
    },
    {
      title: "Peelings Químicos",
      description: "Renovação celular e melhora da textura da pele",
    },
    {
      title: "Skinbooster",
      description: "Hidratação profunda para uma pele radiante e revitalizada",
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-gradient-to-b from-white to-[#F9F5EB]/30 relative overflow-hidden" 
      id="procedimentos"
    >
      {/* Fundo sutil com textura */}
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

        {/* Grid de cards de procedimentos - foco em tipografia e conteúdo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {procedures.map((procedure, index) => (
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
                  {procedure.title}
                </h3>
                
                {/* Subtle divider */}
                <div className="w-12 h-[1px] bg-[#731C13]/30 mb-4 transition-all duration-300 group-hover:w-16 group-hover:bg-[#731C13]/50"></div>
                
                {/* Description with high-quality typography */}
                <p className="text-gray-600 font-light leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {procedure.description}
                </p>
                
                {/* Call-to-action link with animation */}
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <a 
                    href="#" 
                    className="text-[#731C13] font-medium text-sm flex items-center opacity-70 group-hover:opacity-100 transition-all duration-300"
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
            className="inline-flex items-center px-8 py-3 bg-[#731C13] text-white rounded-full transition-all shadow-md hover:shadow-lg hover:bg-[#731C13]/90 hover:scale-105 active:scale-[0.98]"
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