export class TMDb
{
	/**
	 * TMDb API key reference
	 */
	public readonly apiKey: string;

	/**
	 * Store a singleton instance of TMDb
	 */
	private static __instance: TMDb;

	/**
	 * Get the current instance if it exists
	 */
	public static instance(throwIfUndefined: boolean = false) {
		if (TMDb.__instance == undefined && throwIfUndefined) {
			throw new ReferenceError("No TMDb instance has been defined");
		}
		return TMDb.__instance;
	}

	constructor(apiKey: string, useSingleton: boolean = true) {
		this.apiKey = apiKey;
		if (useSingleton) {
			TMDb.__instance = this;
		}
	}

	/**
	 * Destroy the current TMDb instance
	 */
	destroy() {
		if (TMDb.__instance == this) {
			delete TMDb.__instance;
		}
	}
}
