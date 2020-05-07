const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {//*COMPLETE *//
  // do your magic!
  const body = req.body;

  Users.insert(body)
    .then( user => {
      res.status(201).json(user)
  }).catch(err => {
      console.log(err);
      res.status(500).json({
      error: "Error adding new user"
      });
    });
});

router.post('/:id/posts', validateUserId,validatePost, (req, res) => {
  // do your magic!
  const posts = { ...req.body, "user_id": req.params.id };
  const body = req.body;
  Posts.insert(posts)
    .then(user => {
      res.status(201).json(user);
  }).catch(err => {
      console.log(err);
      res.status(500).json({
      error: "Error adding new post for user "
      });
    });
});

router.get('/', (req, res) => {//*COMPLETE *//
  // do your magic!
  Users.get()
    .then(user => {
        res.status(200).json({user})
    })
    .catch(err => {
         res.status(500).json({error: "The posts information could not be retrieved."})
    })
});

router.get('/:id', validateUserId, (req, res) => {//*COMPLETE *//
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {//*COMPLETE *//
  // do your magic!
  const {id} = req.params
  Users.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts);
  }).catch(err => {
    console.log(err)
  })
  
});

router.delete('/:id',validateUserId, (req, res) => {//*COMPLETE *//
  // do your magic!
  const {id} = req.params;
  Users.remove(id)
  .then(user => {
    if(user > 0) {
      res.status(200).json({ message: 'The User has been deleted' });
    } 
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the User',
    });
  })
});

router.put('/:id',validateUserId, validateUser, (req, res) => {//*COMPLETE *//
  // do your magic!
  const {id} = req.params;
  const body = req.body;

  Users.update(id, body)
  .then( user => {
    res.status(201).json(body)
}).catch(err => {
    console.log(err);
    res.status(500).json({
    error: "Error updating user"
    });
  });
});

//custom middleware

async function validateUserId(req, res, next) {//*COMPLETE *//
  // do your magic!
  const {id} = req.params
  try{
  const user = await Users.getById(id)
      if(user){ 
          req.user = user;
          next();
      }else{ 
        res.status(404).json({message: "invalid user id"})}
  }catch(err){
          res.status(500).json({error: "The user information could not be retrieved."})
      }
}

 function validateUser(req, res, next) {//*COMPLETE *//
  // do your magic!
  const body = req.body;
  if(!body || Object.entries(body).length === 0){//Object.entries returns an array of "key:value" pairs so if the body is empty the length = 0
    res.status(400).json({ message: "missing user data" });
  }else if(!body.name){
    res.status(400).json({message: "missing required name field" })
  }else{
    next()
  }
}

function validatePost(req, res, next) {//*COMPLETE *//
  // do your magic!
  const body = req.body;
  if(!body || Object.entries(body).length === 0){
    res.status(400).json({ message: "missing user data" });
  }else if(!body.text){
    res.status(400).json({message: "missing required text field" })
  }else{
    next()
  }
}

module.exports = router;
