import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/constants";

export default function CallToAction() {

  return (
    <section className="py-28 px-4 bg-gradient-to-br from-[#425F70] to-[#731C13] text-white relative overflow-hidden" id="contato">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-white/5 skew-y-3 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-x-32 translate-y-20"></div>
      <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-white/5 blur-xl animate-pulse"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold mb-6">
            Sua autoestima merece esse cuidado
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Agende agora seu atendimento personalizado com a Dra. Jana Guimarães e viva sua melhor versão — em qualquer idade.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <motion.div 
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-xl border border-white/10 flex flex-col h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Agende sua consulta</h3>
            <p className="mb-8 text-lg text-white/90">
              Atendimento acolhedor, ético e com técnica refinada para mulheres reais, com histórias reais.
            </p>
            
            <div className="flex items-center mb-8 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-5 shadow-lg">
                <i className="fas fa-phone-alt text-white text-lg"></i>
              </div>
              <div>
                <p className="text-sm text-gray-200 mb-1">Telefone para contato</p>
                <p className="text-xl font-bold">(65) 99695-5300</p>
              </div>
            </div>
            
            <div className="flex items-center mb-10 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-5 shadow-lg">
                <i className="fas fa-map-marker-alt text-white text-lg"></i>
              </div>
              <div>
                <p className="text-sm text-gray-200 mb-1">Endereço da clínica</p>
                <p className="text-xl font-bold">Rua Cardoso de Almeida, 313, Conjunto 51</p>
              </div>
            </div>
            
            <Button 
              asChild
              className="w-full bg-[#ECE0C4] text-[#731C13] hover:bg-[#ECE0C4]/90 hover:text-[#731C13] font-bold py-5 px-6 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] mt-auto border-2 border-white/30"
            >
              <a href={WHATSAPP_URL} className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="font-bold">Agendar pelo WhatsApp</span>
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            id="cursos" 
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-xl border border-white/10 flex flex-col h-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Próximo curso</h3>
            <div className="p-6 bg-white/15 rounded-xl mb-8 border border-white/10 shadow-lg hover:bg-white/20 transition-all duration-300">
              <h4 className="text-xl font-bold mb-4 text-[#ECE0C4]">Protocolo de Manejo de Intercorrência em Cirurgias da Face</h4>
              <ul className="space-y-4 mb-4">
                <li className="flex items-center bg-white/5 p-3 rounded-lg">
                  <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <span>Online | 60 dias de acesso completo</span>
                </li>
                <li className="flex items-center bg-white/5 p-3 rounded-lg">
                  <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-tag"></i>
                  </div>
                  <span>Preço acessível</span>
                </li>
                <li className="flex items-center bg-white/5 p-3 rounded-lg">
                  <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <span>Para profissionais da área</span>
                </li>
              </ul>
            </div>
            
            <p className="text-lg mb-8 text-white/90">
              Garanta sua vaga com bônus especial pelo nosso WhatsApp
            </p>
            
            <Button 
              asChild
              className="w-full bg-[#ECE0C4] text-[#731C13] hover:bg-[#ECE0C4]/90 hover:text-[#731C13] font-bold py-5 px-6 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] mt-auto border-2 border-white/30"
            >
              <a href={WHATSAPP_URL} className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="font-bold">Quero garantir minha vaga!</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
