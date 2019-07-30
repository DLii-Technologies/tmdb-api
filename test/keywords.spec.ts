import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { Keyword, MovieResultsWithId } from "../src/Interfaces";

describe.only("Keywords API", () => {
	it("Get the details of a keyword", () => {
		return tmdb.getKeywordDetails(3417).then((result: Keyword) => {
			expect(result.id == 3417);
			expect(result.name).to.equal("wormhole");
		});
	});

	it("Get the movies that belong to a keyword", () => {
		return tmdb.getMoviesWithKeyword(3417).then((result: MovieResultsWithId) => {
			expect(result.total_results).to.be.greaterThan(1);
			result.results.should.include.something.with.property("title", "Interstellar");
		});
	});
});
