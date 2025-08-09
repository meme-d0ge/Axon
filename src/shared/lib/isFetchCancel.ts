export function isFetchCancel(error: Error) {
	return error.name === 'AbortError';
}
