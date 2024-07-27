console.log("Program started");

const firstPromise = new Promise((resolve) => {
	setTimeout(() => {
		resolve("Step 1 complete");
	}, 3000);
});

console.log("Program in progress...");

console.log("Promise status :", firstPromise);

firstPromise
	.then((step1Message) => {
		console.log(step1Message);

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("Step 2 Complete");
			}, 3000);
		});
	})
	.then((step2Message) => {
		console.log(step2Message);
	});
