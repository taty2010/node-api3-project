const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postRouter = require ('./posts/postRouter');
const userRouter = require('./users/userRouter');
const server = express();

server.use(express.json());
server.use(helmet())
server.use(logger)

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  console.log(`http://localhost:5000${req.url}`);
  console.log(new Date());
  next()
}


module.exports = server;
