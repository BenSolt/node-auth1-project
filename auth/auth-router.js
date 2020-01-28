const router = require('express').Router();

const Users = require('../users/users-model.js');



//HASH HASH HASH - Authorization
////////////////////////
router.get('/secret', (req, res,next) => {
  if(req.headers.authorization) {
    bc.hash(req.headers.authorization), 8, (err, hash) => { 
      // 10 is number of rounds
      if (err) {
        res.status(500).json({error: ' it borke'});
      }else{
      res.status(200).json({hash});
      }
    }
  } else {
    res.status(400).json({ error: 'missing header'});
  }
})
///////////////////////////////

router.post('/register', (req, res) => {
  let user = req.body;

//////////////////////sets password to use hash
    // const hash = bc.hashSync(req.body.password, 8)

    // User.password = hash;
/////////////////////////////////////////

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        //sessions 
        req.session.loggedIn = true; // used in restricted middleware
        req.session.userId = user.id //user id
       // if (user) {
                // compare().then(match => {
                //   if (match) {
                //     // good password
                //   } else {
                //     // they don't match
                //   }
                // }).catch()
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

///LOGOUT - Part 2 - sessions and cookies
router.get("/logout", (req, res) => {
  if (req.session) {
      req.session.destroy(err => {
          if (err) {
              res.status(500).json({
                  message:
                      " you can checkout but cant leave!",
              });
          } else {
              res.status(200).json({ message: "bye, thank you, come again" });
          }
      });
  } else {
      res.status(204);
  }
});



module.exports = router;
