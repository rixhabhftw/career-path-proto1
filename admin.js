document.addEventListener('DOMContentLoaded', function() {
    fetch('https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            data.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result');
                resultDiv.innerHTML = `
                    <p>Name: ${result.name}</p>
                    <p>Email: ${result.email}</p>
                    <p>Linguistic: ${result.linguistic}%</p>
                    <p>Logical-Mathematical: ${result.logicalMathematical}%</p>
                    <p>Musical: ${result.musical}%</p>
                    <p>Spatial: ${result.spatial}%</p>
                    <p>Bodily-Kinesthetic: ${result.bodilyKinesthetic}%</p>
                    <p>Interpersonal: ${result.interpersonal}%</p>
                    <p>Intrapersonal: ${result.intrapersonal}%</p>
                    <p>Naturalist: ${result.naturalist}%</p>
                `;
                resultsContainer.appendChild(resultDiv);
            });
        });
});
