import "dotenv/config.js";
import app from "./src/app.js";
import { connectToMongo } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectToMongo()
  .then(() => {
    try {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is running on : http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot Connect to Server");
    }
  })
  .catch((e) => {
    console.log("Error In Connecting to Server!");
  });
