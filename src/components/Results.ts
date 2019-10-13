export class Results<T>
{
	/**
	 * Result information
	 */
	private __page        : number = 1;
	private __totalPages  : number = 1;
	private __totalResults: number = 0;
	private __results     : T[];

	constructor(results: T[], page: number, totalPages: number, totalResults: number) {
		this.__page         = page;
		this.__results      = results;
		this.__totalPages   = totalPages;
		this.__totalResults = totalResults;
	}

	/**
	 * Get the next page of results
	 */
	next() {

	}

	/**
	 * Get the previous page of results
	 */
	prev() {

	}

	get results() { return this.__results; }

	/**
	 * Get the current page
	 */
	get page() { return this.__page; }

	/**
	 * Get the total number of pages
	 */
	get totalPages() { return this.__totalPages; }

	/**
	 * Get the total results
	 */
	get totalResults() { return this.__totalResults; }
}
