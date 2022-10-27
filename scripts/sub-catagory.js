export class SubCategory {
	constructor(label, score, img, questions) {
		this.label = label;
		this.score = score || 0;
		this.img = img;
		this.questions = questions;
		this.started = false;
		this.questionIndex = 0;
		this.done = false;
	}

	getScore() {
		if (this.score) {
			return `${this.score} / 10`;
		}
		return "";
	}

	updateScore() {
		this.score = this.score + 1;
		this.started = true;
	}

	setNext() {
		this.questionIndex = this.questionIndex + 1;
		if (this.questionIndex > 9) {
			this.done = true;
		}
	}

	isInProgress() {
		return this.started;
	}

	render() {
		if (this.done) {
			document.querySelector(
				"#result_container"
			).innerHTML = `<div class="wrapper__content result congratulations">
            <button class="exitBtn" data-goto="#startPage">X</button>
            <img class="congratulations__img" src="./assets/svg/cup.svg" alt="">
            <p class="result__text">Congratulations!</p>
            <p class="congratulations__score">${subcategoryObject.score} / 10</p>
            <div class="exitGame__button">
                <button class="exitGame__btn" data-goto="#startPage">Home</button>
                <button class="exitGame__btn" data-goto="#startPage">Next Quiz</button>
            </div>
        </div>`;
			window.addEventlistners();

			return;
		}

		return `<div class="categories__artist categories__artist__01">
                    <div class="categories__artist__header">
                        <h3 class="category-title">${this.label}</h3>
                        <p class="categories__artist__score categories__artist__01-score score-show">${this.getScore()}</p>
                    </div>
                    <div class="categories__artist__images categories__artist__images-01">
                        <a class="moveToCategory" data-question-index="${
													this.questionIndex
												}" data-goto="#artistPage" onclick="window.showArtistQuiz(${
			this.label
		}, ${this.questionIndex})"><img class="category-img ${
			this.isInProgress() ? "in-progress" : ""
		}"
                                src="./assets/img/${
																	this.img
																}.jpg" alt="picture" /></a>
                    </div>
                </div>`;
	}
}
