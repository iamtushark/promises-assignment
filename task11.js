async function batchFetch(urls, batchSize) {
	const results = [];
	for (let i = 0; i < urls.length; i += batchSize) {
		const batch = urls.slice(i, i + batchSize);

		const batchResults = await Promise.all(
			batch.map(url => fetch(url).then(response => {
				if(! response.ok){
					return {"message" : "failed", status : response.status}
				}
				return response.json();
			}))
		);

		results.push(...batchResults);
	}

	return results;
}

const urls = [
	'https://dummyjson.com/products/1',
	'https://dummyjson.com/products/2',
	'https://dummyjson.com/produ/3',
	'https://dummyjson.com/products/4',
	'https://dummyjson.com/products/5'
];

batchFetch(urls, 2)
	.then(results => console.log('All results:', results))
	.catch(error => console.error('Error:', error.message));