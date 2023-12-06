import { fetchPlaceholders } from "../../scripts/aem.js";

export default async function decorate(block) {
	let elementHTML = "";
	const url = block.children?.[0]?.children?.[0]?.textContent || null;
	if (url) {
		try {
			const response = await fetch(url);
			const ph = await fetchPlaceholders();
			const { data = [] } = await response.json();
			data.forEach((item) => {
				const {
					name,
					interests,
					imagePath,
					twitterUrl,
					facebookUrl,
					instagramUrl,
				} = item;
				elementHTML += `
					<div class="contributor">
						<div class="image">
							<picture>
								<source srcset='${imagePath}' media=("min-width: 600px") />
								<source srcset='${imagePath}' />
								<img src='${imagePath}' alt='${name}' />
							</picture>
						</div>
						<div class="title">
							<h3>${name}</h3>
						</div>
						<div class="skills">
							<h5>${interests}</h5>
						</div>
						<div class="social-share">
							<a class="icon twitter-icon" href='${ph.twitterSocialUrl}${twitterUrl}' title='${ph.socialMediaText} ${ph.twitter}'></a>
							<a class="icon facebook-icon" href='${ph.facebookSocialUrl}${facebookUrl}' title='${ph.socialMediaText} ${ph.facebook}'></a>
							<a class="icon instagram-icon" href='${ph.instagramSocialUrl}${instagramUrl}' title='${ph.socialMediaText} ${ph.instagram}'></a>
						</div>
					</div>
				`;
			});
		} catch (ex) {
			console.log("exception occurred :: ", ex);
		}
	}
	block.innerHTML = elementHTML;
}
