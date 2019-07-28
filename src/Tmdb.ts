import { CompanyResults } from "./Interfaces";
import { get, post, del } from "./Network";

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

	/**
	 * Search a company
	 */
	searchCompany(query: string, page: number = 1) {
		return get<CompanyResults>(this.__apiKey, "/search/company", {query, page});
	}

	/**
	 * Find an item by an external ID
	 */
	find() {

	}

	/**
	 * Search for a movie or TV show
	 */
	search() {

	}
}
