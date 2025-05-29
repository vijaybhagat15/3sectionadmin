import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="min-h-80 border-t border-color bg-surface">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Your App</h3>
            <p className="text-text-secondary mb-4">
              Making the world a better place through innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-primary">
                <Github size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary">
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-color">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-secondary">
              © {new Date().getFullYear()} Your App. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <select
                className="bg-surface border border-color rounded-md px-3 py-1 text-text-secondary"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
              <select
                className="bg-surface border border-color rounded-md px-3 py-1 text-text-secondary"
                defaultValue="usd"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}