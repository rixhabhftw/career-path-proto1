document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { text: "I enjoy writing things down.", type: "linguistic" },
        { text: "I read books for pleasure.", type: "linguistic" },
        { text: "I enjoy playing with numbers and solving puzzles.", type: "logicalMathematical" },
        { text: "I like to create or listen to music.", type: "musical" },
        { text: "I can visualize things clearly in my mind.", type: "spatial" },
        { text: "I like to move around and be physically active.", type: "bodilyKinesthetic" },
        { text: "I work well with others.", type: "interpersonal" },
        { text: "I am self-aware and understand my own emotions.", type: "intrapersonal" },
        { text: "I appreciate nature and the environment.", type: "naturalist" },
        // Add the remaining 45 questions here in the same format
    ];

  const questionContainer = document.getElementById('questionContainer');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionLabel = document.createElement('label');
        questionLabel.textContent = `${index + 1}. ${question.text}`;
        questionDiv.appendChild(questionLabel);

        const radioContainer = document.createElement('div');
        radioContainer.classList.add('radio-container');

        for (let i = 1; i <= 5; i++) {
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = `q${index + 1}_${question.type}_${i}`;
            radioInput.name = `q${index + 1}_${question.type}`;
            radioInput.value = i;
            radioInput.required = true;

            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = radioInput.id;
            radioLabel.textContent = i;

            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(radioLabel);
        }

        questionDiv.appendChild(radioContainer);
        questionContainer.appendChild(questionDiv);
    });

    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const totalQuestions = questions.length;
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

        formData.forEach((value, key) => {
            if (key.startsWith('q')) {
                const [_, type] = key.split('_');
                scores[type] += parseInt(value);
            }
        });

        const data = {
            name: name,
            email: email,
            linguistic: ((scores.linguistic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            logicalMathematical: ((scores.logicalMathematical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            musical: ((scores.musical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            spatial: ((scores.spatial / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            bodilyKinesthetic: ((scores.bodilyKinesthetic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            interpersonal: ((scores.interpersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            intrapersonal: ((scores.intrapersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            naturalist: ((scores.naturalist / (totalQuestions / 8 * 5)) * 100).toFixed(2)
        };

        fetch('https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.result === 'success') {
                window.location.href = 'result.html';
            } else
