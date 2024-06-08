import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom';

export const Footer = () => {

  const navigate = useNavigate();
  return (
    <footer className="bg-green-500 text-white py-16">
      <div className="container mx-auto text-center px-4 sm:px-0">
      <p className="text-sm uppercase mb-4">Empower for a greener future</p>
      <h2 className="text-3xl font-bold mb-4">Learn More About Our Initiatives</h2>
      <p className="mb-8">Prakarsa Hijau is a dedicated organization focused on promoting and developing sustainable environmental practices.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <button className="bg-white text-green-500 font-bold py-2 px-8 rounded-full">
            Contact Us
          </button>
          <button className="bg-white text-green-500 font-bold py-2 px-8 rounded-full" onClick={() => navigate('/about')}>
            About Us
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-8 mb-8">
          <div className="mb-8 sm:mb-0 sm:mr-8">
            <img src="/assets/PrakarsaHijauLogo_prev_ui 1.png" alt="Lift Media Logo" className="w-16" />
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/team" className="hover:underline">Team</a>
            <a href="/case-studies" className="hover:underline">Case Studies</a>
            <a href="/publications" className="hover:underline">Publications</a>
          </div>
          <div className="flex space-x-4 mt-8 sm:mt-0 sm:ml-10">
            <a href="https://www.linkedin.com" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://www.facebook.com" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://www.instagram.com" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://www.youtube.com" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>
          </div>
        </div>
        <p className="text-sm">&copy; 2024 Prakarsa Hijau, LLC</p>
      </div>
    </footer>
  );
};