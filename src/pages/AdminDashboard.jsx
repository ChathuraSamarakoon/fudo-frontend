import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { FaSpinner, FaPlus, FaTrash, FaCheckCircle, FaEnvelopeOpenText } from 'react-icons/fa';
import orderService from '../services/orderService';
import productService from '../services/productService'; 
import messageService from '../services/messageService'; 

function AdminDashboard() {
  const location = useLocation(); 
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'orders'); 

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: 'Burgers', description: '', imageUrl: '', isAvailable: true 
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchMessages(); 
  }, []);

  
  const fetchOrders = async () => {
    try { setLoadingOrders(true); const data = await orderService.getAllOrders(); setOrders(data.reverse()); }
    catch (error) { console.error(error); } finally { setLoadingOrders(false); }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try { await orderService.updateOrderStatus(orderId, newStatus); setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)); }
    catch (error) { alert("Status update failed!"); }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const fetchProducts = async () => {
    try { setLoadingProducts(true); const data = await productService.getAllProducts(); setProducts(data.reverse()); }
    catch (error) { console.error(error); } finally { setLoadingProducts(false); }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const productToSave = { ...newProduct, price: parseFloat(newProduct.price) };
      const addedProduct = await productService.addProduct(productToSave);
      setProducts([addedProduct, ...products]); 
      setNewProduct({ name: '', price: '', category: 'Burgers', description: '', imageUrl: '', isAvailable: true });
      alert("Product added successfully! 🎉");
    } catch (error) { alert("Failed to add product."); } finally { setIsSubmitting(false); }
  };

  const handleDeleteProduct = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      try { await productService.deleteProduct(id); setProducts(products.filter(p => p.id !== id)); }
      catch (error) { alert("Failed to delete product."); }
    }
  };

  
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await messageService.getAllMessages();
      setMessages(data.reverse()); 
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await messageService.markAsRead(id);
      setMessages(messages.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDeleteMessage = async (id) => {
    if(window.confirm("Are you sure you want to delete this message?")) {
      try {
        await messageService.deleteMessage(id);
        setMessages(messages.filter(msg => msg.id !== id));
      } catch (error) {
        alert("Failed to delete message.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'products' && 'Product Management'}
              {activeTab === 'messages' && 'Customer Messages'}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === 'orders' && 'Manage your customer orders'}
              {activeTab === 'products' && 'Manage your restaurant menu items'}
              {activeTab === 'messages' && 'View and manage inquiries from customers'}
            </p>
          </div>
        </div>

       
        {activeTab === 'orders' && (
          <div>
            {loadingOrders ? (
              <div className="flex justify-center items-center py-20"><FaSpinner className="animate-spin text-4xl text-fudo-red" /></div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-5 font-bold text-gray-600">Order ID</th>
                        <th className="p-5 font-bold text-gray-600">Date & Time</th>
                        <th className="p-5 font-bold text-gray-600">Total</th>
                        <th className="p-5 font-bold text-gray-600">Payment</th>
                        <th className="p-5 font-bold text-gray-600">Status</th>
                        <th className="p-5 font-bold text-gray-600">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr><td colSpan="6" className="p-10 text-center text-gray-500">No orders found.</td></tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="p-5 font-bold text-gray-900">#{order.id}</td>
                            <td className="p-5 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                            <td className="p-5 font-extrabold text-gray-900">Rs. {order.totalPrice.toFixed(2)}</td>
                            <td className="p-5"><span className="uppercase text-xs font-bold text-gray-500">{order.paymentMethod}</span></td>
                            <td className="p-5"><span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>{order.status}</span></td>
                            <td className="p-5">
                              <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-fudo-red focus:border-fudo-red block w-full p-2">
                                <option value="PENDING">Pending</option>
                                <option value="PREPARING">Preparing</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        
        {activeTab === 'products' && (
          <div className="flex flex-col lg:flex-row gap-8">
             
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                    <input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-fudo-red" placeholder="e.g. Spicy Chicken Burger" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (Rs.)</label>
                    <input type="number" required min="0" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-fudo-red" placeholder="e.g. 1500.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-fudo-red">
                      <option value="Burgers">Burgers</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Combos">Combos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                    <input type="url" value={newProduct.imageUrl} onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-fudo-red" placeholder="https://example.com/image.jpg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description (Optional)</label>
                    <textarea rows="2" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-fudo-red" placeholder="Brief details..."></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-fudo-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex justify-center items-center gap-2 mt-2">
                    {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaPlus />} {isSubmitting ? 'Adding...' : 'Add Product'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Menu Items ({products.length})</h2>
                {loadingProducts ? (
                  <div className="flex justify-center items-center py-20"><FaSpinner className="animate-spin text-4xl text-fudo-red" /></div>
                ) : products.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">No products found in the menu.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex gap-4 items-center p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                        <img src={product.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"} alt={product.name} className="w-20 h-20 object-cover rounded-xl" />
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{product.name}</h4>
                          <span className="text-xs font-bold text-fudo-red bg-red-50 px-2 py-0.5 rounded-md mt-1 inline-block">{product.category}</span>
                          <p className="font-extrabold text-gray-900 mt-1">Rs. {product.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-400 hover:text-red-500 p-2 bg-gray-50 rounded-lg transition-colors" title="Delete Product">
                          <FaTrash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaEnvelopeOpenText className="text-fudo-red" /> Inbox ({messages.length})
            </h2>

            {loadingMessages ? (
              <div className="flex justify-center items-center py-20"><FaSpinner className="animate-spin text-4xl text-fudo-red" /></div>
            ) : messages.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No messages found.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-5 rounded-2xl border transition-all ${msg.isRead ? 'bg-gray-50 border-gray-100' : 'bg-white border-blue-100 shadow-md'}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className={`text-lg ${msg.isRead ? 'font-semibold text-gray-700' : 'font-extrabold text-gray-900'}`}>
                            {msg.subject}
                          </h4>
                          {!msg.isRead && (
                            <span className="bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-3">From: {msg.name} ({msg.email}) • <span className="text-xs">{new Date(msg.createdAt).toLocaleString()}</span></p>
                        <p className={`text-gray-800 ${msg.isRead ? '' : 'font-medium'}`}>{msg.message_text}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 min-w-[100px]">
                        {!msg.isRead && (
                          <button 
                            onClick={() => handleMarkAsRead(msg.id)}
                            className="flex items-center gap-2 text-sm text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg font-bold transition-colors"
                          >
                            <FaCheckCircle /> Mark Read
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="flex justify-center items-center gap-2 text-sm text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold transition-colors"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;