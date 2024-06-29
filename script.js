document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "1. I enjoy categorizing things by common traits", category: "naturalist" },
        { question: "2. I easily pick up on patterns", category: "logicalMathematical" },
        { question: "3. I enjoy learning about nature", category: "naturalist" },
        { question: "4. I enjoy puzzles and brainteasers", category: "logicalMathematical" },
        { question: "5. I can imagine things in my mind easily", category: "spatial" },
        { question: "6. I like to daydream", category: "spatial" },
        { question: "7. I enjoy learning about words and language", category: "linguistic" },
        { question: "8. I think in words rather than pictures", category: "linguistic" },
        { question: "9. I enjoy listening to music", category: "musical" },
        { question: "10. I have a good sense of rhythm", category: "musical" },
        { question: "11. I have a good sense of direction", category: "spatial" },
        { question: "12. I like to create or build things", category: "bodilyKinesthetic" },
        { question: "13. I enjoy sports or physical activities", category: "bodilyKinesthetic" },
        { question: "14. I am sensitive to other people's moods", category: "interpersonal" },
        { question: "15. I am able to resolve conflicts between others", category: "interpersonal" },
        { question: "16. I like to spend time alone", category: "intrapersonal" },
        { question: "17. I have a strong sense of self", category: "intrapersonal" },
        { question: "18. I am good at strategy games", category: "logicalMathematical" },
        { question: "19. I am good at solving problems", category: "logicalMathematical" },
        { question: "20. I am good at mental math", category: "logicalMathematical" },
        { question: "21. I enjoy working with my hands", category: "bodilyKinesthetic" },
        { question: "22. I like to plan things out", category: "logicalMathematical" },
        { question: "23. I enjoy being outdoors", category: "naturalist" },
        { question: "24. I can recognize different bird species by sight", category: "naturalist" },
        { question: "25. I can identify different plant species", category: "naturalist" },
        { question: "26. I enjoy painting or drawing", category: "spatial" },
        { question: "27. I have a good memory for lyrics", category: "musical" },
        { question: "28. I am good at remembering names", category: "linguistic" },
        { question: "29. I am a good listener", category: "interpersonal" },
        { question: "30. I am good at reading people", category: "interpersonal" },
        { question: "31. I am interested in psychology", category: "intrapersonal" },
        { question: "32. I am aware of my own strengths and weaknesses", category: "intrapersonal" },
        { question: "33. I enjoy learning about different cultures", category: "linguistic" },
        { question: "34. I enjoy learning new languages", category: "linguistic" },
        { question: "35. I enjoy dancing", category: "bodilyKinesthetic" },
        { question: "36. I enjoy singing", category: "musical" },
        { question: "37. I enjoy writing stories or poetry", category: "linguistic" },
        { question: "38. I enjoy learning about the stars and planets", category: "naturalist" },
        { question: "39. I am good at recognizing patterns in data", category: "logicalMathematical" },
        { question: "40. I enjoy analyzing data", category: "logicalMathematical" },
        { question: "41. I enjoy making music", category: "musical" },
        { question: "42. I am good at building models", category: "spatial" },
        { question: "43. I am good at drawing maps", category: "spatial" },
        { question: "44. I enjoy learning about the human body", category: "bodilyKinesthetic" },
        { question: "45. I enjoy cooking", category: "bodilyKinesthetic" },
        { question: "46. I am good at learning by doing", category: "bodilyKinesthetic" },
        { question: "47. I enjoy working in a team", category: "interpersonal" },
        { question: "48. I enjoy being a leader", category: "interpersonal" },
        { question: "49. I enjoy learning about philosophy", category: "intrapersonal" },
        { question: "50. I enjoy thinking about deep questions", category: "intrapersonal" },
        { question: "51. I am good at learning from my mistakes", category: "intrapersonal" },
        { question: "52. I am aware of my emotions", category: "intrapersonal" },
        { question: "53. I enjoy learning about animals", category: "naturalist" },
        { question: "54. I enjoy studying the environment", category: "naturalist" }
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
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.result === "success") {
                window.location.href = "result.html";
            } else {
                alert("There was an error submitting your survey. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error submitting your survey. Please try again.");
        });
    }

    document.getElementById("next").addEventListener("click", nextPage);
    document.getElementById("prev").addEventListener("click", prevPage);
    document.getElementById("submit").addEventListener("click", submitSurvey);

    displayQuestions();
});