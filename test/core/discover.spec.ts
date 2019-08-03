import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { discover } from "../../src/core";
import { MediaType, TimeWindow } from "../../src/core/enums";
import { IMovieResults } from "../../src/core/interface/results";

describe("Core: Discover API", () => {
	it("Get a list of trending media", () => {
		return discover.getTrending(auth.api_key, MediaType.Movie, TimeWindow.Week).then((result: IMovieResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});
});
