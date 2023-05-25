import axios from 'axios';
import { BASE_URL, TIMEOUT } from '../../configs/config';
import LocalStorageService from '../infrastructure/services/localStorageService';
import * as accountRoute from '../../modules/account/route';

const localStorageService = LocalStorageService.instance();

const axioInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Access-Control-Allow-Origin': '*',
        // Request methods you wish to allow
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        // Request headers you wish to allow
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept',
        'Access-Control-Allow-Credentials': true
        // 'Content-Type': 'application/json'
    },
    maxContentLength: 2000,
    maxBodyLength: 2000
});

// axioInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

//Request Handler
const requestHandler = (config) => {
    const token = localStorageService.getToken();
    if (token) {
        config.headers['Authorization'] = "Bearer " + token;
    }
    return config
}

//Enable Request intercepter
axioInstance.interceptors.request.use(
    config => requestHandler(config)
)

//Response Handler
const errorHandler = (error) => {    
    if (error.response != null) {
        if (401 === error.response.status) {
            localStorageService.clearToken();
            window.location.href = accountRoute.loginPages;
        } else {
            return Promise.reject(error);
        }
    }
    return Promise.reject({ ...error })
}

const successHandler = (response) => {
    return response;
}

// Add interceptors
axioInstance.interceptors.request.use(
    request => requestHandler(request)
)

axioInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)

export default axioInstance;

