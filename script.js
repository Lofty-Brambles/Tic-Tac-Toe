(function () {

	const contents = document.querySelectorAll(".tab-content");
	const tabLinks = document.querySelectorAll(".tab-links");
	const allInputs = document.querySelectorAll( "input" );
	const level = document.querySelector("select");
	const resetScores = document.querySelector(".reset-btn");
	const resetMatch = document.querySelector(".restart-btn");
	const date = document.querySelector(".year");

	const firstNamepvp = document.querySelector(".first-name-crtl");
	const firstNamepvpInput = document.querySelector("#plr1-name");
	const firstName = document.querySelector(".first-name");
	const secondNamepvp = document.querySelector(".second-name-crtl");
	const secondNamepvpInput = document.querySelector("#plr2-name");
	const secondName = document.querySelector(".second-name");
	const firstNamepvc = document.querySelector(".first-name-crtl-2");
	const firstNamepvcInput = document.querySelector("#plr-name");
	const firstScore = document.querySelector(".first-score");
	const secondScore = document.querySelector(".second-score");
	const winMessage = document.querySelector(".win-message");

	const boardPvp = document.querySelector(".board-pvp");
	const boardPvc = document.querySelector(".board-pvc");
	const squares = [...document.querySelectorAll(".square")];
	const cells = [...document.querySelectorAll(".cell")];

	let winCons = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	onLoading();

	function onLoading() {

		date.textContent = (new Date()).getFullYear();

		allInputs.forEach(input => {
			input.addEventListener("focusin", e => {
				e.currentTarget.parentNode
					.querySelector("label").classList
					.add("active");
			});
			input.addEventListener("focusout", e => {
				const ele = e.currentTarget;
				if (!ele.value) {
					ele.parentNode.querySelector("label")
						.classList.remove("active");
				};
			});
		});

		tabLinks.forEach(tabLink => {
			tabLink.addEventListener("click", e => {

				tabLinks.forEach(element => {
					element.classList.remove("active");
				});

				contents.forEach(element => {
					element.style.display = "none";
				});

				e.currentTarget.classList.add("active");
				const id = e.currentTarget.id;
				const opened = document.querySelector(`#${id}-menu`);
				opened.style.display = "flex";
				resetMatch.dataset.mode = id;
				resetScores.click();

				if (id === "pvc") {
					secondName.textContent = "The AI 🤖"
					resetMatch.dataset.levelling = level.value;
					startMatch(id, level.value);
				} else {
					startMatch(id);
				}

			});
		});
		window.onload = document.querySelector("#pvc").click();

		const focusOutEvent = new Event("focusout");
		firstNamepvp.addEventListener("click", () => {
			if (firstNamepvpInput.value !== "") {
				firstName.textContent = firstNamepvpInput.value;
				firstNamepvpInput.value = null;
				firstNamepvpInput.dispatchEvent(focusOutEvent);
				resetScores.click();
				startMatch("pvp");
			}
		});
		firstNamepvc.addEventListener("click", () => {
			if (firstNamepvcInput.value !== "") {
				firstName.textContent = firstNamepvcInput.value;
				firstNamepvcInput.value = null;
				firstNamepvcInput.dispatchEvent(focusOutEvent);
				resetScores.click();
				startMatch("pvc", level.value);
			}
		});
		secondNamepvp.addEventListener("click", () => {
			if (secondNamepvpInput.value !== "") {
				secondName.textContent = secondNamepvpInput.value;
				secondNamepvpInput.value = null;
				secondNamepvpInput.dispatchEvent(focusOutEvent);
				resetScores.click();
				startMatch("pvp");
			}
		});

		level.addEventListener("changed", () => {
			startMatch("pvc", level.value);
		});

		resetMatch.addEventListener("click", () => {
			const id = resetMatch.dataset.mode;
			const leveling = resetMatch.dataset.levelling ?? false;
			if (id === "pvc") {
				startMatch(id, leveling);
			} else {
				startMatch(id);
			}
		});

		resetScores.addEventListener("click", () => {
			firstScore.textContent = "0";
			secondScore.textContent = "0";
			winMessage.innerHTML = "No one has won a match yet.<br>Can you be the first?";
		});

	};

	function startMatch(mode, pvcLevel) {
		let gameDone = false;
		let turnX = true;

		if (mode === "pvp") {
			boardPvc.style.display = "none";
			boardPvp.style.display = "block";
			boardPvp.style.filter = null;
			cells.forEach(cell => cell.innerHTML = "<div></div>");
			cells.forEach(cell => cell.addEventListener("click", () => {

				if (turnX && cell.innerHTML === `<div></div>` && !gameDone) {
					cell.innerHTML = `<div>X</div>`;
					turnX = !turnX;
				} else if (!turnX && cell.innerHTML === `<div></div>` && !gameDone) {
					cell.innerHTML = `<div>O</div>`;
					turnX = !turnX;
				}

				if (checkWin("X")) {
					boardPvp.style.filter = "blur(5px)";
					winMessage.innerHTML = `Woohoo! ${firstName.textContent} won!<br>Click play again to do so!`;
					firstScore.textContent++;
					gameDone = true;
				} else if (checkWin("O")) {
					boardPvp.style.filter = "blur(5px)";
					winMessage.innerHTML = `Woohoo! ${secondName.textContent} won!<br>Click play again to do so!`;
					secondScore.textContent++;
					gameDone = true;
				} else if (checkTie()) {
					boardPvp.style.filter = "blur(5px)";
					winMessage.innerHTML = "Oh no, it's a draw!<br>Can you win the next bout?<br>Click play again to do so!";
					gameDone = true;
				}

			}));
		} else {
			boardPvp.style.display = "none";
			boardPvc.style.display = "block";
			boardPvc.style.filter = "null";
			squares.forEach(square => square.innerHTML = "<div></div>");
			squares.forEach(square => square.addEventListener("click", () => {
				if (turnX && square.innerHTML === `<div></div>` && !gameDone) {
					square.innerHTML = `<div>X</div>`;
					turnX = !turnX;
					if (checkWin("X")) {
						boardPvp.style.filter = "blur(5px)";
						winMessage.innerHTML = `Woohoo! ${firstName.textContent} won!<br>Click play again to do so!`;
						firstScore.textContent++;
						gameDone = true;
					} else if (checkTie()) {
						boardPvp.style.filter = "blur(5px)";
						winMessage.innerHTML = "Oh no, it's a draw!<br>Can you win the next bout?<br>Click play again to do so!";
						gameDone = true;
					} else {
						runBotAI(pvcLevel);
						if (checkWin("O")) {
							boardPvp.style.filter = "blur(5px)";
							winMessage.innerHTML = `Oh-no! ${secondName.textContent} won..<br>Click play again for revenge!`;
							secondScore.textContent++;
							gameDone = true;
						} else if (checkTie()) {
							boardPvp.style.filter = "blur(5px)";
							winMessage.innerHTML = "Oh no, it's a draw!<br>Can you win the next bout?<br>Click play again to do so!";
							gameDone = true;
						}
					}
				}
			}));
		}
	};

	function checkWin(turn) {
		winCons.forEach(con => {
			let counter = 0;
			console.log("comb:", con);
			con.forEach(num => {
				if (cells[num].innerHTML === `<div>${turn}</div>`) {
					counter++;
				}
				console.log(counter);
				if (counter >= 3) {
					return true;
				}
			});
		});
		return false;
	}

	function checkTie() {
		return cells.every( cell => 
			cell.innerHTML === "<div>X</div>" || cell.innerHTML === "<div>O</div>");
	}

	function runBotAI(lev) {
		const array = [];
		squares.forEach(square => {
			if (square.textContent === `<div></div>`) {
				array.push("_");
			} else if (square.textContent === `<div>X</div>`) {
				array.push("X");
			} else if (square.textContent === `<div>O</div>`) {
				array.push("O");
			}
		});
		const allMoves = findEmptyIndices(array);
		const bestMove = findBestMove(array);

		if (lev === "blind") {
			squares[random(allMoves)].textContent = "<div>O</div>";
		} else if (lev === "easy") {
			const decide = Math.floor(Math.random()*100);
			if (decide < 25) {
				squares[bestMove].textContent = "<div>O</div>";
			} else {
				squares[random(allMoves)].textContent = "<div>O</div>";
			}
		} else if (lev === "medium") {
			const decide = Math.floor(Math.random()*100);
			if (decide < 50) {
				squares[bestMove].textContent = "<div>O</div>";
			} else {
				squares[random(allMoves)].textContent = "<div>O</div>";
			}
		} else if (lev === "hard") {
			const decide = Math.floor(Math.random()*100);
			if (decide < 75) {
				squares[bestMove].textContent = "<div>O</div>";
			} else {
				squares[random(allMoves)].textContent = "<div>O</div>";
			}
		} else if (lev === "impossible") {
			squares[bestMove].textContent = "<div>O</div>";
		}
	}

	function random(array) {
		return array[Math.floor(Math.random()*array.length)];
	}

	function findEmptyIndices(board) {
		const indexArr = [];
		for (let i = 0; i < board.length; i++) {
			if (board[i] === "_") {
				indexArr.push[i];
			}
		}
		return indexArr;
	}

	function findBestMove(array) {
		let bestVal = -11;
		let bestIndex = -1;
		for (let i = 0; i < array.length; i++) {
			if (array[i] === "_") {
				array[i] = "X";
				let moreVal = minMax(array, 0, false);
				array[i] = "_";
				if (moreVal > bestVal) {
					bestVal = moreVal;
					bestIndex = i;
				}
			}
		}
		return bestIndex;
	}

	function minMax(board, depth, maxBool) {

		if (checkWinInArr(board, "O")) return 10;
		if (checkWinInArr(board, "X")) return -10;
		if (checkTieInArr(board)) return 0;

		if (maxBool) {
			let best = -11;
			for (let i = 0; i < board.length; i++) {
				if (board[i] === "_") {
					board[i] = "X";
					best = Math.max(best, minMax(board, depth+1, !maxBool));
					board[i] = "_";
				}
			}
			return best;
		} else {
			let best = 11;
			for (let i = 0; i < board.length; i++) {
				if (board[i] === "_") {
					board[i] = "O";
					best = Math.min(best, minMax(board, depth+1, !maxBool));
					board[i] = "_";
				}
			}
			return best;
		}
	}

	function checkWinInArr(board, move) {
		winCons.forEach(con => {
			let counter = 0;
			con.forEach(num => {
				if (board[num] === move) {
					counter++;
				}
				if (counter === 3) {
					return true;
				}
			});
		});
		return false;
	}

	function checkTieInArr(board) {
		board.forEach(move => {
			if (move === "_") {
				return false;
			}
		});
		return true;
	}

})();