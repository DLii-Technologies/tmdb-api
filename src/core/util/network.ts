import got from "got";
import { cleanObject } from "./utils";

/**
 * Constants
 */
const BASE_URL = "https://api.themoviedb.org";
const TIMEOUT = 10000
const API_VERSION = 3;

/**
 * Type definitions
 */
type Request = () => Promise<any>;

/**
 * The supported request methods
 */
enum RequestMethod {
	Get    = "GET",
	Post   = "POST",
	Delete = "DELETE"
}

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
 * Send a generic request
 */
async function request<T>(apiKey: string, method: RequestMethod, uri: string,
	searchParams: any = {}, body?: any)
{
	cleanObject(searchParams);
	searchParams["api_key"] = apiKey;
	return new Promise<T>((resolve, reject) => {
		enqueueRequest(async () => {
			try {
				resolve(await tmdb(uri, { method, searchParams, json: body }).json());
			} catch(e) {
				reject(e.response.body);
			}
		})
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
