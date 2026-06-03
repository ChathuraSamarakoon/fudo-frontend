import { useEffect, useState } from 'react';
import productService from '../services/productService';
import { FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaCheck } from 'react-icons/fa'; 
import { useCart } from '../context/CartContext';

function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  
  const [addedId, setAddedId] = useState(null); 
  
  const { addToCart } = useCart(); 

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Burger', 'Pizza', 'Rice', 'Kottu', 'Combos'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (activeCategory === 'All') {
          data = await productService.getAllProducts();
        } else {
          data = await productService.getProductsByCategory(activeCategory);
        }
        setProducts(data);
      } catch (error) {
        console.error("Failed to load menu!", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [activeCategory]); 

  
  const handleAddToCart = (product) => {
    addToCart(product);     
    setAddedId(product.id);  
    
    
    setTimeout(() => {
      setAddedId(null);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-10 py-16">
      
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="bg-orange-100 text-fudo-red font-bold px-4 py-1.5 rounded-full w-max text-sm mb-4 mx-auto md:mx-0">
            OUR MENU
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Crave-Worthy Creations
          </h1>
          <p className="text-gray-600 max-w-2xl font-medium">
            Discover a world of vibrant flavors, carefully crafted to satisfy your deepest cravings.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeCategory === category 
                  ? 'bg-fudo-red text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-xl font-bold text-gray-500 py-20 animate-pulse">
          Loading delicious food... 🍕
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 py-20 font-medium">
          No items found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden flex flex-col relative group">
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm z-10">
                {product.category}
              </div>
              <div className="h-64 overflow-hidden relative bg-gray-50">
                <img 
                  src={product.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">{product.name}</h3>
                  <span className="text-xl font-extrabold text-fudo-red ml-4">
                    Rs.{product.price}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 font-medium flex-grow">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                    <FaStar />
                    <span className="text-gray-700 ml-1">4.8 (120)</span>
                  </div>
                  
                  
                  <button 
                    onClick={() => handleAddToCart(product)} 
                    
                    className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 shadow-md flex items-center gap-2 active:scale-95 ${
                      addedId === product.id 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-fudo-red text-white hover:bg-red-700'     
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <FaCheck size={18} className="animate-bounce" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingCart size={18} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;