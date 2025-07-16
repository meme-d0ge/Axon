export function normalizeAndValidateUrl(inputUrl: string): URL | null {
	const url =
		inputUrl.startsWith('https://') || inputUrl.startsWith('http://')
			? inputUrl
			: `https://${inputUrl}`;

	try {
		const checkUrl = new URL(url);
		return checkUrl.protocol === 'http:' || checkUrl.protocol === 'https:'
			? checkUrl
			: null;
	} catch (_) {
		return null;
	}
}
