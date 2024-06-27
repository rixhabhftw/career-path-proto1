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

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionLabel = document.createElement('label');
        questionLabel.textContent = `${index + 1}. ${question.text}`;
        questionDiv.appendChild(questionLabel);

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('checkbox-wrapper');

        for (let i = 1; i <= 5; i++) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = `q${index + 1}_${question.type}_${i}`;
            radio.name = `q${index + 1}_${question.type}`;
            radio.value = i;
            radio.required = true;

            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.textContent = i;

            checkboxWrapper.appendChild(radio);
            checkboxWrapper.appendChild(label);
        }

        questionDiv.appendChild(checkboxWrapper);
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.result === 'success') {
                alert('Survey submitted successfully!');
                window.location.href = "result.html";
            } else {
                alert('Error submitting survey.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
