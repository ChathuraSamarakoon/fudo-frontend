import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaReceipt, FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

function Checkout() {
  // ගෙවන ක්‍රමය මතක තියාගන්න (මුලින්ම Credit Card තෝරලා තියෙන්නේ)
  const [paymentMethod, setPaymentMethod] = useState('card');

  // දැනට පෙන්නන්න හදාගත්ත බොරු Cart එක (Dummy Data)
  const cartItems = [
    {
      id: 1,
      name: "Artisan Margherita Pizza",
      description: "Thin crust, fresh basil",
      price: 18.50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Truffle Mushroom Burger",
      description: "Double patty, extra truffle aioli",
      price: 32.00,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. Checkout Header එක */}
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
          
          {/* ⬅️ වම් පැත්ත: Your Order (කෑම ලිස්ට් එක) */}
          <div className="lg:w-7/12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaReceipt className="text-fudo-red text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
              </div>

              <div className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <span className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-1">{item.description}</p>
                      
                      {/* Quantity වෙනස් කරන කෑල්ල */}
                      <div className="flex items-center gap-4 mt-3 bg-gray-50 w-max px-3 py-1 rounded-full border border-gray-200">
                        <button className="text-gray-500 hover:text-fudo-red font-bold">−</button>
                        <span className="font-bold text-sm">{item.quantity}</span>
                        <button className="text-gray-500 hover:text-fudo-red font-bold">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 text-fudo-red font-bold text-sm hover:underline flex items-center gap-2">
                + Add cooking instructions or notes
              </button>
            </div>
          </div>

          {/* ➡️ දකුණු පැත්ත: Delivery, Payment සහ Summary */}
          <div className="lg:w-5/12 flex flex-col gap-6">
            
            {/* Delivery Details */}
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

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-fudo-red text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="flex flex-col gap-3">
                {/* Card Option */}
                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-fudo-red bg-red-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 accent-fudo-red"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Credit Card</p>
                      <p className="text-xs text-gray-500 font-medium">**** 4242</p>
                    </div>
                  </div>
                  <FaCreditCard className="text-gray-400 text-xl" />
                </label>

                {/* Cash Option */}
                <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-fudo-red bg-red-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cash" 
                      checked={paymentMethod === 'cash'} 
                      onChange={() => setPaymentMethod('cash')}
                      className="w-4 h-4 accent-fudo-red"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Cash on Delivery</p>
                      <p className="text-xs text-gray-500 font-medium">Have exact change ready</p>
                    </div>
                  </div>
                  <FaMoneyBillWave className="text-gray-400 text-xl" />
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-fudo-red border-t-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
              
              <div className="flex flex-col gap-3 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>Rs. 50.50</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm font-medium">
                  <span>Delivery Fee</span>
                  <span>Rs. 3.99</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm font-medium">
                  <span>Taxes & Fees</span>
                  <span>Rs. 4.52</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-extrabold text-gray-900">Total</span>
                <span className="text-3xl font-extrabold text-gray-900">Rs. 59.01</span>
              </div>

              <button className="w-full bg-fudo-red text-white py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-md flex justify-center items-center gap-2">
                Place Order →
              </button>
              <p className="text-center text-xs text-gray-500 mt-4 font-medium">
                By placing this order, you agree to our Terms of Service.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;