function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    let score = 0;
    let reviewHTML = "";

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = q.correct;

        if (userAnswer === correctAnswer) {
            score++;

            reviewHTML += `
                <div class="review-item right">
                    <h3>${index + 1}. ${q.question}</h3>
                    <p class="correct-text">
                        ✓ Your Answer: ${q.answers[userAnswer]}
                    </p>
                </div>
            `;
        } else {
            reviewHTML += `
                <div class="review-item wrong">
                    <h3>${index + 1}. ${q.question}</h3>

                    <p class="wrong-text">
                        ✗ Your Answer: ${q.answers[userAnswer]}
                    </p>

                    <p class="correct-text">
                        ✓ Correct Answer: ${q.answers[correctAnswer]}
                    </p>
                </div>
            `;
        }
    });

    let message = "";

    if (score === 5) {
        message = "🏆 Excellent! Perfect Score!";
    } else if (score === 4) {
        message = "🌟 Very Good! Great Job!";
    } else if (score === 3) {
        message = "👍 Good! Keep Improving!";
    } else if (score === 2) {
        message = "📚 Fair! Keep Practicing!";
    } else {
        message = "💪 Needs Improvement! Keep Learning!";
    }

    document.getElementById("final-score").innerHTML =
        `Your Score: ${score} / ${questions.length}<br><br>${message}`;

    document.getElementById("review-container").innerHTML = reviewHTML;
}
