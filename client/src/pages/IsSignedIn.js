export const check = async () => {
	const res = await fetch("http://localhost:5000/backend/isSignedIn", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});

	console.log("this is response", res);
};
