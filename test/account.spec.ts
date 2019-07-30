import { expect } from "chai";
import "mocha";
import { tmdb, auth } from "./init";
import { MediaType, StatusCode } from "../src/Enums";
import { Response, MovieResults, SeriesResults, EpisodeResults } from "../src/Interfaces";

describe("Account API", () => {
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

	it("Get the account's rated movies", () => {
		return tmdb.getRatedMovies(auth.session_id).then((result: MovieResults) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get the account's rated TV shows", () => {
		return tmdb.getRatedTvShows(auth.session_id).then((result: SeriesResults) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get the account's rated TV show episodes", () => {
		return tmdb.getRatedTvEpisodes(auth.session_id).then((result: EpisodeResults) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get the account's movie watchlist", () => {
		return tmdb.getMovieWatchlist(auth.session_id).then((result: MovieResults) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get the account's TV show watchlist", () => {
		return tmdb.getTvShowWatchList(auth.session_id).then((result: SeriesResults) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Add a movie to the account's watchlist", () => {
		return tmdb.markInWatchlist(MediaType.Movie, 278, auth.session_id, true).then((result: Response) => {
			expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
		});
	});

	it("Remove a movie from the account's watchlist", () => {
		return tmdb.markInWatchlist(MediaType.Movie, 278, auth.session_id, false).then((result: Response) => {
			expect(result.status_code).to.be.oneOf([StatusCode.RecordDeleteSuccess]);
		});
	});
});
