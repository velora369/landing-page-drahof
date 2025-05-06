import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5
      }}
    >
      {/* Pulsing effect */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45"></div>
        <span className="relative z-10 font-medium">Agendar consulta</span>
      </div>
      
      <motion.a
        href={WHATSAPP_URL}
        className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-xl border-2 border-white hover:shadow-green-500/30 hover:shadow-2xl transition-all duration-300"
        aria-label="Agendar no WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute inset-0 bg-white opacity-20 rounded-full blur-md"></div>
        <i className="fab fa-whatsapp text-white text-3xl relative z-10"></i>
      </motion.a>
    </motion.div>
  );
}
