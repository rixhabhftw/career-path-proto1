document.addEventListener('DOMContentLoaded', function() {
    fetch('https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('resultsContainer');
            data.forEach((item, index) => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('result');

                resultElement.innerHTML = `
                    <h2>User ${index + 1}</h2>
                    <p><strong>Name:</strong> ${item.name}</p>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Linguistic:</strong> ${item.linguistic}%</p>
                    <p><strong>Logical-Mathematical:</strong> ${item.logicalMathematical}%</p>
                    <p><strong>Musical:</strong> ${item.musical}%</p>
                    <p><strong>Spatial:</strong> ${item.spatial}%</p>
                    <p><strong>Bodily-Kinesthetic:</strong> ${item.bodilyKinesthetic}%</p>
                    <p><strong>Interpersonal:</strong> ${item.interpersonal}%</p>
                    <p><strong>Intrapersonal:</strong> ${item.intrapersonal}%</p>
                    <p><strong>Naturalist:</strong> ${item.naturalist}%</p>
                `;

                resultsContainer.appendChild(resultElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
