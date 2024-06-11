const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
	res.statusCode = err.status || 500;
	res.setHeader('Content-Type', 'application/json');
	res.json({ error: err.message });
};

// Middleware xác thực dữ liệu dish (ví dụ, bạn có thể tùy chỉnh)
const validateDish = (req, res, next) => {
	const { name, description, price } = req.body;
	if (!name || !description || !price) {
		const err = new Error('Thiếu các trường bắt buộc: name, description, price');
		err.status = 400;
		return next(err);
	}
	next();
};

// Middleware xác thực dữ liệu comment
const validateComment = (req, res, next) => {
	const { rating, comment, author } = req.body;
	if (rating == null || !comment || !author) {
		const err = new Error('Thiếu các trường bắt buộc: rating, comment, author');
		err.status = 400;
		return next(err);
	}
	next();
};



//Create ,Read, Delete => dish
dishRouter.route('/')
	.get((req, res, next) => {
		Dishes.find({})
			.then((dishes) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(dishes);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Dishes.create(req.body)
			.then((dish) => {
				console.log('Dish Created ', dish);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /dishes');
	})
	.delete((req, res, next) => {
		Dishes.remove({})
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});

//Create ,Read, Delete => dish by Id
dishRouter.route('/:dishId')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		res.end('POST operation not supported on /dishes/' + req.params.dishId);
	})
	.put((req, res, next) => {
		Dishes.findByIdAndUpdate(req.params.dishId, {
			$set: req.body
		}, { new: true })
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(dish);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Dishes.findByIdAndRemove(req.params.dishId)
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});
// Thêm comment vào dish theo Id
dishRouter.route('/:dishId/comments')
	.post(validateComment, async (req, res, next) => {
		try {
			const dish = await Dishes.findById(req.params.dishId);
			if (!dish) {
				const err = new Error(`Dish ${req.params.dishId} không tìm thấy`);
				err.status = 404;
				return next(err);
			}
			dish.comments.push(req.body);
			const updatedDish = await dish.save();
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(updatedDish);
		} catch (err) {
			next(err);
		}
	});


dishRouter.use(errorHandler);

module.exports = dishRouter;

