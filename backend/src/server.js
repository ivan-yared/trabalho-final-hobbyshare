require('dotenv').config({path: '.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');

const routes = require('./routes/routes.js');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));
server.use(cookie());
server.use(express.json());

server.use('/api', routes);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}` )
})