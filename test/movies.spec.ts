import { expect } from "chai";
import "mocha";
import { tmdb, auth } from "./init";
import { AlternativeTitles, ImageList, ExternalIdList, KeywordList, MovieReleaseDateResults, Credits } from "../src/Interfaces";

describe("Movie API", () => {
	it("Get a movie's details", () => {
		return tmdb.getMovieDetails(235);
	});

	it("Get a movie's alternative titles", () => {
		return tmdb.getMovieAltTitles(813).then((result: AlternativeTitles) => {
			expect(result.titles.length).to.be.greaterThan(0);
			result.titles.should.include.something.that.has.property("title", "Flying High!");
		});
	});

	it("Get a movie's recent changes", () => {
		return tmdb.getMovieChanges(559969);
	});

	it("Get a movie's credits", () => {
		return tmdb.getMovieCredits(235).then((result: Credits) => {
			result.cast.should.include.something.that.has.property("name", "Wil Wheaton");
		});
	});

	it("Get a movie's external IDs", () => {
		return tmdb.getMovieExternalIds(472269).then((result: ExternalIdList) => {
			expect(result.imdb_id).to.equal("tt6081670");
		});
	});

	it("Get a movie's images", () => {
		return tmdb.getMovieImages(346364).then((result: ImageList) => {
			expect(result.backdrops.length).to.be.greaterThan(0);
			expect(result.posters.length).to.be.greaterThan(0);
		});
	});

	it("Get a movie's keywords", () => {
		return tmdb.getMovieKeywords(497).then((result: KeywordList) => {
			result.keywords.should.include.something.that.has.property("name", "electric chair");
		});
	});

	it("Get a movie's release dates", () => {
		return tmdb.getMovieReleaseDates(680);
	});

	it("Get a movie's videos", () => {
		return tmdb.getMovieVideos(521029);
	});

	it("Get a movie's translations", () => {
		return tmdb.getMovieTranslations(19185);
	});

	it("Get a movie's recommended movies", () => {
		return tmdb.getMovieRecommendations(396940);
	});

	it("Get similar movies to a movie", () => {
		return tmdb.getSimilarMovies(396940);
	});

	it("Get a movie's reviews", () => {
		return tmdb.getMovieReviews(260346);
	});

	it("Get the lists a movie belongs to", () => {
		return tmdb.getMovieLists(156022);
	});

	it("Rate a movie", () => {
		return tmdb.rateMovie(260513, 8, auth.session_id);
	});

	it("Delete a rating from a movie", () => {
		return tmdb.unrateMovie(260513, auth.session_id);
	});

	it("Get the latest movie", () => {
		return tmdb.getLatestMovie();
	});

	it("Get movies now playing", () => {
		return tmdb.getMoviesNowPlaying();
	});

	it("Get popular movies", () => {
		return tmdb.getPopularMovies();
	});

	it("Get top rated movies", () => {
		return tmdb.getTopRatedMovies();
	});

	it("Get upcoming movies", () => {
		return tmdb.getUpcomingMovies();
	});
});
