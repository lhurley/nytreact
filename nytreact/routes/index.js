const path = require('path');

module.exports = function(express) {
  let router = express.Router();
  router.use(require('./api')(express));
  router.use('/', express.static(path.join(appRoot, 'client/build')));
  router.get('*', (req, res) => res.sendFile(path.join(appRoot, 'client/build/index.html')));
  return router;
};
