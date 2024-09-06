const express = require('express');
const { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes, submitAnswer } = require('../controllers/quizController');
const router = express.Router();

router.post('/quizzes', createQuiz);
router.get('/quizzes/active', getActiveQuiz);
router.get('/quizzes/:id/result', getQuizResult);
router.get('/quizzes/all', getAllQuizzes);
router.post('/quizzes/:id/submit-answer', submitAnswer); // New route for submitting answers

module.exports = router;
