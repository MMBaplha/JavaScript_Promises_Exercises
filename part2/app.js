let deckId = null;
let zIndex = 1; // To stack cards 

// Create a new shuffled deck
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        deckId = res.data.deck_id;
        console.log(`Deck created: ${deckId}`);
    })
    .catch(err => console.error(err));

// When button is clicked, it draws a card.
document.getElementById('draw-card-btn').addEventListener('click', () => {
    if (!deckId) return;

    axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {
            if (res.data.remaining === 0) {
                alert('No cards remaining');
                document.getElementById('draw-card-btn').disabled = true;
                return;
            }

            // show card value and suit.
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
        })
        .catch(err => console.error(err));
    });