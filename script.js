document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { question: "I enjoy word games like crosswords and Scrabble.", category: "linguistic" },
        { question: "I like to read books just for fun.", category: "linguistic" },
        { question: "I have a good vocabulary.", category: "linguistic" },
        { question: "I enjoy math classes.", category: "logicalMathematical" },
        { question: "I like to do science experiments.", category: "logicalMathematical" },
        { question: "I am good at solving problems and puzzles.", category: "logicalMathematical" },
        { question: "I can play a musical instrument.", category: "musical" },
        { question: "I can remember the melodies of songs easily.", category: "musical" },
        { question: "I enjoy listening to music.", category: "musical" },
        { question: "I can visualize things clearly in my mind.", category: "spatial" },
        { question: "I enjoy activities like drawing or painting.", category: "spatial" },
        { question: "I have a good sense of direction.", category: "spatial" },
        { question: "I enjoy physical activities like sports or dancing.", category: "bodilyKinesthetic" },
        { question: "I am good at using my hands to create or repair things.", category: "bodilyKinesthetic" },
        { question: "I can easily mimic movements or gestures.", category: "bodilyKinesthetic" },
        { question: "I enjoy working with other people.", category: "interpersonal" },
        { question: "I am good at understanding other people's feelings.", category: "interpersonal" },
        { question: "I am good at leading and organizing groups.", category: "interpersonal" },
        { question: "I am aware of my own thoughts and feelings.", category: "intrapersonal" },
        { question: "I enjoy spending time alone to reflect.", category: "intrapersonal" },
        { question: "I have a good understanding of my strengths and weaknesses.", category: "intrapersonal" },
        { question: "I enjoy spending time in nature.", category: "naturalist" },
        { question: "I am interested in environmental issues.", category: "naturalist" },
        { question: "I can easily identify different types of plants and animals.", category: "naturalist" },
        { question: "I find it easy to put complex ideas into words.", category: "linguistic" },
        { question: "I enjoy learning new languages.", category: "linguistic" },
        { question: "I am good at writing stories or essays.", category: "linguistic" },
        { question: "I enjoy playing with numbers.", category: "logicalMathematical" },
        { question: "I like to analyze data or statistics.", category: "logicalMathematical" },
        { question: "I am good at logical reasoning.", category: "logicalMathematical" },
        { question: "I can read music.", category: "musical" },
        { question: "I can easily keep rhythm.", category: "musical" },
        { question: "I enjoy composing or arranging music.", category: "musical" },
        { question: "I can imagine objects in three dimensions.", category: "spatial" },
        { question: "I like to solve visual puzzles.", category: "spatial" },
        { question: "I am good at drawing or sketching.", category: "spatial" },
        { question: "I have good hand-eye coordination.", category: "bodilyKinesthetic" },
        { question: "I enjoy building or crafting things.", category: "bodilyKinesthetic" },
        { question: "I can easily learn new physical skills.", category: "bodilyKinesthetic" },
        { question: "I am good at mediating conflicts.", category: "interpersonal" },
        { question: "I enjoy working in teams.", category: "interpersonal" },
        { question: "I am good at making people feel comfortable.", category: "interpersonal" },
        { question: "I am self-aware.", category: "intrapersonal" },
        { question: "I reflect on my experiences to learn from them.", category: "intrapersonal" },
        { question: "I understand my emotions well.", category: "intrapersonal" },
        { question: "I have a keen interest in wildlife.", category: "naturalist" },
        { question: "I am good at observing natural phenomena.", category: "naturalist" },
        { question: "I enjoy gardening or taking care of plants.", category: "naturalist" }
    ];

    const surveyForm = document.getElementById('surveyForm');
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <label>${index + 1}. ${q.question}</label>
            <input type="radio" name="q${index}" value="1"> 1
            <input type="radio" name="q${index}" value="2"> 2
            <input type="radio" name="q${index}" value="3"> 3
            <input type="radio" name="q${index}" value="4"> 4
            <input type="radio" name="q${index}" value="5"> 5
            <br><br>
        `;
        surveyForm.appendChild(div);
    });

    surveyForm.innerHTML += '<button type="submit">Submit</button>';
    
    surveyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(surveyForm);
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
        const questionCount = {
            linguistic: 0,
            logicalMathematical: 0,
            musical: 0,
            spatial: 0,
            bodilyKinesthetic: 0,
            interpersonal: 0,
            intrapersonal: 0,
            naturalist: 0
        };

        questions.forEach((q, index) => {
            const score = formData.get(`q${index}`);
            if (score) {
                scores[q.category] += parseInt(score);
                questionCount[q.category]++;
            }
        });

        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');

        const data = {
            name: name,
            email: email,
            linguistic: ((scores.linguistic / (questionCount.linguistic * 5)) * 100).toFixed(2),
            logicalMathematical: ((scores.logicalMathematical / (questionCount.logicalMathematical * 5)) * 100).toFixed(2),
            musical: ((scores.musical / (questionCount.musical * 5)) * 100).toFixed(2),
            spatial: ((scores.spatial / (questionCount.spatial * 5)) * 100).toFixed(2),
            bodilyKinesthetic: ((scores.bodilyKinesthetic / (questionCount.bodilyKinesthetic * 5)) * 100).toFixed(2),
            interpersonal: ((scores.interpersonal / (questionCount.interpersonal * 5)) * 100).toFixed(2),
            intrapersonal: ((scores.intrapersonal / (questionCount.intrapersonal * 5)) * 100).toFixed(2),
            naturalist: ((scores.naturalist / (questionCount.naturalist * 5)) * 100).toFixed(2)
        };

        fetch('https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                window.location.href = 'result.html';
            }
        });
    });
});
