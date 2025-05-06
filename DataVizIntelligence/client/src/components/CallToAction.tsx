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
    <section className="py-20 px-4 bg-gradient-to-r from-[#425F70] to-[#731C13] text-white" id="contato">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold mb-4">
            Sua autoestima merece esse cuidado
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Agende agora seu atendimento personalizado com a Dra. Jana Guimarães e viva sua melhor versão — em qualquer idade.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Agende sua consulta</h3>
            <p className="mb-6">
              Atendimento acolhedor, ético e com técnica refinada para mulheres reais, com histórias reais.
            </p>
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-phone-alt text-white"></i>
              </div>
              <div>
                <p className="text-sm text-gray-200">Telefone para contato</p>
                <p className="text-lg font-bold">(65) 99695-5300</p>
              </div>
            </div>
            
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-map-marker-alt text-white"></i>
              </div>
              <div>
                <p className="text-sm text-gray-200">Endereço da clínica</p>
                <p className="text-lg font-bold">Rua Cardoso de Almeida, 313, Conjunto 51</p>
              </div>
            </div>
            
            <Button 
              asChild
              className="w-full bg-white text-[#731C13] font-bold py-4 px-6 rounded-full text-center hover:bg-opacity-90 transition-all"
            >
              <a href={WHATSAPP_URL}>
                <i className="fab fa-whatsapp mr-2"></i> Agendar pelo WhatsApp
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            id="cursos" 
            className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Próximo curso</h3>
            <div className="p-4 bg-white bg-opacity-20 rounded-lg mb-6">
              <h4 className="text-xl font-bold mb-2">Protocolo de Manejo de Intercorrência em Cirurgias da Face</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <i className="fas fa-laptop-code mr-2"></i>
                  <span>Online | 60 dias de acesso completo</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-tag mr-2"></i>
                  <span>Preço acessível</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-user-md mr-2"></i>
                  <span>Para profissionais da área</span>
                </li>
              </ul>
            </div>
            
            <form onSubmit={handleSubscribe} className="mb-6">
              <label className="block text-sm font-medium mb-2">Cadastre-se para ser avisado(a)</label>
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 mb-3"
              />
              <Input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </form>
            
            <Button 
              onClick={handleWhatsAppRedirect}
              className="w-full bg-white text-[#731C13] font-bold py-4 px-6 rounded-full text-center hover:bg-opacity-90 transition-all"
            >
              <i className="fas fa-graduation-cap mr-2"></i> Inscreva-se no Canal do WhatsApp
            </Button>
            
            {subscribed && (
              <p className="mt-3 text-center text-white bg-green-500 bg-opacity-30 p-2 rounded">
                Obrigado! Você será notificado sobre o próximo curso.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
