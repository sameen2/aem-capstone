import {
	initializeSlides,
	gotoNextSlide,
	gotoPrevSlide,
} from "./carousel-indicators.js";

export default async function decorate(block) {
	const fragment = new DocumentFragment();
	const carouselActions = document.createElement("div");
	const carouselIndicators = document.createElement("div");
	const carouselNavigationWrapper = document.createElement("div");
	carouselActions.className = "carousel-actions";
	carouselIndicators.className = "carousel-indicators";
	carouselNavigationWrapper.className = "carousel-navigation-wrapper";
	carouselNavigationWrapper.appendChild(carouselIndicators);
	carouselNavigationWrapper.appendChild(carouselActions);
	[...block.children].forEach((carouselItem, itemIndex) => {
		console.log("Carousel Item :: ", carouselItem);
		const imageDiv = document.createElement("div");
		const contentDiv = document.createElement("div");
		const containerDiv = document.createElement("div");
		containerDiv.className = "carousel-item";
		imageDiv.className = "carousel-item--image";
		contentDiv.className = "carousel-item--content";
		const picture = carouselItem.querySelector("picture");
		if (picture) {
			imageDiv.appendChild(picture);
		}
		const carouselHeading = carouselItem.querySelector("h2");
		if (carouselHeading) {
			contentDiv.appendChild(carouselHeading);
			const indicatorButton = document.createElement("button");
			indicatorButton.ariaLabel = carouselHeading.textContent;
			indicatorButton.dataset.itemIndex = itemIndex;
			carouselIndicators.appendChild(indicatorButton);
		}
		const paragraphs = carouselItem.children?.[1].querySelectorAll("p");
		if (paragraphs.length) {
			paragraphs.forEach((p, index) => {
				contentDiv.appendChild(p);
			});
		}
		containerDiv.appendChild(contentDiv);
		containerDiv.appendChild(imageDiv);
		fragment.appendChild(containerDiv);
	});
	block.innerHTML = "";
	block.appendChild(fragment);
	block.parentElement.appendChild(carouselNavigationWrapper);
	const prevButton = document.createElement("button");
	prevButton.ariaLabel = "Previous slide";
	const nextButton = document.createElement("button");
	nextButton.ariaLabel = "Next slide";
	carouselActions.appendChild(prevButton);
	carouselActions.appendChild(nextButton);
	const slides = block.querySelectorAll(".carousel-item");
	initializeSlides(slides);
	prevButton.addEventListener("click", gotoPrevSlide(slides));
	nextButton.addEventListener("click", gotoNextSlide(slides));
}
