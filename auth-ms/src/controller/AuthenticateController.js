import bcrypt from "bcrypt";
import axios from "axios";
import { createToken } from "../helpers/managerJwt.js";

export class AuthenticateController {
  static async authenticate(req, res) {
    try {
      const { username, password } = req.body;
      const user = await axios.get(
        `${process.env.POST_SERVICE_URL}/posts/user/${username}`
      );

      if (!user) {
        return res.status(401).json({ error: "Invalid username" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = createToken(user);

      return res.status(201).json({ token: token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
