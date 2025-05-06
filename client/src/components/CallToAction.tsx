import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHATSAPP_URL } from "@/lib/constants";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) return;
    
    try {
      setIsSubscribing(true);
      await apiRequest("POST", "/api/subscribe", { email, name });
      setSubscribed(true);
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setIsSubscribing(false);
    }
  };
  
  const handleWhatsAppRedirect = (e: React.MouseEvent) => {
    // Only redirect if we have data
    if (email && name) {
      e.preventDefault();
      
      // Save data in API
      handleSubscribe(e as unknown as React.FormEvent);
      
      // Create message text
      const message = encodeURIComponent(
        `Olá! Gostaria de me inscrever no canal do WhatsApp sobre o curso "Protocolo de Manejo de Intercorrência em Cirurgias da Face".\n\nNome: ${name}\nEmail: ${email}`
      );
      
      // Redirect to WhatsApp with prefilled message
      window.open(`${WHATSAPP_URL}&text=${message}`, '_blank');
    }
  };

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
              className="w-full bg-white text-[#731C13] hover:text-[#425F70] font-bold py-5 px-6 rounded-xl text-center hover:bg-opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] mt-auto"
            >
              <a href={WHATSAPP_URL} className="flex items-center justify-center gap-3">
                <i className="fab fa-whatsapp text-xl"></i> Agendar pelo WhatsApp
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
            
            <form onSubmit={handleSubscribe} className="mb-8">
              <label className="block text-lg font-medium mb-3">Cadastre-se para ser avisado(a)</label>
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 mb-4 shadow-inner"
              />
              <Input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-inner"
              />
            </form>
            
            <Button 
              onClick={handleWhatsAppRedirect}
              className="w-full bg-white text-[#731C13] hover:text-[#425F70] font-bold py-5 px-6 rounded-xl text-center hover:bg-opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] mt-auto"
              disabled={isSubscribing}
            >
              {isSubscribing ? (
                <div className="flex items-center justify-center gap-2">
                  <i className="fas fa-circle-notch fa-spin"></i> Processando...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <i className="fas fa-graduation-cap text-xl"></i> Inscreva-se no Canal do WhatsApp
                </div>
              )}
            </Button>
            
            {subscribed && (
              <p className="mt-4 text-center text-white bg-green-500/30 p-3 rounded-xl border border-green-500/50 shadow-md">
                <i className="fas fa-check-circle mr-2"></i> Obrigado! Você será notificado sobre o próximo curso.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
