const icons = [
	"fa-candy-cane",
	"fa-champagne-glasses",
	"fa-gift",
	"fa-heart",
	"fa-sleigh",
	"fa-snowman",
];
const solution = [];
const cardCollection = document.getElementsByClassName("card");
const cards = Array.prototype.slice.call(cardCollection);
const gameState = {
	firstCard: null,
	secondCard: null,
};

// Populate solution with needed amount of icons
for (let icon of icons) {
	solution.push(icon);
	solution.push(icon);
}
// Shuffle solution
shuffle(solution);
function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
	return array;
}
// Get icons onto cards
for (let i = 0; i < cards.length; i++) {
	cards[i].children[0].classList.add("fa-solid");
	cards[i].children[0].classList.add(solution[i]);
}

// Add event when player clicks a card
for (let card of cards) {
	card.onclick = () => {
		if (isFirstCard()) {
			gameState.firstCard = card;
			flipCard(card);
		} else if (isSecondCard()) {
			gameState.secondCard = card;
			flipCard(card);
			if (isMatch()) {
				resetGameState();
				if (isEndGame()) {
					displayEndGame();
				}
			} else {
				setTimeout(() => {
					coverCard(gameState.firstCard);
					coverCard(gameState.secondCard);
					resetGameState();
				}, 200);
			}
		}
	};
}

// CARDS
function isFirstCard() {
	return gameState.firstCard === null;
}
function isSecondCard() {
	return gameState.secondCard === null;
}

function flipCard(card) {
	card.classList.add("card-up");
	card.children[0].style.visibility = "visible";
}
function coverCard(card) {
	card.classList.remove("card-up");
	card.children[0].style.visibility = "hidden";
}

function isMatch() {
	let length = gameState.firstCard.children[0].classList.length;
	let condition = gameState.firstCard.children[0].classList[2];
	return gameState.secondCard.children[0].classList.contains(condition);
}

///GAME
function resetGameState() {
	gameState.firstCard = null;
	gameState.secondCard = null;
}
function isEndGame() {
	let end = true;
	for (let card of cards) {
		if (!card.classList.contains("card-up")) return false;
	}
	return true;
}
function displayEndGame() {
	console.log("Done!");
}
