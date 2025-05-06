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
    <section className="py-20 px-4 bg-[#ECE0C4] bg-opacity-30" id="depoimentos">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold mb-4 text-[#425F70]">
            Mulheres reais. Histórias de superação.
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Depoimentos espontâneos lotam a DM e o Google da Dra. Jana. São mães, profissionais e até jovens que encontraram nela uma profissional que escuta, acolhe e entrega o que promete: autoestima sem exageros.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#425F70] text-white flex items-center justify-center mr-3">
                  <span className="font-bold">{testimonial.initial}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#425F70]">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-xs"></i>
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
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center font-['Cormorant_Garamond'] text-3xl font-bold mb-8 text-[#425F70]">
            O que dizem no Google
          </h3>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-2 bg-[#4285F4]"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/google-avaliacao.webp" 
                  alt="Avaliação Google" 
                  className="w-24 h-auto mr-4"
                />
                <div>
                  <div className="flex items-center">
                    <span className="text-[#4285F4] font-bold mr-2">Avaliação Google</span>
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-sm"></i>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">5.0 (138 avaliações)</span>
                  </div>
                  <p className="text-sm text-gray-500">Baseado nas experiências de pacientes reais</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#425F70] text-white flex items-center justify-center mr-3">
                    <span className="font-bold">R</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Roberta Mendes</h4>
                    <div className="flex items-center">
                      <div className="text-yellow-400 flex">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star text-xs"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">3 meses atrás</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Profissional extremamente competente e atenciosa. Me senti segura durante todo o procedimento. A Dra. Jana tem um olhar técnico único e conseguiu entender exatamente o que eu precisava. O resultado ficou natural e harmonioso. Super recomendo!"
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-[#4285F4] font-medium">
                  138 avaliações verificadas
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
