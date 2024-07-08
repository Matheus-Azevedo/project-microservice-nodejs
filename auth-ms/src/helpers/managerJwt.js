import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};
