const questions = [
    { id: 1, text: "I enjoy writing things down." },
    { id: 2, text: "I easily understand math." },
    { id: 3, text: "I like to sing." },
    { id: 4, text: "I can visualize things in my mind." },
    { id: 5, text: "I enjoy physical activities." },
    { id: 6, text: "I can read people's emotions." },
    { id: 7, text: "I understand myself well." },
    { id: 8, text: "I enjoy being in nature." },
    { id: 9, text: "I love reading books." },
    { id: 10, text: "I solve problems easily." },
    { id: 11, text: "I can play a musical instrument." },
    { id: 12, text: "I enjoy drawing." },
    { id: 13, text: "I like to exercise." },
    { id: 14, text: "I am good at making friends." },
    { id: 15, text: "I reflect on my thoughts." },
    { id: 16, text: "I am interested in animals." },
    { id: 17, text: "I have a good vocabulary." },
    { id: 18, text: "I understand scientific concepts." },
    { id: 19, text: "I can keep a beat." },
    { id: 20, text: "I enjoy solving puzzles." },
    { id: 21, text: "I am good at sports." },
    { id: 22, text: "I like helping others." },
    { id: 23, text: "I am aware of my emotions." },
    { id: 24, text: "I am fascinated by plants." },
    { id: 25, text: "I can express myself well in writing." },
    { id: 26, text: "I like working with numbers." },
    { id: 27, text: "I have a good sense of rhythm." },
    { id: 28, text: "I can think in three dimensions." },
    { id: 29, text: "I am physically coordinated." },
    { id: 30, text: "I understand other people's feelings." },
    { id: 31, text: "I can analyze my thoughts." },
    { id: 32, text: "I like studying ecosystems." },
    { id: 33, text: "I enjoy reading poetry." },
    { id: 34, text: "I am good at logic games." },
    { id: 35, text: "I enjoy composing music." },
    { id: 36, text: "I have a vivid imagination." },
    { id: 37, text: "I like dancing." },
    { id: 38, text: "I can empathize with others." },
    { id: 39, text: "I am introspective." },
    { id: 40, text: "I am interested in geology." },
    { id: 41, text: "I like to tell stories." },
    { id: 42, text: "I excel at mathematics." },
    { id: 43, text: "I can identify different musical notes." },
    { id: 44, text: "I can solve spatial problems." },
    { id: 45, text: "I enjoy outdoor activities." },
    { id: 46, text: "I am good at socializing." },
    { id: 47, text: "I am aware of my strengths and weaknesses." },
    { id: 48, text: "I enjoy studying biology." },
    { id: 49, text: "I have a good memory for words." },
    { id: 50, text: "I understand abstract concepts." },
    { id: 51, text: "I can compose melodies." },
    { id: 52, text: "I enjoy solving visual puzzles." },
    { id: 53, text: "I am physically fit." },
    { id: 54, text: "I can understand non-verbal cues." }
];

const totalQuestions = questions.length;
const questionsPerPage = 10;
let currentPage = 0;
let responses = {};

document.addEventListener("DOMContentLoaded", function() {
    displayQuestions();
    document.getElementById('next').addEventListener('click', nextPage);
    document.getElementById('prev').addEventListener('click', prevPage);
    document.getElementById('submit').addEventListener('click', submitQuiz);
});

function displayQuestions() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, totalQuestions);

    for (let i = start; i < end; i++) {
        const question = questions[i];
        const savedResponse = responses[`question-${question.id}`] || '';
        questionContainer.innerHTML += `
            <div class="question">
                <label>${question.id}. ${question.text}</label>
                <input type="radio" name="question-${question.id}" value="1" ${savedResponse == '1' ? 'checked' : ''}> 1
                <input type="radio" name="question-${question.id}" value="2" ${savedResponse == '2' ? 'checked' : ''}> 2
                <input type="radio" name="question-${question.id}" value="3" ${savedResponse == '3' ? 'checked' : ''}> 3
                <input type="radio" name="question-${question.id}" value="4" ${savedResponse == '4' ? 'checked' : ''}> 4
                <input type="radio" name="question-${question.id}" value="5" ${savedResponse == '5' ? 'checked' : ''}> 5
            </div>
        `;
    }

    document.getElementById('prev').style.display = currentPage > 0 ? 'inline-block' : 'none';
    document.getElementById('next').style.display = (end < totalQuestions) ? 'inline-block' : 'none';
    document.getElementById('submit').style.display = (end === totalQuestions) ? 'inline-block' : 'none';
}

function nextPage() {
    saveResponses();
    if ((currentPage + 1) * questionsPerPage < totalQuestions) {
        currentPage++;
        displayQuestions();
    }
}

function prevPage() {
    saveResponses();
    if (currentPage > 0) {
        currentPage--;
        displayQuestions();
    }
}

function saveResponses() {
    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, totalQuestions);

    for (let i = start; i < end; i++) {
        const question = questions[i];
        const radios = document.getElementsByName(`question-${question.id}`);
        for (const radio of radios) {
            if (radio.checked) {
                responses[`question-${question.id}`] = radio.value;
            }
        }
    }
}

function submitQuiz() {
    saveResponses();

    const scores = {
        linguistic: 0,
        logicalMathematical: 0,
        musical: 0,
        spatial: 0,
        bodilyKinesthetic: 0,
        interpersonal: 0,
        intrapersonal: 0,
        naturalist: 0
    };

    for (const [key, value] of Object.entries(responses)) {
        const questionId = parseInt(key.split('-')[1]);
        const score = parseInt(value);

        if (questionId <= 7) {
            scores.linguistic += score;
        } else if (questionId <= 14) {
            scores.logicalMathematical += score;
        } else if (questionId <= 21) {
            scores.musical += score;
        } else if (questionId <= 28) {
            scores.spatial += score;
        } else if (questionId <= 35) {
            scores.bodilyKinesthetic += score;
        } else if (questionId <= 42) {
            scores.interpersonal += score;
        } else if (questionId <= 49) {
            scores.intrapersonal += score;
        } else {
            scores.naturalist += score;
        }
    }

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        linguistic: ((scores.linguistic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
        logicalMathematical: ((scores.logicalMathematical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
        musical: ((scores.musical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
        spatial: ((scores.spatial / (totalQuestions / 8 * 5)) * 100).toFixed(2),
        bodilyKinesthetic: ((scores.bodilyKinesthetic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
        intrapersonal: ((scores.intrapersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
        naturalist: ((scores.naturalist / (totalQuestions / 8 * 5)) * 100).toFixed(2)
    };

    google.script.run.saveSurveyResults(data);
    alert('Survey submitted successfully!');
    window.location.href = 'index.html';
}