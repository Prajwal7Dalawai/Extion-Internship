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
    let last_active_dot = document.querySelector('.slider .dots li.active');
    if (last_active_dot) last_active_dot.classList.remove('active');
    dots[active].classList.add('active');
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
let timer = document.getElementById('timeLeft');

function loadQuestion() {
    if (count < 11 && questionIndex < 10) {
        var subDiv = divisions[count];
        var qstn = subDiv.getElementsByClassName('question')[0]; // Access the first element
        var qstnObj = questions[questionIndex];
        qstn.innerText = qstnObj.question;
        var buttons = subDiv.querySelectorAll('.ansButton button');
        enableButtons(buttons);
        buttons.forEach((button, i) => {
            button.innerText = qstnObj.choices[i];
        });
        evaluateAndUpdate(buttons, qstnObj);
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
            if (i == qstnObj.correctAnswer) {
                score = score + 4;
                setInterval(()=>{
                    button.style.background = "green";
                    disbleButtons(buttons);
                },250);
                setTimeout(()=>{
                    loadNext();
                },2000);

            } else {
                score = score - 1;
                setInterval(()=>{
                    for(var i = 0; i<buttons.length; i++){
                        if(i!=qstnObj.correctAnswer){
                            buttons[i].style.background = "red";
                        }
                    }
                    buttons[qstnObj.correctAnswer].style.background = "green";
                    disbleButtons(buttons);
                },150);
            }
            answerSelected = true;
            console.log(score);
        });
    });
}

function displayFinalScore() {
    document.getElementById('finalScore').innerText = score;
}

function enableButtons(buttons){
    for(var i = 0; i<buttons.length; i++){
        buttons[i].disabled = false;
    }
}

function disbleButtons(buttons){
    for(var i = 0; i<buttons.length; i++){
        buttons[i].disabled = true;
        buttons[i].style.cursor = "not-allowed";
    }
}

async function timeRemaining(timer) {
    
}

function loadNext(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
    // Reduce score if no answer was selected
    if (!answerSelected) {
        score -= 1;
        console.log(score);
    }
    if (questionIndex < questions.length) {
        loadQuestion();
    } else {
        displayFinalScore();
    }

}
