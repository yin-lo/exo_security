const { Comment } = require('../models');

const commentControler = {
  all: async function(req, res) {
    const comments = await Comment.findAll({
      order: [
        ['createdAt', 'desc'],
      ],
    });
    res.render('comments',  { comments });
  },
  add: async function(req, res) {
    await Comment.create({
      description: req.body.description,
    });
    res.redirect('/golden-book');
  },
};

module.exports = commentControler;
