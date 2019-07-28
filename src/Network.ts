import * as got from "got";
import { URLSearchParams } from "url";
import { Response } from "Interfaces";

/**
 * Constants
 */
const BASE_URL    = "https://api.themoviedb.org";
const API_VERSION = 3;

/**
 * Extend Got to use JSON and the base URL
 */
let tmdb = got.extend({
	baseUrl: `${BASE_URL}/${API_VERSION}`,
	json   : true
});



/**
 * Send a GET request
 */
export function get<T extends object>(apiKey: string, uri: string, query: any = {}, body?: object) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		tmdb.get(uri, {query}).then(result => resolve(<T>result.body)).catch(e => reject(e.body));
	});
}

/**
 * Send a POST request
 */
export function post(apiKey: string, uri: string) {
	return got.post(uri);
}

/**
 * Send a DEL request
 */
export function del(apiKey: string, uri: string) {
	// return got.del(uri);
}
