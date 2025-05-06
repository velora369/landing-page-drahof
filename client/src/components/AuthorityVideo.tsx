import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Componente para animação sutil de linhas que representa contornos faciais
const FacialContourAnimation = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Valores de transformação baseados na posição de scroll
  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const translateX = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.8, 0.8, 0]);

  return (
    <motion.div 
      ref={containerRef}
      className="absolute -right-8 top-1/4 w-48 h-48 md:w-64 md:h-64 opacity-20 pointer-events-none"
      style={{
        opacity,
        rotateY,
        x: translateX
      }}
    >
      {/* SVG abstrato representando contornos faciais estilizados */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="animate-float">
          {/* Linha de contorno 1 */}
          <motion.path 
            d="M50,100 Q75,70 100,70 Q125,70 150,100" 
            stroke="#731C13" 
            strokeWidth="1.5" 
            strokeDasharray="190"
            initial={{ strokeDashoffset: 190 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
            fill="none"
          />
          {/* Linha de contorno 2 */}
          <motion.path 
            d="M60,120 Q80,100 100,100 Q120,100 140,120" 
            stroke="#425F70" 
            strokeWidth="1.5" 
            strokeDasharray="160"
            initial={{ strokeDashoffset: 160 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 4.5, delay: 0.5 }}
            fill="none"
          />
          {/* Linha representando o queixo */}
          <motion.path 
            d="M80,140 Q100,155 120,140" 
            stroke="#ECE0C4" 
            strokeWidth="1.5" 
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 4, delay: 1 }}
            fill="none"
          />
          {/* Pontos estilizados para áreas de injeção */}
          <motion.circle 
            cx="80" cy="85" r="2" 
            fill="#731C13"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.5, delay: 3, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
          />
          <motion.circle 
            cx="120" cy="85" r="2" 
            fill="#731C13"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.5, delay: 3.3, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
          />
          <motion.circle 
            cx="100" cy="110" r="2" 
            fill="#425F70"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.5, delay: 3.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
          />
        </g>
      </svg>
    </motion.div>
  );
};

// Componente para animação do item da lista de qualificações
interface QualificationItemProps {
  children: React.ReactNode;
  delay?: number;
}

const QualificationItem = ({ children, delay = 0 }: QualificationItemProps) => {
  return (
    <motion.li 
      className="relative text-[#425F70]/90 mb-3 pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.5em] before:w-3 before:h-3 before:rounded-full before:bg-[#731C13]/20 before:border before:border-[#731C13]/40"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 + delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.li>
  );
};

