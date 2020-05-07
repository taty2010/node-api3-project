const express = require('express');
const Posts = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(post => {
        res.status(200).json({post})
    })
    .catch(err => {
         res.status(500).json({error: "The posts information could not be retrieved."})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  Posts.remove(id)
      .then(post => {
          post > 0 ? res.status(200).json({message: 'The post has been deleted'}) : res.status(404).json({message: 'The post with the specified ID does not exist.'});  
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: "The post could not be removed"
          })
      })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const changes = req.body;
  const {id} = req.params
  Posts.update(id, changes)
      .then(post => {
        console.log(!changes.text)
          if (!changes.text) {
              res.status(400).json({errorMessage: "Please provide text for the post."})
          } else {
              res.status(200).json(changes);
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: "The post information could not be modified."
          });
      });
});

// custom middleware

async function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params
  try{
  const post = await Posts.getById(id)
      if(post){ 
          req.post = post;
          next();
      }else{ 
        res.status(404).json({message: "invalid user id"})}
  }catch(err){
          res.status(500).json({error: "The post information could not be retrieved."})
      }
}

module.exports = router;
