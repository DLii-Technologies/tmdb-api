/**
 * @TODO
 * This network utility was written with an older version of GOT. GOT has since updated and has
 * vastly changed how JSON requests need to be performed. These changes require a complete rewrite
 * of the request system here.
 *
 * On a side note, the website is frequently timing out and returning 502 errors... No idea as to
 * how long this will last, but it's really hurting the testing here
 */

import got from "got";
import { cleanObject } from "./utils";

/**
 * Create a simple Request type
 */
type Request = () => Promise<any>;

/**
 * Constants
 */
const BASE_URL    = "https://api.themoviedb.org";
const TIMEOUT     = 10000
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
	prefixUrl: `${BASE_URL}/${API_VERSION}`,
	responseType: "json",
	timeout: TIMEOUT
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
	while (requestBucket.length && ms - requestBucket[0] >= TIMEOUT) {
		requestBucket.shift();
	}
}

/**
 * Throttle too frequent requests
 */
function throttle() {
	let ms = getMilliseconds();
	cleanBucket();
	if (requestBucket.length >= 38 && ms - requestBucket[0] < TIMEOUT) {
		if (executeTimeout) {
			clearTimeout(executeTimeout);
		}
		executeTimeout = setTimeout(sendNextRequest, TIMEOUT - (ms - requestBucket[0]));
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
export function get<T>(apiKey: string, uri: string, searchParams: any = {}) {
	cleanObject(searchParams);
	searchParams["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		enqueueRequest(async () => {
			return tmdb.get(uri, { searchParams })
				.then(result => resolve(<T><any>result.body)) // nasty hack
				.catch(e => reject(e));
		});
	});
}

/**
 * Send a POST request
 */
export function post<T>(apiKey: string, uri: string, searchParams: any, body: any = {}) {
	cleanObject(searchParams);
	searchParams["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		enqueueRequest(async () => {
			return tmdb.post(uri, { searchParams, json: body })
				.then(result => resolve(<T><any>result.body)) // nasty hack
				.catch(e => reject(e));
		});
	});
}

/**
 * Send a DEL request
 */
export function del<T>(apiKey: string, uri: string, searchParams: any, body: any = {}) {
	cleanObject(searchParams);
	searchParams["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		enqueueRequest(async () => {
			return tmdb.delete(uri, { searchParams, json: body })
				.then(result => resolve(<T><any>result.body)) // nasty hack
				.catch(e => reject(e));
		});
	});
}
