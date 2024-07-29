async function conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2) {
	try {
		const initialResponse = await fetch(initialUrl);
		if (!initialResponse.ok) {
			throw new Error(`HTTP error! Status: ${initialResponse.status} at URL: ${initialUrl}`);
		}
		const initialData = await initialResponse.json();

		let secondaryUrl;
		
		if (initialData.id === 1) {  
			secondaryUrl = secondaryUrl1;
		} else {
			secondaryUrl = secondaryUrl2;
		}

		const secondaryResponse = await fetch(secondaryUrl);
		if (!secondaryResponse.ok) {
			throw new Error(`HTTP error! Status: ${secondaryResponse.status} at URL: ${secondaryUrl}`);
		}
		const secondaryData = await secondaryResponse.json();

		return { initialData, secondaryData };
	} catch (error) {
		throw new Error(`Failed to fetch: ${error.message}`);
	}
}

const initialUrl = 'https://dummyjson.com/products/1';
const secondaryUrl1 = 'https://dummyjson.com/products/2';
const secondaryUrl2 = 'https://dummyjson.com/products/3';

conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2)
	.then(result => console.log('Fetched data:', result))
	.catch(error => console.error('Error:', error.message));