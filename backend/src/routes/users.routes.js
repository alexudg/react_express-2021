const { Router } = require('express');
const router = Router();
const { getAllUsers, getUser, insertUser, deleteUser, updateUser } = require('../controllers/users.controller');

router.get('/users', getAllUsers);

router.get('/users/:id', getUser);

router.post('/users', insertUser);

router.put('/users', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;