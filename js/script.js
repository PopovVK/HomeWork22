const questions = [
  {
    caption: 'Подія натискання на елемент називається click?',
    correctAnswer: true,
  },
  {
    caption: 'Усередині розмітки не можна додати обробник події?',
    correctAnswer: false,
  },
  {
    caption: 'Припинити спливання події можна за допомогою метода stopImmediatePropagation?',
    correctAnswer: false,
  },
  {
    caption: 'Припинити спливання події можна за допомогою метода stopPropagation?',
    correctAnswer: true,
  },
];

const questionsContainer = document.getElementById('questions');
const checkButton = document.getElementById('checkButton');
const resultDiv = document.getElementById('result');

function renderQuestions() {
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `Питання ${index + 1}: ${question.caption} (Так <input type="radio" name="q${index}" value="true"> Ні <input type="radio" name="q${index}" value="false">)`;
    questionsContainer.appendChild(questionDiv);

    // Add event listeners to radio buttons for each question
    const radioButtons = questionDiv.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
      radio.addEventListener('change', () => {
        checkButton.disabled = !areAllQuestionsAnswered();
      });
    });
  });
}

function areAllQuestionsAnswered() {
  const answerInputs = document.querySelectorAll('input[type="radio"]:checked');
  return answerInputs.length === questions.length;
}

function checkAnswers() {
  if (!areAllQuestionsAnswered()) {
    alert('Будь ласка, відповідайте на всі питання.');
    return;
  }

  let correctAnswers = 0;
  questions.forEach((question, index) => {
    const userAnswer = document.querySelector(`input[name="q${index}"]:checked`).value === 'true';
    if (userAnswer === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const resultText = `Ви дали ${correctAnswers} правильних відповідей з ${questions.length}.`;
  resultDiv.textContent = resultText;
}

renderQuestions();

checkButton.addEventListener('click', checkAnswers);
