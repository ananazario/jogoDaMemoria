const board = document.querySelector(".board")
const score = document.querySelector(".score")

let pares = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
let selectedCards = [];
let scoreCount = 0

const load = () => {
    scoreCount = 0;
    selectedCards = []
    const shufflePares = shuffle(pares);
    createCards(shufflePares);
}

const shuffle = (pares) => {
    for(let i = pares.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    return pares
}

const createCards = (pares) => {
    pares.forEach((par) => {
        const card = document.createElement('div');
        card.className = "card";
        card.innerText = par;
        card.dataset.value = par;
        card.addEventListener("click", isMatch);

        board.append(card)
    })
}

load()

function isMatch(value) {
    const selectedCard = value.target

    if(selectedCard.classList.contains("open")) {
        return
    }

    selectedCard.classList.add('open')
    selectedCards.push(selectedCard)

    if(selectedCards.length > 1) {
        const card1 = selectedCards[0]
        const card2 = selectedCards[1]

        if(card1.dataset.value === card2.dataset.value) {
            scoreCount = scoreCount + 1
            score.innerText = `score: ${scoreCount}`
            selectedCards = []
        } else {
            selectedCards = []
            setTimeout(() => {
                card1.classList.remove('open')
                card2.classList.remove('open')
            }, 800)
        }
    }
}