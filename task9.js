async function fetchSequentially(urls) {
	const results = [];

	for (const url of urls) {
		try {
			const response = await fetch(url);
			results.push({ data : await response.json(), url });
		} catch (error) {
			results.push({ error: error.message, url });
		}
	}

	return results;
}

const urls = [
	'https://dummyjson.com/products/1',
	'https://dummyjson.com/products/2',
	'https://dummyjson.com/products/3'
];

fetchSequentially(urls)
	.then(results => console.log('Sequential results:', results))
	.catch(error => console.error('Error:', error.message));
