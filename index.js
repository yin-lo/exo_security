const express = require('express');
const session = require('express-session');

const loggedRouter = require('./app/routers/logged');
const publicRouter = require('./app/routers/public');
const seeding = require('./app/database/seeding');
const pages = require('./app/data/pages.json');

const userMiddleware = require('./app/middleware/user');

seeding.run();

const app = express();
const port = process.env.post || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.locals.pages = pages;

app.use(express.urlencoded({ extended: true }));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'Un Super Secret'
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

// stocker le user de la session dans res.locals
app.use(userMiddleware);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(loggedRouter);
app.use(publicRouter);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});