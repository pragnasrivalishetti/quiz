const quiz = [

{
question:"Which HTML tag is used to create a hyperlink?",
options:["<a>","<link>","<href>","<url>"],
answer:"<a>"
},

{
question:"Which CSS property makes a Flexbox container?",
options:["display:flex","flexbox:true","position:flex","layout:flex"],
answer:"display:flex"
},

{
question:"What is the output of typeof null in JavaScript?",
options:["null","object","undefined","string"],
answer:"object"
},

{
question:"Which JavaScript method selects an element by ID?",
options:[
"querySelector()",
"getElementById()",
"getElementsByTagName()",
"getElementsByClassName()"
],
answer:"getElementById()"
},

{
question:"Which keyword cannot be reassigned after declaration?",
options:[
"var",
"let",
"const",
"static"
],
answer:"const"
}

];

let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");

function loadQuestion(){

questionNumber.innerHTML =
`Question ${currentQuestion+1} of ${quiz.length}`;

question.innerHTML = quiz[currentQuestion].question;

options.innerHTML="";

quiz[currentQuestion].options.forEach(option=>{

options.innerHTML +=
`
<label class="option">
<input type="radio" name="answer" value="${option}">
${option}
</label>
`;

});

}

loadQuestion();

nextBtn.onclick=function(){

const selected =
document.querySelector('input[name="answer"]:checked');

if(!selected){

alert("Please select an answer!");

return;

}

if(selected.value===quiz[currentQuestion].answer){

score++;

}

currentQuestion++;

if(currentQuestion<quiz.length){

loadQuestion();

}
else{

questionNumber.style.display="none";

question.style.display="none";

options.style.display="none";

nextBtn.style.display="none";

result.innerHTML=
`
<h2>🎉 Quiz Completed!</h2>

<p>Your Score: ${score} / ${quiz.length}</p>

<p>${
score==5
?"Excellent! ⭐⭐⭐⭐⭐"
:score>=4
?"Very Good! 👍"
:score>=3
?"Good Job 😊"
:"Keep Practicing 💪"
}</p>

<button onclick="location.reload()">Restart Quiz</button>

`;

}

}
