import { Post } from "../model/PostModel.js";

export class PostController {
  static async create(req, res) {
    try {
      const { title, userId } = req.body;
      const newPost = await Post.create({ title, userId });
      return res.status(201).json(newPost);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async findAll(_req, res) {
    try {
      const posts = await Post.findAll();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async findByUserId(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findAll(
        {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        { where: { userId: id } }
      );
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
