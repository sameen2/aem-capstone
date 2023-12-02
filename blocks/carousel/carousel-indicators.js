let currentSlide = 0;
const initializeSlides = (slides) => {
	slides.forEach((slide, slideIndex) => {
		slide.style.transform = `translateX(${slideIndex * 100}%)`;
	});
};

const gotoNextSlide = (slides) => (event) => {
	if (currentSlide === slides.length - 1) {
		currentSlide = 0;
	} else {
		currentSlide++;
	}
	slides.forEach((slide, slideIndex) => {
		slide.style.transform = `translateX(${
			100 * (slideIndex - currentSlide)
		}%)`;
	});
};

const gotoPrevSlide = (slides) => (event) => {
	if (currentSlide === 0) {
		currentSlide = slides.length - 1;
	} else {
		currentSlide--;
	}

	//   move slide by 100%
	slides.forEach((slide, slideIndex) => {
		slide.style.transform = `translateX(${
			100 * (slideIndex - currentSlide)
		}%)`;
	});
};

const gotoSlide = (slides, gotoIndex) => (event) => {
	currentSlide = gotoIndex;
	slides.forEach((slide, slideIndex) => {
		slide.style.transform = `translateX(${
			100 * (slideIndex - currentSlide)
		}%)`;
	});
};

export { initializeSlides, gotoNextSlide, gotoPrevSlide, gotoSlide };
