import { expect } from "chai";
import "mocha";

/**
 * Modules to test
 */
import { TMDb, MovieListing, MovieDetails } from "../../src";

/**
 * Grab the current TMDb instance
 */
let tmdb = TMDb.instance();
let listing: MovieListing;
let details: MovieDetails;

describe.only("TMDb: Movie Module", () => {
	it("Search for and find The Incredibles 2", () => {
		return tmdb.movie.search("Incredibles 2").then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results[0].title).to.equal("Incredibles 2");
			listing = result.results[0];
		});
	});
	it("Get the movie listing's details", () => {
		return listing.getDetails().then((result) => {
			expect(result.title).to.equal("Incredibles 2");
			details = result;
		});
	});
});
