import { config } from "dotenv";
import { expect, should, use } from "chai";
import "mocha";

/**
 * Load the environment configuration
 */
config();

/**
 * Setup Chai
 */
should();
use(require("chai-things"));
use(require("chai-subset"));

/**
 * Import modules to test
 */
import { Tmdb }     from "../src";
import { Response, CompanyResults, MovieResults, SeriesResults, PersonResults, MultiSearchResults, KeywordResults, CollectionResults } from "../src/Interfaces";
import { StatusCode, MediaType } from "../src/Enums";
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
	it("API Error Mechanism", () => {
		// Use a bad API key
		return new Tmdb("12345").searchCompanies("Sony").catch((response) => {
			expect(response.status_code).to.equal(StatusCode.InvalidApiKey);
			expect(response.status_message).to.equal("Invalid API key: You must be granted a valid key.");
		});
	});

	/**
	 * Search for a specific company
	 */
	it("Search for and find Sony Pictures", () => {
		return tmdb.searchCompanies("Sony Pictures").then((result: CompanyResults) => {
			expect(result.total_results).to.be.greaterThan(0);
			expect(result.results[0].name).to.equal("Sony Pictures");
		});
	});

	/**
	 * Search for a movie collection
	 */
	it("Search for a collection", () => {
		let name = "The Fast and the Furious Collection";
		return tmdb.searchCollections(name).then((result: CollectionResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].name).to.equal(name);
		});
	});

	/**
	 * Search for a specific keyword
	 */
	it("Search for a keyword", () => {
		return tmdb.searchKeywords("action").then((result: KeywordResults) => {
			expect(result.total_results).to.be.greaterThan(0);
			expect(result.results[0].name).to.equal("action");
		});
	});

	/**
	 * Search for a movie
	 */
	it("Search for and find The Incredibles 2", () => {
		return tmdb.searchMovies("The Incredibles 2", {}, 1).then((result: MovieResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].title).to.equal("Incredibles 2");
		});
	});

	/**
	 * Search for a TV show
	 */
	it("Search for and find Breaking Bad", () => {
		return tmdb.searchSeries("Breaking Bad").then((result: SeriesResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].name).to.equal("Breaking Bad");
		});
	});

	/**
	 * Search for a person
	 */
	it("Search for and find Keanu Reeves", () => {
		return tmdb.searchPeople("Keanu Reeves").then((result: PersonResults) => {
			expect(result.total_results).to.equal(1);
			expect(result.results[0].name).to.equal("Keanu Reeves");
		});
	});

	/**
	 * Use the multi-search functionality to search for Gabriel Iglesias (Fluffy)
	 * Should find his Movies, TV show(s), and himself
	 */
	it("Search and find a movie, TV show, and person with multi search", () => {
		return tmdb.search("Fluffy").then((result: MultiSearchResults) => {
			expect(result.total_results).to.be.greaterThan(2);
			result.results.should.include.something.that.has.property("media_type", MediaType.Movie);
			result.results.should.include.something.that.has.property("media_type", MediaType.Person);
			result.results.should.include.something.that.has.property("media_type", MediaType.Tv);
		});
	});
});
