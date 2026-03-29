let express = require("express");
const { getLatestNews } = require("../Controller/NewsApi");

let newsRouter = express.Router();

newsRouter.get("/getNews",getLatestNews);

module.exports=newsRouter;