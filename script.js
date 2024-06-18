emailjs.init('9fcSaMBOo8taTcGEp');
const questions = [
    { text: "I pride myself on having a large vocabulary.", type: "linguistic" },
    { text: "Using numbers and numerical symbols is easy for me.", type: "logical-mathematical" },
    { text: "Music is very important to me in daily life.", type: "musical" },
    { text: "I always know where I am in relation to my home.", type: "spatial" },
    { text: "I consider myself an athlete.", type: "bodily-kinesthetic" },
    { text: "I feel like people of all ages like me.", type: "interpersonal" },
    { text: "I often look for weaknesses in myself that I see in others.", type: "intrapersonal" },
    { text: "The world of plants and animals is important to me.", type: "naturalist" },
    { text: "I enjoy learning new words and do so easily.", type: "linguistic" },
    { text: "I often develop equations to describe relationships and/or to explain my observations.", type: "logical-mathematical" },
    { text: "I have wide and varied musical interests including both classical and contemporary.", type: "musical" },
    { text: "I do not get lost easily and can orient myself with either maps or landmarks.", type: "spatial" },
    { text: "I feel really good about being physically fit.", type: "bodily-kinesthetic" },
    { text: "I like to be with all different types of people.", type: "interpersonal" },
    { text: "I often think about the influence I have on others.", type: "intrapersonal" },
    { text: "I enjoy my pets.", type: "naturalist" },
    { text: "I love to read and do so daily.", type: "linguistic" },
    { text: "I often see mathematical ratios in the world around me.", type: "logical-mathematical" },
    { text: "I have a very good sense of pitch, tempo, and rhythm.", type: "musical" },
    { text: "Knowing directions is easy for me.", type: "spatial" },
    { text: "I have good balance and eye-hand coordination and enjoy sports which use a ball.", type: "bodily-kinesthetic" },
    { text: "I respond to all people enthusiastically, free of bias or prejudice.", type: "interpersonal" },
    { text: "I believe that I am responsible for my actions and who I am.", type: "intrapersonal" },
    { text: "I like learning about nature.", type: "naturalist" },
    { text: "I enjoy hearing challenging lectures.", type: "linguistic" },
    { text: "Math has always been one of my favorite classes.", type: "logical-mathematical" },
    { text: "My music education began when I was younger and still continues today.", type: "musical" },
    { text: "I have the ability to represent what I see by drawing or painting.", type: "spatial" },
    { text: "My outstanding coordination and balance let me excel in high-speed activities.", type: "bodily-kinesthetic" },
    { text: "I enjoy new or unique social situations.", type: "interpersonal" },
    { text: "I try not to waste my time on trivial pursuits.", type: "intrapersonal" },
    { text: "I enjoy caring for my house plants.", type: "naturalist" },
    { text: "I like to keep a daily journal of my daily experiences.", type: "linguistic" },
    { text: "I like to think about numerical issues and examine statistics.", type: "logical-mathematical" },
    { text: "I am good at playing an instrument and singing.", type: "musical" },
    { text: "My ability to draw is recognized and complimented by others.", type: "spatial" },
    { text: "I like being outdoors, enjoy the change in seasons, and look forward to different physical activities each season.", type: "bodily-kinesthetic" },
    { text: "I enjoy complimenting others when they have done well.", type: "interpersonal" },
    { text: "I often think about the problems in my community, state, and/or world and what I can do to help rectify any of them.", type: "intrapersonal" },
    { text: "I enjoy hunting and fishing.", type: "naturalist" },
    { text: "I read and enjoy poetry and occasionally write my own.", type: "linguistic" },
    { text: "I seem to understand things around me through a mathematical sense.", type: "logical-mathematical" },
    { text: "I can remember the tune of a song when asked.", type: "musical" },
    { text: "I can easily duplicate color, form, shading, and texture in my work.", type: "spatial" },
    { text: "I like the excitement of personal and team competition.", type: "bodily-kinesthetic" },
    { text: "I am quick to sense in others dishonesty and desire to control me.", type: "interpersonal" },
    { text: "I am always totally honest with myself.", type: "intrapersonal" },
    { text: "I enjoy hiking in natural places.", type: "naturalist" }
];

const form = document.getElementById('survey-form');

questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <label for="question${index}">${index + 1}. ${question.text}</label>
        <div>
            <input type="radio" name="question${index}" value="1"> 1
            <input type="radio" name="question${index}" value="2"> 2
            <input type="radio" name="question${index}" value="3"> 3
            <input type="radio" name="question${index}" value="4"> 4
            <input type="radio" name="question${index}" value="5"> 5
        </div>
    `;
    form.appendChild(questionDiv);
});

function submitSurvey() {
    const scores = {
        "linguistic": { score: 0, total: 0 },
        "logical-mathematical": { score: 0, total: 0 },
        "musical": { score: 0, total: 0 },
        "spatial": { score: 0, total: 0 },
        "bodily-kinesthetic": { score: 0, total: 0 },
        "interpersonal": { score: 0, total: 0 },
        "intrapersonal": { score: 0, total: 0 },
        "naturalist": { score: 0, total: 0 }
    };

    questions.forEach((question, index) => {
        const options = document.getElementsByName(`question${index}`);
        options.forEach(option => {
            if (option.checked) {
                scores[question.type].score += parseInt(option.value);
                scores[question.type].total += 5;
            }
        });
    });

    const resultArray = [];

    for (const [type, { score, total }] of Object.entries(scores)) {
        const percentage = ((score / total) * 100).toFixed(2);
        resultArray.push({ type, percentage });
    }

    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userResults = { name: userName, email: userEmail, results: resultArray };

    let allResults = JSON.parse(localStorage.getItem('allResults')) || [];
    allResults.push(userResults);
    localStorage.setItem('allResults', JSON.stringify(allResults));

    sendEmail(userName, userEmail, resultArray);

    window.location.href = 'results.html';
}

function sendEmail(name, email, results) {
    const resultsString = results.map(result => `${result.type}: ${result.percentage}%`).join(', ');
    const templateParams = {
        name: name,
        email: email,
        results: resultsString,
        admin_email: 'ranjanrishabh78@gmail.com'
    };

    emailjs.send('service_ditjuhf', 'template_1b6bmcj', templateParams)
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
        }, error => {
            console.log('FAILED...', error);
        });
}
