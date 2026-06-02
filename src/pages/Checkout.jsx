import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaReceipt, FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; 

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 3.99 : 0; 
  const taxesAndFees = subtotal * 0.08; 
  const finalTotal = subtotal + deliveryFee + taxesAndFees;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      <div className="bg-white border-b border-gray-200 py-6 px-10 flex justify-between items-center sticky top-0 z-40">
        <Link to="/menu" className="flex items-center gap-2 text-gray-600 hover:text-fudo-red font-bold transition-colors">
          <FaArrowLeft /> Back to Menu
        </Link>
        <div className="text-2xl font-extrabold text-fudo-red">Fudo</div>
        <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
          <FaLock /> Secure Checkout
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="lg:w-7/12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaReceipt className="text-fudo-red text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 font-medium mb-4">Your cart is empty! 🍔</p>
                  <Link to="/menu" className="bg-fudo-red text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition-colors">
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <img 
                        src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-2xl" 
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          <span className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mt-1">{item.category}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-fudo-red font-bold text-lg transition-colors"
                            >−</button>
                            <span className="font-bold text-sm text-gray-700 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-green-600 font-bold text-lg transition-colors"
                            >+</button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="Remove item"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          <div className="lg:w-5/12 flex flex-col gap-6">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
              <button className="absolute top-8 right-8 text-sm font-bold text-green-600 hover:underline">Edit</button>
              <div className="flex items-center gap-3 mb-4">
                <FaMapMarkerAlt className="text-fudo-red text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Delivery Details</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-900 text-sm">Home</p>
                <p className="text-gray-600 text-sm mt-1">123 Culinary Boulevard, Apt 4B, Food District, FD 90210</p>
                <p className="text-gray-400 text-xs mt-2 font-medium">Drop at door</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-fudo-red text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="flex flex-col gap-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-fudo-red bg-red-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 accent-fudo-red" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Credit Card</p>
                      <p className="text-xs text-gray-500 font-medium">**** 4242</p>
                    </div>
                  </div>
                  <FaCreditCard className="text-gray-400 text-xl" />
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-fudo-red bg-red-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="w-4 h-4 accent-fudo-red" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Cash on Delivery</p>
                      <p className="text-xs text-gray-500 font-medium">Have exact change ready</p>
                    </div>
                  </div>
                  <FaMoneyBillWave className="text-gray-400 text-xl" />
                </label>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-fudo-red border-t-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
              <div className="flex flex-col gap-3 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600 text-sm font-medium"><span>Subtotal</span><span>Rs. {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600 text-sm font-medium"><span>Delivery Fee</span><span>Rs. {deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600 text-sm font-medium"><span>Taxes & Fees</span><span>Rs. {taxesAndFees.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-extrabold text-gray-900">Total</span>
                <span className="text-3xl font-extrabold text-gray-900">Rs. {finalTotal.toFixed(2)}</span>
              </div>
              <button disabled={cartItems.length === 0} className="w-full bg-fudo-red text-white py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-md flex justify-center items-center gap-2 disabled:bg-red-300 disabled:cursor-not-allowed">
                Place Order →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;