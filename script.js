const questions = [
    { text: "1. I like to read books.", category: "linguistic" },
    { text: "2. I can complete calculations quickly in my head.", category: "logicalMathematical" },
    { text: "3. I enjoy listening to and making music.", category: "musical" },
    { text: "4. I have a good sense of direction and can easily read maps.", category: "spatial" },
    { text: "5. I am good at physical activities like sports or dance.", category: "bodilyKinesthetic" },
    { text: "6. I can easily understand and interact with others.", category: "interpersonal" },
    { text: "7. I am aware of my own feelings and emotions.", category: "intrapersonal" },
    { text: "8. I enjoy spending time outdoors and learning about nature.", category: "naturalist" },
    { text: "9. I have a large vocabulary and enjoy learning new words.", category: "linguistic" },
    { text: "10. I can solve math problems quickly.", category: "logicalMathematical" },
    { text: "11. I can play a musical instrument.", category: "musical" },
    { text: "12. I can visualize objects and their movements in my mind.", category: "spatial" },
    { text: "13. I am good at building and fixing things.", category: "bodilyKinesthetic" },
    { text: "14. I can sense the emotions of others.", category: "interpersonal" },
    { text: "15. I understand my strengths and weaknesses.", category: "intrapersonal" },
    { text: "16. I can identify different species of plants and animals.", category: "naturalist" },
    { text: "17. I enjoy writing essays, stories, or journal entries.", category: "linguistic" },
    { text: "18. I can find patterns in numbers and data.", category: "logicalMathematical" },
    { text: "19. I enjoy composing music.", category: "musical" },
    { text: "20. I am good at drawing or painting.", category: "spatial" },
    { text: "21. I have good coordination and balance.", category: "bodilyKinesthetic" },
    { text: "22. I can work well in group settings.", category: "interpersonal" },
    { text: "23. I am reflective and think deeply about my life.", category: "intrapersonal" },
    { text: "24. I enjoy gardening and working with plants.", category: "naturalist" },
    { text: "25. I can communicate effectively through writing.", category: "linguistic" },
    { text: "26. I can reason and think logically.", category: "logicalMathematical" },
    { text: "27. I have a good ear for rhythm and melody.", category: "musical" },
    { text: "28. I can create mental images easily.", category: "spatial" },
    { text: "29. I am physically active and enjoy using my body.", category: "bodilyKinesthetic" },
    { text: "30. I can read social cues and body language.", category: "interpersonal" },
    { text: "31. I am aware of my inner thoughts and feelings.", category: "intrapersonal" },
    { text: "32. I can classify and categorize different natural elements.", category: "naturalist" },
    { text: "33. I enjoy participating in debates or discussions.", category: "linguistic" },
    { text: "34. I can solve complex mathematical problems.", category: "logicalMathematical" },
    { text: "35. I can play by ear and reproduce music I hear.", category: "musical" },
    { text: "36. I am good at interpreting visual information.", category: "spatial" },
    { text: "37. I am skilled in performing arts like acting or dancing.", category: "bodilyKinesthetic" },
    { text: "38. I am empathetic and understand others' perspectives.", category: "interpersonal" },
    { text: "39. I am self-motivated and can set goals for myself.", category: "intrapersonal" },
    { text: "40. I am passionate about environmental conservation.", category: "naturalist" },
    { text: "41. I can express myself well through words.", category: "linguistic" },
    { text: "42. I enjoy logic puzzles and games.", category: "logicalMathematical" },
    { text: "43. I can recognize and appreciate different musical styles.", category: "musical" },
    { text: "44. I have a good spatial sense and can visualize 3D objects.", category: "spatial" },
    { text: "45. I am good at physical tasks and manual labor.", category: "bodilyKinesthetic" },
    { text: "46. I can manage conflicts and mediate effectively.", category: "interpersonal" },
    { text: "47. I have a strong sense of self-awareness.", category: "intrapersonal" },
    { text: "48. I am knowledgeable about different ecosystems.", category: "naturalist" },
    { text: "49. I enjoy reading and analyzing literature.", category: "linguistic" },
    { text: "50. I can quickly grasp abstract concepts.", category: "logicalMathematical" },
    { text: "51. I have a natural talent for music.", category: "musical" },
    { text: "52. I can solve visual puzzles and mazes.", category: "spatial" },
    { text: "53. I am skilled at sports and physical activities.", category: "bodilyKinesthetic" },
    { text: "54. I am a good listener and communicator.", category: "interpersonal" }
];

let currentPage = 0;
const questionsPerPage = 10;
let userResponses = Array(questions.length).fill(null);

document.addEventListener("DOMContentLoaded", function () {
    displayQuestions();
    document.getElementById("next").addEventListener("click", nextPage);
    document.getElementById("prev").addEventListener("click", prevPage);
    document.getElementById("submit").addEventListener("click", submitSurvey);
});

function displayQuestions() {
    const container = document.getElementById("question-container");
    container.innerHTML = "";

    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const pageQuestions = questions.slice(start, end);

    pageQuestions.forEach((question, index) => {
        const questionIndex = start + index;
        const questionHTML = `
            <div class="question">
                <p>${question.text}</p>
                <label class="checkbox-wrapper"><input type="radio" name="q${questionIndex}" value="1" ${userResponses[questionIndex] === 1 ? 'checked' : ''}>1</label>
                <label class="checkbox-wrapper"><input type="radio" name="q${questionIndex}" value="2" ${userResponses[questionIndex] === 2 ? 'checked' : ''}>2</label>
                <label class="checkbox-wrapper"><input type="radio" name="q${questionIndex}" value="3" ${userResponses[questionIndex] === 3 ? 'checked' : ''}>3</label>
                <label class="checkbox-wrapper"><input type="radio" name="q${questionIndex}" value="4" ${userResponses[questionIndex] === 4 ? 'checked' : ''}>4</label>
                <label class="checkbox-wrapper"><input type="radio" name="q${questionIndex}" value="5" ${userResponses[questionIndex] === 5 ? 'checked' : ''}>5</label>
            </div>
        `;
        container.innerHTML += questionHTML;
    });

    document.getElementById("prev").style.display = currentPage === 0 ? "none" : "inline-block";
    document.getElementById("next").style.display = currentPage === Math.floor(questions.length / questionsPerPage) ? "none" : "inline-block";
    document.getElementById("submit").style.display = currentPage === Math.floor(questions.length / questionsPerPage) ? "inline-block" : "none";
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

    for (let i = start; i < end; i++) {
        const response = document.querySelector(`input[name="q${i}"]:checked`);
        userResponses[i] = response ? parseInt(response.value) : null;
    }
}

function submitSurvey() {
    saveResponses();
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

document.addEventListener("DOMContentLoaded", function () {
    displayQuestions();
    document.getElementById("next").addEventListener("click", nextPage);
    document.getElementById("prev").addEventListener("click", prevPage);
    document.getElementById("submit").addEventListener("click", submitSurvey);
});