export default function AuthorityVideo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Gera valores de transformação baseados na posição de scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const imageBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);
  const textXOffset = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, -2]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.02, 0.05, 0.05, 0.02]);
  
  // Variantes de animação para texto com timing escalonado mais refinado
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: custom * 0.12, // Timing ligeiramente mais rápido para melhor ritmo visual
        ease: [0.16, 1, 0.3, 1] // Curva de easing mais refinada para movimento mais natural
      }
    })
  };

  return (
    <section 
      className="py-24 md:py-32 px-4 bg-gradient-to-b from-white to-[#F9F5EB]/30 relative overflow-hidden" 
      id="sobre"
      ref={containerRef}
    >
      {/* Background de padrão sutil com animação */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23425F70%22%20fill-opacity%3D%220.2%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </motion.div>
      
      {/* Elementos decorativos extras para profundidade */}
      <div className="absolute top-20 left-[5%] w-32 h-32 rounded-full bg-[#ECE0C4]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 right-[8%] w-40 h-40 rounded-full bg-[#731C13]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -top-10 right-[15%] w-16 h-16 rounded-full bg-[#425F70]/10 blur-xl pointer-events-none"></div>

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
            Sobre a Dra. HOF
            <motion.span 
              className="absolute -bottom-3 left-0 h-[3px] bg-[#731C13]/60 rounded-full" 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-14 lg:gap-x-20 items-center">
          {/* Lado esquerdo: Imagem da Dra. com tratamento visual */}
          <motion.div 
            className="relative order-2 md:order-1 mx-auto md:mx-0 max-w-sm"
            style={{ scale: imageScale, filter: `brightness(${imageBrightness})` }}
          >
            {/* Círculo decorativo atrás da imagem */}
            <motion.div 
              className="absolute -z-10 rounded-full bg-gradient-to-tr from-[#731C13]/5 to-transparent w-[120%] h-[120%] -left-[10%] -top-[10%]"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            
            {/* Container da imagem principal */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#731C13]/10 border border-[#ECE0C4]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <img 
                src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/foto-dra-hof-.webp" 
                alt="Dra. Jana Hof" 
                className="w-full h-auto object-cover"
              />

              {/* Sobreposição sutil para dar profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#425F70]/20 via-transparent to-transparent" />
            </motion.div>
            
            {/* Emblema de qualificação */}
            <motion.div 
              className="absolute -right-6 -bottom-6 bg-white/90 backdrop-blur-sm rounded-full py-3 px-5 shadow-lg border border-[#ECE0C4]/40"
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: -2, transition: { duration: 0.2 } }}
            >
              <p className="text-[#731C13] font-medium text-sm">
                <span className="font-bold">+15</span> anos de<br />experiência
              </p>
            </motion.div>
            
            {/* Elemento visual 3D sutil - linhas de contorno facial */}
            <FacialContourAnimation />
          </motion.div>
          
          {/* Lado direito: Conteúdo de texto */}
          <div className="order-1 md:order-2">
            <div className="space-y-6">
              {/* Título e subtítulo */}
              <motion.h3 
                custom={0}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold text-[#731C13]"
              >
                Dra. Jana Guimarães
              </motion.h3>

              <motion.div
                custom={1}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex items-center space-x-2"
              >
                <span className="text-[#425F70] text-lg md:text-xl font-light">
                  <span className="bg-gradient-to-r from-[#731C13] to-[#731C13]/80 bg-clip-text text-transparent font-medium">@drahof</span> — especialista em harmonização facial avançada
                </span>
                <motion.span 
                  className="inline-block w-2 h-2 bg-[#731C13] rounded-full"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Parágrafos com animação sequencial */}
              <motion.p 
                custom={2}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="text-gray-700 text-lg leading-relaxed"
              >
                Referência em harmonização facial, com mais de 100 certificações, 6 cursos internacionais em anatomia e mais de 30 cursos ministrados em HOF.
              </motion.p>
              
              <motion.p 
                custom={3}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="text-gray-700 text-lg leading-relaxed"
              >
                Na prática clínica ou nos bastidores da educação estética, a Dra. Jana é referência por onde passa. Seu olhar técnico e humano vai além do padrão: ela cuida da sua autoestima como prioridade.
              </motion.p>
              
              {/* Citação em destaque com design aprimorado */}
              <motion.div
                custom={4}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative mt-8 p-8 bg-gradient-to-br from-white to-[#F9F5EB]/80 rounded-xl border-l-4 border-[#731C13] shadow-sm"
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(115, 28, 19, 0.1)",
                  scale: 1.01,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute -top-4 -left-2 text-5xl text-[#731C13]/20 font-serif">"</div>
                <p className="text-xl md:text-2xl font-['Cormorant_Garamond'] italic text-[#731C13] text-center leading-relaxed">
                  Beleza é ciência, mas autoestima é arte.
                </p>
                <div className="absolute -bottom-6 -right-2 text-5xl text-[#731C13]/20 font-serif">"</div>
                <div className="w-12 h-1 bg-gradient-to-r from-[#731C13] to-[#ECE0C4] rounded-full mx-auto mt-4"></div>
              </motion.div>
              
              {/* Lista de qualificações */}
              <motion.div
                custom={5}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#ECE0C4]/30"
              >
                <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#425F70] mb-4">
                  Qualificações e Formação
                </h3>
                <ul className="space-y-1 mt-3">
                  <QualificationItem delay={0}>Especialista em Dentistica Restauradora</QualificationItem>
                  <QualificationItem delay={1}>Especialista em Harmonização Orofacial</QualificationItem>
                  <QualificationItem delay={2}>Especialista em Cirurgias Estéticas da Face - MEC</QualificationItem>
                  <QualificationItem delay={3}>MESTRE em Odontologia - FOUSP</QualificationItem>
                  <QualificationItem delay={4}>Certificações Internacionais em Anatomia Facial</QualificationItem>
                </ul>
              </motion.div>
              
              {/* CTA Button - Lattes */}
              <motion.div
                custom={6}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="mt-10"
              >
                {/* TODO: Inserir link do Lattes aqui quando fornecido */}
                <motion.a 
                  href="#"
                  className="group inline-flex items-center px-6 py-3 bg-[#731C13] text-white rounded-full transition-all shadow-md hover:shadow-lg hover:bg-[#731C13]/90 active:scale-[0.98]"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(115, 28, 19, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="mr-2 w-5 h-5 transition-transform group-hover:rotate-[-15deg]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="font-medium">acesse o lattes</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
