const questions = [
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "Which CSS property changes the text color?",
        answers: [
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "background-color", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "constant", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to make text bold?",
        answers: [
            { text: "font-style", correct: false },
            { text: "font-weight", correct: true },
            { text: "text-style", correct: false },
            { text: "text-weight", correct: false }
        ]
    },
    {
        question: "Which method is used to print output in the browser console?",
        answers: [
            { text: "print()", correct: false },
            { text: "console.log()", correct: true },
            { text: "document.print()", correct: false },
            { text: "log()", correct: false }
        ]
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("score-display");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    scoreDisplay.innerText = "Score: 0";
    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.innerText =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerText = answer.text;
        button.classList.add("answer-btn");

        button.addEventListener("click", function () {
            selectAnswer(button, answer.correct);
        });

        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedButton, isCorrect) {
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach((button, index) => {
        if (questions[currentQuestionIndex].answers[index].correct) {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextBtn.classList.remove("hide");
}

function resetState() {
    nextBtn.classList.add("hide");
    answerButtons.innerHTML = "";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    finalScore.innerText = `Your Score: ${score} / ${questions.length}`;

    if (score === 5) {
        resultMessage.innerText = "Excellent! Perfect Score!";
    } else if (score >= 3) {
        resultMessage.innerText = "Good Job! Keep Practicing!";
    } else {
        resultMessage.innerText = "Keep Learning and Try Again!";
    }
}
