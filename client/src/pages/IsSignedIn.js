import React, { useState, useEffect } from "react";

const IsSignedIn = () => {
	//<------------------ check login function
	// const loginHandle = async (e) => {

	// };
	const check = async () => {
		const res = await fetch("http://localhost:3000/backend/isSignedIn", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		// if (res.status === 200) {
		// 	console.log(res);
		// }

		console.log("this is response", res);
	};

	return (
		<div>
			<button onClick={check}>Check Now</button>
		</div>
	);
};

export default IsSignedIn;
