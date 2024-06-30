document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        // Linguistic
        { question: "I enjoy word games like Scrabble, Boggle, and others.", category: "Linguistic" },
        { question: "I remember things better if I write them down.", category: "Linguistic" },
        { question: "I enjoy reading books, magazines, or web articles.", category: "Linguistic" },
        { question: "I am a good speller.", category: "Linguistic" },
        { question: "I like to write stories, poems, or journal entries.", category: "Linguistic" },
        { question: "I have a good vocabulary.", category: "Linguistic" },
        { question: "I enjoy learning new words.", category: "Linguistic" },
        
        // Logical-Mathematical
        { question: "I can easily do calculations in my head.", category: "LogicalMathematical" },
        { question: "I like to solve puzzles and brain teasers.", category: "LogicalMathematical" },
        { question: "I enjoy games that involve strategy and planning.", category: "LogicalMathematical" },
        { question: "I am good at math.", category: "LogicalMathematical" },
        { question: "I can find patterns in things easily.", category: "LogicalMathematical" },
        { question: "I enjoy conducting experiments.", category: "LogicalMathematical" },
        { question: "I can explain things logically.", category: "LogicalMathematical" },
        
        // Musical
        { question: "I enjoy listening to music.", category: "Musical" },
        { question: "I can recognize musical notes and patterns.", category: "Musical" },
        { question: "I can play a musical instrument.", category: "Musical" },
        { question: "I enjoy singing.", category: "Musical" },
        { question: "I can remember melodies and lyrics easily.", category: "Musical" },
        { question: "I can compose music or write songs.", category: "Musical" },
        { question: "I am sensitive to sounds and rhythms.", category: "Musical" },
        
        // Spatial
        { question: "I can easily read maps and find my way around.", category: "Spatial" },
        { question: "I enjoy drawing and creating visual art.", category: "Spatial" },
        { question: "I can visualize things clearly in my mind.", category: "Spatial" },
        { question: "I am good at solving jigsaw puzzles.", category: "Spatial" },
        { question: "I have a good sense of direction.", category: "Spatial" },
        { question: "I enjoy watching movies and visual media.", category: "Spatial" },
        { question: "I can create mental images easily.", category: "Spatial" },
        
        // Bodily-Kinesthetic
        { question: "I enjoy physical activities like sports or dance.", category: "BodilyKinesthetic" },
        { question: "I am good at hand-eye coordination tasks.", category: "BodilyKinesthetic" },
        { question: "I enjoy working with my hands.", category: "BodilyKinesthetic" },
        { question: "I can remember things better when I move around.", category: "BodilyKinesthetic" },
        { question: "I have good balance and agility.", category: "BodilyKinesthetic" },
        { question: "I can perform tasks that require fine motor skills.", category: "BodilyKinesthetic" },
        { question: "I enjoy building and constructing things.", category: "BodilyKinesthetic" },
        
        // Interpersonal
        { question: "I am good at understanding and relating to others.", category: "Interpersonal" },
        { question: "I enjoy working in teams or groups.", category: "Interpersonal" },
        { question: "I am a good listener.", category: "Interpersonal" },
        { question: "I can easily resolve conflicts between people.", category: "Interpersonal" },
        { question: "I enjoy teaching or helping others.", category: "Interpersonal" },
        { question: "I can sense the feelings and moods of others.", category: "Interpersonal" },
        { question: "I have strong communication skills.", category: "Interpersonal" },
        
        // Intrapersonal
        { question: "I am aware of my own strengths and weaknesses.", category: "Intrapersonal" },
        { question: "I enjoy spending time alone reflecting.", category: "Intrapersonal" },
        { question: "I set goals for myself and work towards them.", category: "Intrapersonal" },
        { question: "I understand my own emotions well.", category: "Intrapersonal" },
        { question: "I have a strong sense of self-discipline.", category: "Intrapersonal" },
        { question: "I am good at self-motivation.", category: "Intrapersonal" },
        { question: "I am aware of my own values and beliefs.", category: "Intrapersonal" },
        
        // Naturalist
        { question: "I enjoy spending time in nature.", category: "Naturalist" },
        { question: "I am good at identifying different plants and animals.", category: "Naturalist" },
        { question: "I am concerned about environmental issues.", category: "Naturalist" },
        { question: "I enjoy gardening or working with plants.", category: "Naturalist" },
        { question: "I can recognize patterns in nature.", category: "Naturalist" },
        { question: "I enjoy learning about the natural world.", category: "Naturalist" },
        { question: "I can easily classify different species.", category: "Naturalist" }
    ];

    const container = document.getElementById("questions-container");
    questions.forEach((q, index) => {
        const questionElem = document.createElement("div");
        questionElem.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionElem.appendChild(questionText);

        for (let i = 1; i <= 5; i++) {
            const optionLabel = document.createElement("label");
            optionLabel.classList.add("checkbox-wrapper");
            optionLabel.innerHTML = `
                <input type="checkbox" name="q${index + 1}" value="${i}">
                <span class="tick_mark"></span>
            `;
            questionElem.appendChild(optionLabel);
        }

        container.appendChild(questionElem);
    });

    document.getElementById("submit-button").addEventListener("click", function() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        const scores = {
            Linguistic: 0,
            LogicalMathematical: 0,
            Musical: 0,
            Spatial: 0,
            BodilyKinesthetic: 0,
            Interpersonal: 0,
            Intrapersonal: 0,
            Naturalist: 0
        };

        questions.forEach((q, index) => {
            const checkboxes = document.getElementsByName(`q${index + 1}`);
            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    scores[q.category] += parseInt(checkbox.value);
                }
            });
        });

        const totalQuestions = questions.length;
        const data = {
            name: name,
            email: email,
            linguistic: ((scores.Linguistic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            logicalMathematical: ((scores.LogicalMathematical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            musical: ((scores.Musical / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            spatial: ((scores.Spatial / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            bodilyKinesthetic: ((scores.BodilyKinesthetic / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            interpersonal: ((scores.Interpersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            intrapersonal: ((scores.Intrapersonal / (totalQuestions / 8 * 5)) * 100).toFixed(2),
            naturalist: ((scores.Naturalist / (totalQuestions / 8 * 5)) * 100).toFixed(2)
        };

        fetch("https://script.google.com/macros/s/AKfycbzxVdzzqMjKoSqKngsh5eZpuKWXABlw_oltkjgR1zpyeC3-Vf7iLbpCUwyAKdDvDgoWzw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert("Survey submitted successfully!");
            console.log(result);
        })
        .catch(error => {
            console.error("Error submitting survey:", error);
        });
    });
});
