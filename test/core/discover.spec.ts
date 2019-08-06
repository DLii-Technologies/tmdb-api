import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { discover }                                                from "../../src/core";
import { MediaType, TimeWindow, DiscoverSort, SortDirection } from "../../src/core/enums";
import { IMovieResults, ISeriesResults }                           from "../../src/core/interface/results";

describe("Core: Discover API", () => {
	it("Get a list of trending media", () => {
		return discover.getTrending(auth.api_key, MediaType.Movie, TimeWindow.Week).then((result: IMovieResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});

	it("Discover movies", () => {
		return Promise.all([
			discover.movies(auth.api_key, { cast: [6384, 2975], sort_by: DiscoverSort.OriginalTitle }).then((result: IMovieResults) => {
				result.results.should.include.something.with.property("title", "John Wick: Chapter 2");
				result.results.should.include.something.with.property("title", "The Matrix");
			}),
			discover.movies(auth.api_key, { cast: [[18918], [12835]] }).then((result: IMovieResults) => {
				result.results.should.include.something.with.property("title", "Jumanji: Welcome to the Jungle");
				result.results.should.include.something.with.property("title", "The Fate of the Furious");
				result.results.should.include.something.with.property("title", "Saving Private Ryan");
			})
		]);
	});

	it("Discover TV shows", () => {
		return discover.tvShows(auth.api_key, { genres: [18], sort_direction: SortDirection.Desc, keywords: [2231] }).then((result: ISeriesResults) => {
			result.results.should.include.something.with.property("name", "Breaking Bad");
		});
	});
});
