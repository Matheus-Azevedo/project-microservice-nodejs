import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import axios from "axios";

export class UserController {
  static async create(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      const { password: _, ...userWithoutPassword } = newUser.toJSON();
      return res.status(201).json(userWithoutPassword);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async findByUserName(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne(
        { where: { username } },
        { attributes: { exclude: ["createdAt", "updatedAt"] } }
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async findAll(_req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });

      const usersAndPosts = await Promise.all(
        users.map(async (user) => {
          try {
            const { data: posts } = await axios.get(
              `${process.env.POST_SERVICE_URL}/posts/user/${user.id}`
            );

            const postsAndComments = await Promise.all(
              posts.map(async (post) => {
                try {
                  const { data: comments } = await axios.get(
                    `${process.env.COMMENT_SERVICE_URL}/comments/post/${post.id}`
                  );
                  return { ...post, comments };
                } catch (error) {
                  return { ...post, comments: [] };
                }
              })
            );

            return { user, posts: postsAndComments };
          } catch (error) {
            return { user, posts: [] };
          }
        })
      );

      return res.json(usersAndPosts);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
