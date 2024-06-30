document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { text: "I enjoy telling stories.", category: "linguistic" },
        { text: "I find it easy to remember quotes and jokes.", category: "linguistic" },
        { text: "I am good at word games like Scrabble.", category: "linguistic" },
        { text: "I can easily do mental math.", category: "logicalMathematical" },
        { text: "I enjoy solving puzzles and brainteasers.", category: "logicalMathematical" },
        { text: "I can quickly grasp complex concepts.", category: "logicalMathematical" },
        { text: "I can play a musical instrument.", category: "musical" },
        { text: "I can recognize and name different musical notes.", category: "musical" },
        { text: "I often find myself humming or singing.", category: "musical" },
        { text: "I can easily visualize objects and scenes in my mind.", category: "spatial" },
        { text: "I enjoy activities like drawing and painting.", category: "spatial" },
        { text: "I have a good sense of direction.", category: "spatial" },
        { text: "I am good at sports or physical activities.", category: "bodilyKinesthetic" },
        { text: "I enjoy working with my hands.", category: "bodilyKinesthetic" },
        { text: "I can express myself well through body language.", category: "bodilyKinesthetic" },
        { text: "I find it easy to understand others' feelings.", category: "interpersonal" },
        { text: "I am good at resolving conflicts.", category: "interpersonal" },
        { text: "I enjoy being part of a team.", category: "interpersonal" },
        { text: "I often reflect on my thoughts and feelings.", category: "intrapersonal" },
        { text: "I am aware of my strengths and weaknesses.", category: "intrapersonal" },
        { text: "I enjoy spending time alone to think.", category: "intrapersonal" },
        { text: "I enjoy spending time in nature.", category: "naturalist" },
        { text: "I can identify different plants and animals.", category: "naturalist" },
        { text: "I am concerned about environmental issues.", category: "naturalist" },
        { text: "I am good at playing with words.", category: "linguistic" },
        { text: "I have a good vocabulary.", category: "linguistic" },
        { text: "I enjoy reading books.", category: "linguistic" },
        { text: "I can easily calculate numbers in my head.", category: "logicalMathematical" },
        { text: "I enjoy activities that involve logical reasoning.", category: "logicalMathematical" },
        { text: "I am good at scientific thinking.", category: "logicalMathematical" },
        { text: "I have a good sense of rhythm.", category: "musical" },
        { text: "I can identify different musical instruments.", category: "musical" },
        { text: "I enjoy singing in tune.", category: "musical" },
        { text: "I have a good imagination.", category: "spatial" },
        { text: "I can easily recognize patterns.", category: "spatial" },
        { text: "I enjoy building models or sculptures.", category: "spatial" },
        { text: "I enjoy dancing or acting.", category: "bodilyKinesthetic" },
        { text: "I am good at physical coordination.", category: "bodilyKinesthetic" },
        { text: "I like to move around and be active.", category: "bodilyKinesthetic" },
        { text: "I can easily sense the mood of a group.", category: "interpersonal" },
        { text: "I enjoy helping others.", category: "interpersonal" },
        { text: "I am good at communicating with others.", category: "interpersonal" },
        { text: "I like to analyze my own behavior.", category: "intrapersonal" },
        { text: "I set personal goals and strive to achieve them.", category: "intrapersonal" },
        { text: "I understand my own emotions well.", category: "intrapersonal" },
        { text: "I am passionate about protecting the environment.", category: "naturalist" },
        { text: "I am good at recognizing different types of rocks and minerals.", category: "naturalist" },
        { text: "I enjoy gardening and taking care of plants.", category: "naturalist" }
    ];

    let currentQuestionIndex = 0;

    function startSurvey() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            document.getElementById('user-details').style.display = 'none';
            document.getElementById('survey-questions').style.display = 'block';
            showQuestions();
        } else {
            alert('Please enter your name and email.');
        }
    }

    function showQuestions() {
        const surveyForm = document.getElementById('surveyForm');
        surveyForm.innerHTML = '';

        for (let i = 0; i < questions.length; i++) {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <label>${i + 1}. ${questions[i].text}</label>
                <div class="options">
                    <label><input type="radio" name="q${i}" value="1"> 1</label>
                    <label><input type="radio" name="q${i}" value="2"> 2</label>
                    <label><input type="radio" name="q${i}" value="3"> 3</label>
                    <label><input type="radio" name="q${i}" value="4"> 4</label>
                    <label><input type="radio" name="q${i}" value="5"> 5</label>
                </div>
            `;
            surveyForm.appendChild(questionDiv);
        }
    }

    function submitSurvey() {
        const form = document.getElementById('surveyForm');
        const formData = new FormData(form);

        let scores = {
            linguistic: 0,
            logicalMathematical: 0,
            musical: 0,
            spatial: 0,
            bodilyKinesthetic: 0,
            interpersonal: 0,
            intrapersonal: 0,
            naturalist: 0
        };

        questions.forEach((question, index) => {
            const value = formData.get(`q${index}`);
            if (value) {
                scores[question.category] += parseInt(value);
            }
        });

        const totalQuestions = questions.length;
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            linguistic: ((scores.linguistic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            logicalMathematical: ((scores.logicalMathematical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            musical: ((scores.musical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            spatial: ((scores.spatial / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            bodilyKinesthetic: ((scores.bodilyKinesthetic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            interpersonal: ((scores.interpersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            naturalist: ((scores.naturalist / (totalQuestions / 8 * 5)) * 100).toFixed(2)
             };
    fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === 'success') {
            alert('Survey submitted successfully!');
            window.location.href = 'index.html';
        } else {
            alert('There was an error submitting the survey.');
        }
    })
    .catch(error => console.error('Error:', error));
}

window.startSurvey = startSurvey;
window.submitSurvey = submitSurvey;
