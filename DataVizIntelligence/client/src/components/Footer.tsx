import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#425F70] text-white py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">Dra. Jana Guimarães</h3>
            <p className="text-[#ECE0C4]">Especialista em Dentistica Restauradora</p>
            <p className="text-[#ECE0C4]">Especialista em Harmonização Orofacial</p>
            <p className="text-[#ECE0C4]">Especialista em Cirurgias Estéticas da Face - MEC</p>
            <p className="text-[#ECE0C4]">MESTRE em Odontologia - FOUSP</p>
          </div>
          
          <div className="flex space-x-4">
            <motion.a 
              href="https://instagram.com/drahof" 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
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
              <i className="fab fa-instagram"></i>
            </motion.a>
            <motion.a 
              href="https://wa.me/5565996955300" 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
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
              <i className="fab fa-whatsapp"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
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
              <i className="fab fa-facebook-f"></i>
            </motion.a>
          </div>
        </div>
        
        <hr className="border-white border-opacity-20 my-6" />
        
        <div className="text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Dra. Jana Guimarães. Todos os direitos reservados.</p>
          <p className="mt-2">CROSP: 165674 | Responsável Técnica: Dra. Jana Guimarães</p>
        </div>
      </div>
    </footer>
  );
}
