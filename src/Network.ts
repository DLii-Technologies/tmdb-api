import * as got from "got";
import { Response } from "Interfaces";

/**
 * Create a simple Request type
 */
type Request = () => Promise<any>;

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
 * Keep a queue of pending requests once limit is reached
 */
var queue: Request[] = [];

/**
 * Used to delay execution of the next request
 */
var executeTimeout: NodeJS.Timeout | null = null;

/**
 * Extend Got to use JSON and the base URL
 */
let tmdb = got.extend({
	baseUrl: `${BASE_URL}/${API_VERSION}`,
	json   : true
});

/**
 * Get the current timestamp in milliseconds
 */
function getMilliseconds() {
	return new Date().getTime();
}

/**
 * Remove any unneeded requests from the bucket
 */
function cleanBucket() {
	let ms = getMilliseconds();
	while (requestBucket.length && ms - requestBucket[0] >= 10000) {
		requestBucket.shift();
	}
}

/**
 * Send the next request when the time is ready
 */
function executeNext() {
	cleanBucket();
	let ms = getMilliseconds();
	if (requestBucket.length >= 39 && ms - requestBucket[0] < 10000) {
		if (executeTimeout) {
			clearTimeout(executeTimeout);
		}
		executeTimeout = setTimeout(executeNext, 10000 - (ms - requestBucket[0]));
	} else {
		if (queue[0]) {
			queue.shift()!();
			requestBucket.push(ms);
			if (queue.length) {
				executeNext();
			}
		}
	}
}

/**
 * Used to throttle too frequent requests
 */
async function throttle(request: Request) {
	if (throttleEnabled) {
		queue.push(request);
		executeNext();
	} else {
		request();
	}
}

/**
 * Send a GET request
 */
export function get<T extends object>(apiKey: string, uri: string, query: any = {}) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		throttle(() => {
			return tmdb.get(uri, {query})
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}

/**
 * Send a POST request
 */
export function post<T extends object>(apiKey: string, uri: string, query: any = {}, body?: any) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		throttle(() => {
			return tmdb.post(uri, {query, body})
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}

/**
 * Send a DEL request
 */
export function del<T extends object>(apiKey: string, uri: string, query: any = {}, body?: any) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		throttle(() => {
			return tmdb.delete(uri, {query, body})
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}
