import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// 3D abstract icon animation component
const AbstractIcon3D = ({ color = "#ECE0C4", size = 80, delay = 0 }) => {
  return (
    <motion.div 
      className="relative w-20 h-20"
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.5, delay }
      }}
    >
      {/* Abstract geometric shape with animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-14 h-14 rounded-md border-2 border-current absolute"
          style={{ color }}
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
            borderRadius: ["20%", "40%", "20%"]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            times: [0, 0.5, 1]
          }}
        />
        <motion.div 
          className="w-10 h-10 rounded-full border-2 border-current"
          style={{ color }}
          animate={{ 
            rotate: [360, 180, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear" 
          }}
        />
        <motion.div 
          className="w-5 h-5 rounded-full bg-current absolute"
          style={{ color }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        />
      </div>
      
      {/* Glowing effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
      />
    </motion.div>
  );
};

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start end", "end start"] 
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  
  const procedures = [
    {
      title: "Botox (Toxina Botulínica)",
      description: "Prevenção e suavização de rugas com naturalidade",
      icon: "syringe"
    },
    {
      title: "Rinomodelação",
      description: "Realce do nariz sem cirurgia, em minutos",
      icon: "nose"
    },
    {
      title: "Preenchimento Labial",
      description: "Volume e definição respeitando a harmonia facial",
      icon: "lips"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#425F70] to-[#2F4453] text-white py-32 px-4 overflow-hidden" 
      id="sobre"
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/pattern-background.png')] bg-repeat"></div>
      
      {/* Floating 3D particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [
                Math.random() * -50,
                Math.random() * 50,
                Math.random() * -50
              ],
              x: [
                Math.random() * -30,
                Math.random() * 30,
                Math.random() * -30
              ],
              scale: [
                1,
                Math.random() * 1.5 + 0.5,
                1
              ],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left column - About content */}
          <motion.div 
            className="md:w-1/2 md:pr-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Section title with animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <AbstractIcon3D color="#ECE0C4" size={60} />
              <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold mt-8">
                <span>Não é sobre mudar.</span><br />
                <span className="italic text-[#ECE0C4] mt-2 block">É sobre revelar sua melhor versão.</span>
              </h2>
            </motion.div>
            
            {/* Staggered paragraphs with fade-in animations */}
            <motion.p 
              className="mt-6 text-lg leading-relaxed text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Com uma abordagem focada em autoestima, acolhimento e feminilidade, a Dra. Jana Guimarães já ajudou milhares de mulheres — cis e trans — a se reconectarem com o espelho e com sua própria história.
            </motion.p>
            
            {/* Special highlight with animation and micro-interactions */}
            <motion.div 
              className="mt-8 p-6 border-l-4 border-[#ECE0C4] bg-white/10 backdrop-blur-sm rounded-r-xl relative overflow-hidden group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {/* Animated decorative elements on hover */}
              <motion.div 
                className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full"
                style={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              <p className="text-lg text-[#ECE0C4] relative z-10">
                A Dra. Jana também é conhecida por seu trabalho com a feminilização facial de mulheres trans, promovendo visibilidade, dignidade e representatividade por meio da estética humanizada.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Right column - Procedures with interactive cards */}
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ y: parallaxY }}
          >
            <div className="glass-card bg-white/15 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-white/10 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ECE0C4]/10 blur-3xl rounded-full"></div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#ECE0C4] mb-8 relative">
                Principais Procedimentos
                <div className="h-1 w-20 bg-gradient-to-r from-[#ECE0C4] to-transparent rounded-full mt-2"></div>
              </h3>
              
              {/* Procedures with 3D icons and hover effects */}
              <div className="space-y-6">
                {procedures.map((procedure, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start p-5 rounded-xl border border-white/10 group hover:backdrop-blur-md transition-all duration-500 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    whileHover={{ 
                      backgroundColor: "rgba(255,255,255,0.1)", 
                      borderColor: "rgba(255,255,255,0.3)",
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
                    }}
                  >
                    {/* Background effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated 3D icon */}
                    <div className="relative mr-4 flex-shrink-0">
                      {/* 3D icon with hover animation */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ECE0C4] to-[#c5b99f] flex items-center justify-center text-[#425F70] shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <i className={`fas fa-${procedure.icon} text-lg`}></i>
                      </div>
                      
                      {/* Decorative connector line on hover */}
                      <div className="absolute top-full left-1/2 w-0.5 h-0 bg-[#ECE0C4]/30 -translate-x-1/2 group-hover:h-5 transition-all duration-500 delay-100"></div>
                    </div>
                    
                    {/* Procedure information with layered text */}
                    <div className="relative z-10">
                      {/* Title with hover effect */}
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-[#ECE0C4] transition-colors duration-300">
                        {procedure.title}
                      </h4>
                      
                      {/* Description with hover effect */}
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {procedure.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Additional micro-animation element */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-2 border-[#ECE0C4] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 border-2 border-[#ECE0C4] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Curved bottom effect with animation */}
      <div className="absolute -bottom-10 left-0 w-full h-20 bg-white rounded-t-[100%] z-0">
        <motion.div 
          className="absolute bottom-0 left-1/2 w-2 h-10 -ml-1"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-2 h-2 rounded-full bg-[#425F70] absolute bottom-5"></div>
          <div className="w-2 h-2 rounded-full bg-[#425F70] opacity-70 absolute bottom-10"></div>
          <div className="w-2 h-2 rounded-full bg-[#425F70] opacity-40 absolute bottom-15"></div>
        </motion.div>
      </div>
      
      {/* CSS for glass effects */}
      <style jsx global>{`
        .glass-card {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.5s ease;
        }
        .glass-card:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </section>
  );
}
