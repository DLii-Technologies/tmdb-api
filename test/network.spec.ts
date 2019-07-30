import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";

/**
 * Import modules to test
 */
import { TMDb } from "../src";
import { StatusCode } from "../src/Enums";
import { MovieResults } from "../src/Interfaces";

describe("Network API", () => {
	/**
	 * Test out the error mechanism. Do so by using a bad API key
	 */
	it("API error Mechanism", () => {
		// Use a bad API key
		let tmdb = new TMDb("12345");
		return Promise.all([
			tmdb.searchCompanies("Sony").catch((response) => {
				expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
				expect(response.status_message).to.equal("Invalid API key: You must be granted a valid key.");
			}),
			tmdb.rateMovie(278, 10).catch((response) => {
				expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
			}),
			tmdb.unrateMovie(278).catch((response) => {
				expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
			})
		]);

	});

	/**
	 * Test the throttle mechanism
	 */
	it("Request throttle mechanism", () => {
		let requests: Promise<MovieResults>[] = [];
		for (let i = 0; i < 60; i++) {
			requests.push(tmdb.searchMovies("The Fast and the Furious"));
		}
		return Promise.all(requests);
	});
});
