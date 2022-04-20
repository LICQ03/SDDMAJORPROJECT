import express from "express";
import {
  loginCheck
} from "../controllers/controller.js";
const router = express.Router();
const app = express();
router.post('/loginCheck', loginCheck);
router.get('/', (req, res) => {
  res.send('<h1>Please login</h1>');

});
export default router;

