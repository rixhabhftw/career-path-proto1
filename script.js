const questions = [
    { id: 1, text: "I enjoy writing things down." },
    { id: 2, text: "I easily understand math." },
    { id: 3, text: "I like to sing." },
    { id: 4, text: "I can visualize things in my mind." },
    { id: 5, text: "I enjoy physical activities." },
    { id: 6, text: "I can read people's emotions." },
    { id: 7, text: "I understand myself well." },
    { id: 8, text: "I enjoy being in nature." },
    // Add the remaining questions in the same format
    // ...
];

const totalQuestions = questions.length;
const questionsPerPage = 10;
let currentPage = 0;

document.addEventListener("DOMContentLoaded", function() {
    displayQuestions();
});

function displayQuestions() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, totalQuestions);

    for (let i = start; i < end; i++) {
        const question = questions[i];
        questionContainer.innerHTML += `
            <div class="question">
                <label>${question.id}. ${question.text}</label>
                <input type="radio" name="question-${question.id}" value="1"> 1
                <input type="radio" name="question-${question.id}" value="2"> 2
                <input type="radio" name="question-${question.id}" value="3"> 3
                <input type="radio" name="question-${question.id}" value="4"> 4
                <input type="radio" name="question-${question.id}" value="5"> 5
            </div>
        `;
    }
}

function nextPage() {
    if ((currentPage + 1) * questionsPerPage < totalQuestions) {
        currentPage++;
        displayQuestions();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayQuestions();
    }
}