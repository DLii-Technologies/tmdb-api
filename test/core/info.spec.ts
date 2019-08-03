import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { info } from "../../src/core";
import { IGenres, IKeyword, IMovieCertifications, ITvCertifications } from "../../src/core/interface/info";
import { IWithId, IMovieResults } from "../../src/core/interface/results";

describe("Core: Information API", () => {
	it("Get list of movie certifications", () => {
		return info.getMovieCertifications(auth.api_key).then((result: IMovieCertifications) => {
			expect(result.certifications.IN.length).to.be.greaterThan(0);
		});
	});

	it("Get list of TV certifications", () => {
		return info.getTvCertifications(auth.api_key).then((result: ITvCertifications) => {
			expect(result.certifications.KR.length).to.be.greaterThan(0);
		});
	});

	it("Get list of movie genres", () => {
		return info.getMovieGenreList(auth.api_key).then((result: IGenres) => {
			expect(result.genres.length).to.be.greaterThan(0);
		});
	});


	it("Get list of TV show genres", () => {
		return info.getTvGenreList(auth.api_key).then((result: IGenres) => {
			expect(result.genres.length).to.be.greaterThan(0);
		});
	});

	it("Get the details of a keyword", () => {
		return info.getKeywordDetails(auth.api_key, 3417).then((result: IKeyword) => {
			expect(result.id == 3417);
			expect(result.name).to.equal("wormhole");
		});
	});

	it("Get the movies that belong to a keyword", () => {
		return info.getMoviesWithKeyword(auth.api_key, 3417).then((result: IMovieResults & IWithId) => {
			expect(result.total_results).to.be.greaterThan(1);
			result.results.should.include.something.with.property("title", "Interstellar");
		});
	});
});
