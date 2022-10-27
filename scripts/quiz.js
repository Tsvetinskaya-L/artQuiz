class Quiz {
	constructor(questionText, image, answers, correctAnswer) {
		this.questionText = questionText;
		this.image = image;
		this.answers = answers;
		this.correctAnswer = correctAnswer;
	}

	updateQuestionText(questionText) {
		this.questionText = questionText;
	}

	renderCorrectAnswer() {
		const correctObject = this.answers.filter(
			(item) => item.author === this.correctAnswer
		)[0];

		const container = document.querySelector("#result_container");

		container.innerHTML = `<div class="wrapper__content wrapper__content__correct-answer" id="correctAnswer">
            <div class="wrapper__content__correct-answer__conteiner">
                <div class="correct-answer__image">
                    <img class="correct-answer__img-element" src="./assets/img/${this.image}.jpg" alt="picture">
                    <img class="correct-answer__img-idicator" src="./assets/svg/yes.svg" alt=""></img>
                </div>
                <div class="correct-answer__content">
                    <p class="picture-name">${correctObject.name}</p>
                    <p class="picture-author">${correctObject.author}<span class="picture-date">, ${correctObject.year}</span> </p>
                    <button class="correct-answer__btn-next" onclick="window.showArtistQuiz()">Next</button>

                </div>

            </div>

        </div>`;
	}

	renderWrongAnswer() {
		const correctObject = this.answers.filter(
			(item) => item.author === this.correctAnswer
		)[0];

		const container = document.querySelector("#result_container");

		container.innerHTML = `<div class="wrapper__content wrapper__content__correct-answer" id="correctAnswer">
            <div class="wrapper__content__correct-answer__conteiner">
                <div class="correct-answer__image">
                    <img class="correct-answer__img-element" src="./assets/img/${this.image}.jpg" alt="picture">
                    <img class="correct-answer__img-idicator" src="./assets/svg/no.svg" alt=""></img>
                </div>
                <div class="correct-answer__content">
                    <p class="picture-name">${correctObject.name}</p>
                    <p class="picture-author">${correctObject.author}<span class="picture-date">, ${correctObject.year}</span> </p>
                    <button class="correct-answer__btn-next" onclick="window.showArtistQuiz()">Next</button>

                </div>

            </div>

        </div>`;
	}
}

export class PictureQuiz extends Quiz {
	constructor(questionText, image, answers, correctAnswer) {
		super(questionText, image, answers, correctAnswer);
	}
}

export class ArtistQuiz extends Quiz {
	constructor(questionText, image, answers, correctAnswer) {
		super(questionText, image, answers, correctAnswer);
	}

	render() {
		return `<div class="wrapper__content__categories__artist__timer">
                <button class="stopTime" data-goto="#exitGame">X</button>
                <progress class="progress_time" id="file" max="100" value="70"> 70% </progress>
                <time>3:49</time>
            </div>

            <div class="question-artist">
                <p class="question-artist__content">${this.questionText}</p>
            </div>

            <div class="question-artist__image">
                <img class="question-artist__img-element" src="./assets/full/${this.image}full.jpg" alt="picture">
            </div>

            <div class="response-option">
                <button class="response-option__element" onclick="window.checkAnswer(0)">${this.answers[0].author}</button>
                <button class="response-option__element" onclick="window.checkAnswer(1)">${this.answers[1].author}</button>
                <button class="response-option__element" onclick="window.checkAnswer(2)">${this.answers[2].author}</button>
                <button class="response-option__element" onclick="window.checkAnswer(3)">${this.answers[3].author}</button>
            </div>

            <footer id="staic-footer" class="footer">
            </footer>`;
	}
}
