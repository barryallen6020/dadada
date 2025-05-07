import axios from 'axios';

export const multipartApi = axios.create({
    baseURL: 'https://api.deskhive.ng/',
    headers: {
        'Accept': 'multipart/form-data',
    },
});

multipartApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

/**
 * Helper function to send files and JSON data
 * @param url - The endpoint URL
 * @param jsonData - The JSON data to send
 * @param file - The file to send
 */
export const sendFileWithJson = async (path: string, jsonData: Record<string, any>, file: File) => {
    const formData = new FormData();

    // Append JSON data as a string
    formData.append('json', JSON.stringify(jsonData));

    // Append the file
    formData.append('file', file);

    // Send the request
    return multipartApi.post(`localhost:3000/${path}`,
        formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default multipartApi;
