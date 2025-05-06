import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Toggle menu with animation - Enhanced for mobile
  const toggleMenu = () => {
    const newIsMenuOpen = !isMenuOpen;
    setIsMenuOpen(newIsMenuOpen);
    
    // Prevent body scroll and add additional safeguards when menu is open
    if (newIsMenuOpen) {
      // Lock scroll on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
  };

  // Helper function to reset body styles when closing the menu
  const resetBodyStyles = () => {
    // Capture current scroll position from body top style if exists
    const scrollY = document.body.style.top;
    
    // Clear all applied styles
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    
    // Restore scroll position
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }
  
  // Close menu when clicking outside or ESC key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        resetBodyStyles();
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === 'Escape') {
        setIsMenuOpen(false);
        resetBodyStyles();
      }
    };

    // Close menu if browser is resized to desktop size while mobile menu is open
    const handleResize = () => {
      if (isMenuOpen && window.innerWidth >= 768) { // md breakpoint is 768px
        setIsMenuOpen(false);
        resetBodyStyles();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('resize', handleResize);
      resetBodyStyles(); // Safety cleanup on unmount
    };
  }, [isMenuOpen]);

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    resetBodyStyles();
    
    // Small delay to allow menu closing animation to complete
    setTimeout(() => {
      // Only attempt to scroll if we're on the homepage
      if (location === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        // Navigate to homepage with hash
        setLocation(`/#${sectionId}`);
      }
    }, 100);
  };

  // Enhanced sticky header effect with intelligent hide/show behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Initial scroll check - past the threshold where header becomes sticky
    const scrollThreshold = 80;
    const isScrolledPastThreshold = latest > scrollThreshold;
    
    // Set the scrolled state for styling the sticky header
    setScrolled(isScrolledPastThreshold);
    
    // Determine scroll direction by comparing current and last scroll position
    // Using a threshold to prevent triggering on tiny movements
    const scrollDifference = latest - lastScrollY.current;
    const isScrollingDownNow = scrollDifference > 5; 
    const isScrollingUpNow = scrollDifference < -5;
    
    // Update the scrolling direction state
    setIsScrollingDown(isScrollingDownNow);
    
    // Close mobile menu when scrolling significantly in any direction
    if (isMenuOpen && Math.abs(scrollDifference) > 30) {
      setIsMenuOpen(false);
      resetBodyStyles();
    }
    
    // Control header menu visibility logic
    if (isScrolledPastThreshold) {
      // When actively scrolling down, hide menu items
      if (isScrollingDownNow) {
        setShowFullHeader(false);
      } 
      // When scrolling up, show menu items
      else if (isScrollingUpNow) {
        setShowFullHeader(true);
      }
      // At the very top of the page, always show full header
      else if (latest < 120) {
        setShowFullHeader(true);
      }
    } else {
      // When at the top of the page, always show full header
      setShowFullHeader(true);
    }
    
    // Update the reference to the last scroll position
    lastScrollY.current = latest;
  });
  
  // Debounced show header when user stops scrolling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScrollStop = () => {
      clearTimeout(timeoutId);
      
      // Show full header after user stops scrolling for a moment
      timeoutId = setTimeout(() => {
        setShowFullHeader(true);
      }, 1000); // Reduced to 1s for better responsiveness
    };
    
    window.addEventListener('scroll', handleScrollStop);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScrollStop);
    };
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
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const navContainerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Easing mais suave para movimento fluido
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const navItemVariants = {
    hidden: { 
      opacity: 0, 
      y: -12,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1] // Easing suave para saída
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] // Easing suave para entrada
      }
    }
  };

  const hamburgerLineVariants = {
    closed: (line: number) => ({
      rotate: 0, 
      y: 0, 
      width: line === 2 ? '75%' : '100%',
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }),
    open: (line: number) => ({
      rotate: line === 1 ? 45 : line === 3 ? -45 : 0,
      y: line === 1 ? 6 : line === 3 ? -6 : 0,
      width: '100%',
      opacity: line === 2 ? 0 : 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    })
  };

  // Adiciona uma animação suave para mostrar/esconder os itens do menu
  const navAnimationVariants = {
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    hidden: { 
      opacity: 0, 
      y: -8,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? "backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      } ${
        showFullHeader 
          ? "py-3 md:py-4" 
          : "py-2"
      }`}
      style={{
        backgroundImage: scrolled 
          ? 'linear-gradient(to bottom, rgba(255,255,255,0.97), rgba(255,255,255,0.93))' 
          : 'none',
        transition: 'background-image 0.4s ease-in-out, padding 0.4s ease-in-out, box-shadow 0.4s ease-in-out, transform 0.4s ease-in-out',
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        {/* Logo with animation */}
        <motion.div 
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className={`flex items-center ${isScrollingDown && !showFullHeader ? 'scale-95' : ''} transition-all duration-300`}
        >
          <a href="/" className="outline-none focus:ring-2 focus:ring-[#731C13]/40 rounded-lg">
            <motion.img 
              src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/drahof-logo-vermelha.png" 
              alt="Logo Dra. HOF" 
              className={`h-14 md:h-16 transition-all duration-300 ${
                scrolled && !showFullHeader ? "h-12 md:h-14" : ""
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            />
          </a>
        </motion.div>
        
        {/* Mobile menu hamburger button with advanced animation */}
        <motion.button 
          onClick={toggleMenu}
          className="md:hidden focus:outline-none w-11 h-11 flex flex-col justify-center items-center rounded-full transition-all duration-300 hover:bg-[#731C13]/5 relative z-50"
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="relative w-6 h-6">
            {[1, 2, 3].map((line) => (
              <motion.span
                key={line}
                className="absolute h-0.5 bg-[#731C13] rounded-full left-0 transform-gpu"
                style={{
                  top: line === 1 ? '0' : line === 2 ? '50%' : '100%',
                  marginTop: line === 2 ? '-0.5px' : line === 3 ? '-1px' : '0',
                  y: line === 2 ? '-50%' : 0,
                }}
                custom={line}
                variants={hamburgerLineVariants}
                initial="closed"
                animate={isMenuOpen ? "open" : "closed"}
              />
            ))}
          </div>
        </motion.button>
        
        {/* Desktop navigation with refined design and animations */}
        <motion.nav 
          className={`hidden md:block absolute right-4`}
          variants={navContainerVariants}
          initial="hidden"
          animate={showFullHeader ? "visible" : "hidden"}
          style={{
            position: 'relative', // Garante que as animações sejam precisas
          }}
        >
          <ul className="flex items-center space-x-1.5 lg:space-x-3">
            {navItems.map((item) => (
              <motion.li 
                key={item.id}
                variants={navItemVariants}
                className="relative group"
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`font-medium px-4 py-2.5 rounded-full flex items-center transition-all duration-300 ${
                    item.soon 
                      ? 'text-gray-400 opacity-70 cursor-default' 
                      : 'text-[#425F70] hover:text-[#731C13]'
                  }`}
                  disabled={item.soon}
                  aria-label={item.label}
                >
                  <span>{item.label}</span>
                  {item.soon && (
                    <span className="text-[10px] font-medium ml-1.5 bg-gray-200 px-1.5 py-0.5 rounded-full leading-none">
                      em breve
                    </span>
                  )}
                  
                  {/* Advanced underline animation (from center) */}
                  {!item.soon && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#731C13] rounded-full group-hover:w-4/5 transition-all duration-300"></span>
                  )}
                </button>
                
                {/* Hover effect - subtle glow */}
                {!item.soon && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#731C13]/0 pointer-events-none"
                    initial={false}
                    whileHover={{ 
                      backgroundColor: "rgba(115, 28, 19, 0.05)", 
                      boxShadow: "0 0 12px 0 rgba(115, 28, 19, 0.1)" 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      </div>
      
      {/* Mobile fullscreen menu with polished animations - Fixed for proper mobile display */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm md:hidden"
            style={{ touchAction: 'none' }} // Prevent touch events from affecting page
            onClick={() => {
              setIsMenuOpen(false);
              resetBodyStyles();
            }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl p-6 pt-20 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                maxHeight: '100vh',
                overscrollBehavior: 'contain' // Prevent scroll chaining
              }}
            >
              {/* Close button in mobile menu - now more prominent */}
              <motion.button
                className="fixed top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#731C13]/10 text-[#731C13] shadow-md z-10"
                onClick={() => {
                  setIsMenuOpen(false);
                  resetBodyStyles();
                }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(115, 28, 19, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Fechar menu"
              >
                <i className="fas fa-times"></i>
              </motion.button>
              
              {/* Logo at top of mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-6"
              >
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/drahof-logo-vermelha.png" 
                  alt="Logo Dra. HOF" 
                  className="h-12 mx-auto"
                />
              </motion.div>
              
              {/* Divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-16 h-0.5 bg-[#731C13]/20 mx-auto mb-6 origin-center"
              />
              
              {/* Navigation links */}
              <div className="max-h-[60vh] overflow-y-auto pb-4 px-1 -mx-1"> 
                <ul className="flex flex-col space-y-2">
                  {navItems.map((item, i) => (
                    <motion.li 
                      key={item.id}
                      variants={{
                        closed: { x: 20, opacity: 0 },
                        open: { x: 0, opacity: 1 }
                      }}
                      initial="closed"
                      animate="open"
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    >
                      <motion.button
                        onClick={() => handleNavClick(item.id)}
                        className={`font-medium w-full text-left px-4 py-3 rounded-xl flex items-center ${
                          item.soon 
                            ? 'text-gray-400 bg-gray-50 cursor-default' 
                            : 'text-[#425F70] bg-[#425F70]/5 hover:bg-[#731C13]/5 hover:text-[#731C13]'
                        } transition-all duration-300`}
                        disabled={item.soon}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-9 h-9 flex items-center justify-center rounded-full mr-3 ${
                          item.soon 
                            ? 'bg-gray-200/50 text-gray-400' 
                            : 'bg-[#731C13]/10 text-[#731C13]'
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
                        
                        {/* Animated arrow indicator for active items */}
                        {!item.soon && (
                          <motion.div 
                            className="ml-auto text-[#731C13]"
                            initial={{ opacity: 0, x: -5 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <i className="fas fa-chevron-right text-xs"></i>
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Contact & Social icons */}
              <motion.div 
                className="mt-6 flex flex-col items-center"
                variants={{
                  closed: { y: 20, opacity: 0 },
                  open: { y: 0, opacity: 1 }
                }}
                initial="closed"
                animate="open"
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="text-sm text-gray-600 mb-3">Conecte-se com a Dra. HOF</p>
                <div className="flex justify-center space-x-4">
                  <motion.a 
                    href="https://instagram.com/drahof" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-[#731C13]/80 to-[#731C13] text-white shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="fab fa-instagram text-lg"></i>
                  </motion.a>
                  <motion.a 
                    href={WHATSAPP_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-[#425F70]/80 to-[#425F70] text-white shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="fab fa-whatsapp text-lg"></i>
                  </motion.a>
                </div>
                
                {/* Simpler footer decoration */}
                <div className="mt-8 w-full h-1 bg-gradient-to-r from-transparent via-[#731C13]/10 to-transparent" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
