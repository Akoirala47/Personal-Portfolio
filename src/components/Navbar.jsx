import { useState } from 'react';
import logo from "../assets/aayushKoiralaLogo.png";
import { FaLinkedinIn, FaGithub, FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-4 w-16" src={logo} alt="logo" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-grow items-center justify-between mx-8">
        <ul className="flex space-x-6 text-xl">
          <li>
            <Link
              to="hero"
              smooth={true}
              duration={300}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth={true}
              duration={300}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="technologies"
              smooth={true}
              duration={300}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Technologies
            </Link>
          </li>
          <li>
            <Link
              to="resume"
              smooth={true}
              duration={300}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              to="experience"
              smooth={true}
              duration={300}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              to="projects"
              smooth={true}
              duration={300}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="sendMessage"
              smooth={true}
              duration={300}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="m-8 flex items-center justify-center gap-4 text-3xl">
          <a
            href="https://www.linkedin.com/in/aayush-koirala-aa3a46222/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-blue-700"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/aayushkoi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-gray-800"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/aayushkoi/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-pink-600"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center mx-4">
        <button onClick={toggleMenu} className="text-3xl">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-3/4 h-full bg-gray-800 text-white transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <ul className="flex flex-col items-center mt-16 space-y-6 text-xl">
          <li>
            <Link
              to="hero"
              smooth={true}
              duration={300}
              onClick={toggleMenu}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth={true}
              duration={300}
              onClick={toggleMenu}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="technologies"
              smooth={true}
              duration={300}
              onClick={toggleMenu}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Technologies
            </Link>
          </li>
          <li>
            <Link
              to="resume"
              smooth={true}
              duration={300}
              onClick={toggleMenu}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              to="experience"
              smooth={true}
              duration={300}
              onClick={toggleMenu}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              to="projects"
              smooth={true}
              duration={300}
              onClick={toggleMenu}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="sendMessage"
              smooth={true}
              duration={300}
              onClick={toggleMenu}
              className="transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex justify-center gap-4 text-3xl mt-6">
          <a
            href="https://www.linkedin.com/in/aayush-koirala-aa3a46222/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-blue-700"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/aayushkoi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-gray-800"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/aayushkoi/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-pink-600"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
