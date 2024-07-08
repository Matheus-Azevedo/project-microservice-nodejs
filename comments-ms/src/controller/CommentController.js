import { Comment } from "../model/CommentModel.js";

export class CommentController {
  static async create(req, res) {
    try {
      const { content, postId } = req.body;
      const newContent = await Comment.create({ content, postId });
      return res.status(201).json(newContent);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async findAll(_req, res) {
    try {
      const contents = await Comment.findAll();
      return res.status(200).json(contents);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async findByPostId(req, res) {
    try {
      const { id } = req.params;
      const content = await Comment.findAll(
        {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        { where: { postId: id } }
      );
      return res.status(200).json(content);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
