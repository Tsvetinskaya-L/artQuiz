export function getFooter() {
	return ` <div class="git">
                    <a target="_blank" class="footer__git-link" href="https://github.com/Tsvetinskaya-L">
                        <img class="footer__link-img" src="./assets/svg/free-icon-github-logo-25231.svg" alt="GitHub" />
                        <span>Tsvetinskaya Lidiya</span>
                    </a>
                </div>
                <div class="footer__date">2021</div>
                <div class="footer__logo">
                    <a target="_blank" class="footer__logo-link" href="https://rs.school/js/">
                        <img class="logo-img" src="https://rs.school/images/rs_school_js.svg" alt="rs-scool" />
                    </a>
                </div>
    `;
}

export function showBlock(id) {
	const hiddenBlocks = document.querySelectorAll(".wrapper__content");
	hiddenBlocks.forEach((block) => {
		block.classList.add("hide");
	});
	document.querySelector(id).classList.remove("hide");
}
