import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOutStarted, setFadeOutStarted] = useState(false);
  
  // Duração total do preloader em milisegundos (2 segundos exatos)
  const duration = 2000;
  // Intervalo para atualização da barra de progresso
  const updateInterval = 25;
  // Margem para tornar a animação de progresso mais realista
  const reservedProgress = 2; // 2% reservados para o "carregamento final"
  
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
    const startingProgress = 5;
    setProgress(startingProgress);
    
    // Cria um efeito de preenchimento gradual da barra de progresso
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Calcula o próximo valor de progresso
        const target = 100 - reservedProgress;
        const remainingProgress = target - prevProgress;
        
        // Calcula o incremento para garantir que termine em exatamente 2 segundos
        const increment = Math.max(0.2, (remainingProgress * updateInterval / duration) * 2.5);
        const nextProgress = prevProgress + increment;
        
        if (nextProgress >= target) {
          clearInterval(interval);
          
          // Completa os últimos 2% rapidamente
          setTimeout(() => {
            const finalInterval = setInterval(() => {
              setProgress(prev => {
                const finalIncrement = (100 - prev) / 3;
                const nextValue = prev + finalIncrement;
                
                if (nextValue >= 99.9) {
                  clearInterval(finalInterval);
                  
                  // Inicia o fade-out imediatamente após completar 100%
                  setFadeOutStarted(true);
                  
                  // Completa o preloader após animação de saída
                  setTimeout(() => {
                    setIsComplete(true);
                    if (onComplete) onComplete();
                  }, 400); // Duração reduzida da animação de saída
                  
                  return 100;
                }
                
                return nextValue;
              });
            }, 50);
          }, 50);
          
          return target;
        }
        
        return nextProgress;
      });
    }, updateInterval);
    
    // Limpa o interval quando o componente for desmontado
    return () => clearInterval(interval);
  }, [onComplete, duration]);
  
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{ backgroundColor: '#F9F5EB' }}
        >
          {/* Elementos decorativos de fundo - simplificados */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#731C13]/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-0" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#425F70]/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-1" />
          </div>
          
          {/* Container principal com conteúdo animado */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center max-w-md px-6 ${fadeOutStarted ? 'scale-95' : 'scale-100'} transition-transform duration-300`}
          >
            {/* Logo com animação de entrada suave */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
              }}
              className="mb-10 relative"
            >
              {/* Efeito de brilho sutil por trás do logo */}
              <motion.div 
                className="absolute inset-0 bg-white/30 rounded-full filter blur-2xl"
                animate={{ 
                  opacity: [0.2, 0.3, 0.2],
                  scale: [0.9, 1.05, 0.9],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut" 
                }}
              />
              
              <img 
                src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/drahof-logo-vermelha.png" 
                alt="Dra. HOF Logo" 
                className="h-28 md:h-32 relative z-10"
              />
            </motion.div>
            
            {/* Container da barra de progresso com animações refinadas */}
            <motion.div
              initial={{ opacity: 0, width: "60%" }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="w-full max-w-[150px] relative"
            >
              {/* Barra de progresso base estilizada */}
              <div className="h-[2px] w-full bg-[#ECE0C4] rounded-full overflow-hidden shadow-sm">
                {/* Preenchimento animado da barra com gradiente sutil */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#731C13]/90 to-[#731C13]"
                  style={{
                    boxShadow: '0 0 6px rgba(115, 28, 19, 0.25)'
                  }}
                />
              </div>
              
              {/* Marcador de porcentagem elegante */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
                className="absolute -right-2 top-3.5 text-[10px] text-[#425F70] font-light"
              >
                {Math.ceil(progress)}%
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}