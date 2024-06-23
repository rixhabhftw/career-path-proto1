document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const results = {};
    let totalScore = 0;

    formData.forEach((value, key) => {
        if (key.startsWith('q')) {
            totalScore += parseInt(value);
        }
    });

    const intelligenceCategories = {
        "Verbal-Linguistic": [7, 16, 25, 34, 43, 52],
        "Logical-Mathematical": [3, 12, 21, 30, 39, 48],
        "Visual-Spatial": [9, 18, 27, 36, 45, 54],
        "Bodily-Kinesthetic": [6, 15, 24, 33, 42, 51],
        "Musical": [2, 11, 20, 29, 38, 47],
        "Interpersonal": [5, 14, 23, 32, 41, 50],
        "Intrapersonal": [4, 13, 22, 31, 40, 49],
        "Naturalistic": [10, 19, 28, 37, 46, 53]
    };

    for (const [key, indices] of Object.entries(intelligenceCategories)) {
        let score = 0;
        indices.forEach(index => {
            score += parseInt(formData.get(`q${index}`));
        });
        results[key] = ((score / (indices.length * 5)) * 100).toFixed(2);
    }

    const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);
    const top3 = sortedResults.slice(0, 3);
    
    let resultMessage = `Name: ${name}\nEmail: ${email}\n\nTop 3 Intelligences:\n`;
    top3.forEach(([intelligence, percentage], index) => {
        resultMessage += `${index + 1}. ${intelligence}: ${percentage}%\n`;
    });
    resultMessage += `\nOther Intelligences:\n`;
    sortedResults.slice(3).forEach(([intelligence, percentage]) => {
        resultMessage += `${intelligence}: ${percentage}%\n`;
    });

    const payload = {
        name: name,
        email: email,
        results: JSON.stringify(results)
    };

    fetch('https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Survey submitted successfully!');
        event.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the survey.');
    });
});
