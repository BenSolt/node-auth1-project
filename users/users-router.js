const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

//GET USERS
// router.get('/', (req, res,next) => {
//   Users.find()
//   if(req.headers.authorization) {
//     bc.hash(req.headers.authorization), 8, (err, hash) => { 
//       // 10 is number of rounds
//       if (err) {
//         res.status(500).json({error: ' it borke'});
//       }else{
//       res.status(200).json({hash});
//       }
//     }
//   } else {
//     res.status(400).json({ error: 'missing header'});
//   }
// })

module.exports = router;