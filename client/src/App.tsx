import { useState, useEffect } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Preloader from "@/components/Preloader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // Controla a exibição do conteúdo principal
  useEffect(() => {
    // Simula o carregamento inicial dos recursos
    const loadContent = () => {
      // Aqui você pode adicionar lógica para verificar se todos os recursos 
      // (imagens, fontes, etc.) foram carregados antes de ocultar o preloader
      setContentLoaded(true);
    };
    
    // Inicia o carregamento do conteúdo
    loadContent();
    
    // Verifica se o usuário já visitou o site antes nesta sessão
    const hasVisitedBefore = sessionStorage.getItem('visited');
    if (hasVisitedBefore) {
      // Se já visitou, não mostra o preloader
      setShowPreloader(false);
    } else {
      // Marca como visitado para futuras navegações na mesma sessão
      sessionStorage.setItem('visited', 'true');
    }
  }, []);
  
  // Função chamada quando o preloader termina
  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };
  
  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* O conteúdo principal só fica visível quando o preloader não está mais sendo exibido */}
      <div className={`transition-opacity duration-500 ${!showPreloader ? 'opacity-100' : 'opacity-0'}`}>
        <Router />
      </div>
      
      <Toaster />
    </>
  );
}

export default App;
