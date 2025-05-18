const express = require('express');
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(verifyToken); // all routes below are protected

router.get('/', getTodos);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
