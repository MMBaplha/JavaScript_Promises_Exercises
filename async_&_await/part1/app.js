const favoriteNum = 34;

// 1. Get a fact about the favorite number
async function getFavoriteNumberFact() {
    try {
        const response = await fetch(`http://numbersapi.com/${favoriteNum}?json`);
        const data = await response.json();
        document.body.innerHTML += `<p>Fact about ${favoriteNum}: ${data.text}</p>`;
    } catch (error) {
        console.error('Error fetching favorite number fact:', error);
    }
}

// 2. Get multiple number facts with a single request
const nums = [1, 2, 3, 4];

async function getMultipleNumberFacts() {
    try {
        const response = await fetch(`http://numbersapi.com/${nums.join(',')}?json`);
        const data = await response.json();
        for (let num in data) {
        document.body.innerHTML += `<p>Facts about ${num}: ${data[num]}</p>`;}
    } catch (error) {
        console.error('Error fetching multiple number facts:', error);
    }
}
    
// 3. Get 4 facts about the favorite number
async function getFourFacts() {
    const factsPromises = [];
    for (let i = 0; i < 4; i++) {
        factsPromises.push(fetch(`http://numbersapi.com/${favoriteNum}?json`).then(response => response.json()));
    } try {
        const facts = await Promise.all(factsPromises);
        facts.forEach(fact => {
            document.body.innerHTML += `<p>Another fact about ${favoriteNum}: ${fact.text}</p>`;
        });
    } catch (error) {
        console.error('Error fetching multiple facts:', error);
    }
}


getFourFacts();
getMultipleNumberFacts();
getFavoriteNumberFact();