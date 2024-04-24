const pages = require('../data/pages.json');

const mainControler = {
  page: function(req, res) {
    const paths = Object.keys(pages);
    if (paths.includes(req.path)) {
      res.render('page', pages[req.path]);
    }
    else {
      mainControler.error(req, res);
    }
  },
  error: function(req, res) {
    res.sendStatus(404);
  }
};

module.exports = mainControler;
