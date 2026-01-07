const express = require("express");
const app = express();
const Blog = require("./db/model");
require("./db/connect");

app.use(express.json());

app.post("/api/v1/tasks", async (req, res) => {
	try {
		const blogPost = await Blog.create(req.body);
		return res.status(201).json(blogPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

app.get("/api/v1/tasks/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const blogPost = await Blog.findOne({ _id: id });

		if (!blogPost) {
			return res.status(404).json({
				success: false,
				message: `Post with id ${id} not found`,
			});
		}

		return res.status(200).json(blogPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

app.get("/api/v1/tasks", async (req, res) => {
	try {
		const blogPost = await Blog.find();

		if (!blogPost) {
			return res.status(404).json({
				success: false,
				message: `There are no posts yet`,
			});
		}
		return res.status(200).json(blogPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

app.put("/api/v1/tasks/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const blogPost = await Blog.findOneAndUpdate({ _id: id }, req.body);

		if (!blogPost) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });
		}
		return res.status(200).json(blogPost);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
});

app.delete("/api/v1/tasks/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const blogPost = await Blog.findOneAndDelete({ _id: id });
		
        if (!blogPost) {
			return res
				.status(404)
				.json({ success: false, message: "Post doesn't exist" });
		}

        return res.status(204)
	} catch (error) {
        res.status(500).json(error)
    }
});

app.listen(3000);
