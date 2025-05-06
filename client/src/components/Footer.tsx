import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Controla a exibição com base no scroll
  useEffect(() => {
    const checkScrollPosition = () => {
      // Define que está rolando a página
      setIsScrolling(true);
      
      // Limpa o timeout anterior se houver
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Configura um novo timeout para considerar que o scroll parou
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250); // 250ms para detectar que o scroll parou
      
      // Verifica se deve mostrar o botão com base na posição do scroll
      if (!showScrollTop && window.scrollY > window.innerHeight / 2) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.scrollY <= window.innerHeight / 2) {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      // Limpa o timeout ao desmontar o componente
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#425F70] to-[#334959] text-white pt-16 pb-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#425F70] via-[#ECE0C4] to-[#731C13]"></div>
      <div className="absolute top-0 left-0 w-full h-16 bg-white/5 -translate-y-8 transform skew-y-2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#731C13]/10 blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#ECE0C4]/10 blur-2xl"></div>
      
      {/* Back to top button - Posicionado acima do botão do WhatsApp */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isScrolling ? 0 : 1,
              y: 0 
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[88px] right-6 z-50 w-12 h-12"
          >
            {/* Efeito de pulso */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-[#731C13]/20"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.button
              onClick={scrollToTop}
              className="group relative w-full h-full bg-gradient-to-br from-[#731C13] to-[#425F70] rounded-full flex items-center justify-center shadow-lg shadow-[#731C13]/20 border border-white/10 text-white backdrop-blur-sm"
              aria-label="Voltar ao topo"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 10px 25px rgba(115, 28, 19, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-chevron-up text-sm"></i>
              <span className="absolute -bottom-7 text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                Voltar ao topo
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Column 1: Logo and About */}
          <div className="mb-6 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start"
            >
              <div className="mb-6">
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/drahof-logo-vermelha.png" 
                  alt="Dra. HOF Logo" 
                  className="h-16 object-contain" 
                />
              </div>
              
              <div className="backdrop-blur-sm border border-white/10 rounded-xl p-5 bg-white/5">
                <p className="text-[#ECE0C4] mb-1 flex items-center text-sm">
                  <i className="fas fa-certificate text-xs mr-2"></i>
                  Especialista em Harmonização Orofacial
                </p>
                <p className="text-[#ECE0C4] mb-1 flex items-center text-sm">
                  <i className="fas fa-certificate text-xs mr-2"></i>
                  Especialista em Cirurgias Estéticas da Face
                </p>
                <p className="text-[#ECE0C4] flex items-center text-sm">
                  <i className="fas fa-award text-xs mr-2"></i>
                  MESTRE em Odontologia - FOUSP
                </p>
              </div>
              
              <div className="mt-5 text-sm text-white/80">
                <p>CROSP: 165674 | Responsável Técnica: Dra. Jana Guimarães</p>
              </div>
            </motion.div>
          </div>
          
          {/* Column 2: Links Rápidos */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-5 text-[#ECE0C4]">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#hero" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ECE0C4] mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    Início
                  </a>
                </li>
                <li>
                  <a 
                    href="#sobre" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ECE0C4] mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    Sobre Dra. Jana
                  </a>
                </li>
                <li>
                  <a 
                    href="#procedimentos" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ECE0C4] mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    Procedimentos
                  </a>
                </li>
                <li>
                  <a 
                    href="#antes-depois" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ECE0C4] mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    Antes e Depois
                  </a>
                </li>
                <li>
                  <a 
                    href="#depoimentos" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ECE0C4] mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a 
                    href="#contato" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ECE0C4] mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    Contato
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Column 3: Contato */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-5 text-[#ECE0C4]">Contato</h3>
              <div className="space-y-4">
                <a 
                  href="https://maps.google.com/?q=Rua+Cardoso+de+Almeida+313+Conjunto+51+São+Paulo+SP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center group hover:bg-white/5 p-2 rounded-lg transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#731C13]/20 transition-colors duration-300 backdrop-blur-sm">
                    <i className="fas fa-map-marker-alt text-[#ECE0C4]"></i>
                  </div>
                  <div>
                    <p className="text-white/90 group-hover:text-white transition-colors duration-300">Rua Cardoso de Almeida, 313</p>
                    <p className="text-sm text-white/70">Conjunto 51 - São Paulo/SP</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+5511989773944" 
                  className="flex items-center group hover:bg-white/5 p-2 rounded-lg transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#731C13]/20 transition-colors duration-300 backdrop-blur-sm">
                    <i className="fas fa-phone-alt text-[#ECE0C4]"></i>
                  </div>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300">(11) 98977-3944</p>
                </a>
                
                <a 
                  href="mailto:contato@drahof.com.br" 
                  className="flex items-center group hover:bg-white/5 p-2 rounded-lg transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#731C13]/20 transition-colors duration-300 backdrop-blur-sm">
                    <i className="fas fa-envelope text-[#ECE0C4]"></i>
                  </div>
                  <p className="text-white/90 group-hover:text-white transition-colors duration-300">contato@drahof.com.br</p>
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Column 4: Redes Sociais */}
          <div className="lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-5 text-[#ECE0C4]">Redes Sociais</h3>
              <div className="flex lg:justify-end justify-start space-x-3">
                <motion.a 
                  href="https://instagram.com/drahof" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm"
                  aria-label="Instagram"
                  whileHover={{ 
                    scale: 1.12, 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-instagram text-xl text-white group-hover:text-[#ECE0C4] transition-colors duration-300"></i>
                  <motion.div 
                    className="absolute -top-10 bg-[#ECE0C4]/10 backdrop-blur-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    Instagram
                  </motion.div>
                </motion.a>
                
                <motion.a 
                  href="https://wa.me/5511989773944" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm"
                  aria-label="WhatsApp"
                  whileHover={{ 
                    scale: 1.12, 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-whatsapp text-xl text-white group-hover:text-[#ECE0C4] transition-colors duration-300"></i>
                  <motion.div 
                    className="absolute -top-10 bg-[#ECE0C4]/10 backdrop-blur-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    WhatsApp
                  </motion.div>
                </motion.a>
                
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm"
                  aria-label="Facebook"
                  whileHover={{ 
                    scale: 1.12, 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-facebook-f text-xl text-white group-hover:text-[#ECE0C4] transition-colors duration-300"></i>
                  <motion.div 
                    className="absolute -top-10 bg-[#ECE0C4]/10 backdrop-blur-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    Facebook
                  </motion.div>
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm"
                  aria-label="LinkedIn"
                  whileHover={{ 
                    scale: 1.12, 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-linkedin-in text-xl text-white group-hover:text-[#ECE0C4] transition-colors duration-300"></i>
                  <motion.div 
                    className="absolute -top-10 bg-[#ECE0C4]/10 backdrop-blur-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    LinkedIn
                  </motion.div>
                </motion.a>
              </div>
              
              <div className="mt-6 inline-block lg:ml-auto">
                <div className="backdrop-blur-sm border border-white/10 p-4 rounded-xl bg-white/5">
                  <p className="text-lg">Siga-nos: <span className="text-[#ECE0C4] font-medium">@drahof</span></p>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-white/70 lg:text-right">
                <p>Horário de Atendimento:</p>
                <p className="text-[#ECE0C4]">Segunda a Sexta: 9h às 18h</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} Dra. Jana Guimarães (Dra. HOF). Todos os direitos reservados.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white/70 hover:text-[#ECE0C4] transition-colors duration-300">Política de Privacidade</a>
            <a href="#" className="text-white/70 hover:text-[#ECE0C4] transition-colors duration-300">Termos de Uso</a>
            <a href="#" className="text-white/70 hover:text-[#ECE0C4] transition-colors duration-300">Mapa do Site</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
