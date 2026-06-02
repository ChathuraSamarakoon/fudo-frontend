import api from './api';

const productService = {
    
    getAllProducts: async () => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    
    getProductsByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching products for category ${category}:`, error);
            throw error;
        }
    }
};

export default productService;