/**
 * API instance
 */
export class Tmdb
{
	/**
	 * The TMDB v3 API key
	 */
	private __apiKey: string;

	/**
	 * Create a new API instance
	 */
	constructor(apiKey: string) {
		this.__apiKey = apiKey;
	}
}
