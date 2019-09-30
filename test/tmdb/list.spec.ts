import { expect } from "chai";
import "mocha";

/**
 * Modules to test
 */
import { TMDb, ListListing, ListDetails, MovieListing } from "../../src";

/**
 * Grab the current TMDb instance
 */
let tmdb = TMDb.instance();
let listing: ListListing;
let details: ListDetails;

describe.only("TMDb: Movie Module", () => {
	it("Get the lists that Star Wars is in", () => {
		return tmdb.movie.getLists(11).then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(ListListing);
			listing = result.results[0];
		});
	});
	it("Get the details of the list", () => {
		return listing.getDetails().then((result) => {
			expect(result).to.be.an.instanceOf(ListDetails);
			details = result;
		});
	});
	it("Get the status of an item in the list", () => {
		return details.hasItem(11).then((result) => {
			expect(result).to.equal(true);
		});
	});
});
