import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";

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

          <nav>
            <h6 className="footer-title">Contact Details</h6>
            <p className="flex items-center gap-2 mt-2">
              <Mail size={18} />
              <a href="mailto:info@cheflokal.com" className="link link-hover">
                info@cheflokal.com
              </a>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <Phone size={18} />
              <a href="tel:+880123456789" className="link link-hover">
                +880 123 456 789
              </a>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <MapPin size={18} />
              <span>Chattogram, Bangladesh</span>
            </p>
          </nav>

          <nav>
            <h6 className="footer-title">Working Hours</h6>
            <p className="mt-2">Monday - Friday</p>
            <p className="font-semibold">10:00 AM - 10:00 PM</p>
            <p className="mt-2">Saturday - Sunday</p>
            <p className="font-semibold">11:00 AM - 11:00 PM</p>
          </nav>

          <nav>
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
