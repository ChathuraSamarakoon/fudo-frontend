import axios from 'axios';

const api = axios.create({
    
    baseURL: 'http://fudo-backend-env.eba-6pzh9mzc.ap-southeast-1.elasticbeanstalk.com/api', 
});

export default api;