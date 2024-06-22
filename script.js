document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');

        const scores = {
            linguistic: 0,
            logicalMathematical: 0,
            musical: 0,
            spatial: 0,
            bodilyKinesthetic: 0,
            interpersonal: 0,
            intrapersonal: 0,
            naturalist: 0,
        };

        const maxScores = {
            linguistic: 25,
            logicalMathematical: 25,
            musical: 25,
            spatial: 25,
            bodilyKinesthetic: 25,
            interpersonal: 25,
            intrapersonal: 25,
            naturalist: 25,
        };

        // Question to Intelligence Mapping
        const questionMapping = {
            q1: 'naturalist',
            q2: 'musical',
            q3: 'logicalMathematical',
            q4: 'existential',
            q5: 'interpersonal',
            q6: 'bodilyKinesthetic',
            q7: 'linguistic',
            q8: 'intrapersonal',
            q9: 'spatial',
            q10: 'naturalist',
            q11: 'musical',
            q12: 'logicalMathematical',
            q13: 'existential',
            q14: 'interpersonal',
            q15: 'bodilyKinesthetic',
            q16: 'linguistic',
            q17: 'intrapersonal',
            q18: 'spatial',
            q19: 'naturalist',
            q20: 'musical',
            q21: 'logicalMathematical',
            q22: 'existential',
            q23: 'interpersonal',
            q24: 'bodilyKinesthetic',
            q25: 'linguistic',
            q26: 'intrapersonal',
            q27: 'spatial',
            q28: 'naturalist',
            q29: 'musical',
            q30: 'logicalMathematical',
            q31: 'existential',
            q32: 'interpersonal',
            q33: 'bodilyKinesthetic',
            q34: 'linguistic',
            q35: 'intrapersonal',
            q36: 'spatial',
            q37: 'naturalist',
            q38: 'musical',
            q39: 'logicalMathematical',
            q40: 'existential',
            q41: 'interpersonal',
            q42: 'bodilyKinesthetic',
            q43: 'linguistic',
            q44: 'intrapersonal',
            q45: 'spatial',
            q46: 'naturalist',
            q47: 'musical',
            q48: 'logicalMathematical',
            q49: 'existential',
            q50: 'interpersonal',
            q51: 'bodilyKinesthetic',
            q52: 'linguistic',
            q53: 'intrapersonal',
            q54: 'spatial'
        };

        // Calculate scores
        for (let [key, value] of formData.entries()) {
            if (key.startsWith('q')) {
                const intelligence = questionMapping[key];
                scores[intelligence] += parseInt(value);
            }
        }

        // Calculate percentages
        const percentages = {};
        for (let key in scores) {
            percentages[key] = (scores[key] / maxScores[key]) * 100;
        }

        // Find top 3 intelligences
        const sortedIntelligences = Object.keys(percentages).sort((a, b) => percentages[b] - percentages[a]);
        const top3 = sortedIntelligences.slice(0, 3);

        // Create result string for URL
        const resultString = new URLSearchParams(percentages).toString();

        // Redirect to results page
        window.location.href = `results.html?name=${name}&email=${email}&${resultString}`;
    });
});
