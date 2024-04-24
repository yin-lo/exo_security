const sequelize = require('../database');
const { User, Comment } = require('../models');

// je récupère ma petite fonction pour crypter les mots de passe
const encrypt = require('../utils/encrypt');

const seeding = {
  run: async function() {
    try {
      await sequelize.drop();
      await sequelize.sync();
      await User.create({
        email: 'ronald@oclock.io',
        password: encrypt('clown'),
      });
      await Comment.create({
        description: 'C\'est tarpin bon !',
      });
      await Comment.create({
        description: 'Franchement j\'aime bien mais ça manque de sel parfois.',
      });
    } catch (error) {
      console.trace(error);
    }
  },
};

module.exports = seeding;
