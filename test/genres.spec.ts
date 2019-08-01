import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { GenreList } from "../src/Interfaces";

describe("Genre API", () => {
	it("Get list of movie genres", () => {
		return tmdb.getMovieGenreList().then((result: GenreList) => {
			expect(result.genres.length).to.be.greaterThan(0);
		});
	});

	it("Get list of TV show genres", () => {
		return tmdb.getTvShowGenreList().then((result: GenreList) => {
			expect(result.genres.length).to.be.greaterThan(0);
		});
	});
});
