import { motion } from "framer-motion";

export default function AuthorityVideo() {
  return (
    <section className="py-20 px-4 bg-white" id="autoridade">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#731C13] bg-opacity-5 p-8 md:p-10 rounded-xl border-l-4 border-[#731C13] shadow-md">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6 text-[#425F70]">
              Conheça a Dra. Jana Guimarães
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              @drahof — mais de 100 certificações, 6 cursos internacionais em anatomia e mais de 30 cursos ministrados em HOF.
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Na prática clínica ou nos bastidores da educação estética, a Dra. Jana é referência por onde passa. Seu olhar técnico e humano vai além do padrão: ela cuida da sua autoestima como prioridade.
            </p>
            <div className="mt-8 bg-white bg-opacity-50 p-6 rounded-lg">
              <p className="text-2xl font-['Playfair_Display'] italic text-[#731C13] text-center">
                "Beleza é ciência, mas autoestima é arte."
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-[#425F70] mb-2">Formação</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Especialista em Dentistica Restauradora</li>
                  <li>Especialista em Harmonização Orofacial</li>
                  <li>Especialista em Cirurgias Estéticas da Face - MEC</li>
                  <li>MESTRE em Odontologia - FOUSP</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-[#425F70] mb-2">Diferenciais</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Atendimento humanizado e personalizado</li>
                  <li>Resultados naturais e harmônicos</li>
                  <li>Uso das técnicas mais avançadas</li>
                  <li>Mais de 15 anos de experiência clínica</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
