import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-base-200 text-base-content">
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <aside>
            <img className="w-32" src="/logo.png" alt="Chef Lokal Logo" />
            <p className="mt-2">
              Chef Lokal
              <br />
              Providing Best Service of Food
            </p>
          </aside>

          {/* Quick Links */}
          <nav>
            <h6 className="footer-title">Quick Links</h6>
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/" className="link link-hover">
                Home
              </Link>
              <Link to="/meals" className="link link-hover">
                Meals
              </Link>
              <Link to="/about" className="link link-hover">
                About Us
              </Link>
              <Link to="/contact" className="link link-hover">
                Contact
              </Link>
            </div>
          </nav>

          <nav>
            <h6 className="footer-title">Contact Details</h6>
            <p className="flex items-center gap-2 mt-2">
              <Mail size={18} />
              <a
                href="mailto:contact@cheflokal.com"
                className="link link-hover"
              >
                contact@cheflokal.com
              </a>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <Phone size={18} />
              <a href="tel:+8801234567890" className="link link-hover">
                +880 1234 567 890
              </a>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <MapPin size={18} />
              <span>Gulshan-1, Dhaka, Bangladesh</span>
            </p>
          </nav>

          <nav>
            <h6 className="footer-title">Working Hours</h6>
            <p className="mt-2">Monday - Friday</p>
            <p className="font-semibold">10:00 AM - 10:00 PM</p>
            <p className="mt-2">Saturday - Sunday</p>
            <p className="font-semibold">11:00 AM - 11:00 PM</p>

            <div className="mt-4">
              <h6 className="footer-title">Social Media</h6>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://github.com/TusharChow20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/tusharchowdhury20211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://tushar-chowdhury-protfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary transition-colors"
                  aria-label="Portfolio"
                >
                  <Globe size={24} />
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="border-t border-base-300 py-4 px-10 text-center">
          <p>© {new Date().getFullYear()} Chef Lokal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
