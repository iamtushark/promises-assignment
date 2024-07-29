const fetchWithFallback = async (urls) => {
	const results = await Promise.allSettled(urls.map(url => fetch(url).then(response => response.json())));

	const successfulResults = results
		.filter(result => result.status === 'fulfilled')
		.map(result => result.value);

	if (successfulResults.length > 0) {
		return { successfulResults, "failedCount": urls.length - successfulResults.length, "successCount": successfulResults.length };
	} else {
		throw new Error('All fetch requests failed.');
	}
};

const urls = [
	'https://dummyjson.com/products/1',
	'https://dummyjson.com/products/2',
	'https://dummyjson.com/produ/3',
];

fetchWithFallback(urls)
	.then(results => console.log('Successful fetch results:', results))
	.catch(error => console.error('Error:', error.message));