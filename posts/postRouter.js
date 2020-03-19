const express = require('express');
const Posts = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.find()
    .then(post => {
        res.status(200).json({post})
    })
    .catch(err => {
         res.status(500).json({error: "The posts information could not be retrieved."})
    })
});

router.get('/:id', async (req, res) => {
  // do your magic!
  const {id} = req.params
  console.log(res.body)
  try{
  const post = await Posts.findById(id)
  console.log(post.length)
      if(post.length < 1){ 
          res.status(404).json({message: "The post with the specified ID does not exist."})
      }else{ res.status(200).json({post})}
  }catch(err){
          res.status(500).json({error: "The post information could not be retrieved."})
      }
});

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
  // do your magic!
  const changes = req.body;
  const {id} = req.params
  Posts.update(id, changes)
      .then(post => {
          if (!changes.title || !changes.contents) {
              res.status(400).json({errorMessage: "Please provide title and contents for the post."})
          }
          else if (post) {
              res.status(200).json(changes);
          } else {
              res.status(404).json({  message: "The post with the specified ID does not exist." });
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

function validatePostId(req, res, next) {
  // do your magic!

}

module.exports = router;
