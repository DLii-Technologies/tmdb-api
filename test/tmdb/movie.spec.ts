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

describe("TMDb: Movie Module", () => {
	it("Get the latest movie", () => {
		return tmdb.movie.getLatest().then((movie) => {
			expect(movie).to.be.an.instanceOf(MovieDetails);
		});
	});
	it("Get movies now playing", () => {
		return tmdb.movie.getNowPlaying(1).then((result) => {
			expect(result.totalPages).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(MovieListing);
		});
	});
	it("Get popular movies", () => {
		return tmdb.movie.getPopular(1).then((result) => {
			expect(result.totalPages).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(MovieListing);
		});
	});
	it("Get top rated movies", () => {
		return tmdb.movie.getTopRated(1).then((result) => {
			expect(result.totalPages).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(MovieListing);
		});
	});
	it("Get upcoming movies", () => {
		return tmdb.movie.getUpcoming(1).then((result) => {
			expect(result.totalPages).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(MovieListing);
		});
	});
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
	it("Get the movie's alternative titles", () => {
		return details.getAlternativeTitles().then((result) => {
			expect(result[0].title).to.equal("The Incredibles 2");
		});
	});
	it("Get the movie's external ID's", () => {
		return details.getExternalIds().then((result) => {
			expect(result.imdb_id).to.equal("tt3606756");
		});
	});
	it("Get the movie's images", () => {
		return details.getImages().then((result) => {
			expect(result.backdrops.length).to.be.greaterThan(0);
			expect(result.posters.length).to.be.greaterThan(0);
		});
	});
	it("Get the movie's keywords", () => {
		return details.getKeywords().then((result) => {
			expect(result.keywords.length).to.be.greaterThan(0);
		});
	});
	it("Get the movie's release dates", () => {
		return details.getReleaseDates().then((result) => {
			expect(result).to.include.something.with.property("iso_3166_1", "US");
		});
	});
	it("Get the movie's videos", () => {
		return details.getVideos().then((result) => {
			expect(result.length).to.be.greaterThan(0);
		});
	});
	it("Get the movie's translations", () => {
		return details.getTranslations().then((result) => {
			expect(result).to.include.something.with.property("english_name", "English");
		});
	});
	it("Get recommended movies for the movie", () => {
		return details.getRecommendations().then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results.length).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(MovieListing);
		});
	});
	it("Get similar movies to the movie", () => {
		return details.getSimilarMovies().then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results.length).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(MovieListing);
		});
	});

	/**
	 * @TODO Lists must be created first
	 */
	// it("Get lists that the movie belongs to", () => {
	// 	return details.getLists();
	// });

	/**
	 * @TODO Test cases for rating and unrating movies
	 */
});
