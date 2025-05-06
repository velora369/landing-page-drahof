import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOutStarted, setFadeOutStarted] = useState(false);
  
  // Duração total do preloader em milisegundos (4.5 segundos)
  const duration = 4500;
  // Intervalo para atualização da barra de progresso
  const updateInterval = 50;
  // Margem para tornar a animação de progresso mais realista
  const reservedProgress = 5; // 5% reservados para o "carregamento final"
  
  // Adiciona classe ao body para bloquear o scroll durante o preloader
  useEffect(() => {
    document.body.classList.add('preloader-active');
    
    // Remove a classe quando o componente for desmontado
    return () => {
      document.body.classList.remove('preloader-active');
    };
  }, []);
  
  useEffect(() => {
    // Garante que o progresso comece num ponto realista
    const startingProgress = 2;
    setProgress(startingProgress);
    
    // Cria um efeito de preenchimento gradual da barra de progresso
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Calcula o próximo valor de progresso
        // Limitamos a 100-reservedProgress para criar um efeito de "finalização"
        const target = 100 - reservedProgress;
        const remainingProgress = target - prevProgress;
        
        // Tornamos o preenchimento não linear (mais rápido no início, mais lento no fim)
        // para uma experiência mais realista
        const increment = Math.max(0.1, (remainingProgress * updateInterval / duration) * 2);
        const nextProgress = prevProgress + increment;
        
        if (nextProgress >= target) {
          clearInterval(interval);
          
          // Simula o "carregamento final" com um pequeno atraso
          setTimeout(() => {
            // Completar os últimos 5% reservados
            const finalInterval = setInterval(() => {
              setProgress(prev => {
                const finalIncrement = (100 - prev) / 5;
                const nextValue = prev + finalIncrement;
                
                if (nextValue >= 99.9) {
                  clearInterval(finalInterval);
                  
                  // Aguarda um momento após 100% para iniciar o fade-out
                  setTimeout(() => {
                    setFadeOutStarted(true);
                    
                    // Completa o preloader após animação de saída
                    setTimeout(() => {
                      setIsComplete(true);
                      if (onComplete) onComplete();
                    }, 800); // Duração da animação de saída
                  }, 300);
                  
                  return 100;
                }
                
                return nextValue;
              });
            }, 100);
          }, 200);
          
          return target;
        }
        
        return nextProgress;
      });
    }, updateInterval);
    
    // Limpa o interval quando o componente for desmontado
    return () => clearInterval(interval);
  }, [onComplete, duration]);
  
  // Status messages baseados no progresso
  const getStatusMessage = () => {
    if (progress < 30) return "Preparando experiência premium...";
    if (progress < 60) return "Carregando recursos exclusivos...";
    if (progress < 90) return "Quase pronto...";
    return "Bem-vindo(a)!";
  };
  
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{ backgroundColor: '#F9F5EB' }}
        >
          {/* Elementos decorativos de fundo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#731C13]/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-0" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#425F70]/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-1" />
            <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-[#ECE0C4]/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse-2" />
          </div>
          
          {/* Container principal com conteúdo animado */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col items-center max-w-md px-6 ${fadeOutStarted ? 'scale-95' : 'scale-100'} transition-transform duration-700`}
          >
            {/* Logo com animação de entrada suave */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
              }}
              className="mb-6 relative"
            >
              {/* Efeito de brilho sutil por trás do logo */}
              <motion.div 
                className="absolute inset-0 bg-white/30 rounded-full filter blur-2xl"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut" 
                }}
              />
              
              <img 
                src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/drahof-logo-vermelha.png" 
                alt="Dra. HOF Logo" 
                className="h-28 md:h-32 relative z-10"
              />
            </motion.div>
            
            {/* Nome da Dra com animação sofisticada */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="text-xl md:text-2xl font-medium mb-10 text-[#425F70] font-['Cormorant_Garamond'] tracking-wide"
            >
              Dra. Jana Hof
            </motion.h2>
            
            {/* Container da barra de progresso com animações refinadas */}
            <motion.div
              initial={{ opacity: 0, width: "80%" }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              className="w-full max-w-xs relative"
            >
              {/* Barra de progresso base estilizada */}
              <div className="h-[3px] w-full bg-[#ECE0C4] rounded-full overflow-hidden shadow-sm">
                {/* Preenchimento animado da barra com gradiente sutil */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#731C13]/90 to-[#731C13]"
                  style={{
                    boxShadow: '0 0 8px rgba(115, 28, 19, 0.3)'
                  }}
                />
              </div>
              
              {/* Marcador de porcentagem elegante */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
                className="absolute -right-2 top-4 text-xs text-[#425F70] font-light"
              >
                {Math.ceil(progress)}%
              </motion.div>
            </motion.div>
            
            {/* Texto de status dinâmico */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 1 }}
              className="mt-12 text-sm text-[#425F70] tracking-wide font-light text-center"
            >
              {getStatusMessage()}
            </motion.p>
          </motion.div>
          
          {/* Rodapé com assinatura sutil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-4 text-[10px] text-[#425F70]/60 font-light tracking-wider"
          >
            HARMONIZAÇÃO FACIAL AVANÇADA
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}