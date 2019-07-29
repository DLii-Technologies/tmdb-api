import { expect } from "chai";
import "mocha";
import { tmdb } from "./config";

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
	it("API Error Mechanism", () => {
		// Use a bad API key
		return new TMDb("12345").searchCompanies("Sony").catch((response) => {
			expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
			expect(response.status_message).to.equal("Invalid API key: You must be granted a valid key.");
		});
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
