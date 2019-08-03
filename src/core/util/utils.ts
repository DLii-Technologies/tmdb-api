/**
 * Automatically format a URI that has path parameters
 */
export function uriF(uri: string, ...values: any[]) {
	return uri.replace(/\{[A-z]*\}/g, (i) => values.shift() || i);
}
