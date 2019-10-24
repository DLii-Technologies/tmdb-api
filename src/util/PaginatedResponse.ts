type RequestCallback<T> = (page: number) => Promise<IPaginatedResponse<T>>;

export interface IPaginatedResponse<T> {
	body         : T[];
	page         : number;
	totalPages  ?: number;
	totalResults?: number;
}

export class PaginatedResponse<T>
{
	/**
	 * The current response
	 */
	private __body: T[] = [];

	/**
	 * Store the current page
	 */
	private __page: number;

	/**
	 * The total number of pages available
	 */
	private __totalPages?: number;

	/**
	 * The total number of results available
	 */
	private __totalResults?: number;

	/**
	 * The request closure to execute when loading a page
	 */
	private __request: RequestCallback<T>;

	/**
	 * Create a new paginated response
	 */
	public static create<T>(page: number = 1, requestCallback: RequestCallback<T>) {
		return new Promise<PaginatedResponse<T>>((resolve, reject) => {
			new PaginatedResponse<T>(page, requestCallback)
				.setPage(page)
				.then(resolve)
				.catch(reject);
		});
	}

	/**
	 * Create a paginated response
	 *
	 * @param {Number}             page            The page number to load
	 * @param {RequestCallback<T>} requestCallback A closure to invoke when changing pages
	 */
	constructor(page: number, requestCallback: RequestCallback<T>) {
		this.__page    = page;
		this.__request = requestCallback;
	}

	// Accessors -----------------------------------------------------------------------------------

	/**
	 * The content of the response
	 */
	public get results() { return this.__body; }

	/**
	 * The current page of the response
	 */
	public get page() { return this.__page; }

	/**
	 * The total number of pages (may be undefined)
	 */
	public get totalPages() { return this.__totalPages; }

	/**
	 * The total number of results (may be undefined)
	 */
	public get totalResults() { return this.__totalResults; }

	// Mutators ------------------------------------------------------------------------------------

	/**
	 * Load the previous page
	 */
	previousPage() {
		return this.setPage(Math.max(this.__page - 1, 1));
	}

	/**
	 * Load the next page
	 */
	nextPage() {
		return this.setPage(this.__page + 1);
	}

	/**
	 * Set the current page
	 */
	setPage(page: number) {
		return new Promise<PaginatedResponse<T>>((resolve, reject) => {
			this.__request(page).then((result: IPaginatedResponse<T>) => {
				this.__body         = result.body;
				this.__page         = result.page;
				this.__totalPages   = result.totalPages;
				this.__totalResults = result.totalResults;
				resolve(this);
			}).catch(reject);
		});
	}
}
