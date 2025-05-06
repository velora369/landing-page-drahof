import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#425F70] to-[#334959] text-white pt-16 pb-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#425F70] via-[#ECE0C4] to-[#731C13]"></div>
      <div className="absolute top-0 left-0 w-full h-16 bg-white/5 -translate-y-8 transform skew-y-2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
      
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div className="mb-6 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold mb-4 flex items-center">
                <span className="bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-[#ECE0C4] text-xl">D</span>
                </span>
                Dra. Jana Guimarães
              </h3>
              <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                <p className="text-[#ECE0C4] mb-2 flex items-center">
                  <i className="fas fa-certificate text-xs mr-2"></i>
                  Especialista em Dentistica Restauradora
                </p>
                <p className="text-[#ECE0C4] mb-2 flex items-center">
                  <i className="fas fa-certificate text-xs mr-2"></i>
                  Especialista em Harmonização Orofacial
                </p>
                <p className="text-[#ECE0C4] mb-2 flex items-center">
                  <i className="fas fa-certificate text-xs mr-2"></i>
                  Especialista em Cirurgias Estéticas da Face - MEC
                </p>
                <p className="text-[#ECE0C4] flex items-center">
                  <i className="fas fa-award text-xs mr-2"></i>
                  MESTRE em Odontologia - FOUSP
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="md:text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-[#ECE0C4]">Contato</h3>
              <div className="space-y-4">
                <div className="flex md:justify-center items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-map-marker-alt text-[#ECE0C4]"></i>
                  </div>
                  <p>Rua Cardoso de Almeida, 313, Conjunto 51</p>
                </div>
                <div className="flex md:justify-center items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-phone-alt text-[#ECE0C4]"></i>
                  </div>
                  <p>(11) 98977-3944</p>
                </div>
                <div className="flex md:justify-center items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-envelope text-[#ECE0C4]"></i>
                  </div>
                  <p>contato@drahof.com.br</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center md:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-6 text-[#ECE0C4]">Redes Sociais</h3>
              <div className="flex md:justify-end justify-center space-x-4">
                <motion.a 
                  href="https://instagram.com/drahof" 
                  className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                  aria-label="Instagram"
                  whileHover={{ 
                    scale: 1.15, 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transition: { duration: 0.3 } 
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    y: [0, -5, 0], 
                    transition: { 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2,
                      delay: 0
                    }
                  }}
                >
                  <i className="fab fa-instagram text-xl"></i>
                </motion.a>
                <motion.a 
                  href="https://wa.me/11989773944" 
                  className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                  aria-label="WhatsApp"
                  whileHover={{ 
                    scale: 1.15, 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transition: { duration: 0.3 } 
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    y: [0, -5, 0], 
                    transition: { 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2,
                      delay: 0.5
                    }
                  }}
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                  aria-label="Facebook"
                  whileHover={{ 
                    scale: 1.15, 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transition: { duration: 0.3 } 
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    y: [0, -5, 0], 
                    transition: { 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2,
                      delay: 1
                    }
                  }}
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </motion.a>
              </div>
              
              <div className="mt-8 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 inline-block">
                <p className="text-lg">Siga-nos: <span className="text-[#ECE0C4] font-medium">@drahof</span></p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <hr className="border-white/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Dra. Jana Guimarães. Todos os direitos reservados.</p>
          <p className="mt-3 md:mt-0 bg-white/10 py-2 px-4 rounded-full text-sm">CROSP: 165674 | Responsável Técnica: Dra. Jana Guimarães</p>
        </div>
      </div>
    </footer>
  );
}
