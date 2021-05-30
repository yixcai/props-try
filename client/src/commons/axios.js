import _axios from 'axios';

const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: "https://le-sillaget05.herokuapp.com" || 'http://localhost:5000'
    });
    return instance;
};

export { axios };

export default axios();