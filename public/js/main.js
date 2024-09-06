document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const submitButton = document.getElementById('submit-answer');
    const feedback = document.getElementById('feedback');
    let selectedOption = null; // Variable to store user's selected option
    let quizId = null; // Variable to store the current quiz ID
  
    // Function to fetch the active quiz
    const fetchActiveQuiz = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quizzes/active');
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const activeQuiz = await response.json();
        
        if (activeQuiz) {
          quizId = activeQuiz._id; // Store the current quiz ID
          questionText.textContent = activeQuiz.question;
          optionsList.innerHTML = '';
          activeQuiz.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${option}`;
            li.addEventListener('click', () => {
              selectedOption = index; // Store selected option
              feedback.textContent = `You selected option ${index + 1}`;
            });
            optionsList.appendChild(li);
          });
          feedback.textContent = '';
        } else {
          questionText.textContent = 'No active quiz at the moment.';
          optionsList.innerHTML = '';
        }
      } catch (error) {
        console.error('Error fetching active quiz:', error);
        questionText.textContent = 'Error fetching quiz.';
      }
    };
  
    const submitAnswer = async () => {
      if (selectedOption === null || quizId === null) {
        feedback.textContent = 'Please select an option first.';
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/quizzes/${quizId}/submit-answer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedOption }),
        });
  
        const result = await response.json();
        feedback.textContent = result.message;
      } catch (error) {
        console.error('Error submitting answer:', error);
        feedback.textContent = 'Error submitting answer.';
      }
    };
  
    submitButton.addEventListener('click', submitAnswer);
  
    setInterval(fetchActiveQuiz, 10000);  // Poll every 10 seconds
    fetchActiveQuiz(); // Initial fetch
  });
  