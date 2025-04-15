import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { WHATSAPP_URL } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section 
      className="pt-32 pb-20 px-4 md:pt-40 bg-white" 
      id="hero"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <GradientText>Autoestima é poder.</GradientText>
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              A Dra. HOF transforma rostos — e vidas — com harmonização orofacial personalizada. 
              Com técnica, sensibilidade e mais de 100 formações na área, Dra. Jana Guimarães
              oferece procedimentos que respeitam a beleza única de cada mulher — realçando traços, 
              suavizando o tempo e devolvendo aquilo que nenhuma cirurgia entrega: a autoconfiança.
            </p>
            <p className="mt-4 text-lg font-medium text-[#425F70]">
              Cirurgiã-dentista, educadora e referência nacional em HOF, com atendimentos humanizados e resultados naturais.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-[#425F70] to-[#731C13] hover:from-[#731C13] hover:to-[#425F70] text-white py-3 px-8 rounded-full font-bold shadow-lg transition-all hover:translate-y-[-2px] hover:shadow-xl"
              >
                <a href={WHATSAPP_URL}>
                  Agendar Consulta
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-[#ECE0C4] text-[#731C13] py-3 px-8 rounded-full font-bold hover:bg-opacity-80 transition-all shadow-md border border-[#731C13]"
              >
                <a href="#cursos">
                  Conhecer Cursos
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/foto-dra-hof-.webp" 
              alt="Dra. Jana Guimarães em atendimento" 
              className="w-full h-auto rounded-xl" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
