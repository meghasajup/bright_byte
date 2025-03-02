import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/bright_byte-removebg-preview.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Add a spacer div to prevent content from hiding behind the fixed navbar */}
      <div className={`h-20 w-full ${scrolled ? 'h-16' : 'h-24'}`}></div>
      
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0 transition-all duration-300 transform hover:scale-105">
              <Link to="/" className="flex items-center">
                <img 
                  className="h-28 w-auto transition-all duration-300" 
                  src={logo} 
                  alt="Logo"
                />
              </Link>
            </div>
            
            {/* Hamburger Menu Button */}
            <button
              type="button"
              className="inline-flex p-2 text-black rounded-md lg:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
                ></span>
              </div>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:ml-auto">
              <div className="flex items-center space-x-1">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Our Products', path: '/our-products' },
                  { name: 'Contact', path: '/contact' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-3 py-2 mx-2 text-base font-medium transition-all duration-300 ease-in-out group hover:text-blue-600 ${location.pathname === item.path ? 'text-blue-600' : 'text-black'}`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full ${location.pathname === item.path ? 'w-full' : 'w-0'}`}></span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-40 w-full h-full bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ top: '64px' }} // Fixed position starting below the navbar
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Our Products', path: '/our-products' },
              { name: 'Contact', path: '/contact' }
            ].map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-2xl font-medium transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-600 ${location.pathname === item.path ? 'text-blue-600' : 'text-black'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}