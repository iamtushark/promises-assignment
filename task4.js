function fetchWithRetry(url, retries) {
	return new Promise((resolve, reject) => {
		const totalTries = retries;
		const fetchData = (retries) => {
			fetch(url)
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.json();
				})
				.then(data => resolve(data))
				.catch(error => {
					if (retries === 0) {
						reject(`Failed to fetch data after ${totalTries} attempts: ${error.message}`);
					} else {
						console.log(`Retrying... attempts left: ${retries}`);
						fetchData(retries - 1);
					}
				});
		};

		fetchData(retries);
	});
}

fetchWithRetry('https://api.com', 3)
	.then(data => console.log('Fetched data:', data))
	.catch(error => console.error('Error:', error));