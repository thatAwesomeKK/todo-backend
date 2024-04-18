import jwt from "jsonwebtoken";

const AUTH_PRIVATE_KEY = process.env.AUTH_PRIVATE_KEY

export const getAccessToken = (payload) => {
  const expiresIn = "1d";
  const signedToken = jwt.sign(payload, AUTH_PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return signedToken;
};
