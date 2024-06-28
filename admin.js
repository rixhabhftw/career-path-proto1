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
                    <p><strong>Linguistic:</strong> ${user.linguistic}%</p>
                    <p><strong>Logical-Mathematical:</strong> ${user.logicalMathematical}%</p>
                    <p><strong>Musical:</strong> ${user.musical}%</p>
                    <p><strong>Spatial:</strong> ${user.spatial}%</p>
                    <p><strong>Bodily-Kinesthetic:</strong> ${user.bodilyKinesthetic}%</p>
                    <p><strong>Interpersonal:</strong> ${user.interpersonal}%</p>
                    <p><strong>Intrapersonal:</strong> ${user.intrapersonal}%</p>
                    <p><strong>Naturalist:</strong> ${user.naturalist}%</p>
                `;

                resultsDiv.appendChild(userDiv);
            });
        });
});
