import { TMDb } from "TMDb";

export default class TMDbModule
{
	/**
	 * Store a reference to the TMDb attributes
	 */
	protected tmdb: TMDb;

	constructor(tmdb: TMDb) {
		this.tmdb = tmdb;
	}
}
