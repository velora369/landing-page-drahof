import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // Only attempt to scroll if we're on the homepage
    if (location === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Navigate to homepage with hash
      setLocation(`/#${sectionId}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "sobre", label: "Sobre" },
    { id: "procedimentos", label: "Procedimentos" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "antes-depois", label: "Antes & Depois" },
    { id: "blog", label: "Blog" },
    { id: "contato", label: "Contato" }
  ];

  return (
    <header 
      className={`bg-white fixed w-full top-0 z-40 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#425F70]">
            Dra. Jana Guimarães
          </h1>
        </div>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden text-[#425F70] focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
        </button>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="font-medium text-[#425F70] hover:text-[#731C13] transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <ul className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="font-medium text-[#425F70] hover:text-[#731C13] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
