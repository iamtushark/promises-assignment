function fetchAllWithErrors(urls) {
	return new Promise((resolve, reject) => {
		const fetchPromises = urls.map((url, index) => fetch(url).then(response => {
			return response.json();
		}).catch(error => {
			error.url = url;
			error.index = index;
			throw error;
		}))

		Promise.all(fetchPromises)
			.then(results => resolve(results))
			.catch(error => reject(error));
	});
}

const urls = [
	'https://dummyjson.com/test',
	'https://dummyjson.com/test',
	'https://dummyjson.com/test'
];

fetchAllWithErrors(urls)
	.then(results => console.log('Fetched data:', results))
	.catch((error) => console.log(`Error while fetching ${error.url}`)
	);