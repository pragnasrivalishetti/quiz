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
        question: "Which keyword is used to declare a constant in JavaScript?",
        answers: ["var", "let", "const", "constant"],
        correct: 2
    },
    {
        question: "Which CSS property is used to make text bold?",
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
let userAnswers = new Array(questions.length).fill(null);

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const endBtn = document.getElementById("end-btn");

const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answeredCount = document.getElementById("answered-count");
const answerButtons = document.getElementById("answer-buttons");

startBtn.addEventListener("click", startQuiz);
previousBtn.addEventListener("click", previousQuestion);
nextBtn.addEventListener("click", saveAndNext);
submitBtn.addEventListener("click", submitQuiz);
endBtn.addEventListener("click", endQuiz);


function startQuiz() {
    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);

    showQuestion();
}


function showQuestion() {
    answerButtons.innerHTML = "";

    const q = questions[currentQuestion];

    questionNumber.innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const answered = userAnswers.filter(answer => answer !== null).length;

    answeredCount.innerText =
        `Answered: ${answered}/${questions.length}`;

    questionElement.innerText = q.question;

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.innerText = answer;
        button.classList.add("answer-btn");

        // Show previously selected answer
        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        answerButtons.appendChild(button);
    });

    // Disable Previous on first question
    previousBtn.disabled = currentQuestion === 0;

    // Change button text on last question
    if (currentQuestion === questions.length - 1) {
        nextBtn.innerText = "Save";
    } else {
        nextBtn.innerText = "Save & Next";
    }
}


function selectAnswer(index) {

    // Save selected answer
    userAnswers[currentQuestion] = index;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.classList.remove("selected");
    });

    buttons[index].classList.add("selected");

    // Update answered count
    const answered = userAnswers.filter(answer => answer !== null).length;

    answeredCount.innerText =
        `Answered: ${answered}/${questions.length}`;
}


function saveAndNext() {

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}


function previousQuestion() {

    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}


function submitQuiz() {

    let score = 0;
    let reviewHTML = "";

    questions.forEach((q, index) => {

        const userAnswer = userAnswers[index];

        if (userAnswer === q.correct) {
            score++;
        }

        reviewHTML += `
            <div class="review-item">

                <h3>
                    ${index + 1}. ${q.question}
                </h3>

                ${
                    userAnswer === null
                    ? `<p class="wrong-answer">
                        Not Answered
                       </p>`

                    : userAnswer === q.correct
                    ? `<p class="correct-answer">
                        ✓ Your Answer: ${q.answers[userAnswer]}
                       </p>`

                    : `
                       <p class="wrong-answer">
                           ✗ Your Answer: ${q.answers[userAnswer]}
                       </p>

                       <p class="correct-answer">
                           ✓ Correct Answer: ${q.answers[q.correct]}
                       </p>
                      `
                }

            </div>
        `;
    });

    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    // Display score
    document.getElementById("final-score").innerText =
        `Your Score: ${score}/${questions.length}`;

    // Reward based on score
    let rewardMessage = "";

    if (score === 5) {
        rewardMessage = "🏆 Excellent! You are a Web Development Champion!";
    }
    else if (score === 4) {
        rewardMessage = "🥇 Very Good! Great Performance!";
    }
    else if (score === 3) {
        rewardMessage = "🥈 Good Job! Keep Improving!";
    }
    else if (score === 2) {
        rewardMessage = "🥉 Nice Try! Keep Practicing!";
    }
    else {
        rewardMessage = "📚 Keep Learning! You Can Do Better!";
    }

    document.getElementById("reward").innerText = rewardMessage;

    document.getElementById("review-container").innerHTML = reviewHTML;
}


function endQuiz() {

    resultScreen.classList.add("hide");
    endScreen.classList.remove("hide");
}
