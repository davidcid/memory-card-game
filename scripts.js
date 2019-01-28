const cards = document.querySelectorAll('.memory-card');
const movementsText = document.querySelector('.movements');
const button = document.querySelector('#new-game');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movements = 0;

function newGame() {
	if(lockBoard) return;
	cards.forEach(card => card.classList.remove('flip'));
	movements = 0;
	cards.forEach(card => card.addEventListener('click', flipCard));
	updateMovements();
	resetBoard();
	shuffle();
}


function flipCard() {
	if(lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		// first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	// second click
	hasFlippedCard = false;
	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework ===
	secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
	movements++;
	updateMovements();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		lockBoard = false;
		resetBoard();
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function updateMovements() {
	movementsText.innerHTML = movements;
}

function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	})
};

newGame();