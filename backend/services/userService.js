const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const User = require('./../models/user');

exports.getAllUsersService = catchAsync(async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (error) {
		return next(new AppError('Something went wrong, please try again.', 404));
	}

	if (!users || users.length === 0) {
		return next(new AppError('There are no users registered!.', 404));
	}
	res.status(200).json({
		message: 'success',
		users: users.map((user) => user.toObject({ getters: true })),
	});
});

exports.signUpService = catchAsync(async (req, res, next) => {
	// Validate the request for not allow empty fields
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new AppError('Invalid inputs passed, please check your data.', 422));
	}
	// return console.log(await bcrypt.hash(req.body.password,12))
	const { name, email, password, places } = req.body;
	const existingUser = await User.findOne({ email: email });

	if (existingUser) {
		return next(new AppError('User exists already, please login instead.', 422));
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		return next(new AppError('Could not create user please try again.', 500));
	}

	const createdUser = new User({
		name,
		email,
		image: req.file.path,
		password: hashedPassword,
		places,
	});

	try {
		await createdUser.save();
	} catch (err) {
		return next(new AppError('Signing up failed, please try again later.', 500));
	}

	let token;
	try {
		token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || '2h',
		});
	} catch (err) {
		return next(new AppError('Signing up failed, please try again later.', 500));
	}

	res.status(201).json({
		message: 'success',
		user: {
			email: createdUser.email,
			userId: createdUser.id,
			token,
		},
	});
});

exports.logInService = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email: email });

	if (!existingUser) return next(new AppError('Invalid credentials, could not log you in.', 401));

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		return next(new AppError('Could not log in, please check your credentials and try again.', 500));
	}

	if (!isValidPassword) return next(new AppError('Invalid credentials, could not log you in.', 401));

	let token;
	try {
		token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || '2h',
		});
	} catch (err) {
		return next(new AppError('Signing up failed, please try again later.', 500));
	}

	res.json({
        message: 'success',
		user: {
			email: existingUser.email,
			userId: existingUser.id,
			token,
		},
	});
});
