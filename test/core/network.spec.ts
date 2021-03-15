import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Import modules to test
 */
import { search, movie } from "../../src/core";
import { IMovieResults } from "../../src/core/interface/results";
import { IResponse }     from "../../src/core/interface/response";
import { StatusCode }    from "../../src/core/enums";

describe("Core: Network API", () => {
	/**
	 * Test out the error mechanism. Do so by using a bad API key
	 */
	it("API error Mechanism", () => {
		// Use a bad API key
		return Promise.all([
			search.companies("12345", "Sony").catch((response: IResponse) => {
				expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
				expect(response.status_message).to.equal("Invalid API key: You must be granted a valid key.");
			}),
			movie.rate("12345", 278, 10).catch((response: IResponse) => {
				expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
			}),
			movie.unrate("12345", 278).catch((response: IResponse) => {
				expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
			})
		]);
	});
});
