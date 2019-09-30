import { TMDb } from "../TMDb";

/**
 * A component is an item of TMDb, such as a list, movie, etc.
 */
export class Component
{
	/**
	 * A reference to TMDb
	 */
	private __tmdb: TMDb;

	constructor(tmdb?: TMDb) {
		this.__tmdb = tmdb || TMDb.instance(true);
	}

	/**
	 * Get the TMDb reference
	 */
	protected get tmdb() { return this.__tmdb; }
}
