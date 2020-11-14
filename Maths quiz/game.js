const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which of the following statements is false ?',
        choice1: '(a) Natural numbers are closed under addition',
        choice2: '(b) Whole numbers are closed under addition',
        choice3: '(c) Integers are closed under addition',
        choice4: '(d) Rational numbers are not closed under addition.',
        answer: 4,
    },
    {
        question:
            "Which of the following statements is false ?",
        choice1: "(a) Natural numbers are closed under subtraction",
        choice2: "(b) Whole numbers are not closed under subtraction",
        choice3: "(c) Integers are closed under subtraction",
        choice4: "(d) Rational numbers are closed under subtraction.",
        answer: 1,
    },
    {
        question: "Which of the following statements is true ?",
        choice1: "(a) Natural numbers are closed under multiplication",
        choice2: "(b) Whole numbers are not closed under multiplication",
        choice3: "(c) Integers are not closed under multiplication",
        choice4: "(d) Rational numbers are not closed under multiplication.",
        answer: 1,
    },
    {
        question: "Which of the following statements is true ?",
        choice1: "(a) Natural numbers are closed under division",
        choice2: "(b) Whole numbers are not closed under division",
        choice3: "(c) Integers are closed under division",
        choice4: "(d) Rational numbers are closed under division.",
        answer: 2,
    },
    {
        question: "Which of the following statements is false ?",
        choice1: "(a) Natural numbers are commutative for addition",
        choice2: "(b) Whole numbers are commutative for addition",
        choice3: "(c) Integers are not commutative for addition",
        choice4: "(d) Rational numbers are commutative for addition.",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()