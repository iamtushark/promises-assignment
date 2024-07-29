const axios = require('axios');

// This creates an delay of time in ms.
const delayRequest = time => new Promise((resolve, reject) => {
	setTimeout(resolve, time)
});


function fetchWithExponentialBackoff(url, maxRetries) {
	const axiosInstance = axios.create();

	axiosInstance.interceptors.request.use(config => {
		config.retryCount = config.retryCount || 0;
		return config;
	});

	axiosInstance.interceptors.response.use(
		response => response,
		async error => {
			const config = error.config;

			if (config.retryCount >= maxRetries) {
				return Promise.reject(error);
			}

			config.retryCount += 1;

			// we can adjust delay by adjusting the multiplier which is currently 100, it tries like 
			// 200, 400, 800 .....
			const backoffDelay = Math.pow(2, config.retryCount) * 100;

			console.log(`Retrying ${url}... Attempt: ${config.retryCount} after ${backoffDelay}ms`);

			await delayRequest(backoffDelay);

			return axiosInstance(config);
		}
	);

	return axiosInstance.get(url)
		.then(response => response.data)
		.catch(error => {
			console.error('All retries failed:', error.message);
			throw error;
		});
}


const url = 'https://dummyjson.com/produts/1';

fetchWithExponentialBackoff(url, 3)
	.then(data => console.log('Fetched data:', data))
	.catch(error => console.error('Failed to fetch data:', error.message));