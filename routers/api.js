const express = require("express");
const apiRouter = express.Router();

const Product = require("../models/products");

apiRouter.use(express.json()); // for parsing application/json
apiRouter.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// GET all products
apiRouter.get("/", async function (req, res) {
	const products = await Product.find({});
	res.json(products);
});

// GET products by ID
apiRouter.get("/:id", async function (req, res) {
	const id = req.params.id;
	try {
		const productReturn = await Product.findById(id);
		res.json(productReturn);
	} catch (error) {
		res.status(404).json({ msg: "No products with '" + id + "' found", error });
	}
});

// POST product
apiRouter.post("/", async (req, res) => {
	// const productId = uuidv4();
	const { name, description, price } = req.body;
	const product = new Product({
		// id: productId,
		name,
		description,
		price,
	});
	product.save(function (err) {
		if (err) return handleError(err);
		console.log("saved!");
	});

	res.status(201).json({ msg: "product created", product });
});

// PUT products by ID
apiRouter.put("/:id", async function (req, res) {
	const id = req.params.id;
	const { name, description, price } = req.body;
	try {
		const productReturn = await Product.updateOne(
			{ _id: id },
			{
				$set: {
					...(name && { name }),
					...(description && { description }),
					...(price && { price }),
				},
			}
		);
		res.json(productReturn);
	} catch (error) {
		res.status(404).json({ msg: "No products with '" + id + "' found", error });
	}
});

// DELETE products by ID
apiRouter.delete("/:id", async function (req, res) {
	const id = req.params.id;
	try {
		const productReturn = await Product.deleteOne({ _id: id });
		res.json(productReturn);
	} catch (error) {
		res.status(404).json({ msg: "No products with '" + id + "' found", error });
	}
});

module.exports = apiRouter;
