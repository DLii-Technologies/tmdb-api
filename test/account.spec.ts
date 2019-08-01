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
		return Promise.all([
			tmdb.getAccountLists(auth.session_id),
			tmdb.getAccountLists(auth.session_id, auth.account_id)
		]);
	});

	it("Get the account's favorite movies", () => {
		return Promise.all([
			tmdb.getFavoriteMovies(auth.session_id),
			tmdb.getFavoriteMovies(auth.session_id, auth.account_id)
		]);
	});

	it("Get the account's favorite TV shows", () => {
		return Promise.all([
			tmdb.getFavoriteTvShows(auth.session_id),
			tmdb.getFavoriteTvShows(auth.session_id, auth.account_id)
		]);
	});

	it("Mark a movie as favorite", () => {
		return Promise.all([
			tmdb.markFavoriteMovie(260513, auth.session_id, true).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			}),
			tmdb.markFavoriteMovie(137093, auth.session_id, true, auth.account_id).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			})
		]);
	});

	it("Unmark a movie as favorite", () => {
		return Promise.all([
			tmdb.markFavorite(MediaType.Movie, 260513, auth.session_id, false).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			}),
			tmdb.markFavorite(MediaType.Movie, 137093, auth.session_id, false, auth.account_id).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			})
		]);
	})

	it("Mark a TV show as favorite", () => {
		return Promise.all([
			tmdb.markFavoriteTvShow(60059, auth.session_id, true).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			}),
			tmdb.markFavoriteTvShow(62286, auth.session_id, true, auth.account_id).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			})
		]);
	});

	it("Unmark a TV show as favorite", () => {
		return Promise.all([
			tmdb.markFavorite(MediaType.Tv, 60059, auth.session_id, false).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			}),
			tmdb.markFavorite(MediaType.Tv, 62286, auth.session_id, false, auth.account_id).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			})
		]);
	});

	it("Get the account's rated movies", () => {
		return Promise.all([
			tmdb.getRatedMovies(auth.session_id).then((result: MovieResults) => {
				expect(result.results).to.be.an("array");
			}),
			tmdb.getRatedMovies(auth.session_id, auth.account_id).then((result: MovieResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's rated TV shows", () => {
		return Promise.all([
			tmdb.getRatedTvShows(auth.session_id).then((result: SeriesResults) => {
				expect(result.results).to.be.an("array");
			}),
			tmdb.getRatedTvShows(auth.session_id, auth.account_id).then((result: SeriesResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's rated TV show episodes", () => {
		return Promise.all([
			tmdb.getRatedTvEpisodes(auth.session_id).then((result: EpisodeResults) => {
				expect(result.results).to.be.an("array");
			}),
			tmdb.getRatedTvEpisodes(auth.session_id, auth.account_id).then((result: EpisodeResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's movie watchlist", () => {
		return Promise.all([
			tmdb.getMovieWatchlist(auth.session_id).then((result: MovieResults) => {
				expect(result.results).to.be.an("array");
			}),
			tmdb.getMovieWatchlist(auth.session_id, auth.account_id).then((result: MovieResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's TV show watchlist", () => {
		return Promise.all([
			tmdb.getTvShowWatchList(auth.session_id).then((result: SeriesResults) => {
				expect(result.results).to.be.an("array");
			}),
			tmdb.getTvShowWatchList(auth.session_id, auth.account_id).then((result: SeriesResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Add a movie to the account's watchlist", () => {
		return Promise.all([
			tmdb.markInWatchlist(MediaType.Movie, 278, auth.session_id, true).then((result: Response) => {
				expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
			}),
			tmdb.markInWatchlist(MediaType.Movie, 137093, auth.session_id, true, auth.account_id).then((result: Response) => {
				expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
			})
		]);
	});

	it("Remove a movie from the account's watchlist", () => {
		return Promise.all([
			tmdb.markInWatchlist(MediaType.Movie, 278, auth.session_id, false).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			}),
			tmdb.markInWatchlist(MediaType.Movie, 137093, auth.session_id, false, auth.account_id).then((result: Response) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			})
		]);
	});
});
