function fetchWithRace(urls, timeout) {
	const timeoutPromise = new Promise((resolve, reject) =>
		setTimeout(() => reject(new Error('Timeout error')), timeout)
	);

	const fetchPromises = urls.map((url, index) =>
		fetch(url)
			.then(response => {
				return response.json().then(data => ({ response: data, url, index }));
			})
	);

	return Promise.race([...fetchPromises, timeoutPromise]);
}

const urls = [
	'https://dummyjson.com/test',
	'https://dummyjson.com/test',
	'https://dummyjson.com/test'
];

fetchWithRace(urls, 3000)
	.then(result => console.log('First successful response:', result))
	.catch(error => console.error('Error:', error.message));