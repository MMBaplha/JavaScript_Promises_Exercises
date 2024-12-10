const favoriteNum = 34;

// Favorite number fact
axios.get(`http://numbersapi.com/${favoriteNum}?json`)
    .then(res => {
        const fact = res.data.text;
        document.getElementById("facts-container").innerHTML += `<p>Fact about ${favoriteNum}: ${fact}</p>`;
    })
    .catch(err => console.error(err));

// Single request with multiple numbers
const nums = [1, 2, 3, 4];

axios.get(`http://numbersapi.com/${nums.join(',')}?json`)
    .then(res => {
        for (let num in res.data) {
            document.getElementById("facts-container").innerHTML += `<p>Fact about ${num}: ${res.data[num]}</p>`;
        }
    })
    .catch(err => console.error(err));

// Four facts about my favorite number
const fourFactsPromises = [];

for (let i = 0; i < 4; i++) {
    fourFactsPromises.push(axios.get(`http://numbersapi.com/${favoriteNum}?json`));
}

Promise.all(fourFactsPromises)
    .then(res => {
        res.forEach(response => {
            document.getElementById("facts-container").innerHTML += `<p>Another fact about ${favoriteNum}: ${response.data.text}</p>`;
        });
    })
    .catch(err => console.error(err));
