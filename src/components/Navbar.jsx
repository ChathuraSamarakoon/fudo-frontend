import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// FiMenu සහ FiX අලුතින් import කළා
import { FiSearch, FiUser, FiShoppingCart, FiLogOut, FiBox, FiClipboard, FiMail, FiUsers, FiMenu, FiX } from 'react-icons/fi'; 
import { useCart } from '../context/CartContext'; 

function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  // Mobile Menu එක ඕපන් ද නැද්ද කියලා බලාගන්න අලුත් State එකක්
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUser(null);
    setIsMobileMenuOpen(false); // Logout වෙද්දී Menu එක වහන්න
    navigate('/'); 
    window.location.reload(); 
  };

  // ලින්ක් එකක් ක්ලික් කරාම Mobile Menu එක ඔටෝ වැහෙන්න Function එකක්
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-white shadow-sm sticky top-0 z-50">
      
      <Link to={isAdmin ? "/admin" : "/"} className="text-3xl font-extrabold text-fudo-red tracking-tight" onClick={closeMobileMenu}>
        Fudo {isAdmin && <span className="text-sm text-gray-400 font-medium ml-1">Admin</span>}
      </Link>

      
      <div className="hidden md:flex gap-8 font-semibold text-gray-600 items-center">
        {isAdmin ? (
          <>
            <Link to="/admin" state={{ tab: 'orders' }} className="hover:text-fudo-red transition-colors flex items-center gap-2">
              <FiClipboard /> Orders
            </Link>
            <Link to="/admin" state={{ tab: 'products' }} className="hover:text-fudo-red transition-colors flex items-center gap-2">
              <FiBox /> Products
            </Link>
            <Link to="/admin" state={{ tab: 'messages' }} className="hover:text-fudo-red transition-colors flex items-center gap-2">
              <FiMail /> Messages
            </Link>
            <Link to="/admin" state={{ tab: 'users' }} className="hover:text-fudo-red transition-colors flex items-center gap-2">
              <FiUsers /> Users
            </Link>
            <Link to="/menu" className="text-sm font-bold text-gray-400 hover:text-gray-600 ml-4 border-l pl-4 border-gray-200 transition-colors">
              View Store
            </Link>
          </>
        ) : (
          <>
            <Link to="/menu" className="hover:text-fudo-red transition-colors">Menu</Link>
            <Link to="/orders" className="hover:text-fudo-red transition-colors">My Orders</Link>
            <Link to="/about" className="hover:text-fudo-red transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-fudo-red transition-colors">Contact</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        
        {!isAdmin && (
          <button className="text-gray-600 hover:text-fudo-red transition-colors">
            <FiSearch size={22} />
          </button>
        )}
        
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
        
        {!isAdmin && (
          <Link to="/cart" className="relative flex items-center gap-2 bg-fudo-red text-white px-4 md:px-5 py-2.5 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md">
            <FiShoppingCart size={18} />
            <span className="hidden sm:block">Cart</span>
            
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-extrabold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
        )}

        
        <button 
          className="md:hidden text-gray-800 hover:text-fudo-red transition-colors ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col py-4 px-6 md:hidden border-t border-gray-100 animate-fade-in">
          {isAdmin ? (
            <>
              <Link to="/admin" state={{ tab: 'orders' }} onClick={closeMobileMenu} className="py-3 border-b border-gray-100 font-semibold text-gray-700 hover:text-fudo-red flex items-center gap-3">
                <FiClipboard /> Orders
              </Link>
              <Link to="/admin" state={{ tab: 'products' }} onClick={closeMobileMenu} className="py-3 border-b border-gray-100 font-semibold text-gray-700 hover:text-fudo-red flex items-center gap-3">
                <FiBox /> Products
              </Link>
              <Link to="/admin" state={{ tab: 'messages' }} onClick={closeMobileMenu} className="py-3 border-b border-gray-100 font-semibold text-gray-700 hover:text-fudo-red flex items-center gap-3">
                <FiMail /> Messages
              </Link>
              <Link to="/admin" state={{ tab: 'users' }} onClick={closeMobileMenu} className="py-3 border-b border-gray-100 font-semibold text-gray-700 hover:text-fudo-red flex items-center gap-3">
                <FiUsers /> Users
              </Link>
              <Link to="/menu" onClick={closeMobileMenu} className="py-3 font-bold text-gray-400 hover:text-gray-600">
                View Store
              </Link>
            </>
          ) : (
            <>
              <Link to="/menu" onClick={closeMobileMenu} className="py-3 border-b border-gray-100 font-semibold text-gray-700 hover:text-fudo-red">Menu</Link>
              <Link to="/orders" onClick={closeMobileMenu} className="py-3 border-b border-gray-100 font-semibold text-gray-700 hover:text-fudo-red">My Orders</Link>
              <Link to="/about" onClick={closeMobileMenu} className="py-3 border-b border-gray-100 font-semibold text-gray-700 hover:text-fudo-red">About Us</Link>
              <Link to="/contact" onClick={closeMobileMenu} className="py-3 font-semibold text-gray-700 hover:text-fudo-red">Contact</Link>
            </>
          )}
        </div>
      )}

    </nav>
  );
}

export default Navbar;