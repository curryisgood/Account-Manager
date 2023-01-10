const getCookieList = () => {
	const cookies = document.cookie.split('; ');
	const cookieList: string[][] | null = [];

	cookies.map(cookie => {
		const tuple = cookie.split('=');
		cookieList.push([tuple[0], tuple[1]]);
	});

	return cookieList;
};

export const getCookie = (key: string) => {
	const cookieList = getCookieList();
	for (let cookie of cookieList) {
		if (cookie[0] === key) {
			return cookie;
		}
	}
	return null;
};
