import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { account }                                        from "../../src/core";
import { MediaType }                                      from "../../src/core/enums";
import { StatusCode }                                     from "../../src/core/enums";
import { IResponse }                                      from "../../src/core/interface/response";
import { IMovieResults, ISeriesResults, IEpisodeResults } from "../../src/core/interface/results";

describe("Account API", () => {
	it("Get account details", () => {
		return account.getDetails(auth.api_key, auth.session_id);
	});

	it("Get the account's created lists", () => {
		return Promise.all([
			account.getLists(auth.api_key, auth.session_id),
			account.getLists(auth.api_key, auth.session_id, auth.account_id)
		]);
	});

	it("Get the account's favorite movies", () => {
		return Promise.all([
			account.getFavoriteMovies(auth.api_key, auth.session_id),
			account.getFavoriteMovies(auth.api_key, auth.session_id, auth.account_id)
		]);
	});

	it("Get the account's favorite TV shows", () => {
		return Promise.all([
			account.getFavoriteTvShows(auth.api_key, auth.session_id),
			account.getFavoriteTvShows(auth.api_key, auth.session_id, auth.account_id)
		]);
	});

	it("Mark a movie as favorite", () => {
		return Promise.all([
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Movie, 260513, true).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			}),
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Movie, 137093, true, auth.account_id).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			})
		]);
	});

	it("Unmark a movie as favorite", () => {
		return Promise.all([
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Movie, 260513, false).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			}),
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Movie, 137093, false, auth.account_id).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			})
		]);
	})

	it("Mark a TV show as favorite", () => {
		return Promise.all([
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Tv, 60059, true).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			}),
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Tv, 62286, true, auth.account_id).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.Success);
			})
		]);
	});

	it("Unmark a TV show as favorite", () => {
		return Promise.all([
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Tv, 60059, false).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			}),
			account.markFavorite(auth.api_key, auth.session_id, MediaType.Tv, 62286, false, auth.account_id).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			})
		]);
	});

	it("Get the account's rated movies", () => {
		return Promise.all([
			account.getRatedMovies(auth.api_key, auth.session_id).then((result: IMovieResults) => {
				expect(result.results).to.be.an("array");
			}),
			account.getRatedMovies(auth.api_key, auth.session_id, auth.account_id).then((result: IMovieResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's rated TV shows", () => {
		return Promise.all([
			account.getRatedTvShows(auth.api_key, auth.session_id).then((result: ISeriesResults) => {
				expect(result.results).to.be.an("array");
			}),
			account.getRatedTvShows(auth.api_key, auth.session_id, auth.account_id).then((result: ISeriesResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's rated TV show episodes", () => {
		return Promise.all([
			account.getRatedTvEpisodes(auth.api_key, auth.session_id).then((result: IEpisodeResults) => {
				expect(result.results).to.be.an("array");
			}),
			account.getRatedTvEpisodes(auth.api_key, auth.session_id, auth.account_id).then((result: IEpisodeResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's movie watchlist", () => {
		return Promise.all([
			account.getMovieWatchlist(auth.api_key, auth.session_id).then((result: IMovieResults) => {
				expect(result.results).to.be.an("array");
			}),
			account.getMovieWatchlist(auth.api_key, auth.session_id, auth.account_id).then((result: IMovieResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Get the account's TV show watchlist", () => {
		return Promise.all([
			account.getTvShowWatchList(auth.api_key, auth.session_id).then((result: ISeriesResults) => {
				expect(result.results).to.be.an("array");
			}),
			account.getTvShowWatchList(auth.api_key, auth.session_id, auth.account_id).then((result: ISeriesResults) => {
				expect(result.results).to.be.an("array");
			})
		]);
	});

	it("Add a movie to the account's watchlist", () => {
		return Promise.all([
			account.markInWatchlist(auth.api_key, auth.session_id, MediaType.Movie, 278, true).then((result: IResponse) => {
				expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
			}),
			account.markInWatchlist(auth.api_key, auth.session_id, MediaType.Movie, 137093, true, auth.account_id).then((result: IResponse) => {
				expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
			})
		]);
	});

	it("Remove a movie from the account's watchlist", () => {
		return Promise.all([
			account.markInWatchlist(auth.api_key, auth.session_id, MediaType.Movie, 278, false).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			}),
			account.markInWatchlist(auth.api_key, auth.session_id, MediaType.Movie, 137093, false, auth.account_id).then((result: IResponse) => {
				expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			})
		]);
	});
});
