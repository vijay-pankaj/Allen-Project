const Quiz = require('../models/Quiz');

// Create a new quiz
exports.createQuiz = async (req, res, next) => {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;
    const quiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate,
      endDate,
      status: 'inactive',
    });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (err) {
    next(err);
  }
};

// Get active quiz
exports.getActiveQuiz = async (req, res, next) => {
  try {
    const currentQuiz = await Quiz.findOne({
      status: 'active',
    });
    if (!currentQuiz) {
      return res.status(404).json({ message: 'No active quiz found' });
    }
    res.json(currentQuiz);
  } catch (err) {
    next(err);
  }
};

// Get quiz result
exports.getQuizResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    // Ensure the quiz is finished
    if (quiz.status !== 'finished') {
      return res.status(400).json({ message: 'Quiz results are not yet available' });
    }
    res.json({ correctAnswer: quiz.options[quiz.rightAnswer] });
  } catch (err) {
    next(err);
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};
