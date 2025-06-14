import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://api.deskhive.ng/',
	//baseURL: 'http://localhost:3000/',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
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

export default api;
