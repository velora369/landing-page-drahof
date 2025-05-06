import { motion } from "framer-motion";
import { CLINIC_ADDRESS, CLINIC_PHONE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Contact() {

  return (
    <section id="contato" className="py-24 px-4 bg-gradient-to-b from-white to-[#F9F5EB]/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/noise-texture.svg')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-20 left-[5%] w-32 h-32 rounded-full bg-[#ECE0C4]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 right-[8%] w-40 h-40 rounded-full bg-[#731C13]/5 blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[#425F70] inline-block relative">
            Entre em Contato
            <motion.span 
              className="absolute -bottom-3 left-0 h-[3px] bg-[#731C13]/60 rounded-full" 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg">
            Agende sua consulta ou tire suas dúvidas. Estamos prontos para atendê-la com toda a atenção que você merece.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-[#731C13] mb-6">Informações de Contato</h3>
                
                <div className="space-y-8">
                  {/* Endereço */}
                  <div className="transition-all duration-300 hover:translate-x-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Endereço</p>
                    <a 
                      href="https://maps.google.com/?q=Rua+Cardoso+de+Almeida+313+Conjunto+51" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-gray-800 hover:text-[#731C13] transition-colors duration-300"
                    >
                      {CLINIC_ADDRESS}
                    </a>
                  </div>
                  
                  {/* Telefone */}
                  <div className="transition-all duration-300 hover:translate-x-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Telefone</p>
                    <a 
                      href={`tel:${CLINIC_PHONE.replace(/\D/g, '')}`}
                      className="text-lg text-gray-800 hover:text-[#731C13] transition-colors duration-300"
                    >
                      {CLINIC_PHONE}
                    </a>
                  </div>
                  
                  {/* WhatsApp */}
                  <div className="transition-all duration-300 hover:translate-x-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">WhatsApp</p>
                    <a 
                      href="https://wa.me/11989773944"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-gray-800 hover:text-[#731C13] transition-colors duration-300"
                    >
                      {CLINIC_PHONE}
                    </a>
                  </div>
                  
                  {/* Email */}
                  <div className="transition-all duration-300 hover:translate-x-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                    <a 
                      href="mailto:contato@drahof.com.br"
                      className="text-lg text-gray-800 hover:text-[#731C13] transition-colors duration-300"
                    >
                      contato@drahof.com.br
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-[#731C13] mb-6">Nossa Localização</h3>
                <div className="h-[300px] rounded-xl overflow-hidden shadow-md border border-[#ECE0C4]/30">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.7296955422714!2d-46.66879322430794!3d-23.543004561195243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce58334fc7cb17%3A0xc9f0aec263421632!2sR.%20Cardoso%20de%20Almeida%2C%20313%20-%20Perdizes%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005013-000!5e0!3m2!1spt-BR!2sbr!4v1699307080329!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(0.5) contrast(1.02) opacity(0.9)' }}
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Próximo Curso Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-xl border border-white/10 flex flex-col h-full bg-gradient-to-br from-[#425F70] to-[#731C13] text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Próximo curso</h3>
              <div className="p-6 bg-white/15 rounded-xl mb-8 border border-white/10 shadow-lg hover:bg-white/20 transition-all duration-300">
                <h4 className="text-xl font-bold mb-4 text-[#ECE0C4]">Protocolo de Manejo de Intercorrência em Cirurgias da Face</h4>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-center bg-white/5 p-3 rounded-lg">
                    <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>Online | 60 dias de acesso completo</span>
                  </li>
                  <li className="flex items-center bg-white/5 p-3 rounded-lg">
                    <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <span>Preço acessível</span>
                  </li>
                  <li className="flex items-center bg-white/5 p-3 rounded-lg">
                    <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
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
                <a href="https://wa.me/11989773944" className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span className="font-bold">Quero garantir minha vaga!</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}