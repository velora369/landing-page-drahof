import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { CLINIC_ADDRESS, CLINIC_PHONE } from "@/lib/constants";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form definition with React Hook Form
  const form = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setSubmitted(true);
      
      toast({
        title: "Mensagem enviada!",
        description: result.message || "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar",
        description: "Houve um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format phone input with mask
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Apply the mask as the user types (Brazilian format)
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

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

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg border border-[#ECE0C4]/20">
              <h3 className="text-2xl font-bold text-[#731C13] mb-8">Envie sua mensagem</h3>
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-50 border border-green-200 p-6 rounded-lg text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Mensagem Enviada!</h4>
                  <p className="text-green-700">
                    Obrigado pelo seu contato. Entraremos em contato com você o mais breve possível.
                  </p>
                  <Button
                    className="mt-6 bg-green-600 hover:bg-green-700"
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar outra mensagem
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nome */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Nome Completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Seu nome completo" 
                              className="border-gray-300 focus:border-[#731C13] focus:ring-[#731C13]/10"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="seu.email@exemplo.com" 
                              className="border-gray-300 focus:border-[#731C13] focus:ring-[#731C13]/10"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Telefone com formatação */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field: { onChange, ...rest } }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Telefone / WhatsApp</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(00) 00000-0000" 
                              className="border-gray-300 focus:border-[#731C13] focus:ring-[#731C13]/10"
                              onChange={(e) => {
                                onChange(formatPhoneNumber(e.target.value));
                              }}
                              {...rest}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Assunto */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Assunto (opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Do que se trata sua mensagem?" 
                              className="border-gray-300 focus:border-[#731C13] focus:ring-[#731C13]/10"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Mensagem */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Mensagem</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Digite sua mensagem aqui..." 
                              className="min-h-[120px] border-gray-300 focus:border-[#731C13] focus:ring-[#731C13]/10"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full py-6 mt-6 bg-[#731C13] hover:bg-[#731C13]/90 text-white font-medium text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : "Enviar Mensagem"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}