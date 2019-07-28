import { config } from "dotenv";
import { expect } from "chai";
import "mocha";

/**
 * Load the environment configuration
 */
config();

/**
 * Import modules to test
 */
import { Tmdb }     from "../src";
import { Response, CompanyResults } from "../src/Interfaces";
import { StatusCode } from "../src/Enums";
import * as Network from "../src/Network";

// -------------------------------------------------------------------------------------------------

/**
 * Create the TMDB instance
 */
let tmdb = new Tmdb(<string>process.env["TMDB_API_KEY"]);

describe("Search API", () => {
	/**
	 * Test out the error mechanism. Do so by using a bad API key
	 */
	it("API Error Mechanism", (done) => {
		// Use a bad API key
		let badKey = new Tmdb("12345");
		badKey.searchCompany("Sony").catch((response) => {
			expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
			expect(response.status_message).to.equal("Invalid API key: You must be granted a valid key.");
			done();
		});
	});

	/**
	 * Test company search
	 */
	it("Search for and find Sony Pictures", (done) => {
		tmdb.searchCompany("Sony Pictures").then((result: CompanyResults) => {
			expect(result.total_results).to.be.greaterThan(0);
			expect(result.results[0].name).to.equal("Sony Pictures");
			done();
		});
	});
});
