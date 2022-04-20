import db from "./database.js";
import express from "express";
import router from "./routes/index.js";
import cors from "cors";
const app = express();
try {
  await db.connect();
  console.log('Database connected...');
} catch (error) {
  console.error('Connection error:', error);
}



app.use(cors());


var session;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', router);

app.listen(5000, () => console.log('Server running at port 5000'));
