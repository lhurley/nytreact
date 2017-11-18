const axios = require('axios');
const NYTAPIKEY = process.env.NYTAPIKEY;
const Article = require('../models/Article');

module.exports = function(express) {
  let router = express.Router();
  let api = express.Router();
  api.get('/search', (req, res) => {
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYTAPIKEY}&q=${req.query.q}&begin_date=${req.query.begin_date}&end_date=${req.query.end_date}&page=${req.query.page || 0}`)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).end());
  });

  api.route('/articles?/:id?')
    .get((req, res) => {
      Article.find().sort({ date: -1 })
      .then(articles => res.json(articles))
      .catch(() => res.status(500).end());
    })
    .post((req, res) => {
      Article.create({ title: req.body.title, snippet: req.body.snippet, url: req.body.url, thumbnail: req.body.thumbnail })
      .then(article => {
        res.status(201).end();
        socketio.emit('add', article);
      })
      .catch(() => res.status(500).end());
    })
    .delete((req, res) => {
      let _id = req.params.id;
      Article.deleteOne({ _id })
      .then(() => res.status(204).end())
      .then(() => socketio.emit('delete', _id))
      .catch(() => res.status(500).end());
    });
  router.use('/api', api);
  return router;
}
