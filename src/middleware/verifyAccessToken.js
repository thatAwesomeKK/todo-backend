import jwt from "jsonwebtoken";

const AUTH_PUBLIC_KEY = process.env.AUTH_PUBLIC_KEY;

export default async function (req, res, next) {
  try {
    const token = req.cookies.accessToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token Invalid" });
    }
    req.verify = jwt.verify(token, AUTH_PUBLIC_KEY, { algorithms: ["RS256"] });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token Invalid" });
  }
  next();
}
