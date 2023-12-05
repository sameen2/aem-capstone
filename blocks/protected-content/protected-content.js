export default async function decorate(block) {
	const fragment = new DocumentFragment();
	try {
		const result = await fetch("/jsonData.json?sheet=guides");
		const response = await result.json();
		console.log("result :: ", response);
	} catch {}
	[...block.children].forEach((content) => {
		const parent = document.createElement("div");
		parent.className = "protected-content--item";
		const picture = content.querySelector("picture");
		const contentDiv = content.querySelector("div:last-child");
		contentDiv.className = "protected-content--content";
		parent.appendChild(contentDiv);
		parent.appendChild(picture);
		const container = document.createElement("div");
		container.className = "protected-container--wrapper";
		container.appendChild(parent);
		fragment.appendChild(container);
	});
	block.innerHTML = "";
	block.appendChild(fragment);
}
