import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

function Navbar() {
  return (
   
    <nav className="flex items-center justify-between px-10 py-5 bg-white shadow-sm sticky top-0 z-50">
      
      <Link to="/" className="text-3xl font-extrabold text-fudo-red tracking-tight">
        Fudo
      </Link>

      
      <div className="hidden md:flex gap-8 font-semibold text-gray-600">
        <Link to="/menu" className="hover:text-fudo-red transition-colors">Menu</Link>
        <Link to="/orders" className="hover:text-fudo-red transition-colors">Orders</Link>
        <Link to="/about" className="hover:text-fudo-red transition-colors">About Us</Link>
        <Link to="/contact" className="hover:text-fudo-red transition-colors">Contact</Link>
      </div>

      
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-fudo-red transition-colors">
          <FiSearch size={22} />
        </button>
        <button className="text-gray-600 hover:text-fudo-red transition-colors">
          <FiUser size={22} />
        </button>
        <Link to="/cart" className="flex items-center gap-2 bg-fudo-red text-white px-5 py-2.5 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md">
          <FiShoppingCart size={18} />
          <span>Cart</span>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;