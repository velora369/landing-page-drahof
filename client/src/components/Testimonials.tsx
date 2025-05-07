import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Profissional excepcional! A Dra. Jana tem um olhar técnico único e conseguiu captar exatamente o que eu queria. Me emocionei quando vi o resultado - pela primeira vez me reconheci no espelho. Um trabalho que respeita a identidade e a história de cada paciente.",
      name: "Débora Silva",
      time: "2 meses atrás",
      initial: "D"
    },
    {
      text: "Descobri a Dra. Jana depois de muitas decepções com outros profissionais. A diferença é nítida: ela não te vende procedimentos, ela escuta suas necessidades e propõe soluções personalizadas. Senti que era mais que estética, era cura emocional. Resultado natural e acolhimento impecável!",
      name: "Vanessa Torres",
      time: "3 meses atrás",
      initial: "V"
    },
    {
      text: "Recomendo de olhos fechados! A Dra. Jana tem um dom único de ver além do rosto, ela enxerga a pessoa. Fiz preenchimento labial e harmonização do olhar, e o resultado superou todas as expectativas. Procedimentos delicados, indolores e com recuperação rápida. Mudou minha relação com o espelho para sempre.",
      name: "Carla Mendonça",
      time: "1 mês atrás",
      initial: "C"
    },
    {
      text: "Finalmente encontrei uma profissional que entendeu minhas necessidades. A Dra. Jana tem um olhar técnico apurado e uma sensibilidade única para entender o que cada paciente busca. Os resultados ficaram discretos e naturais, exatamente o que eu queria! Toda mulher merece esse cuidado.",
      name: "Mariana Alves",
      time: "2 semanas atrás",
      initial: "M"
    },
    {
      text: "Aos 50 anos, estava insegura sobre fazer procedimentos estéticos. A Dra. Jana foi extremamente paciente ao esclarecer todas as minhas dúvidas e me mostrou como poderia realçar minha beleza natural sem parecer artificial. O resultado foi tão incrível que meu marido notou a diferença e disse que eu parecia mais feliz, não apenas mais jovem!",
      name: "Luciana Campos",
      time: "1 semana atrás",
      initial: "L"
    },
    {
      text: "Como jornalista, minha imagem é importante, mas sempre tive medo daquele resultado artificial. A Dra. Jana entendeu perfeitamente meus receios e realizou um trabalho sutil e harmonioso. Meus colegas perceberam algo diferente, mas não conseguiram identificar o que mudou - esse é o melhor elogio para quem procura naturalidade!",
      name: "Patricia Rocha",
      time: "3 semanas atrás",
      initial: "P"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#ECE0C4]/20 to-[#ECE0C4]/40" id="depoimentos">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold mb-6 text-[#425F70]">
            Mulheres reais. Histórias de superação.
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Depoimentos espontâneos lotam a DM e o Google da Dra. Jana. São mães, profissionais e até jovens que encontraram nela uma profissional que escuta, acolhe e entrega o que promete: autoestima sem exageros.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star mr-0.5"></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#425F70] to-[#731C13] text-white flex items-center justify-center mr-4 shadow-md">
                  <span className="font-bold text-lg">{testimonial.initial}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#425F70] text-lg">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-xs mr-0.5"></i>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500 text-xs">{testimonial.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-center font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-10 text-[#425F70]">
            O que dizem no Google
          </h3>
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="h-2 bg-gradient-to-r from-[#4285F4] to-[#34A853]"></div>
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/google-avaliacao.webp" 
                  alt="Avaliação Google" 
                  className="w-24 h-auto"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[#4285F4] font-bold">Avaliação Google</span>
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-sm mr-0.5"></i>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm font-medium">5.0 (138 avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Baseado nas experiências de pacientes reais</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#425F70] to-[#731C13] text-white flex items-center justify-center mr-4 shadow-md">
                    <span className="font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Roberta Mendes</h4>
                    <div className="flex items-center">
                      <div className="text-yellow-400 flex">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star text-xs mr-0.5"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">3 meses atrás</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Profissional extremamente competente e atenciosa. Me senti segura durante todo o procedimento. A Dra. Jana tem um olhar técnico único e conseguiu entender exatamente o que eu precisava. O resultado ficou natural e harmonioso. Super recomendo!"
                </p>
              </div>
              
              <div className="text-center">
                <motion.button
                  className="text-[#4285F4] font-medium bg-blue-50 rounded-full py-2 px-4 inline-flex items-center hover:bg-blue-100 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-check-circle mr-2"></i>
                  <span>138 avaliações verificadas</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
