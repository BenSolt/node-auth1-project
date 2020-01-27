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
        //check the password is valid
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
