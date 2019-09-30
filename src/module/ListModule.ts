import TMDbModule      from "./TMDbModule";
import { ListDetails, MovieDetails, MovieListing } from "../components";
import { list }        from "../core";

export class ListModule extends TMDbModule
{
	/**
	 * @TODO Requires account information
	 * Get lists
	 */
	getLists() {}

	/**
	 * Get the details of a list
	 */
	getDetails(listId: string | number, lang?: string) {
		return new Promise<ListDetails>((resolve, reject) => {
			list.getDetails(this.tmdb.apiKey, listId, lang).then((details) => {
				resolve(new ListDetails(details, this.tmdb));
			}).catch(reject);
		});
	}

	/**
	 * Get the status of an item in the list
	 */
	hasItem(listId: string | number, movieId: number): Promise<boolean>;
	hasItem(listId: string | number, movie: MovieDetails | MovieListing): Promise<boolean>;
	hasItem(listId: string | number, movie: any) {
		return new Promise<boolean>((resolve, reject) => {
			let movieId = typeof movie == "number" ? movie : movie.id;
			list.getItemStatus(this.tmdb.apiKey, listId, movieId).then((details) => {
				resolve(details.item_present);
			}).catch(reject);
		});
	}

	/**
	 * @TODO
	 */
	// Mutators ------------------------------------------------------------------------------------

	/**
	 * Add a movie to a list
	 */
	addMovie() {}

	/**
	 * Clear a list of all movies
	 */
	clearList() {}

	/**
	 * Create a new list
	 */
	create() {}

	/**
	 * Delete a list
	 */
	delete() {}

	/**
	 * Remove a movie from a list
	 */
	removeMovie() {}
}
