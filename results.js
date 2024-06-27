document.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    fetch(`https://script.google.com/macros/s/AKfycbz8bKrhVIToCc-HvPuh7PMjJe0mZRX_gs0AbVhpAMk5EbXbeSwqlFkdRc2OMZaqmZ6yxA/exec?name=${name}&email=${email}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const result = data[0];
                document.getElementById('resultName').textContent = result.name;
                document.getElementById('resultEmail').textContent = result.email;
                document.getElementById('resultLinguistic').textContent = `${result.linguistic}%`;
                document.getElementById('resultLogicalMathematical').textContent = `${result.logicalMathematical}%`;
                document.getElementById('resultMusical').textContent = `${result.musical}%`;
                document.getElementById('resultSpatial').textContent = `${result.spatial}%`;
                document.getElementById('resultBodilyKinesthetic').textContent = `${result.bodilyKinesthetic}%`;
                document.getElementById('resultInterpersonal').textContent = `${result.interpersonal}%`;
                document.getElementById('resultIntrapersonal').textContent = `${result.intrapersonal}%`;
                document.getElementById('resultNaturalist').textContent = `${result.naturalist}%`;
            }
        });
});
