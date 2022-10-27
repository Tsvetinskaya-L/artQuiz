import { getFooter, showBlock } from "./utils.js";
import images from "./images.js";
import { SubCategory } from "./sub-catagory.js";
import { ArtistQuiz, PictureQuiz } from "./quiz.js";

const QUESTION_PER_SUBCATEGORY = 10;
let quiz;

document.addEventListener("DOMContentLoaded", function () {
	renderFooter();

	restoreQuizState();
	fillArtistSubCategory();

	window.addEventlistners();
});

function renderFooter() {
	const footer = document.querySelectorAll(".footer");
	footer.forEach((element) => {
		element.innerHTML = getFooter();
	});
}

function restoreQuizState() {
	quiz = createQuiz();
}

function createQuiz() {
	// create artist quiz
	quiz = {
		ArtistQuiz: [],
		PicturesQuiz: [],
	};

	const imagesForArtistQuiz = images.slice(0, Math.floor(images.length / 2)); //= 120
	const subCategoriesAmount =
		imagesForArtistQuiz.length / QUESTION_PER_SUBCATEGORY; //= 12

	const subCategories = new Array(subCategoriesAmount);

	for (let i = 0; i < subCategories.length; i++) {
		// label, score, img, questions
		const sub = new SubCategory(
			i,
			0,
			i * QUESTION_PER_SUBCATEGORY,
			imagesForArtistQuiz.slice(
				i * QUESTION_PER_SUBCATEGORY,
				(i + 1) * QUESTION_PER_SUBCATEGORY
			)
		);
		quiz["ArtistQuiz"].push(sub);
	}

	return quiz;

	// create picture quiz
	// const imagesForPicturesQuiz = images.slice(Math.floor(images.length / 2) + 1);
}

function fillArtistSubCategory() {
	const container = document.querySelector("#artistsQuiz");

	let html = "";
	quiz.ArtistQuiz.forEach((sub) => {
		html = html + sub.render();
	});

	container.innerHTML = html;
}

let quizObject;
let subcategoryObject;

window.showArtistQuiz = function (subid, currectQustionIndex) {
	document.querySelector("#result_container").innerHTML = "";
	const container = document.querySelector("#artistPage");

	if (typeof subid !== "number") {
		subid = subcategoryObject.label;
		currectQustionIndex = subcategoryObject.questionIndex;
	}

	if (currectQustionIndex > 9) {
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

	const qustion = quiz.ArtistQuiz[subid].questions[currectQustionIndex];
	subcategoryObject = quiz.ArtistQuiz[subid];

	let html = "";

	//  questionText, image, answers, correctAnswer
	quizObject = new ArtistQuiz(
		"Who is the author of this picture?",
		qustion.imageNum,
		doMix([...getUniqItems(3), qustion]),
		qustion.author
	);

	html = html + quizObject.render();
	container.innerHTML = html;

	window.addEventlistners();
};

window.checkAnswer = function (answerIndex) {
	if (quizObject.answers[answerIndex].author === quizObject.correctAnswer) {
		quizObject.renderCorrectAnswer();

		subcategoryObject.updateScore();
		subcategoryObject.setNext();
	} else {
		quizObject.renderWrongAnswer();

		subcategoryObject.setNext();
	}

	fillArtistSubCategory();
	window.addEventlistners();
};

function getUniqItems(amount, skipImgNum) {
	let array = [];
	for (let i = 0; i < 10; i++) {
		array.push(images[Math.floor(Math.random() * images.length)]);
	}

	array = array.filter((item) => item.imageNum !== skipImgNum);
	array = [...new Set(array)];
	return array.slice(0, amount);
}

function doMix(arry) {
	return arry.sort(() => Math.random() - 0.5);
}

window.addEventlistners = () => {
	const clickFn = (event) => {
		showBlock(event.currentTarget.dataset.goto);
	};

	const buttons = document.querySelectorAll("[data-goto]");
	buttons.forEach((button) => {
		button.removeEventListener("click", clickFn);
		button.addEventListener("click", clickFn);
	});
};
