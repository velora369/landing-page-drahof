import { motion } from "framer-motion";

export default function Benefits() {
  const procedures = [
    {
      title: "Botox (Toxina Botulínica)",
      description: "Prevenção e suavização de rugas com naturalidade"
    },
    {
      title: "Rinomodelação",
      description: "Realce do nariz sem cirurgia, em minutos"
    },
    {
      title: "Preenchimento Labial",
      description: "Volume e definição respeitando a harmonia facial"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#425F70] to-[#2F4453] text-white py-28 px-4" id="sobre">
      <div className="absolute inset-0 opacity-10 bg-[url('https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/pattern-background.png')] bg-repeat"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/2 md:pr-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold mb-8">
              <span>Não é sobre mudar.</span><br />
              <span className="italic text-[#ECE0C4] mt-2 block">É sobre revelar sua melhor versão.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-100">
              Com uma abordagem focada em autoestima, acolhimento e feminilidade, a Dra. Jana Guimarães já ajudou milhares de mulheres — cis e trans — a se reconectarem com o espelho e com sua própria história.
            </p>
            <div className="mt-8 p-5 border-l-4 border-[#ECE0C4] bg-white/10 backdrop-blur-sm rounded-r-xl">
              <p className="text-lg text-[#ECE0C4]">
                A Dra. Jana também é conhecida por seu trabalho com a feminilização facial de mulheres trans, promovendo visibilidade, dignidade e representatividade por meio da estética humanizada.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="bg-white/15 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-white/10 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-[#ECE0C4] mb-8">Principais Procedimentos</h3>
              <div className="space-y-6">
                {procedures.map((procedure, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="bg-[#ECE0C4] text-[#425F70] h-10 w-10 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-check text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{procedure.title}</h4>
                      <p className="text-gray-200">{procedure.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Curved bottom effect - more pronounced */}
      <div className="absolute -bottom-10 left-0 w-full h-20 bg-white rounded-t-[100%] z-0" />
    </section>
  );
}
