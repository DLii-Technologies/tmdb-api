import got             from "got";
import { cleanObject } from "./utils";

/**
 * @TODO Change timeout to be a configurable option
 * Constants
 */
const BASE_URL = "https://api.themoviedb.org";
const TIMEOUT = 10000
const API_VERSION = 3;

/**
 * Available request methods
 */
enum RequestMethod {
	Get    = "GET",
	Post   = "POST",
	Delete = "DELETE"
}

/**
 * Extend Got to use JSON and the base URL
 */
let tmdb = got.extend({
	prefixUrl: `${BASE_URL}/${API_VERSION}`,
	responseType: "json",
	timeout: TIMEOUT
});

/**
 * Send a generic request
 */
async function request<T>(apiKey: string, method: RequestMethod, uri: string,
	searchParams: any = {}, body?: any)
{
	cleanObject(searchParams);
	searchParams["api_key"] = apiKey;
	return new Promise<T>(async (resolve, reject) => {
		try {
			let response = await tmdb(uri, { method, searchParams, json: body }).json();
			resolve(<T>response);
		} catch(e) {
			reject(e.response.body);
		}
	});
}

/**
 * Send a GET request
 */
export async function get<T>(apiKey: string, uri: string, query?: any) {
	return request<T>(apiKey, RequestMethod.Get, uri, query);
}

/**
 * Send a POST request
 */
export async function post<T>(apiKey: string, uri: string, query?: any, body?: any) {
	return request<T>(apiKey, RequestMethod.Post, uri, query, body);
}

/**
 * Send a DEL request
 */
export async function del<T>(apiKey: string, uri: string, query?: any, body?: any) {
	return request<T>(apiKey, RequestMethod.Delete, uri, query, body);
}
