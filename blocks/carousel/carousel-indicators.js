const carousel = {
	element: null,
	currentSlide: 0,
};

const slide = () => {
	if (carousel.element) {
		const translatedValue = carousel.currentSlide * 100 * -1;
		carousel.element.style.transform = `translateX(${translatedValue}%)`;
	}
};

const initializeSlides = (id) => {
	if (id) {
		const element = document.querySelector(`#${id}`);
		if (element) {
			carousel.element = element;
			carousel.slides = element.querySelectorAll(".carousel-item").length;
		}
	}
};

const gotoNextSlide = (event) => {
	if (carousel.currentSlide === carousel.slides - 1) {
		carousel.currentSlide = 0;
	} else {
		carousel.currentSlide++;
	}
	slide();
};

const gotoPrevSlide = (event) => {
	if (carousel.currentSlide === 0) {
		carousel.currentSlide = carousel.slides - 1;
	} else {
		carousel.currentSlide--;
	}
	slide();
};

const gotoSlide = (event) => {
	if (event.target.dataset.itemIndex) {
		carousel.currentSlide = event.target.dataset.itemIndex;
		slide();
	}
};

export { initializeSlides, gotoNextSlide, gotoPrevSlide, gotoSlide };
