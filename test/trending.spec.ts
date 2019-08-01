import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { MediaType, TimeWindow } from "../src/Enums";
import { MovieResults } from "../src/Interfaces";

describe("Trending API", () => {
	it("Get a list of trending media", () => {
		return tmdb.getTrending(MediaType.Movie, TimeWindow.Week).then((result: MovieResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});
});
