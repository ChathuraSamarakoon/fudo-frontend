import api from './api';

const userService = {
    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },
    deleteUser: async (id) => {
        try {
            const response = await api.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            throw error;
        }
    }
};

export default userService;