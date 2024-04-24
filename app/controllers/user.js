const { User } = require('../models');
// je récupère ma petite fonction pour crypter les mots de passe
const encrypt = require('../utils/encrypt');

const userController = {
  signupPage(req, res) {
    res.render('signup');
  },
  async signupAction(req, res) {
    const newUser = await User.create({
      email: req.body.email,
      password: encrypt(req.body.password),
    });

    req.session.user = { login: newUser.login };

    res.redirect('/');
  },
  loginPage(req, res) {
    res.render('login');
  },
  async loginAction(req, res) {
    //    console.log(req.body);
    // on tente de récupérer l'utilisateur qui possède l'email donné
    const foundUser = await User.findOne({ where: { email: req.body.email } });

    if (!foundUser) {
      return res.status(400).render('login', {
        error: "Cet email n'existe pas."
      });
    }

    // Si on a un utilisateur, on teste si le mot de passe est valide
    const validPwd = encrypt(req.body.password) == foundUser.password;

    if (!validPwd) {
      return res.status(400).render('login', {
        error: "Ce n'est pas le bon mot de passe."
      });
    }

    // si tout va bien, on met l'utilisateur en session...
    req.session.user = {
      email: foundUser.email
    }

    // et on repart sur la page d'accueil
    return res.redirect('/');
  },
  async disconnect(req, res) {
    req.session.destroy();

    res.redirect('/');
  }
};

module.exports = userController;
