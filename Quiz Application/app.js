// Functions for sliding effects
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
   // last_active_dot.classList.remove('active');
    dots[active].classList.add('active');
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
});
//Sliding functions ends here


// Quiz functions
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: 2
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 1
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        correctAnswer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;
let qno = 0; //Question number
let qstn = document.querySelectorAll('.question');
let btn = document.querySelectorAll('.ansButton button');


// function loadQuestion() {
//     for(var i=0; i<questions.length;i++){
//     if (currentQuestionIndex < questions.length) {
//         const questionObj = questions[currentQuestionIndex];
//         document.querySelectorAll('.question')[qno].innerText = questionObj.question;
//         const choices = document.querySelectorAll('.ansButton button');
//         choices.forEach((button, index) => {
//             button.innerText = questionObj.choices[index];
//         });
//     } else {
//         endQuiz();
//     }
// }
// }

function checkAnswer(choiceIndex) {
    const questionObj = questions[currentQuestionIndex];
    if (choiceIndex === questionObj.correctAnswer) {
        score++;
        document.getElementById('feedback').innerText = "Correct!";
    } else {
        document.getElementById('feedback').innerText = "Wrong!";
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    deactivateButtons();
    currentQuestionIndex++;
    setTimeout(() => {
        document.getElementById('feedback').innerText = "";
        loadQuestion();
        activateButtons();
    }, 1000);
}

function deactivateButtons() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(button => {
        button.disabled = true;
    });
}

function activateButtons() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(button => {
        button.disabled = false;
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById('quiz').innerHTML = `<h2>Quiz Over!</h2><p>Your final score is ${score}</p>`;
}

window.onload = () => {
    //loadQuestion();
    qstn.forEach((q)=>{
        if (currentQuestionIndex < questions.length) {
            const questionObj = questions[currentQuestionIndex];
            q.innerText = questionObj.question;
            btn.forEach((button, index) => {
                button.innerText = questionObj.choices[index];
            });
            currentQuestionIndex++;
        }
    
    });
    startTimer();
};

