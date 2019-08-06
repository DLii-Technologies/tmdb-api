import * as got from "got";

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
 * Throttle too frequent requests
 */
function throttle() {
	let ms = getMilliseconds();
	cleanBucket();
	if (requestBucket.length >= 39 && ms - requestBucket[0] < 10000) {
		if (executeTimeout) {
			clearTimeout(executeTimeout);
		}
		executeTimeout = setTimeout(sendNextRequest, 10000 - (ms - requestBucket[0]));
		return true;
	}
	return false;
}

/**
 * Send the next request if it's ready
 */
function sendNextRequest() {
	if (!throttle()) {
		queue.shift()!();
		requestBucket.push(getMilliseconds());
		if (queue.length) {
			sendNextRequest();
		}
	}
}

/**
 * Enqueue and attempt to send the next request
 */
function enqueueRequest(request: Request) {
	queue.push(request);
	sendNextRequest();
}

/**
 * Send a GET request
 */
export function get<T>(apiKey: string, uri: string, query: any = {}) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		enqueueRequest(() => {
			return tmdb.get(uri, { query })
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}

/**
 * Send a POST request
 */
export function post<T>(apiKey: string, uri: string, query: any, body: any = {}) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		enqueueRequest(() => {
			return tmdb.post(uri, { query, body })
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}

/**
 * Send a DEL request
 */
export function del<T>(apiKey: string, uri: string, query: any, body: any = {}) {
	query["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		enqueueRequest(() => {
			return tmdb.delete(uri, { query, body })
				.then(result => resolve(<T>result.body))
				.catch(e => reject(e.body));
		});
	});
}
