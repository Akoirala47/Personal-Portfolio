import logo from "../assets/aayushKoiralaLogo.png";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-4 w-16" src={logo} alt="logo" />
      </div>
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
    </nav>
  );
};

export default Navbar;

