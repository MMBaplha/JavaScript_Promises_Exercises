const favoriteNum = 34

// Favorite number fact.
axios.get(`http://numbersapi.com/${favoriteNum}?json`)
.then(res => {
    const fact = res.data.text;
    document.body.innerHtml += `<p> Fact abiut ${favoriteNum}: ${fact}</p>`;
})
.catch(err => console.error(err));


// Single request with multiple numbers.
const nums = [1, 2, 3, 4];

axios.get(`http://numbersapi.com/${nums}?json`)
    .then(res => {
        for (let num in res.data) {
            document.body.innerHtml += `<p>Facts about ${nums}: ${res.data[nums]}</p>`;
        }
    })
    .catch(err => console.error(err));


// Four facts about my favorite number.
const fourFactsPromises = [];

for (let i = 0; i < 4; i++) {
    fourFactsPromises.push(axios.get(`http:///numbersapi.com/${favoriteNum}?json`));
} 

Promise.all(fourFactsPromises)
    .then(res => {
        res.forEach(response => {
            document.body.innerText += `<p>Another fact about ${favoriteNum}: ${response.data.text}</p>`;
        });
    })
    .catch(err => console.error(err));