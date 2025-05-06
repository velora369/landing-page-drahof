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
              {/* Seringa elegante posicionada na diagonal */}
              <g transform="rotate(25, 12, 12)">
                {/* Corpo da seringa - tom sutil da paleta */}
                <rect x="7" y="10" width="10" height="3" rx="0.5" stroke="#425F70" fill="#F5F5F5" />
                {/* Êmbolo */}
                <path d="M17 11.5h3" stroke="#425F70" />
                {/* Agulha */}
                <path d="M3.5 11.5h3.5" stroke="#425F70" />
                {/* Gota translúcida prestes a sair */}
                <path d="M3.5 10.5c0-0.8 0.2-1.5 0.5-1.5s0.5 0.7 0.5 1.5-0.2 1-0.5 1-0.5-0.2-0.5-1z" fill="#ECE0C4" strokeOpacity="0.5" />
                <circle cx="3.5" cy="10.5" r="0.5" fill="white" stroke="none" />
              </g>
            </svg>
          )}
          
          {/* Rinomodelação - contorno de perfil de nariz estilizado */}
          {icon === 'rinoplastia' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Contorno de perfil de nariz elegante */}
              <path d="M9 7c0 0 1.5-3 3-3s3 1 4 3c1 2 0 5-1 7s-2 3-3 3" stroke="#ECE0C4" fill="none" />
              
              {/* Setas curvas e sutis indicando a modelagem */}
              {/* Seta para a ponta do nariz */}
              <path d="M8 10c0.5 0.5 1 0.8 1.5 0.2" stroke="#731C13" fill="none" />
              <path d="M8 10l0.5-0.5" stroke="#731C13" fill="none" />
              <path d="M8 10l0.5 0.5" stroke="#731C13" fill="none" />
              
              {/* Seta para o dorso */}
              <path d="M14 8c0.5-0.5 1-0.8 1.5-0.2" stroke="#731C13" fill="none" />
              <path d="M14 8l0.5-0.5" stroke="#731C13" fill="none" />
              <path d="M14 8l0.5 0.5" stroke="#731C13" fill="none" />
              
              {/* Seta para a base do nariz */}
              <path d="M11 16c0.5 0.5 1 0.8 1.5 0.2" stroke="#731C13" fill="none" />
              <path d="M11 16l0.5-0.5" stroke="#731C13" fill="none" />
              <path d="M11 16l0.5 0.5" stroke="#731C13" fill="none" />
            </svg>
          )}
          
          {/* Preenchimento Labial - lábios estilizados com volume */}
          {icon === 'preenchimento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Lábio superior com volume sutil */}
              <path d="M7 10c1.5-1 4-1.3 5-1.3s3.5 0.3 5 1.3" stroke="#731C13" strokeOpacity="0.7" fill="#F8D4D4" />
              {/* Lábio inferior com volume sutil */}
              <path d="M7 14c1.5 1 4 1.3 5 1.3s3.5-0.3 5-1.3" stroke="#731C13" strokeOpacity="0.7" fill="#F8D4D4" />
              {/* Linha central dos lábios */}
              <path d="M7 12h10" stroke="#731C13" strokeOpacity="0.8" />
              
              {/* Brilho/destaque no lábio superior para sugerir volume */}
              <circle cx="15" cy="9.5" r="0.5" fill="white" stroke="none" />
              <circle cx="14" cy="9.8" r="0.3" fill="white" stroke="none" />
              
              {/* Curvatura do arco de cupido */}
              <path d="M11.5 10.2C11.5 10 12 9.5 12.5 9.5s1 0.5 1 0.7" stroke="#731C13" strokeOpacity="0.8" strokeWidth="0.75" />
            </svg>
          )}
          
          {/* Bioestimuladores - estrutura helicoidal com partículas brilhantes */}
          {icon === 'bioestimulador' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Estrutura helicoidal simplificada (dupla hélice) */}
              <path d="M8 18c0-6 2-12 2-12" stroke="#425F70" fill="none" strokeDasharray="0 2.1" strokeWidth="1.2" />
              <path d="M14 6c0 6 2 12 2 12" stroke="#425F70" fill="none" strokeDasharray="0 2.1" strokeWidth="1.2" />
              
              {/* Linha fina da hélice 1 */}
              <path d="M8 18c0-6 2-12 2-12" stroke="#425F70" fill="none" />
              {/* Linha fina da hélice 2 */}
              <path d="M14 6c0 6 2 12 2 12" stroke="#425F70" fill="none" />
              
              {/* Conexões entre as hélices */}
              <path d="M10 6l4 0" stroke="#425F70" strokeWidth="0.75" />
              <path d="M9 9l6 0" stroke="#425F70" strokeWidth="0.75" />
              <path d="M8 12l8 0" stroke="#425F70" strokeWidth="0.75" />
              <path d="M9 15l6 0" stroke="#425F70" strokeWidth="0.75" />
              <path d="M10 18l4 0" stroke="#425F70" strokeWidth="0.75" />
              
              {/* Partículas brilhantes/pontos de luz ao longo da hélice */}
              <circle cx="10" cy="6" r="0.6" fill="#ECE0C4" stroke="none" />
              <circle cx="14" cy="6" r="0.6" fill="#ECE0C4" stroke="none" />
              <circle cx="9" cy="9" r="0.6" fill="#ECE0C4" stroke="none" />
              <circle cx="15" cy="9" r="0.5" fill="#ECE0C4" stroke="none" />
              <circle cx="8" cy="12" r="0.7" fill="#ECE0C4" stroke="none" />
              <circle cx="16" cy="12" r="0.5" fill="#ECE0C4" stroke="none" />
              <circle cx="9" cy="15" r="0.5" fill="#ECE0C4" stroke="none" />
              <circle cx="15" cy="15" r="0.6" fill="#ECE0C4" stroke="none" />
              <circle cx="10" cy="18" r="0.6" fill="#ECE0C4" stroke="none" />
              <circle cx="14" cy="18" r="0.6" fill="#ECE0C4" stroke="none" />
              
              {/* Brilhos extras para efeito de regeneração */}
              <circle cx="12" cy="6" r="0.3" fill="white" stroke="none" />
              <circle cx="12" cy="12" r="0.4" fill="white" stroke="none" />
              <circle cx="12" cy="18" r="0.3" fill="white" stroke="none" />
            </svg>
          )}
          
          {/* Fios de PDO - linhas finas curvas que se elevam */}
          {icon === 'fiosPDO' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Três ou quatro linhas muito finas e elegantes que se curvam suavemente para cima */}
              <path d="M7 18c0 0 0.5-5 0.5-10S9 6 9 6" stroke="#425F70" fill="none" />
              <path d="M11 18c0 0 0.5-6 0.5-10S13 6 13 6" stroke="#425F70" fill="none" />
              <path d="M15 18c0 0 0.5-5 0.5-10S17 6 17 6" stroke="#425F70" fill="none" />
              <path d="M9 18c0 0 0.5-7 0.5-11S11 5 11 5" stroke="#425F70" fill="none" strokeOpacity="0.5" />
              
              {/* Pequenos ganchos ou setas minúsculas viradas para cima */}
              <path d="M9 6l-0.5-0.5" stroke="#425F70" fill="none" />
              <path d="M9 6l0.5-0.5" stroke="#425F70" fill="none" />
              
              <path d="M13 6l-0.5-0.5" stroke="#425F70" fill="none" />
              <path d="M13 6l0.5-0.5" stroke="#425F70" fill="none" />
              
              <path d="M17 6l-0.5-0.5" stroke="#425F70" fill="none" />
              <path d="M17 6l0.5-0.5" stroke="#425F70" fill="none" />
              
              <path d="M11 5l-0.5-0.5" stroke="#425F70" fill="none" strokeOpacity="0.5" />
              <path d="M11 5l0.5-0.5" stroke="#425F70" fill="none" strokeOpacity="0.5" />
              
              {/* Indicação sutil do efeito lifting */}
              <path d="M7 16c1 0 2-1 3-1s2 1 4 1 3-1 4-1" stroke="#425F70" strokeOpacity="0.3" fill="none" />
              <path d="M7 14c1 0 2-1 3-1s2 1 4 1 3-1 4-1" stroke="#425F70" strokeOpacity="0.3" fill="none" strokeDasharray="1 1" />
            </svg>
          )}
          
          {/* Microagulhamento - cilindro de dermaroller estilizado */}
          {icon === 'microagulhamento' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Cilindro principal do dermaroller (parte central) */}
              <path d="M6 12h12" stroke="#AAAAAA" />
              <path d="M18 10v4" stroke="#AAAAAA" />
              <path d="M6 10v4" stroke="#AAAAAA" />
              
              {/* Partes extremas do cilindro (cabo) */}
              <path d="M4 11v2" stroke="#AAAAAA" />
              <path d="M20 11v2" stroke="#AAAAAA" />
              <path d="M4 12h2" stroke="#AAAAAA" />
              <path d="M18 12h2" stroke="#AAAAAA" />
              
              {/* Agulhas minúsculas e uniformemente espaçadas - coluna 1 */}
              <path d="M8 8v4" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M8 8l-0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M8 8l0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              
              {/* Agulhas coluna 2 */}
              <path d="M10 8v4" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M10 8l-0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M10 8l0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              
              {/* Agulhas coluna 3 */}
              <path d="M12 8v4" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M12 8l-0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M12 8l0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              
              {/* Agulhas coluna 4 */}
              <path d="M14 8v4" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M14 8l-0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M14 8l0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              
              {/* Agulhas coluna 5 */}
              <path d="M16 8v4" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M16 8l-0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              <path d="M16 8l0.2 -0.5" stroke="#C0C0C0" strokeWidth="0.6" />
              
              {/* Reflexos de luz no cilindro */}
              <path d="M8 11h8" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.5" />
              <path d="M8 13h8" stroke="#888888" strokeWidth="0.5" strokeOpacity="0.3" />
            </svg>
          )}
          
          {/* Peelings Químicos - gotas líquidas e superfície ondulada */}
          {icon === 'peeling' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Três gotas líquidas elegantes de tamanhos ligeiramente diferentes */}
              {/* Gota 1 - maior */}
              <path d="M9 13c0-2.5 1.5-4 1.5-4s1.5 1.5 1.5 4-1.5 3-1.5 3-1.5-0.5-1.5-3z" fill="#ECE0C4" fillOpacity="0.6" stroke="#425F70" strokeOpacity="0.6" />
              
              {/* Gota 2 - média */}
              <path d="M14 11c0-1.5 1-2.5 1-2.5s1 1 1 2.5-1 2-1 2-1-0.5-1-2z" fill="#ECE0C4" fillOpacity="0.7" stroke="#425F70" strokeOpacity="0.6" />
              
              {/* Gota 3 - menor */}
              <path d="M6 10c0-1 0.7-1.5 0.7-1.5s0.7 0.5 0.7 1.5-0.7 1.2-0.7 1.2-0.7-0.2-0.7-1.2z" fill="#ECE0C4" fillOpacity="0.8" stroke="#425F70" strokeOpacity="0.6" />
              
              {/* Brilho nas gotas */}
              <circle cx="10.5" cy="10" r="0.3" fill="white" stroke="none" />
              <circle cx="14.5" cy="9.5" r="0.25" fill="white" stroke="none" />
              <circle cx="6.5" cy="9" r="0.15" fill="white" stroke="none" />
              
              {/* Superfície sutilmente ondulada representando a pele se renovando */}
              <path d="M5 18c1-0.5 2-0.7 3.5-0.7s3 0.5 4.5 0.7 3 0 4.5-0.5 1.5-0.5 2.5-0.3" stroke="#425F70" strokeOpacity="0.7" fill="none" />
              <path d="M5 16c1-0.5 2-0.7 3.5-0.7s3 0.5 4.5 0.7 3 0 4.5-0.5 1.5-0.5 2.5-0.3" stroke="#425F70" strokeOpacity="0.4" fill="none" strokeDasharray="0.75 0.75" />
            </svg>
          )}
          
          {/* Skinbooster - hidratação profunda */}
          {icon === 'default' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              {/* Contorno facial estilizado com aparência hidratada */}
              <path d="M8 5c0 0 2-1 4-1s4 1 4 1" stroke="#425F70" strokeOpacity="0.5" />
              <path d="M7 8c0 0 2.5-2 5-2s5 2 5 2" stroke="#425F70" strokeOpacity="0.5" />
              <path d="M6 12c0 0 3-2 6-2s6 2 6 2" stroke="#425F70" strokeOpacity="0.5" />
              <path d="M7 16c0 0 2.5-2 5-2s5 2 5 2" stroke="#425F70" strokeOpacity="0.5" />
              <path d="M8 19c0 0 2-1 4-1s4 1 4 1" stroke="#425F70" strokeOpacity="0.5" />
              
              {/* Várias gotas de água elegantes para hidratação */}
              <path d="M8 10c0-1.5 0.8-2 0.8-2s0.8 0.5 0.8 2-0.8 1.5-0.8 1.5-0.8-0.5-0.8-1.5z" fill="#ECE0C4" fillOpacity="0.6" stroke="#425F70" strokeOpacity="0.4" />
              <path d="M12 8c0-1.5 1-2.5 1-2.5s1 1 1 2.5-1 2-1 2-1-0.5-1-2z" fill="#ECE0C4" fillOpacity="0.8" stroke="#425F70" strokeOpacity="0.4" />
              <path d="M15.5 10c0-1 0.5-1.5 0.5-1.5s0.5 0.5 0.5 1.5-0.5 1-0.5 1-0.5-0.3-0.5-1z" fill="#ECE0C4" fillOpacity="0.7" stroke="#425F70" strokeOpacity="0.4" />
              <path d="M10 14c0-1.2 0.7-2 0.7-2s0.7 0.8 0.7 2-0.7 1.5-0.7 1.5-0.7-0.5-0.7-1.5z" fill="#ECE0C4" fillOpacity="0.7" stroke="#425F70" strokeOpacity="0.4" />
              <path d="M14 15c0-1 0.5-1.5 0.5-1.5s0.5 0.5 0.5 1.5-0.5 1-0.5 1-0.5-0.3-0.5-1z" fill="#ECE0C4" fillOpacity="0.6" stroke="#425F70" strokeOpacity="0.4" />
              
              {/* Brilhos nas gotas para efeito de hidratação */}
              <circle cx="8.8" cy="8.8" r="0.2" fill="white" stroke="none" />
              <circle cx="13" cy="7" r="0.25" fill="white" stroke="none" />
              <circle cx="16" cy="9.3" r="0.15" fill="white" stroke="none" />
              <circle cx="10.7" cy="13" r="0.2" fill="white" stroke="none" />
              <circle cx="14.5" cy="14.3" r="0.15" fill="white" stroke="none" />
              
              {/* Efeitos luminosos adicionais */}
              <path d="M7 7l0.5-0.5" stroke="#ECE0C4" strokeOpacity="0.8" />
              <path d="M17 7l-0.5-0.5" stroke="#ECE0C4" strokeOpacity="0.8" />
              <path d="M7 17l0.5 0.5" stroke="#ECE0C4" strokeOpacity="0.8" />
              <path d="M17 17l-0.5 0.5" stroke="#ECE0C4" strokeOpacity="0.8" />
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
