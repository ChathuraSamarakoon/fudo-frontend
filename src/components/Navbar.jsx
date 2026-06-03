import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { useCart } from '../context/CartContext'; 

function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function එක
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUser(null);
    navigate('/'); 
    window.location.reload(); 
  };

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
        
        
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-bold text-gray-800 hidden md:block">
              Hi, {user.name.split(' ')[0]} 
            </span>
            <button 
              onClick={handleLogout} 
              title="Logout"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/login" title="Login" className="text-gray-600 hover:text-fudo-red transition-colors">
            <FiUser size={22} />
          </Link>
        )}
        
        
        <Link to="/cart" className="relative flex items-center gap-2 bg-fudo-red text-white px-5 py-2.5 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md">
          <FiShoppingCart size={18} />
          <span>Cart</span>
          
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-extrabold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;