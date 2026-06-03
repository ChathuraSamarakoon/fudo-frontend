import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

const getOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};


const updateOrderStatus = async (orderId, newStatus) => {
  try {
    
    const response = await axios.patch(`${API_URL}/${orderId}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error(`Error updating order status for ID ${orderId}:`, error);
    throw error;
  }
};

export default {
  placeOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus
};