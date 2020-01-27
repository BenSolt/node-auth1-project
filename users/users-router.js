const router = require('express').Router();

const Users = require('./users-model.js');

// router.get('/', (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });

//GET USERS
router.get('/', (req, res,next) => {
  //Users.find()
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

//REGISTER USER (POST) create REGISTER
router.post('/register', (req, res) => {
  let user = req.body;

//////////////////////sets password to use hash
    const hash = bc.hashSync(req.body.password, 8)

    User.password = hash;
/////////////////////////////////////////

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


// LOGIN USER (POST) - Create LOGIN
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
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




module.exports = router;