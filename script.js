document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        // Linguistic questions
        { text: "I enjoy writing things down.", category: "linguistic" },
        { text: "I love reading books.", category: "linguistic" },
        // Logical-Mathematical questions
        { text: "I like solving math problems.", category: "logicalMathematical" },
        { text: "I enjoy working with numbers.", category: "logicalMathematical" },
        // Musical questions
        { text: "I can recognize songs easily.", category: "musical" },
        { text: "I enjoy listening to music.", category: "musical" },
        // Spatial questions
        { text: "I am good at visualizing things.", category: "spatial" },
        { text: "I like to draw or doodle.", category: "spatial" },
        // Bodily-Kinesthetic questions
        { text: "I enjoy physical activities.", category: "bodilyKinesthetic" },
        { text: "I like hands-on learning.", category: "bodilyKinesthetic" },
        // Interpersonal questions
        { text: "I work well in teams.", category: "interpersonal" },
        { text: "I enjoy helping others.", category: "interpersonal" },
        // Intrapersonal questions
        { text: "I am aware of my own emotions.", category: "intrapersonal" },
        { text: "I enjoy spending time alone.", category: "intrapersonal" },
        // Naturalist questions
        { text: "I enjoy spending time in nature.", category: "naturalist" },
        { text: "I can easily identify different plants and animals.", category: "naturalist" }
    ];

    const questionsContainer = document.getElementById("questions-container");

    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${question.text}`;
        questionElement.appendChild(questionText);

        for (let i = 1; i <= 5; i++) {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `q${index + 1}`;
            radio.value = i;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(i));
            questionElement.appendChild(label);
        }

        questionsContainer.appendChild(questionElement);
    });

    document.getElementById("survey-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

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

        const totalQuestions = {
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
            const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
            if (selectedOption) {
                scores[question.category] += parseInt(selectedOption.value);
                totalQuestions[question.category]++;
            }
        });

        for (const category in scores) {
            scores[category] = (scores[category] / (totalQuestions[category] * 5)) * 100;
        }

        fetch("https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec", {
            method: "POST",
            body: JSON.stringify({ name, email, ...scores }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                alert("Survey submitted successfully!");
            } else {
                alert("There was an error submitting the survey.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error submitting the survey.");
        });
    });
});
