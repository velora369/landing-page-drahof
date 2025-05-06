import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Refined toggle menu with animation
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

  // Enhanced sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "sobre", label: "Sobre", icon: "user-md" },
    { id: "procedimentos", label: "Procedimentos", icon: "magic" },
    { id: "depoimentos", label: "Depoimentos", icon: "comment-dots" },
    { id: "antes-depois", label: "Antes & Depois", icon: "images" },
    { id: "podcast", label: "Podcast", icon: "podcast", soon: true },
    { id: "contato", label: "Contato", icon: "envelope" }
  ];

  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    })
  };

  const hamburgerLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (line: number) => ({
      rotate: line === 1 ? 45 : line === 3 ? -45 : 0,
      y: line === 1 ? 6 : line === 3 ? -6 : 0,
      opacity: line === 2 ? 0 : 1,
      transition: { duration: 0.3 }
    })
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div 
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className="flex items-center group"
        >
          <div className="overflow-hidden relative rounded-lg">
            <motion.h1 
              className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-bold text-[#425F70] transition-colors duration-500 relative z-10 py-1"
              animate={{
                y: scrolled ? [0, -30, 0] : 0,
                transition: {
                  y: { duration: 0.3, times: [0, 0.5, 1] }
                }
              }}
              whileHover={{ scale: 1.03 }}
            >
              Dra. Jana Guimarães
              <div className="absolute h-0.5 bottom-0 left-0 w-0 group-hover:w-full bg-[#731C13] transition-all duration-500 rounded-full"></div>
            </motion.h1>
          </div>
        </motion.div>
        
        {/* Mobile menu hamburger button with advanced animation */}
        <button 
          onClick={toggleMenu}
          className="md:hidden focus:outline-none w-10 h-10 flex flex-col justify-center items-center rounded-xl transition-all duration-300 hover:bg-white/20 relative z-50"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            {[1, 2, 3].map((line) => (
              <motion.span
                key={line}
                className="absolute h-0.5 bg-[#425F70] rounded-full left-0 transform-gpu"
                style={{
                  width: line === 2 ? '75%' : '100%',
                  top: line === 1 ? '0' : line === 2 ? '50%' : '100%',
                  marginTop: line === 2 ? '-0.5px' : line === 3 ? '-1px' : '0',
                  y: line === 2 ? '-50%' : 0,
                }}
                custom={line}
                variants={hamburgerLineVariants}
                animate={isMenuOpen ? "open" : "closed"}
              />
            ))}
          </div>
        </button>
        
        {/* Desktop navigation with refined design and animations */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1 md:space-x-2">
            {navItems.map((item, i) => (
              <motion.li 
                key={item.id}
                custom={i}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                className="relative"
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`font-medium px-4 py-2 rounded-xl flex items-center transition-all duration-300 ${
                    item.soon 
                      ? 'text-gray-400 opacity-70' 
                      : 'text-[#425F70] hover:text-[#731C13]'
                  }`}
                >
                  <i className={`fas fa-${item.icon} text-sm mr-2 ${item.soon ? 'opacity-50' : ''}`}></i>
                  <span>{item.label}</span>
                  {item.soon && (
                    <span className="text-[10px] font-medium ml-1 bg-gray-200 px-1.5 py-0.5 rounded-full leading-none">
                      em breve
                    </span>
                  )}
                  
                  {/* Hover effect - underline animation */}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#731C13] scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded-full"></span>
                </button>
                
                {/* Hover indicator dot */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-[#731C13] -translate-x-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Mobile fullscreen menu with polished animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 pt-24 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col space-y-3">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.id}
                    variants={{
                      closed: { x: 50, opacity: 0 },
                      open: { x: 0, opacity: 1 }
                    }}
                    initial="closed"
                    animate="open"
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`font-medium w-full text-left px-5 py-4 rounded-xl flex items-center ${
                        item.soon 
                          ? 'text-gray-400 bg-gray-50' 
                          : 'text-[#425F70] bg-gray-50/50 hover:bg-[#731C13]/5'
                      } transition-all duration-300`}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center rounded-lg mr-4 ${
                        item.soon 
                          ? 'bg-gray-200/50 text-gray-400' 
                          : 'bg-[#425F70]/10 text-[#425F70]'
                      }`}>
                        <i className={`fas fa-${item.icon}`}></i>
                      </div>
                      <div>
                        <div className="flex items-center">
                          {item.label}
                          {item.soon && (
                            <span className="text-[10px] font-medium ml-2 bg-gray-200 px-1.5 py-0.5 rounded-full">
                              em breve
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
              
              {/* Social icons in mobile menu */}
              <motion.div 
                className="mt-10 flex justify-center space-x-4"
                variants={{
                  closed: { y: 20, opacity: 0 },
                  open: { y: 0, opacity: 1 }
                }}
                initial="closed"
                animate="open"
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a 
                  href="https://instagram.com/drahof" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-md"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="https://wa.me/5565996955300" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
