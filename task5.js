function fetchWithTimeout(url, timeout) {
	return new Promise((resolve, reject) => {
		
		const timer = setTimeout(() => {
			reject(new Error('Request timed out'));
		}, timeout);

	
		fetch(url)
			.then(response => {
				// To stop further execution.
				clearTimeout(timer);
				return response.json();
			})
			.then(data => resolve(data))
			.catch(error => {
				// To stop further execution.
				clearTimeout(timer); 
				reject(error);
			});
	});
}

fetchWithTimeout('https://api.com', 5000)
	.then(data => console.log('Fetched data:', data))
	.catch(error => console.error('Error:', error));