const cron = require('node-cron');
const Quiz = require('../models/Quiz');

const updateQuizStatus = async () => {
  const now = new Date();

  await Quiz.updateMany({ startDate: { $lte: now }, endDate: { $gte: now } }, { status: 'active' });
  await Quiz.updateMany({ endDate: { $lt: now } }, { status: 'finished' });
};

// Schedule the cron job to run every minute
cron.schedule('* * * * *', updateQuizStatus);

module.exports = updateQuizStatus;
