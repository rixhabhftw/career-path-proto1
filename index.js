document.getElementById('userInfoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    window.location.href = 'survey.html';
});
