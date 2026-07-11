const questions = [
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "Which CSS property changes the text color?",
        answers: ["font-color", "text-color", "color", "background-color"],
        correct: 2
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        answers: ["var", "let", "const", "constant"],
        correct: 2
    },
    {
        question: "Which CSS property makes text bold?",
        answers: ["font-style", "font-weight", "text-style", "text-weight"],
        correct: 1
    },
    {
        question: "Which method prints output in the browser console?",
        answers: ["print()", "console.log()", "document.print()", "log()"],
        correct: 1
    }
];

let currentQuestion = 0;
let userAnswers = [];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answerButtons = document.getElementById("answer-buttons");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    userAnswers = [];

    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    showQuestion();
}

function showQuestion() {
    nextBtn.classList.add("hide");
    answerButtons.innerHTML = "";

    const q = questions[currentQuestion];

    questionNumber.innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.innerText = q.question;

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.innerText = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answerButtons.appendChild(button);
    });
}

function selectAnswer(index, selectedButton) {
    userAnswers[currentQuestion] = index;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.classList.remove("selected");
    });

    selectedButton.classList.add("selected");

    nextBtn.classList.remove("hide");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    let score = 0;
    let reviewHTML = "";

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correct;

        if (isCorrect) {
            score++;
        }

        reviewHTML += `
            <div class="review-item ${isCorrect ? "right" : "wrong"}">
                <h3>${index + 1}. ${q.question}</h3>

                <p>
                    Your Answer:
                    <span class="${isCorrect ? "correct-text" : "wrong-text"}">
                        ${q.answers[userAnswer]}
                    </span>
                </p>

                ${
                    isCorrect
                    ? `<p class="correct-text">✓ Right Answer</p>`
                    : `
                        <p class="wrong-text">✗ Wrong Answer</p>
                        <p class="correct-text">
                            Correct Answer: ${q.answers[q.correct]}
                        </p>
                      `
                }
            </div>
        `;
    });

    document.getElementById("final-score").innerText =
        `Your Score: ${score} / ${questions.length}`;

    document.getElementById("review-container").innerHTML = reviewHTML;
}
