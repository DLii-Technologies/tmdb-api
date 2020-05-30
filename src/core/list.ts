import { IListDetails, IListItemStatus }  from "./interface/list";
import { IListCreateResponse, IResponse } from "./interface/response";
import { IListResults }                   from "./interface/results";
import { get, post, del }                 from "./util/network";
import { uriF }                           from "./util/utils";

export let list = {

	/**
	 * Get all of the lists created by an account
	 */
	getLists(apiKey: string, sessionId: string, accountId?: number, page?: number,
		language?: string)
	{
		return get<IListResults>(apiKey, uriF("account/{account_id}/lists", accountId), {
			session_id: sessionId,
			language,
			page,
		});
	},

	/**
	 * Get the details of a list
	 */
	getDetails(apiKey: string, listId: string | number, language?: string) {
		return get<IListDetails>(apiKey, `list/${listId}`, { language });
	},

	/**
	 * Get the status of a list item
	 */
	getItemStatus(apiKey: string, listId: string | number, movieId: number) {
		return get<IListItemStatus>(apiKey, `list/${listId}/item_status`, { movie_id: movieId });
	},

	/**
	 * Create a new list
	 */
	create(apiKey: string, sessionId: string, name: string, description?: string,
		language?: string)
	{
		return post<IListCreateResponse>(apiKey, "list", { session_id: sessionId },
			{ name, description, language });
	},

	/**
	 * Add a movie to a list
	 */
	addMovie(apiKey: string, sessionId: string, listId: string | number, movieId: number) {
		return post<IResponse>(apiKey, `list/${listId}/add_item`, { session_id: sessionId },
			{ media_id: movieId });
	},

	/**
	 * Remove a movie from a list
	 */
	removeMovie(apiKey: string, sessionId: string, listId: string | number, movieId: number) {
		return post<IResponse>(apiKey, `list/${listId}/remove_item`, { session_id: sessionId },
			{ media_id: movieId });
	},

	/**
	 * Clear a list of all movies
	 */
	clearList(apiKey: string, sessionId: string, listId: string | number) {
		return post<IResponse>(apiKey, `list/${listId}/clear`, {
			session_id: sessionId,
			confirm   : true
		});
	},

	/**
	 * Delete a list
	 */
	delete(apiKey: string, sessionId: string, listId: string | number) {
		console.log("Deleting list...", listId);
		return del<IResponse>(apiKey, `list/${listId}`, { session_id: sessionId });
	}
};
