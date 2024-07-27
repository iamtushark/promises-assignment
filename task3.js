
console.log("Program started");

const firstPromise = new Promise((resolve) => {
	setTimeout(() => {
		resolve({ data: "Hello, friend!", error: null });
	}, 5000);
});

console.log("Promise:", firstPromise)
console.log("Program in progress...")

firstPromise.then((firstPromiseVal) => {
	console.log(firstPromiseVal)

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("First promise chain complete!");
		}, 2 * 1000);
	})
}).then((val) => {
	console.log(val)
})

firstPromise
    .then((result) => {
        console.log(result);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Second promise chain complete!");
            }, 10000);
        });
    })
    .then((message) => {
        console.log(message);
    });


// Both the chains will run asynchronously, and not 1 after another.