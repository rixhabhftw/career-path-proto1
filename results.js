document.addEventListener('DOMContentLoaded', function() {
    fetch('https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec')
        .then(response => response.json())
        .then(data => {
            const resultsTableBody = document.getElementById('resultsTableBody');
            data.forEach(result => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.name}</td>
                    <td>${result.email}</td>
                    <td>${result.linguistic}%</td>
                    <td>${result.logicalMathematical}%</td>
                    <td>${result.musical}%</td>
                    <td>${result.spatial}%</td>
                    <td>${result.bodilyKinesthetic}%</td>
                    <td>${result.interpersonal}%</td>
                    <td>${result.intrapersonal}%</td>
                    <td>${result.naturalist}%</td>
                `;
                resultsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching survey results:', error);
        });
});
