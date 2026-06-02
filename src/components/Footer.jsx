import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookMessenger } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-10">
        
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          
          
          <div className="flex flex-col gap-4 pr-8">
            <Link to="/" className="text-2xl font-extrabold text-fudo-red">
              Fudo
            </Link>
            <p className="text-gray-600 font-medium text-sm leading-relaxed">
              Delivering premium culinary experiences to your door, one meal at a time.
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-fudo-red hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-fudo-red hover:text-white transition-colors">
                <FaFacebookMessenger size={18} />
              </a>
            </div>
          </div>

          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 text-lg">Company</h4>
            <Link to="/about" className="text-gray-600 hover:text-fudo-red text-sm font-medium transition-colors">About Us</Link>
            <Link to="/careers" className="text-gray-600 hover:text-fudo-red text-sm font-medium transition-colors">Careers</Link>
            <Link to="/partner" className="text-gray-600 hover:text-fudo-red text-sm font-medium transition-colors">Partner with Us</Link>
          </div>

          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 text-lg">Legal</h4>
            <Link to="/privacy" className="text-gray-600 hover:text-fudo-red text-sm font-medium transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-fudo-red text-sm font-medium transition-colors">Terms of Service</Link>
          </div>

          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 text-lg">Support</h4>
            <Link to="/help" className="text-gray-600 hover:text-fudo-red text-sm font-medium transition-colors">Help Center</Link>
            <Link to="/contact" className="text-gray-600 hover:text-fudo-red text-sm font-medium transition-colors">Contact Us</Link>
          </div>

        </div>

        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © 2026 Fudo Dining. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;