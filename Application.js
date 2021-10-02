const express = require(‘express’)
const mongoose = require(“mongoose”);
const bodyParser = require(‘body-parser’);
const app = express()
const port=3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const url = process.env.MONGOLAB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(url);
const articleSchema = new mongoose.Schema({
title: String,
articleText: String,
fullName: String
});
const Article = mongoose.model(“Article”, articleSchema);
app.set(‘view engine’, ‘ejs’)
app.get(‘/’, (req, res) =>
res.render(‘index’)
)
app.use(express.static(‘public’));
app.listen(port, () => console.log(‘Example app listening on port !’+port))
app.post(“/addArticle”, (req, res) => {
   const myData = new Article(req.body);
   myData.save()
   .then(item => {
   res.send(`<h2>item with title:<span><i>”${req.body.title}”</i>       </span> saved to database</h2> 
  <a style=”font-size:25px” href=”/..”>Home page</a>`);
  })
  .catch(err => {
   res.status(400).send(“unable to save to database”);
  });
});
app.get(‘/articles’, function (req, response) {
   Article.find({}, { _id: 0, title: 1, articleText: 1, fullName: 1 }).limit(5).exec(function (err, articles) {
   if (err) return console.error(err);
    response.render(‘articles’, { articles: articles });
   })
})
