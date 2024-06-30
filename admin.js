document.addEventListener('DOMContentLoaded', function() {
    fetch("https://script.google.com/macros/s/AKfycbzxVdzzqMjKoSqKngsh5eZpuKWXABlw_oltkjgR1zpyeC3-Vf7iLbpCUwyAKdDvDgoWzw/exec")
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');

            data.forEach(user => {
                const userResult = document.createElement('div');
                userResult.classList.add('user-result');

                const userName = document.createElement('h3');
                userName.textContent = `Name: ${user.name} - Email: ${user.email}`;
                userResult.appendChild(userName);

                const categories = ['linguistic', 'logicalMathematical', 'musical', 'spatial', 'bodilyKinesthetic', 'interpersonal', 'intrapersonal', 'naturalist'];
                
                categories.forEach(category => {
                    const scoreDiv = document.createElement('div');
                    scoreDiv.classList.add('intelligence-score');

                    const categoryName = document.createElement('span');
                    categoryName.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                    scoreDiv.appendChild(categoryName);

                    const scoreValue = document.createElement('span');
                    scoreValue.textContent = `${user[category]}%`;
                    scoreDiv.appendChild(scoreValue);

                    userResult.appendChild(scoreDiv);
                });

                resultsContainer.appendChild(userResult);
            });
        })
        .catch(error => console.error('Error fetching results:', error));
});
