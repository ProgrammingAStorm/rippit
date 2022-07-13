const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
<<<<<<< HEAD
const path = require('path');
=======
const session = require('express-session')
>>>>>>> d73258b740945af9142714ab4d07f0af1d48888e
const exphbs = require('express-handlebars')




const app = express();
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
const session = require('express-session');
=======
>>>>>>> d73258b740945af9142714ab4d07f0af1d48888e
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to: ${PORT}`));
});
