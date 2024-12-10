let deckId = null;
let zIndex = 1; // To stack cards 

// Function to create a new shuffled deck
async function createNewDeck() {
    try {
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        deckId = res.data.deck_id;
        console.log(`Deck created: ${deckId}`);
    } catch (err) {
        console.error('Error creating deck:', err);
    }
}

// Function to draw a card from the deck
async function drawCard() {
    if (!deckId) return;

    try {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        
        if (res.data.remaining === 0) {
            alert('No cards remaining');
            document.getElementById('draw-card-btn').disabled = true;
            return;
        }

        // Show card value and suit.
        const card = res.data.cards[0];
        console.log(`${card.value} of ${card.suit}`);
        const cardContainer = document.getElementById('card-container');
        
        // Add card image and value & create card and stack it
        const cardElement = document.createElement('img');
        cardElement.src = card.image;
        cardElement.alt = `${card.value} of ${card.suit}`;
        cardElement.classList.add('card');

        // Position with slight offset and increase z-index for stacking
        cardElement.style.zIndex = zIndex++;
        cardElement.style.transform = `translate(${Math.random() * 20}px, ${Math.random() * 20}px)`;

        cardContainer.appendChild(cardElement);
    } catch (err) {
        console.error('Error drawing card:', err);
    }
}

// Initialize the deck
createNewDeck();

// When button is clicked, draw a card
document.getElementById('draw-card-btn').addEventListener('click', drawCard);