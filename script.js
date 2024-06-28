document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        "I enjoy writing things down.",
        "I am good at solving mathematical problems.",
        "I like listening to music.",
        "I am good at visualizing things.",
        "I enjoy physical activities.",
        "I like working with others.",
        "I understand my own feelings well.",
        "I am interested in nature."
        // Add all other questions here...
    ];

    const categories = [
        "linguistic",
        "logicalMathematical",
        "musical",
        "spatial",
        "bodilyKinesthetic",
        "interpersonal",
        "intrapersonal",
        "naturalist"
    ];

    const totalQuestions = questions.length;
    const questionsContainer = document.getElementById('questions-container');

    questions.forEach((question, index) => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = (index + 1) + '. ' + question;
        formGroup.appendChild(label);

        for (let i = 1; i <= 5; i++) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `q${index + 1}`;
            radio.value = i;
            radio.required = true;

            const radioLabel = document.createElement('label');
            radioLabel.textContent = i;
            radioLabel.appendChild(radio);

            formGroup.appendChild(radioLabel);
        }

        questionsContainer.appendChild(formGroup);
    });

    document.getElementById('survey-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
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

        categories.forEach((category, categoryIndex) => {
            for (let i = 0; i < totalQuestions / 8; i++) {
                const questionIndex = categoryIndex * (totalQuestions / 8) + i;
                const answer = document.querySelector(`input[name="q${questionIndex + 1}"]:checked`).value;
                scores[category] += parseInt(answer);
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

        fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.json())
          .then(result => {
              if (result.result === 'success') {
                  window.location.href = 'result.html';
              }
          });
    });
});
