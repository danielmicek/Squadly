import axios from "axios";
import {Platform} from 'react-native';

const API_BASE_URL = Platform.select({
    web: 'http://localhost:8080',
    android: 'http://10.0.2.2:8080',
    ios: 'http://localhost:8080',
});

const asText = (data) => {
    if (typeof data === "string") return data;
    if (data === null || data === undefined) return "";
    return JSON.stringify(data);
};

function createApiClient(){
    const apiClient = axios.create({
        baseURL: API_BASE_URL,
    });

    apiClient.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (!error.response) {
                return Promise.reject(error);
            }

            const apiError = new Error(asText(error.response.data) || error.message);
            apiError.status = error.response.status;
            /*apiError.data = error.response.data;
            apiError.statusText = error.response.statusText;*/

            return Promise.reject(apiError);
        }
    );

    return apiClient;
}

export async function GET_user(userId){
    const apiClient = createApiClient();

    try {
        return await apiClient.get(`/api/users/getUserById/${userId}`);
    } catch (error) {
        if (error.status === 400 || error.status === 404) return null; // user not found
        throw error;
    }
}