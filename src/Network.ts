import * as got from "got";
import { URLSearchParams } from "url";
import { Response } from "Interfaces";

/**
 * Constants
 */
const BASE_URL    = "https://api.themoviedb.org";
const API_VERSION = 3;

/**
 * Enable throttling to prevent too frequent requests
 */
export var throttleEnabled = true;

/**
 * Keep track of the requests if throttling is enabled
 */
var requestBucket: number[] = [];

/**
 * Extend Got to use JSON and the base URL
 */
let tmdb = got.extend({
	baseUrl: `${BASE_URL}/${API_VERSION}`,
	json   : true
});

/**
 * A simple asynchronous timeout function
 */
function timeout(delay: number) {
	if (delay <= 0) {
		return null;
	}
	return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Get the current timestamp in milliseconds
 */
function getMilliseconds() {
	return new Date().getTime();
}

/**
 * Used to throttle too frequent requests
 */
async function throttle(callback: Function) {
	if (throttleEnabled) {
		if (requestBucket.length >= 40) {
			await timeout(10000 - (getMilliseconds() - requestBucket.shift()!));
		}
		requestBucket.push(getMilliseconds());
	}
	callback();
}

/**
 * Send a GET request
 */
export function get<T extends object>(apiKey: string, uri: string, query: any = {}) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		throttle(() => {
			tmdb.get(uri, {query})
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}

/**
 * Send a POST request
 */
export function post<T extends Response>(apiKey: string, uri: string, query: any = {}, body?: any) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		throttle(() => {
			tmdb.post(uri, {query, body})
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}

/**
 * Send a DEL request
 */
export function del<T extends Response>(apiKey: string, uri: string, query: any = {}, body?: any) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		throttle(() => {
			tmdb.delete(uri, {query, body})
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}
