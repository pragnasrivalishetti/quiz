const questions = [

    {
        question: "What does HTML stand for?",

        answers: [
            "Home Text Markup Language",
            "Hyper Tool Markup Language",
            "High Text Machine Language",
            "Hyper Text Markup Language"
        ],

        correct: 3
    },

    {
        question: "Which CSS property changes the text color?",

        answers: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],

        correct: 2
    },

    {
        question: "Which keyword is used to declare a constant in JavaScript?",

        answers: [
            "var",
            "let",
            "const",
            "constant"
        ],

        correct: 2
    },

    {
        question: "Which CSS property is used to make text bold?",

        answers: [
            "font-style",
            "font-weight",
            "text-style",
            "text-weight"
        ],

        correct: 1
    },

    {
        question: "Which method prints output in the browser console?",

        answers: [
            "print()",
            "console.log()",
            "document.print()",
            "log()"
        ],

        correct: 1
    }

];


// VARIABLES

let currentQuestion = 0;

let userAnswers =
    new Array(questions.length).fill(null);


// GET HTML ELEMENTS

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const answersScreen =
    document.getElementById("answers-screen");

const startBtn =
    document.getElementById("start-btn");

const previousBtn =
    document.getElementById("previous-btn");

const nextBtn =
    document.getElementById("next-btn");

const submitBtn =
    document.getElementById("submit-btn");

const viewAnswersBtn =
    document.getElementById("view-answers-btn");

const backResultBtn =
    document.getElementById("back-result-btn");

const questionElement =
    document.getElementById("question");

const questionNumber =
    document.getElementById("question-number");

const answeredCount =
    document.getElementById("answered-count");

const answerButtons =
    document.getElementById("answer-buttons");

const finalScore =
    document.getElementById("final-score");

const reward =
    document.getElementById("reward");

const reviewContainer =
    document.getElementById("review-container");


// EVENT LISTENERS

startBtn.addEventListener("click", startQuiz);

previousBtn.addEventListener(
    "click",
    previousQuestion
);

nextBtn.addEventListener(
    "click",
    saveAndNext
);

submitBtn.addEventListener(
    "click",
    submitQuiz
);

viewAnswersBtn.addEventListener(
    "click",
    viewAnswers
);

backResultBtn.addEventListener(
    "click",
    backToResult
);


// START QUIZ

function startQuiz() {

    startScreen.classList.add("hide");

    quizScreen.classList.remove("hide");

    currentQuestion = 0;

    userAnswers =
        new Array(questions.length).fill(null);

    showQuestion();
}


// SHOW QUESTION

function showQuestion() {

    answerButtons.innerHTML = "";

    const q =
        questions[currentQuestion];


    questionNumber.innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    updateAnsweredCount();


    questionElement.innerText =
        q.question;


    q.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.innerText =
                answer;

            button.classList.add(
                "answer-btn"
            );


            // SHOW PREVIOUSLY SAVED ANSWER

            if (
                userAnswers[currentQuestion]
                === index
            ) {

                button.classList.add(
                    "selected"
                );
            }


            button.addEventListener(
                "click",
                function () {

                    selectAnswer(index);

                }
            );


            answerButtons.appendChild(
                button
            );
        }
    );


    // DISABLE PREVIOUS BUTTON
    // ON FIRST QUESTION

    previousBtn.disabled =
        currentQuestion === 0;


    // CHANGE BUTTON ON LAST QUESTION

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextBtn.innerText =
            "Save";

    } else {

        nextBtn.innerText =
            "Save & Next";
    }
}


// SELECT ANSWER

function selectAnswer(index) {

    userAnswers[currentQuestion] =
        index;


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "selected"
            );

        }
    );


    buttons[index].classList.add(
        "selected"
    );


    updateAnsweredCount();
}


// UPDATE ANSWERED COUNT

function updateAnsweredCount() {

    const answered =
        userAnswers.filter(
            answer =>
                answer !== null
        ).length;


    answeredCount.innerText =
        `Answered: ${answered}/${questions.length}`;
}


// SAVE AND NEXT

function saveAndNext() {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();
    }
}


// PREVIOUS QUESTION

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }
}


// SUBMIT QUIZ

function submitQuiz() {

    let score = 0;

    let reviewHTML = "";


    questions.forEach(
        (q, index) => {

            const userAnswer =
                userAnswers[index];


            // CALCULATE SCORE

            if (
                userAnswer ===
                q.correct
            ) {

                score++;
            }


            // NOT ANSWERED

            if (userAnswer === null) {

                reviewHTML += `

                    <div class="review-item">

                        <h3>
                            ${index + 1}. ${q.question}
                        </h3>

                        <p class="wrong-answer">
                            ✗ Not Answered
                        </p>

                        <p class="correct-answer">
                            ✓ Correct Answer:
                            ${q.answers[q.correct]}
                        </p>

                    </div>
                `;

            }


            // CORRECT ANSWER

            else if (
                userAnswer === q.correct
            ) {

                reviewHTML += `

                    <div class="review-item">

                        <h3>
                            ${index + 1}. ${q.question}
                        </h3>

                        <p class="correct-answer">
                            ✓ Your Answer:
                            ${q.answers[userAnswer]}
                        </p>

                    </div>
                `;

            }


            // WRONG ANSWER

            else {

                reviewHTML += `

                    <div class="review-item">

                        <h3>
                            ${index + 1}. ${q.question}
                        </h3>

                        <p class="wrong-answer">
                            ✗ Your Answer:
                            ${q.answers[userAnswer]}
                        </p>

                        <p class="correct-answer">
                            ✓ Correct Answer:
                            ${q.answers[q.correct]}
                        </p>

                    </div>
                `;
            }
        }
    );


    // HIDE QUIZ

    quizScreen.classList.add("hide");


    // SHOW RESULT SCREEN

    resultScreen.classList.remove(
        "hide"
    );


    // DISPLAY SCORE

    finalScore.innerText =
        `Your Score: ${score}/${questions.length}`;


    // REWARD BASED ON SCORE

    if (score === 5) {

        reward.innerText =
            "🏆 Excellent! Perfect Score!";

    }

    else if (score === 4) {

        reward.innerText =
            "🥇 Very Good! Great Performance!";

    }

    else if (score === 3) {

        reward.innerText =
            "🥈 Good Job! Keep Improving!";

    }

    else if (score === 2) {

        reward.innerText =
            "🥉 Nice Try! Keep Practicing!";

    }

    else {

        reward.innerText =
            "📚 Keep Learning! You Can Do Better!";
    }


    // SAVE ANSWER REVIEW

    reviewContainer.innerHTML =
        reviewHTML;
}


// VIEW ANSWERS

function viewAnswers() {

    resultScreen.classList.add("hide");

    answersScreen.classList.remove(
        "hide"
    );
}


// BACK TO RESULT

function backToResult() {

    answersScreen.classList.add("hide");

    resultScreen.classList.remove(
        "hide"
    );
}
