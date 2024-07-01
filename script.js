document.getElementById('start-survey').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name && email) {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('survey').style.display = 'block';
    } else {
        alert('Please enter your name and email.');
    }
});

const questions = [
    { category: "Verbal/Linguistic", question: "I enjoy reading books." },
    { category: "Verbal/Linguistic", question: "I like to write." },
    { category: "Logical/Mathematical", question: "I enjoy solving puzzles." },
    { category: "Logical/Mathematical", question: "I like to work with numbers." },
    { category: "Visual/Spatial", question: "I enjoy drawing." },
    { category: "Visual/Spatial", question: "I like to visualize things in my mind." },
    { category: "Musical/Rhythmic", question: "I enjoy listening to music." },
    { category: "Musical/Rhythmic", question: "I can keep rhythm easily." },
    { category: "Bodily/Kinesthetic", question: "I enjoy physical activities." },
    { category: "Bodily/Kinesthetic", question: "I like to move around when thinking." },
    { category: "Interpersonal", question: "I enjoy working in teams." },
    { category: "Interpersonal", question: "I understand others' feelings easily." },
    { category: "Intrapersonal", question: "I am aware of my own emotions." },
    { category: "Intrapersonal", question: "I like to reflect on my thoughts." },
    { category: "Naturalistic", question: "I enjoy spending time in nature." },
    { category: "Naturalistic", question: "I like to observe wildlife." }
];

const questionContainer = document.getElementById('questions');
questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
        <p>${index + 1}. ${q.question}</p>
        <input type="radio" name="q${index}" value="1"> 1
        <input type="radio" name="q${index}" value="2"> 2
        <input type="radio" name="q${index}" value="3"> 3
        <input type="radio" name="q${index}" value="4"> 4
        <input type="radio" name="q${index}" value="5"> 5
    `;
    questionContainer.appendChild(div);
});

document.getElementById('submit-survey').addEventListener('click', function() {
    const responses = [];
    questions.forEach((q, index) => {
        const answer = document.querySelector(`input[name="q${index}"]:checked`);
        if (answer) {
            responses.push({ category: q.category, score: parseInt(answer.value) });
        } else {
            alert('Please answer all questions.');
            return;
        }
    });

    const result = responses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.score;
        return acc;
    }, {});

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    google.script.run.submitSurvey(name, email, result);

    alert('Survey submitted successfully!');
    window.location.href = 'admin.html';
});
