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
    <section className="relative bg-[#425F70] text-white py-24 px-4" id="sobre">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row">
          <motion.div 
            className="md:w-1/2 md:pr-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold mb-8">
              <span className="border-b-2 border-[#ECE0C4] pb-2">Não é sobre mudar.</span><br />
              <span className="italic font-['Playfair_Display'] text-[#ECE0C4]">É sobre revelar sua melhor versão.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Com uma abordagem focada em autoestima, acolhimento e feminilidade, a Dra. Jana Guimarães já ajudou milhares de mulheres — cis e trans — a se reconectarem com o espelho e com sua própria história.
            </p>
            <p className="mt-6 text-lg text-[#ECE0C4]">
              A Dra. Jana também é conhecida por seu trabalho com a feminilização facial de mulheres trans, promovendo visibilidade, dignidade e representatividade por meio da estética humanizada.
            </p>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-[#ECE0C4] mb-6">Principais Procedimentos</h3>
              <div className="space-y-4">
                {procedures.map((procedure, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-[#ECE0C4] text-2xl mr-4">✅</div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{procedure.title}</h4>
                      <p className="text-gray-200">{procedure.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Curved bottom effect */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-[#425F70] rounded-b-[50%]" />
    </section>
  );
}
