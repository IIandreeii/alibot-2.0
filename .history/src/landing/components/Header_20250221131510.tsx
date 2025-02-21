import React, { useState, useEffect } from 'react';
import imagen from '../..';
interface Props {
  isPage?: boolean;
}

export const Header = ({isPage = true}: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isPage === false) {
      return;
    }
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const offset = element.getBoundingClientRect().top + window.scrollY - 100; 
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }, 50); 
    }
  };

  return (
<div className={`w-full flex items-center fixed z-50 justify-between p-5 top-0 md:flex backdrop-filter backdrop-blur-lg ${isScrolled ? 'bg-black bg-opacity-10' : ''}`}>
      <div className="flex items-center">
        <a href="https://alibot.app/" onClick={() => scrollToSection('home')}>
          <img
            src={imagen}
            alt="Logo"
            className="h-14 w-auto"
          />
        </a>
      </div>
      <div className="flex w-full justify-between text-white max-md:justify-center max-md:w-1/2">
        <ul className="flex items-center gap-10 first:ml-20 max-md:ml-0 first:max-md:hidden">
          <li className="cursor-pointer">
            <a href="#faq" onClick={() => scrollToSection('faq')}>Preguntas frecuentes</a>
          </li>
          <li className="cursor-pointer">
            <a href="#plans" onClick={() => scrollToSection('plans')}>Precio</a>
          </li>
        </ul>

        <ul className="flex items-center gap-10">
          <li>
            <button className="text-white max-md:p-0 px-4 py-2 backdrop-filter backdrop-blur-lg bg-gradient-to-r from-purple-700 to-purple-700 rounded-lg">
              <a href='https://alibot.app/login' target='_blank'>Iniciar Sesión</a>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};