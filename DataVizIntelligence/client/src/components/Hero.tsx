import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { WHATSAPP_URL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/foto-dra-hof-.webp",
    "/images/foto-2-headline.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

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
              <GradientText>Beleza é ciência, mas autoestima é arte.</GradientText>
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
            className="md:w-1/2 overflow-hidden rounded-xl shadow-2xl relative h-[350px] sm:h-[400px] md:h-[450px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={images[currentImageIndex]} 
                alt={`Dra. Jana Guimarães - Imagem ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover rounded-xl" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? "bg-[#731C13]" : "bg-white bg-opacity-60"
                  } transition-all duration-300`}
                  aria-label={`Ver imagem ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
