import { motion } from "framer-motion";

export default function AuthorityVideo() {
  return (
    <section className="py-20 px-4 bg-white" id="autoridade">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#731C13] bg-opacity-5 p-8 rounded-xl border-l-4 border-[#731C13]">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold mb-4 text-[#425F70]">
                Conheça a Dra. Jana Guimarães
              </h2>
              <p className="text-gray-700 mb-6">
                @drahof — mais de 100 certificações, 6 cursos internacionais em anatomia e mais de 30 cursos ministrados em HOF.
              </p>
              <p className="text-gray-700 mb-6">
                Na prática clínica ou nos bastidores da educação estética, a Dra. Jana é referência por onde passa. Assista ao vídeo e veja como seu olhar técnico e humano vai além do padrão: ela cuida da sua autoestima como prioridade.
              </p>
              <p className="text-xl font-['Playfair_Display'] italic text-[#731C13]">
                "Beleza é ciência, mas autoestima é arte."
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-video bg-gray-200 rounded-xl">
              {/* Video placeholder with play button */}
              <div className="absolute inset-0 bg-[#425F70] bg-opacity-10 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#731C13] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-opacity-90 transition-all">
                  <i className="fas fa-play text-white text-2xl"></i>
                </div>
              </div>
              {/* This would be replaced with actual video element */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-600">Vídeo da Dra. Jana Guimarães</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
