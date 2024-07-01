document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { question: "I enjoy writing things down.", category: "linguistic" },
        { question: "I like to work with numbers and figures.", category: "logicalMathematical" },
        { question: "I enjoy listening to music.", category: "musical" },
        { question: "I am good at visualizing things.", category: "spatial" },
        { question: "I enjoy physical activities and sports.", category: "bodilyKinesthetic" },
        { question: "I find it easy to understand others' feelings.", category: "interpersonal" },
        { question: "I often reflect on my own feelings.", category: "intrapersonal" },
        { question: "I am interested in nature and the environment.", category: "naturalist" },
        // Add the remaining 46 questions here as per your requirement from the reference site
    ];

    const questionsContainer = document.getElementById('questionsContainer');

    questions.forEach((item, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        questionElement.innerHTML = `
            <p>${index + 1}. ${item.question}</p>
            <label><input type="radio" name="q${index}" value="1"> 1</label>
            <label><input type="radio" name="q${index}" value="2"> 2</label>
            <label><input type="radio" name="q${index}" value="3"> 3</label>
            <label><input type="radio" name="q${index}" value="4"> 4</label>
            <label><input type="radio" name="q${index}" value="5"> 5</label>
        `;

        questionsContainer.appendChild(questionElement);
    });

    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
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

        questions.forEach((item, index) => {
            const value = formData.get(`q${index}`);
            if (value) {
                scores[item.category] += parseInt(value);
            }
        });

        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const totalQuestions = questions.length;

        const data = {
            name: userName,
            email: userEmail,
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
            body: JSON.stringify(data)
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
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the survey.');
        });
    });
});
