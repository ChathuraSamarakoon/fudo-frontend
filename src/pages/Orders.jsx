import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaArrowLeft, FaClock, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import orderService from '../services/orderService';
import OrderDetailsModal from '../components/OrderDetailsModal'; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrdersByUser(1); 
        setOrders(data.reverse()); 
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold"><FaClock /> Pending</span>;
      case 'PREPARING':
        return <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold"><FaSpinner className="animate-spin" /> Preparing</span>;
      case 'COMPLETED':
        return <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><FaCheckCircle /> Completed</span>;
      case 'CANCELLED':
        return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="flex items-center gap-4 mb-8">
          <Link to="/menu" className="text-gray-400 hover:text-fudo-red transition-colors p-3 bg-white rounded-full shadow-sm">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-fudo-red mb-4" />
            <p className="text-gray-500 font-medium">Fetching your delicious orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-16 text-center border border-gray-100 flex flex-col items-center">
            <FaBoxOpen className="text-6xl text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet!</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't placed any orders.</p>
            <Link to="/menu" className="bg-fudo-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md">
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-extrabold text-lg text-gray-900">Rs. {order.totalPrice.toFixed(2)}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                    Payment Method: <span className="font-bold text-gray-900 uppercase">{order.paymentMethod}</span>
                  </div>
                  
                  
                  <button 
                    onClick={() => setSelectedOrder(order)} 
                    className="text-fudo-red font-bold text-sm hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
}

export default Orders;