document.addEventListener('DOMContentLoaded', function() {
  const surveyContainer = document.getElementById('survey-container');
  const previousButton = document.getElementById('previous-button');
  const nextButton = document.getElementById('next-button');
  const submitButton = document.getElementById('submit-button');
  
  const questionsPerPage = 10;
  let currentPage = 0;

  const questions = [
    // Your list of questions (include all 54 here)
            { question: "1. I enjoy reading books.", category: "linguistic" },
        { question: "2. I am good at mathematics.", category: "logicalMathematical" },
        { question: "3. I can remember song lyrics easily.", category: "musical" },
        { question: "4. I am good at solving puzzles.", category: "logicalMathematical" },
        { question: "5. I enjoy painting or drawing.", category: "spatial" },
        { question: "6. I like playing sports.", category: "bodilyKinesthetic" },
        { question: "7. I can sense others' feelings easily.", category: "interpersonal" },
        { question: "8. I enjoy being alone and reflecting.", category: "intrapersonal" },
        { question: "9. I like hiking and exploring nature.", category: "naturalist" },
        { question: "10. I am good at public speaking.", category: "linguistic" },
        { question: "11. I enjoy doing experiments.", category: "logicalMathematical" },
        { question: "12. I play a musical instrument.", category: "musical" },
        { question: "13. I can easily visualize objects in my mind.", category: "spatial" },
        { question: "14. I enjoy physical activities.", category: "bodilyKinesthetic" },
        { question: "15. I can work well in a team.", category: "interpersonal" },
        { question: "16. I understand my own emotions well.", category: "intrapersonal" },
        { question: "17. I am interested in environmental issues.", category: "naturalist" },
        { question: "18. I like writing stories or poetry.", category: "linguistic" },
        { question: "19. I am good at logical reasoning.", category: "logicalMathematical" },
        { question: "20. I can identify different musical notes.", category: "musical" },
        { question: "21. I enjoy designing or building things.", category: "spatial" },
        { question: "22. I am skilled at physical coordination.", category: "bodilyKinesthetic" },
        { question: "23. I am good at resolving conflicts.", category: "interpersonal" },
        { question: "24. I enjoy spending time alone.", category: "intrapersonal" },
        { question: "25. I love animals and plants.", category: "naturalist" },
        { question: "26. I have a good vocabulary.", category: "linguistic" },
        { question: "27. I can solve mathematical problems quickly.", category: "logicalMathematical" },
        { question: "28. I can recognize different instruments in a song.", category: "musical" },
        { question: "29. I have a good sense of direction.", category: "spatial" },
        { question: "30. I like dancing.", category: "bodilyKinesthetic" },
        { question: "31. I am empathetic towards others.", category: "interpersonal" },
        { question: "32. I keep a journal or diary.", category: "intrapersonal" },
        { question: "33. I enjoy gardening.", category: "naturalist" },
        { question: "34. I can express myself clearly in writing.", category: "linguistic" },
        { question: "35. I am good at chess or strategy games.", category: "logicalMathematical" },
        { question: "36. I have a good ear for music.", category: "musical" },
        { question: "37. I enjoy visual arts.", category: "spatial" },
        { question: "38. I am physically active.", category: "bodilyKinesthetic" },
        { question: "39. I am good at understanding others.", category: "interpersonal" },
        { question: "40. I often reflect on my thoughts.", category: "intrapersonal" },
        { question: "41. I like studying ecosystems.", category: "naturalist" },
        { question: "42. I am good at storytelling.", category: "linguistic" },
        { question: "43. I excel at science experiments.", category: "logicalMathematical" },
        { question: "44. I can easily identify rhythms.", category: "musical" },
        { question: "45. I am good at assembling things.", category: "spatial" },
        { question: "46. I have good balance and coordination.", category: "bodilyKinesthetic" },
        { question: "47. I can resolve disputes effectively.", category: "interpersonal" },
        { question: "48. I enjoy deep thinking.", category: "intrapersonal" },
        { question: "49. I am concerned about conservation.", category: "naturalist" },
        { question: "50. I like debating.", category: "linguistic" },
        { question: "51. I enjoy working with numbers.", category: "logicalMathematical" },
        { question: "52. I appreciate different music genres.", category: "musical" },
        { question: "53. I am good at spatial orientation.", category: "spatial" },
        { question: "54. I enjoy physical challenges.", category: "bodilyKinesthetic" }
    ];

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

  function renderQuestions() {
    surveyContainer.innerHTML = '';
    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);

    for (let i = start; i < end; i++) {
      const question = questions[i];
      const div = document.createElement('div');
      div.className = 'question';
      div.innerHTML = `
        <p>${question.question}</p>
        <label><input type="radio" name="question${i}" value="1"> 1</label>
        <label><input type="radio" name="question${i}" value="2"> 2</label>
        <label><input type="radio" name="question${i}" value="3"> 3</label>
        <label><input type="radio" name="question${i}" value="4"> 4</label>
        <label><input type="radio" name="question${i}" value="5"> 5</label>
      `;
      surveyContainer.appendChild(div);
    }

    previousButton.style.display = currentPage === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentPage === Math.ceil(questions.length / questionsPerPage) - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentPage === Math.ceil(questions.length / questionsPerPage) - 1 ? 'inline-block' : 'none';
  }

  function gatherResponses() {
    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);

    for (let i = start; i < end; i++) {
      const question = questions[i];
      const radios = document.getElementsByName(`question${i}`);
      for (const radio of radios) {
        if (radio.checked) {
          scores[question.category] += parseInt(radio.value);
          break;
        }
      }
    }
  }

  nextButton.addEventListener('click', () => {
    gatherResponses();
    currentPage++;
    renderQuestions();
  });

  previousButton.addEventListener('click', () => {
    currentPage--;
    renderQuestions();
  });

  submitButton.addEventListener('click', () => {
    gatherResponses();
    // Submit form data logic
    alert('Survey submitted!');
  });

  renderQuestions();
});