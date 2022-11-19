"use strict";

const shuffle = (a) => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

hexo.extend.tag.register(
	"links",
	function (args, content) {
        let defaultAvatar = 'https://cdn.jsdelivr.net/gh/Candinya/Kratos-Rebirth/source/images/avatar.webp';
		let items = "";
		let data = [];
		try {
			data = JSON.parse(content);
		} catch (e) {
			return e;
		}
		if (args.includes("shuffle")) {
			data = shuffle(data);
		}

		for (let i = 0; i < data.length; i++) {
            let avatar = data[i].img
                ? data[i].img
                : defaultAvatar;
			items =
				items +
				`
				<li>
					<a target="_blank" href="${data[i].link}">
						<img src="${avatar}">
                        <h4>${data[i].title}</h4>
                        <p>${data[i].bio}</p>
					</a>
				</li>`;
		}

		let html = `<div class="links"><ul>${items}</ul></div>`;
		return html;
	},
	{ ends: true }
);
