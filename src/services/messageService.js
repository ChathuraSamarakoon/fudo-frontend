import api from './api';

const messageService = {
    
    sendMessage: async (messageData) => {
        try {
            const response = await api.post('/messages', messageData);
            return response.data;
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    },
    getAllMessages: async () => {
        try {
            const response = await api.get('/messages');
            return response.data;
        } catch (error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    },
    markAsRead: async (id) => {
        try {
            const response = await api.put(`/messages/${id}/read`);
            return response.data;
        } catch (error) {
            console.error(`Error marking message ${id} as read:`, error);
            throw error;
        }
    },
    deleteMessage: async (id) => {
        try {
            const response = await api.delete(`/messages/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting message ${id}:`, error);
            throw error;
        }
    }
};

export default messageService;