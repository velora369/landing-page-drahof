import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Me emocionei. Pela primeira vez me reconheci no espelho. Obrigada, Dra. Jana, por respeitar minha história.",
      name: "Débora",
      age: "38 anos",
      initial: "D"
    },
    {
      text: "Senti que era mais que estética... era cura emocional.",
      name: "Vanessa",
      age: "44 anos",
      initial: "V"
    },
    {
      text: "A Dra. Jana vê além do rosto, ela vê a pessoa. Mudou minha relação com o espelho para sempre.",
      name: "Carla",
      age: "51 anos",
      initial: "C"
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
                  <p className="text-sm text-gray-500">{testimonial.age}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
