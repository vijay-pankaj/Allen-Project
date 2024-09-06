const app = require('./app');
const cronJob = require('./cron/quizStatusUpdater');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  cronJob(); // Start the cron job
});
