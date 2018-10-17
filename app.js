require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');
const bodyParser = require('body-parser');

// const test = require('./controllers/testcontroller');
const user = require('./controllers/usercontroller');
const tea = require('./controllers/teacontroller');
const teabox = require('./controllers/teaboxcontroller');

sequelize.sync();
// sequelize.sync({force:true}); 
//tip: pass in {force: true} for resetting tables

app.use(bodyParser.json());

app.use(require('./middleware/headers'))

// app.use('/api/test', function (req, res){
//     res.send("This is data from the /api/test endpoint. It's from the server.");
// });

// app.use('/test', test)

app.use('/user', user)
app.use('/tea', tea)
app.use('/teabox', teabox)

app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}.`))