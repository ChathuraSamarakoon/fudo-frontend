import { FaTimes } from 'react-icons/fa';

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <FaTimes size={20} />
        </button>
        
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Order Details #{order.id}</h2>
        
        <div className="flex flex-col gap-4 mb-6">
          {order.orderItems && order.orderItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <p className="font-bold text-gray-800">{item.product.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <p className="text-lg font-extrabold text-gray-900">Total</p>
          <p className="text-2xl font-extrabold text-fudo-red">Rs. {order.totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;