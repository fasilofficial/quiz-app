import { questions } from "./questions.js"
const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const questionContainerElem = document.getElementById('question-container')
const questionElem = document.getElementById('question')
const answerBtns = document.getElementById('answer-buttons')
const count = document.getElementById('count')

let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', () => {
    startGame()
})
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    count.innerText = `${currentQuestionIndex + 1} / ${questions.length}`
    setNextQuestion()
})


function startGame() {
    startBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    count.innerText = `${currentQuestionIndex + 1} / ${questions.length}`
    questionContainerElem.classList.remove('hide')
    setNextQuestion()
    
}
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild)
    }
}
function showQuestion(question) {
    questionElem.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.currect
        }
        button.addEventListener('click', selectAnswer)
        answerBtns.appendChild(button)
    })

}
function selectAnswer(e) {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtns.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}
function setStatusClass(elem, correct) {
    clearStatusClass(elem)
    if (correct) {
        elem.classList.add('correct')
    } else {
        elem.classList.add('wrong')
    }
}
function clearStatusClass(elem) {
    elem.classList.remove('correct')
    elem.classList.remove('wrong')
}