import express from "express";
import {
  loginCheck,
    sendClassData
} from "../controllers/controller.js";
const router = express.Router();
const app = express();
router.post('/loginCheck', loginCheck);
router.post('/sendClassData', sendClassData);
router.get('/', (req, res) => {
  res.send('<h1>Please login</h1>');

});
export default router;

