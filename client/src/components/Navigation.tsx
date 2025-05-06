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

  // Toggle menu with animation
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Close menu when clicking outside or ESC key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === 'Escape') {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
    
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
  };

  // Enhanced sticky header effect with intelligent hide/show behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if scrolled past threshold
    if (latest > 100) {
      setScrolled(true);
      
      // Determine scroll direction
      const isScrollingDownNow = latest > lastScrollY.current;
      setIsScrollingDown(isScrollingDownNow);
      
      // Show full header when:
      // 1. Scrolling up
      // 2. At top of page
      // 3. Near bottom of page (to show navigation options)
      // 4. User stopped scrolling for a moment (implemented separately with debounce)
      setShowFullHeader(!isScrollingDownNow || latest < 150);
      
    } else {
      setScrolled(false);
      setShowFullHeader(true);
    }
    
    lastScrollY.current = latest;
  });
  
  // Debounced show header when user stops scrolling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScrollStop = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowFullHeader(true);
      }, 1500); // Show header after 1.5s of inactivity
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
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      } ${
        showFullHeader 
          ? "py-3 md:py-4" 
          : "py-2"
      } ${
        isScrollingDown && !showFullHeader
          ? "-translate-y-1/2 md:-translate-y-0"
          : "translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div 
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className={`flex items-center ${isScrollingDown && !showFullHeader ? 'scale-90' : ''} transition-transform duration-300`}
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
          className={`hidden md:block transition-all duration-500 ${
            showFullHeader 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
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
      
      {/* Mobile fullscreen menu with polished animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl p-6 pt-24 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button in mobile menu */}
              <motion.button
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#731C13]/5 text-[#731C13]"
                onClick={() => {
                  setIsMenuOpen(false);
                  document.body.style.overflow = '';
                }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(115, 28, 19, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Fechar menu"
              >
                <i className="fas fa-times"></i>
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8"
              >
                <img 
                  src="https://yungwizzeprod2.wordpress.com/wp-content/uploads/2025/04/drahof-logo-vermelha.png" 
                  alt="Logo Dra. HOF" 
                  className="h-14 mx-auto mb-2"
                />
              </motion.div>
              
              {/* Divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-16 h-0.5 bg-[#731C13]/20 mx-auto mb-8 origin-center"
              />
              
              <ul className="flex flex-col space-y-3">
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
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`font-medium w-full text-left px-5 py-4 rounded-xl flex items-center ${
                        item.soon 
                          ? 'text-gray-400 bg-gray-50 cursor-default' 
                          : 'text-[#425F70] bg-[#425F70]/5 hover:bg-[#731C13]/5 hover:text-[#731C13]'
                      } transition-all duration-300`}
                      disabled={item.soon}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 ${
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
                    </button>
                  </motion.li>
                ))}
              </ul>
              
              {/* Contact & Social icons */}
              <motion.div 
                className="mt-12 flex flex-col items-center"
                variants={{
                  closed: { y: 20, opacity: 0 },
                  open: { y: 0, opacity: 1 }
                }}
                initial="closed"
                animate="open"
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="text-sm text-gray-600 mb-4">Conecte-se com a Dra. HOF</p>
                <div className="flex justify-center space-x-4">
                  <motion.a 
                    href="https://instagram.com/drahof" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#731C13]/80 to-[#731C13] text-white shadow-lg"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="fab fa-instagram text-lg"></i>
                  </motion.a>
                  <motion.a 
                    href={WHATSAPP_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#425F70]/80 to-[#425F70] text-white shadow-lg"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="fab fa-whatsapp text-lg"></i>
                  </motion.a>
                </div>
                
                {/* Elegant curved divider */}
                <motion.div 
                  className="mt-10 w-full h-12 relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-16 w-[150%] -ml-[25%] bg-[#ECE0C4]/20 rounded-t-[50%]"></div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
