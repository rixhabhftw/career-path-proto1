document.addEventListener('DOMContentLoaded', () => {
    const adminResultsDiv = document.getElementById('admin-results');
    const allResults = JSON.parse(localStorage.getItem('allResults')) || [];

    allResults.forEach(user => {
        let resultHTML = `<div class="user-results"><h3>${user.name} (${user.email})</h3>`;
        user.results.forEach(result => {
            resultHTML += `<p>${result.type}: ${result.percentage}%</p>`;
        });
        resultHTML += `</div>`;
        adminResultsDiv.innerHTML += resultHTML;
    });
});
