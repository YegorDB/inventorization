export function getCookieValue(name: string): string {
	var delimiter = `${name}=`;
	if (document.cookie.search(delimiter) > -1) {
		// @ts-ignore
		return document.cookie.split(delimiter).pop().split(';').shift();
	}
	return "";
}
