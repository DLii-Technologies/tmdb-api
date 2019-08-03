import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Import modules to test
 */
import { search }                                    from "../../src/core";
import { MediaType }                                 from "../../src/core/enums";
import { ICompanyResults, ICollectionResults, IKeywordResults, IMovieResults, ISeriesResults,
	IPersonResults, ICombinedResults, IFindResults } from "../../src/core/interface/results";
import { ExternalSource }                            from "../../src/core/enums";

describe("Search API", () => {
	it("Find a TV show episode from IMDb ID", () => {
		return search.find(auth.api_key, "tt4197088", ExternalSource.Imdb).then((result: IFindResults) => {
			expect(result.tv_episode_results.length).to.equal(1);
			expect(result.tv_episode_results[0].name).to.equal("Member Berries");
		});
	});

	it("Search for and find Sony Pictures", () => {
		return search.companies(auth.api_key, "Sony Pictures").then((result: ICompanyResults) => {
			expect(result.total_results).to.be.greaterThan(0);
			expect(result.results[0].name).to.equal("Sony Pictures");
		});
	});

	it("Search for a collection", () => {
		let name = "The Fast and the Furious Collection";
		return search.collections(auth.api_key, name).then((result: ICollectionResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].name).to.equal(name);
		});
	});

	it("Search for a keyword", () => {
		return search.keywords(auth.api_key, "action").then((result: IKeywordResults) => {
			expect(result.total_results).to.be.greaterThan(0);
			expect(result.results[0].name).to.equal("action");
		});
	});

	it("Search for and find The Incredibles 2", () => {
		return search.movies(auth.api_key, "The Incredibles 2", 1, {}).then((result: IMovieResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].title).to.equal("Incredibles 2");
		});
	});

	it("Search for and find Breaking Bad", () => {
		return search.series(auth.api_key, "Breaking Bad").then((result: ISeriesResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].name).to.equal("Breaking Bad");
		});
	});

	it("Search for and find Keanu Reeves", () => {
		return search.people(auth.api_key, "Keanu Reeves").then((result: IPersonResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].name).to.equal("Keanu Reeves");
		});
	});

	/**
	 * Use the multi-search functionality to search for Gabriel Iglesias (Fluffy)
	 * Should find his Movies, TV show(s), and himself
	 */
	it("Search and find a movie, TV show, and person with multi search", () => {
		return search.multi(auth.api_key, "Fluffy").then((result: ICombinedResults) => {
			expect(result.total_results).to.be.greaterThan(2);
			result.results.should.include.something.that.has.property("media_type", MediaType.Movie);
			result.results.should.include.something.that.has.property("media_type", MediaType.Person);
			result.results.should.include.something.that.has.property("media_type", MediaType.Tv);
		});
	});
});
