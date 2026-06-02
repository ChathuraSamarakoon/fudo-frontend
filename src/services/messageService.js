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
    }
};

export default messageService;