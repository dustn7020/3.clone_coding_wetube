import "dotenv/config";

import "./db";
import "./models/Video.js";
import "./models/User.js";
import "./models/Comment.js";

import app from "./server.js";

const PORT = 4000;

const handleListening = () =>
  console.log(`Server listenting on port http://localhost:${PORT} :)`);

app.listen(PORT, handleListening);
