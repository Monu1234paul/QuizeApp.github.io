const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correct: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Silver", "Oxygen", "Iron"],
        correct: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const messageDiv = document.getElementById('message');
const nextButton = document.getElementById('next-btn');
const resultsDiv = document.getElementById('results');
const scoreSpan = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const currentQuestionSpan = document.getElementById('current-question');

function showQuestion() {
    const question = questions[currentQuestion];
    
    currentQuestionSpan.textContent = currentQuestion + 1;
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    messageDiv.textContent = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        
        button.onclick = () => checkAnswer(index);
        
        optionsContainer.appendChild(button);
    });
    
    nextButton.style.display = 'none';
    answered = false;
}

function checkAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const correct = questions[currentQuestion].correct;
    const buttons = optionsContainer.getElementsByClassName('option-btn');
    
    buttons[selectedIndex].classList.add(selectedIndex === correct ? 'correct' : 'wrong');
    buttons[correct].classList.add('correct');
    
    if (selectedIndex === correct) {
        score++;
        messageDiv.textContent = "Correct! Well done! 👏";
    } else {
        messageDiv.textContent = "Wrong! The correct answer was: " + 
            questions[currentQuestion].options[correct];
    }
    
    nextButton.style.display = 'block';
}

nextButton.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    document.querySelector('.quiz-section').style.display = 'none';
    nextButton.style.display = 'none';
    resultsDiv.classList.remove('hide');
    scoreSpan.textContent = score;
}

restartButton.onclick = () => {
    currentQuestion = 0;
    score = 0;
    document.querySelector('.quiz-section').style.display = 'block';
    resultsDiv.classList.add('hide');
    showQuestion();
};

showQuestion(); 