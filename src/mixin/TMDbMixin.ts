/**
 * A base Mixin class that supplies the API key
 */
export default class TMDbMixin
{
	/**
	 * Store the API key for reference
	 */
	protected readonly apiKey: string;

	/**
	 * Create a new TMDb instance
	 */
	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}
}
