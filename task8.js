function fetchAnyWithErrors(urls) {
	let errors = [];
	let errorCount = 0;

	return new Promise((resolve, reject) => {
		urls.forEach((url, index) => {
			fetch(url)
				.then(response => 
					response.json()
				)
				.then(data => resolve({ response : data, url, index }))
				.catch(error => {
					errors.push(`Request to ${url} failed: ${error.message}`);
					errorCount++;
					if (errorCount === urls.length) {
						reject(new Error(errors.join('\n')));
					}
				});
		});
	});
}

const urls = [
	'https://dummyjson.com/prodcts/1',
	'https://dummyjson.com/prodcts/2',
	'https://dummyjson.com/prodcts/3'
];

fetchAnyWithErrors(urls)
	.then(result => console.log('First successful response:', result))
	.catch(error => console.error('Aggregated Error:', error.message));