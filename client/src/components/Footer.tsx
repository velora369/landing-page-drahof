export default function Footer() {
  return (
    <footer className="bg-[#425F70] text-white py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">Dra. Jana Guimarães</h3>
            <p className="text-[#ECE0C4]">Especialista em Harmonização Orofacial</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://instagram.com/drahof" 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="https://wa.me/5565996955300" 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
        
        <hr className="border-white border-opacity-20 my-6" />
        
        <div className="text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Dra. Jana Guimarães. Todos os direitos reservados.</p>
          <p className="mt-2">CRO-XX 12345 | Responsável Técnica: Dra. Jana Guimarães</p>
        </div>
      </div>
    </footer>
  );
}
