import * as Module from "./module/MovieModule";

export class TMDb
{
	/**
	 * Store a singleton instance of TMDb
	 */
	private static __instance: TMDb;

	/**
	 * Keep a reference to the API key
	 */
	public apiKey: string;

	/**
	 * TMDb Modules
	 */
	public movie: Module.MovieModule;

	/**
	 * Get the current instance if it exists
	 */
	public static instance(throwIfUndefined: boolean = false) {
		if (TMDb.__instance == undefined && throwIfUndefined) {
			throw new ReferenceError("No TMDb instance has been defined");
		}
		return TMDb.__instance;
	}

	/**
	 * Create a new TMDb instance
	 */
	constructor(apiKey: string, useSingleton: boolean = true) {
		this.apiKey = apiKey;
		this.movie  = new Module.MovieModule(this);
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
