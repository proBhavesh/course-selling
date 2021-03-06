const uuid = require("uuid").v4;
const stripe = require("stripe")(
	"pk_live_51IJ2aGFSQv1Tpw1NSSt22giRsEiLy6dOiUhiqFweMG2UigwWu242apRpUVmaYEaC1hPTqxt3g1DIGGLnLd60hbqr00BjOyFY04"
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
	const { product, token, courseID } = req.body;
	console.log("Product1", product);
	console.log("PRICE", product.price);
	console.log(courseID);
	const idempontencyKey = uuid();

	console.log(token.email);
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
			const userFound = await User.findOne({ email: token.email });
			const objectId = userFound._id;
			// console.log("This is object id ", userFound._id);
			const userEmail = token.email;
			const courseNum = 2;
			const updatedData = await User.findByIdAndUpdate(
				{ _id: objectId, courseNum },
				{
					$set: {
						[`course${courseNum}`]: true,
					},
				},
				{
					new: true,
					useFindAndModify: false,
				}
			);
			console.log(updatedData);
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
			res.status(300).json({ message: "Token not found", bool: "false" });
			return console.log("Token not found", token);
		}

		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
		console.log(verifyToken);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			return res
				.status(399)
				.json({ message: "User not found", bool: "false" });
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

//<-------------------------------- Setting buyed courses to database ------------------------->

const getCourses = async (req, res) => {
	try {
		const token = req.cookies.jwtoken;
		if (!token) {
			res.status(300).json({ message: "Token not found", bool: "false" });
			return console.log("Token not found", token);
		}

		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			return res
				.status(399)
				.json({ message: "User not found", bool: "false" });
		}

		if (rootUser) {
			console.log(rootUser);
			return res.send(rootUser);
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
	getCourses,
};
