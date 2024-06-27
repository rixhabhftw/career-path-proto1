document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const totalQuestions = 54;
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

        fetch('YOUR_GOOGLE_SCRIPT_URL', {
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
