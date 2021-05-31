const uuid = require("uuid").v4;
const stripe = require("stripe")(
	"sk_test_51Is8NSSJt0CbONA4w38hWPvqJPZOU8FpEpE2Dx3TRojx3ZvemdlsImkN45PvieibKlqmgrd3tbYZIS1Zgs0Tl3A000smrtkchw"
);
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
require("../db/connect");

{
	/*<-------------------------HOME HANDLE ------------------------------------>*/
}

const homeHandle = (req, res) => {
	res.send("This is my home");
};

{
	/*<-------------------------PAYMENT HANDLE ------------------------------------>*/
}

const paymentHandle = (req, res) => {
	const { product, token } = req.body;
	console.log("Product1", product);
	console.log("PRICE", product.price);
	const idempontencyKey = uuid();

	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges.create(
				{
					amount: product.price * 100,
					currency: "usd",
					customer: customer.id,
					receipt_email: token.email,
					description: `Purchase of ${product.name}`,
					shipping: {
						name: token.card.name,
						address: {
							country: token.card.address_country,
						},
					},
				},
				{ idempontencyKey }
			);
		})
		.then(async (result) => {
			res.status(200).json(result);
			// const userEmail = await User.findOne({ email: email });
			// console.log(userEmail);
			// const insertCourse = await userEmail.insert({
			// 	"course bought": "yes",
			// });
		})
		.catch((err) => console.log(err));
};

// const paymentHandle = async (req, res) => {
// 	const session = await stripe.checkout.sessions.create({
// 		payment_method_types: ["card"],
// 		line_items: [
// 			{
// 				price_data: {
// 					currency: "inr",
// 					product_data: {
// 						name: "Course",
// 					},
// 					unit_amount: 5999,
// 				},
// 				quantity: 1,
// 			},
// 		],
// 		mode: "payment",
// 		success_url: "https://example.com/success",
// 		cancel_url: "https://example.com/cancel",
// 	});

// 	const response = res.json({ id: session.id });
// 	console.log(response.statusCode);
// 	res.json({ id: session.id });
// };

// <------------------------- SIGNUP HANDLE ------------------------------------>

const signupHandle = async (req, res) => {
	const { name, email, password, cpassword } = req.body;
	console.log({ name, email, password, cpassword });
	if (!name || !email || !password || !cpassword) {
		return res.status(422).json({ error: "Some fields are empty" });
	}

	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(422).json({ error: "Email Exists" });
		} else if (password != cpassword) {
			return res.status(422).json({ error: "passwords don't match" });
		} else {
			const user = new User({
				name,
				email,
				password,
				cpassword,
			});

			await user.save();
			res.status(201).json({
				message: "user registered successfully",
			});
		}
	} catch (err) {
		console.log(err);
	}
};

// <-------------------------LOGIN HANDLE ------------------------------------>

const loginHandle = async (req, res) => {
	// main try block
	try {
		const { email, password } = req.body;
		// console.log(`This login is from  ${(email, password)}`);
		if (!email || !password) {
			return res.status(400).json({ error: "Fill all the fields" });
		}

		const userFound = await User.findOne({ email: email });
		console.log(`User Found ${userFound}`);
		//if else start
		if (userFound) {
			//compare usign bcryptjs
			const isMatch = Boolean(password === userFound.password);
			console.log(`Passwords Matched??? ${isMatch}`);
			//jwt
			const token = await userFound.generateAuthToken();
			// console.log(token);

			//cookies setting
			res.cookie("jwtoken", token, {
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true,
			});

			if (!isMatch) {
				res.status(400).json({ error: "invalid credentials" });
			} else {
				res.status(200).json({
					message: "user signed in successfully",
				});
			}
		} else {
			res.status(400).json({ error: "invalid credentials" });
		}
		//else if end
	} catch (err) {
		res.json({ message: "not working" });
		console.log(err);
	}
	// console.log(userLogin);
};

//<-------------------------------- Check if loggedIn ------------------------->

const isSignedIn = async (req, res) => {
	try {
		const token = req.cookies.jwtoken;
		if (!token) {
			res.json(false);
			return console.log("Token not found", token);
		}

		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			return res.json({ message: "User not found", bool: "false" });
		}

		if (rootUser) {
			return res
				.status(200)
				.json({ message: "User found", bool: "true" });
		}
		// const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
	} catch (err) {
		console.log(err);
	}
};

// <-------------------------Module Export ------------------------------------>
module.exports = {
	homeHandle,
	paymentHandle,
	signupHandle,
	loginHandle,
	isSignedIn,
};
