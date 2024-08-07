// Functions for sliding effects
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');
let start = document.querySelector('#start button');
prev.disabled = true;

let lengthItems = items.length - 1;
let active = 0;
let answerSelected = false;
let timerInterval;
let timerElement;

prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

next.onclick = function() {
    prev.disabled = false;
    loadNext();
    answerSelected = false; // Reset for next question
}

function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';
    dots.forEach(dot => dot.classList.remove('active')); // Remove active class from all dots
    dots[active].classList.add('active'); // Add active class to the current dot
}

start.onclick = function() {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
    loadQuestion();
    next.disabled = false;
    prev.disabled = false;
}

// Quiz functions
const questions = [
    {
        "question": "01. What is the Heisenberg Uncertainty Principle?",
        "choices": ["Energy conservation", "Speed of light", "Position and momentum", "Atomic structure"],
        "correctAnswer": 2
    },
    {
        "question": "02. What does Fermat's Last Theorem state?",
        "choices": ["Even primes", "No solution for n > 2", "Right triangle", "Prime factors"],
        "correctAnswer": 1
    },
    {
        "question": "03. In Dante's 'Divine Comedy,' what are the three parts of the journey through the afterlife?",
        "choices": ["Heaven, Hell, Earth", "Limbo, Purgatory, Heaven", "Inferno, Purgatorio, Paradiso", "Hades, Elysium, Tartarus"],
        "correctAnswer": 2
    },
    {
        "question": "04. Who was the first emperor of the Roman Empire?",
        "choices": ["Julius Caesar", "Augustus", "Nero", "Constantine"],
        "correctAnswer": 1
    },
    {
        "question": "05. What is the significance of the Higgs boson particle?",
        "choices": ["Nuclear force", "Electromagnetic force", "Provides mass", "Dark matter"],
        "correctAnswer": 2
    },
    {
        "question": "06. What is the molecular geometry of a water (H2O) molecule?",
        "choices": ["Linear", "Trigonal planar", "Tetrahedral", "Bent"],
        "correctAnswer": 3
    },
    {
        "question": "07. What is the time complexity of the quicksort algorithm in the average case?",
        "choices": ["O(n^2)", "O(n log n)", "O(log n)", "O(n)"],
        "correctAnswer": 1
    },
    {
        "question": "08. What is the function of ribosomes in a cell?",
        "choices": ["Energy production", "Protein synthesis", "DNA replication", "Cell division"],
        "correctAnswer": 1
    },
    {
        "question": "09. What does the term 'stagflation' refer to?",
        "choices": ["High inflation, high unemployment", "Low inflation, high growth", "High inflation, high growth", "Low inflation, high unemployment"],
        "correctAnswer": 0
    },
    {
        "question": "10. Who wrote 'The Republic,' a work concerning justice and the ideal state?",
        "choices": ["Aristotle", "Plato", "Socrates", "Descartes"],
        "correctAnswer": 1
    }
];


let divisions = document.querySelectorAll('.innerItem');
let count = 1;
let questionIndex = 0;
let score = 0;

function startTimer() {
    let timeLeft = 20;
    timerElement.innerText = `${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerElement.innerText = `Remaining time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answerSelected) {
                score -= 1;
                console.log(score);
                disableButtons(); // Disable all buttons
            }
            loadNext();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

function loadQuestion() {
    if (count < 11 && questionIndex < 10) {
        let subDiv = divisions[count];
        let qstn = subDiv.getElementsByClassName('question')[0]; // Access the first element
        let qstnObj = questions[questionIndex];
        qstn.innerText = qstnObj.question;
        let buttons = subDiv.querySelectorAll('.ansButton button');
        enableButtons(buttons);
        buttons.forEach((button, i) => {
            button.innerText = `${i + 1}. ${qstnObj.choices[i]}`;
        });
        evaluateAndUpdate(buttons, qstnObj);
        timerElement = subDiv.querySelector('.time');
        resetTimer();
        count++;
        questionIndex++;
    } else {
        count = 1;
        questionIndex = 0;
        next.disabled = true;
        displayFinalScore();
    }
}

function evaluateAndUpdate(buttons, qstnObj) {
    buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
            button.style.background = "purple";
            clearInterval(timerInterval); // Stop the timer when an answer is selected
            if (i == qstnObj.correctAnswer) {
                score += 4;
                setTimeout(() => {
                    button.style.background = "green";
                    disableButtons(buttons); // Disable only the buttons for this question
                }, 250);
                setTimeout(() => {
                    loadNext();
                }, 500);

            } else {
                score -= 1;
                setTimeout(() => {
                    buttons.forEach((btn, idx) => {
                        if (idx !== qstnObj.correctAnswer) {
                            btn.style.background = "red";
                        }
                    });
                    buttons[qstnObj.correctAnswer].style.background = "green";
                    disableButtons(buttons); // Disable only the buttons for this question
                }, 150);
            }
            answerSelected = true;
            console.log(score);
        });
    });
}

function displayFinalScore() {
    document.getElementById('finalScore').innerText = score;
}

function enableButtons(buttons) {
    buttons.forEach(button => button.disabled = false);
}

function disableButtons(buttons) {
    if (buttons) {
        buttons.forEach(button => {
            button.disabled = true;
            button.style.cursor = "not-allowed";
        });
    } else {
        // If no buttons are passed, disable all buttons in the current question
        let allButtons = document.querySelectorAll('.ansButton button');
        allButtons.forEach(button => {
            button.disabled = true;
            button.style.cursor = "not-allowed";
        });
    }
}

function loadNext() {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
    if (questionIndex < questions.length) {
        loadQuestion();
    } else {
        displayFinalScore();
    }
}

let restart = document.querySelector('#reset');
restart.addEventListener('click',()=>{
    window.location.reload(true);
});
