
let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Wie stellt man Text am besten Fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "CSS nutzen",
        "answer_3": "&lt;bold&gt;",
        "answer_4": "&lt;&gt;",
        "right_answer": 1
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in Javascript eine Variable?",
        "answer_1": "let 100 = rate",
        "answer_2": "100 = let rate",
        "answer_3": "rate = 100",
        "answer_4": "let rate = 100",
        "right_answer": 3
    }
];


let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');

function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {   // show question
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndscreen() {
    document.getElementById('endScreen').style.display = "flex";
    document.getElementById('questionBody').style.display = "none";
    document.getElementById('mainCard').style.display = "none";
    document.getElementById('reachedScore').innerHTML = rightQuestions;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('actualQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        youWin(idOfRightAnswer);
    } else {
        youLose(selection, idOfRightAnswer);
    }
    document.getElementById('nextButton').disabled = false;
}

function youWin(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    AUDIO_SUCCESS.play();
    rightQuestions++;
}

function youLose(selection,idOfRightAnswer) {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_WRONG.play();
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function showCard() {
    document.getElementById('main-container').classList.remove('d-none');
    document.getElementById('welcome').classList.add('d-none');
}

function replayGame() {
    document.getElementById('endScreen').style.display = "none";
    document.getElementById('questionBody').style.display = "";
    document.getElementById('mainCard').style.display = "";
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}