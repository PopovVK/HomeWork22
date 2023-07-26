const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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

app.use(cors());
app.use(bodyParser.json());

app.get('/questions', (req, res) => {
  res.json(questions);
});

app.post('/check-answers', (req, res) => {
  const userAnswers = req.body.answers;
  if (!Array.isArray(userAnswers) || userAnswers.length !== questions.length) {
    return res.status(400).json({ error: 'Invalid answers format' });
  }

  let correctAnswers = 0;
  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    if (typeof userAnswer !== 'boolean') {
      return res.status(400).json({ error: 'Invalid answer format' });
    }

    if (userAnswer === question.correctAnswer) {
      correctAnswers++;
    }
  });

  res.json({ correctAnswers, totalQuestions: questions.length });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
