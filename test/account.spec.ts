import { expect } from "chai";
import "mocha";
import { tmdb, auth } from "./init";
import { MediaType, StatusCode } from "../src/Enums";
import { Response } from "../src/Interfaces";

describe("Find API", () => {
	it("Get account details", () => {
		return tmdb.getAccountDetails(auth.session_id);
	});

	it("Get the account's created lists", () => {
		return tmdb.getAccountLists(auth.session_id);
	});

	it("Get the account's favorite movies", () => {
		return tmdb.getFavoriteMovies(auth.session_id);
	});

	it("Get the account's favorite TV shows", () => {
		return tmdb.getFavoriteTvShows(auth.session_id);
	});

	it("Mark a movie as favorite", () => {
		return tmdb.markFavoriteMovie(260513, auth.session_id, true).then((result: Response) => {
			expect(result.status_code).to.equal(StatusCode.Success);
		});
	});

	it("Unmark a movie as favorite", () => {
		return tmdb.markFavorite(MediaType.Movie, 260513, auth.session_id, false).then((result: Response) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
		});
	})

	it("Mark a TV show as favorite", () => {
		return tmdb.markFavoriteTvShow(60059, auth.session_id, true).then((result: Response) => {
			expect(result.status_code).to.equal(StatusCode.Success);
		});
	});

	it("Unmark a TV show as favorite", () => {
		return tmdb.markFavorite(MediaType.Tv, 60059, auth.session_id, false).then((result: Response) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
		});
	});
});
