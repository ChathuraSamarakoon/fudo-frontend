import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

// Order එකක් දාන ෆන්ක්ෂන් එක
const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// User කෙනෙක්ගේ Orders ටික Backend එකෙන් ගන්න ෆන්ක්ෂන් එක (මේක තමයි කලින් මිස් වෙලා තිබ්බේ)
const getOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// මේ ෆන්ක්ෂන් දෙකම අනිවාර්යයෙන්ම Export වෙන්න ඕනේ
export default {
  placeOrder,
  getOrdersByUser
};