const { Router } = require('express');
const router = Router();
const { getAllUsers } = require('../controllers/users.controller');

router.get('/users', getAllUsers);

router.get('/users/10', (req, res) => {
    res.send('User id');
});

router.post('/users', (req, res) => {
    res.send('insert user');
});

router.put('/users', (req, res) => {
    res.send('update user');
});

router.delete('/users', (req, res) => {
    res.send('delete user');
});

module.exports = router;