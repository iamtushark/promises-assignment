console.log("Program started");
console.log("Program in progress...");

const myPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Promise resolved");
	}, 3000);

	setTimeout(() => {
		reject(new Error("Promise rejected"));
	}, 2000);
});

console.log("Promise status: ", myPromise);

myPromise.then((result) => {
	console.log("Program complete:", result);
}).catch((error) => {
	console.error("Program failure:", error.message);
});