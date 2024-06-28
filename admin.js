document.addEventListener('DOMContentLoaded', function() {
    fetch('https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec')
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-result');

                userDiv.innerHTML = `
                    <h2>${user.name} (${user.email})</h2>
                    <div class="category">Linguistic:</div><p>${user.linguistic}%</p>
                    <div class="category">Logical-Mathematical:</div><p>${user.logicalMathematical}%</p>
                    <div class="category">Musical:</div><p>${user.musical}%</p>
                    <div class="category">Spatial:</div><p>${user.spatial}%</p>
                    <div class="category">Bodily-Kinesthetic:</div><p>${user.bodilyKinesthetic}%</p>
                    <div class="category">Interpersonal:</div><p>${user.interpersonal}%</p>
                    <div class="category">Intrapersonal:</div><p>${user.intrapersonal}%</p>
                    <div class="category">Naturalist:</div><p>${user.naturalist}%</p>
                `;

                resultsDiv.appendChild(userDiv);
            });
        });
});
