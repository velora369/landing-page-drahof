import { motion } from "framer-motion";

export default function BeforeAfter() {
  return (
    <section className="py-20 px-4 bg-white" id="antes-depois">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold mb-4 text-[#425F70]">
            Transformações com alma
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Antes e depois que contam histórias. Cada paciente tem sua jornada. A Dra. Jana entende isso como ninguém. Veja alguns casos reais de mulheres que passaram pelo atendimento.
          </p>
        </motion.div>
        
        <div className="relative mb-16">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.div 
              className="flex-1 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-hidden rounded-lg mb-3">
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/antes-paciente--7.webp" 
                  alt="Antes do procedimento" 
                  className="w-full h-auto transition-all hover:scale-105" 
                />
              </div>
              <h3 className="text-xl font-bold text-center text-[#425F70]">Antes</h3>
            </motion.div>
            
            <motion.div 
              className="flex-1 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="overflow-hidden rounded-lg mb-3">
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/paciente-durante-.webp" 
                  alt="Durante o procedimento" 
                  className="w-full h-auto transition-all hover:scale-105" 
                />
              </div>
              <h3 className="text-xl font-bold text-center text-[#425F70]">Durante</h3>
            </motion.div>
            
            <motion.div 
              className="flex-1 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="overflow-hidden rounded-lg mb-3">
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/pos-paciente.webp" 
                  alt="Depois do procedimento" 
                  className="w-full h-auto transition-all hover:scale-105" 
                />
              </div>
              <h3 className="text-xl font-bold text-center text-[#425F70]">Depois</h3>
            </motion.div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ⚠️ Todos os casos são reais, com autorização para divulgação. Resultados personalizados conforme a anatomia e objetivos da paciente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
