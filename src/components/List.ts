import { IListDetails, IList }        from "../core/interface/list";
import { MovieListing, MovieDetails } from "./Movie";
import { Component }                  from "./Component";
import { TMDb }                       from "../TMDb";
import utils                          from "../util";

class List extends Component
{
	public readonly description  : string;
	public readonly favoriteCount: number;
	public readonly id           : string | number;
	public readonly itemCount    : number;
	public readonly iso_639_1    : string;
	public readonly name         : string;
	public readonly posterPath   : string | null;

	constructor(list: IList | IListDetails, tmdb?: TMDb) {
		super(tmdb);
		this.description   = list.description;
		this.favoriteCount = list.favorite_count;
		this.id            = list.id;
		this.itemCount     = list.item_count;
		this.iso_639_1     = list.iso_639_1;
		this.name          = list.name;
		this.posterPath    = list.poster_path;
	}

	/**
	 * Get the status of a movie item in the list
	 */
	hasItem(movieId: number): Promise<boolean>;
	hasItem(movie: MovieListing | MovieDetails): Promise<boolean>;
	hasItem(movie: any): Promise<boolean> {
		return this.tmdb.list.hasItem(this.id, movie);
	}
}

export class ListListing extends List
{
	public readonly type: string;

	constructor(list: IList, tmdb?: TMDb) {
		super(list, tmdb);
		this.type = list.list_type;
	}

	/**
	 * Get the details of the list
	 */
	getDetails(language?: string) {
		return this.tmdb.list.getDetails(this.id, language);
	}
}

export class ListDetails extends List
{
	public readonly createdBy: string;
	public readonly items     : MovieListing[];

	constructor(list: IListDetails, tmdb?: TMDb) {
		super(list, tmdb);
		this.createdBy = list.created_by;
		this.items     = utils.wrap(MovieListing, list.items, this.tmdb);
	}
}
