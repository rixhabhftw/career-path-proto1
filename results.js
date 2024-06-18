// Add this script tag to the head of your results.html
// <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>

emailjs.init('9fcSaMBOo8taTcGEp'); // Replace with your EmailJS API key

document.addEventListener('DOMContentLoaded', () => {
    const resultsDiv = document.getElementById('results');
    const results = JSON.parse(localStorage.getItem('allResults'));
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    let userResults = results.find(result => result.name === userName && result.email === userEmail);
    let resultHTML = `<h2>Results for ${userResults.name} (${userResults.email})</h2>`;
    userResults.results.sort((a, b) => b.percentage - a.percentage);

    resultHTML += `<p>Top 3 Intelligences:</p>`;
    for (let i = 0; i < 3; i++) {
        resultHTML += `<p>${userResults.results[i].type}: ${userResults.results[i].percentage}%</p>`;
    }

    resultHTML += `<p>Other Intelligences:</p>`;
    for (let i = 3; i < userResults.results.length; i++) {
        resultHTML += `<p>${userResults.results[i].type}: ${userResults.results[i].percentage}%</p>`;
    }

    resultsDiv.innerHTML = resultHTML;
});
