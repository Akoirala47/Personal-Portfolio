import logo from "../assets/aayushKoiralaLogo.png";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
            <img className='mx-4 w-16' src={logo} alt="logo"></img>
            </div>
            <div className="m-8 flex items-center justify-center gap-4 text-3xl">
                <FaLinkedinIn/>
                <FaGithub/>
                <FaInstagram/>
        </div>
  </nav>
  );
}

export default Navbar
