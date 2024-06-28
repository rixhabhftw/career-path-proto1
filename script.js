document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "1. I enjoy categorizing things by common traits", category: "naturalist" },
        { question: "2. I easily pick up on patterns", category: "logicalMathematical" },
        { question: "3. I enjoy learning about nature", category: "naturalist" },
        { question: "4. I enjoy puzzles and brainteasers", category: "logicalMathematical" },
        { question: "5. I can imagine things in my mind easily", category: "spatial" },
        // ... include all remaining questions here ...
    ];

    const totalQuestions = questions.length;
    const questionsPerPage = 10;
    let currentPage = 0;
    let userResponses = Array(totalQuestions).fill(null);
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

    function displayQuestions() {
        const start = currentPage * questionsPerPage;
        const end = start + questionsPerPage;
        const questionsContainer = document.getElementById("questions-container");
        questionsContainer.innerHTML = "";

        for (let i = start; i < end && i < totalQuestions; i++) {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question";
            questionDiv.innerHTML = `
                <p>${questions[i].question}</p>
                <label><input type="radio" name="question${i}" value="1" ${userResponses[i] === 1 ? "checked" : ""}> 1</label>
                <label><input type="radio" name="question${i}" value="2" ${userResponses[i] === 2 ? "checked" : ""}> 2</label>
                <label><input type="radio" name="question${i}" value="3" ${userResponses[i] === 3 ? "checked" : ""}> 3</label>
                <label><input type="radio" name="question${i}" value="4" ${userResponses[i] === 4 ? "checked" : ""}> 4</label>
                <label><input type="radio" name="question${i}" value="5" ${userResponses[i] === 5 ? "checked" : ""}> 5</label>
            `;
            questionsContainer.appendChild(questionDiv);
        }

        document.getElementById("prev").style.display = currentPage === 0 ? "none" : "block";
        document.getElementById("next").style.display = end >= totalQuestions ? "none" : "block";
        document.getElementById("submit").style.display = end >= totalQuestions ? "block" : "none";
    }

    function nextPage() {
        saveResponses();
        currentPage++;
        displayQuestions();
    }

    function prevPage() {
        saveResponses();
        currentPage--;
        displayQuestions();
    }

    function saveResponses() {
        const start = currentPage * questionsPerPage;
        const end = start + questionsPerPage;
        for (let i = start; i < end && i < totalQuestions; i++) {
            const radios = document.getElementsByName(`question${i}`);
            for (let radio of radios) {
                if (radio.checked) {
                    userResponses[i] = parseInt(radio.value);
                }
            }
        }
    }

    function submitSurvey() {
        saveResponses();

        questions.forEach((question, index) => {
            if (userResponses[index]) {
                scores[question.category] += userResponses[index];
            }
        });

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            linguistic: ((scores.linguistic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            logicalMathematical: ((scores.logicalMathematical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            musical: ((scores.musical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            spatial: ((scores.spatial / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            bodilyKinesthetic: ((scores.bodilyKinesthetic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            interpersonal: ((scores.interpersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            intrapersonal: ((scores.intrapersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            naturalist: ((scores.naturalist / (totalQuestions / 8 * 5)) * 100).toFixed(2)
        };

        fetch("https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            if (result.result === 'success') {
                window.location.href = "result.html";
            } else {
                alert("There was an error submitting your survey. Please try again.");
            }
        });
    }

    document.getElementById("next").addEventListener("click", nextPage);
    document.getElementById("prev").addEventListener("click", prevPage);
    document.getElementById("submit").addEventListener("click", submitSurvey);

    displayQuestions();
});